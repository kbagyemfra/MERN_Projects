const router = require('express').Router()
const User = require('../models/User')

router.get('/', (req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ msg: err }))
})

router.post('/add', (req, res) => {
    const username = req.body.username

    const newUser = new User({ username })

    newUser.save()
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json({ msg: err }))
})

module.exports = router