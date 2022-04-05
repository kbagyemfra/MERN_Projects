// Use the express router

const express = require('express')

// create a router variable to use the Router
// Router is part of the express object
const router = express.Router()


// We need this to make queries
const Tutorial = require('../models/Tutorial')


// Create some routes ------------

// @route GET request by title
// @desc Get all tutorials
// @access Public
router.get('/', (req, res) => {
    // We use req.query.title to get 
    // query string from the Request 
    // and consider it as condition for findAll() method.
    const title = req.query.title
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {}

    Tutorial.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.mesasage || "BIG BIG ERROR while retrieving tutorials"
            })
        })
})


// @route GET request by ID 
// @desc Get only one tutorial
// @access Public
router.get('/:id', (req, res) => {
    const id = req.params.id

    Tutorial.findById(id)
        .then(data => {
            if (!data)
                res.status(404).json({ message: "No tutorial ID with" + id })

            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id= " + id })
        })
})


// @route GET request by ID 
// @desc Get only one tutorial
// @access Public
router.get('/published', (req, res) => {

    Tutorial
        .find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
});




// @route POST request to /tutorial
// @desc Create an Item
// @acess Public

// If this was server.js => app.post instead
// But we will do router.post
router.post('/', (req, res) => {
    // Validate
    if (!req.body.title) {
        res.status(400).json({ message: " Content cannot be empty" })
        return;
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    })

    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data)
        }).catch(
            err => {
                res.status(500).send({
                    message: err.message || "BIG BIG ERROR Creating"
                })
            }
        )

})


// @route PUT  request to /tutorials/:id
// @desc Update a tutorial
// @acess Public

router.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Data to update can not be empty"
        })
    }

    const id = req.params.id

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                })
            } else res.json({ message: "Update was completely sucessful" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id= " + id
            })
        })
})


// @route Delete request by ID
// @desc Delete a tutorial
// @acess Public

router.delete('/:id', (req, res) => {
    // We want to first find the item before we can delete it
    Tutorial.findById(req.params.id) // this will return a promise which will be the item from the dtabase
        // above literally: request the parameters for ID

        .then(item => item.remove() // this is to remove the item
            .then(() => res.json({ success: true }))) // gives us another return from a promise
        // If the promise is rejected
        .catch(err => res.status(404).json({ success: false }))

})


// @route Delete request by ID
// @desc Delete a tutorial
// @acess Public

router.delete('/allgone', (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`
            })
        }).catch(
            err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while removing all tutorials"
                })
            }
        )
})




module.exports = router