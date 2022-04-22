const express = require('express')


const router = express.Router()

const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/Mauth')


// User Model
// We need this to make queries
const client = require('../models/User')



// @route Post request to /auth
// @desc Authernticate user
// @access Public


router.post('/', (req, res) => {
    const { email, password } = req.body

    // simple validation 
    if ( !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' })
    }

    // check for user (Validating)
    client.findOne({ email: email })
        .then(user => {
            if (!user) return res.status(400).json({ message: 'User Does not exists' })

            // compare the plain text password with the body request 
            
                // validate password
                bcrypt.compare(password, user.password)
                .then(isMatch => {

                    // if the the two password do not match 
                    if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

                    // if the two passwords do match 
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


// @route Get request to /auth/user
// @desc Get user data 
// @access Private

router.get('/user', auth, (req, res) => {
    client.findById(req.user.id)
    .select('-password') // this disregards the password
    .then(user => res.json(user))
})


module.exports = router;