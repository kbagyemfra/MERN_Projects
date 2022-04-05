const config = require('config')
const jwt = require('jsonwebtoken')

// creating a midddlware fxn
// when creating a middleware fxn you want to have 3 arguments req, res, and next

// req = request 
// res = response
// next = going to the next middleware fxn

function auth(req, res, next) {

    // purpose of the fxn is to get the token from the response 

    const token = req.header('x-auth-token')

    // Check for token
    if (!token) {

        return res.status(401).json({ message: 'Unauthorized access, no token' })
    }


    try {
        // verify token 
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        // Add user from payload
        req.user = decoded;
        next(); // this calls next piece of middleware
    } catch (e) {
        res.status(400).json({ message: 'token not valid' })
    }

}

module.exports = auth;