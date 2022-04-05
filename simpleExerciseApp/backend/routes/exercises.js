const router = require('express').Router()
const Exercise = require('../models/Exercise')

router.get('/', (req, res) => {
    Exercise.find()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json({ msg: err }))
})

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json({ msg: err }))
})

router.post('/add', (req, res) => {
    const { username, description } = req.body
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)


    const newExercise = new Exercise({ 
        username, 
        description, 
        duration, 
        date 
    })

    newExercise.save()
    .then(() => res.json('Exercise Added!'))
    .catch(err => res.status(400).json({ msg: err }))
})

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json({ report: 'Exercise deleted'}))
    .catch(err => res.status(400).json({msg: err}))
})

router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username
        exercise.description = req.body.description
        exercise.duration = Number(req.body.duration)
        exercise.date = Date.parse(req.body.date)
        
        exercise.save()
        .then(() => res.json({ message: 'Exercise updated!' }))
        .catch(err => res.status(400).json({ msg: err}))
    })
    .catch(err => res.status(400).json({ msg: err }))
})

module.exports = router