// Use the express router
const express = require('express')

// create a router variable to use the Router
// Router is part of the express object
const router = express.Router()

const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

// User Model
// We need this to make queries
const client = require('../models/User')



// @route Post request to /users
// @desc Register new user
// @access Public


router.post('/', (req, res) => {
    const { name, email, password } = req.body

    // simple validation 
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' })
    }

    // check for user (Validating)
    client.findOne({ email: email })
        .then(user => {
            if (user) return res.status(400).json({ message: 'User already exists' })

            const newUser = new client({
                name,
                email,
                password
            })

            // Create salt n hash 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash; // hashing the password
                    newUser.save() // saving the user
                        .then(user => {

                            jwt.sign(
                                // first parameter is the payload we want to add
                                // we will use the user id
                                { id: user.id },
                                // the user id is in because it knows which user it is, or any token could acces anything 
                                // you culd add more parameters its optional

                                config.get('jwtSecret'), // to get the jwtSecret value

                                { expiresIn: 3600 }, // token expires in 1 hour

                                (err, token) => {

                                    if (err) throw err;

                                    res.json({ // json response to post method
                                        token, // we will get the token as a response as well 
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )

                        })
                })
            })

        })
})

module.exports = router;