const express = require('express')
const router = express.Router()
const auth = require('../middleware/Mauth')

// Item Model
const Item = require('../models/Item')


// Create some routes ------------

// @route GET request to /paths
// @desc Get all Paths
// @access Public

// If we were in the server.js file we would do app.get()
// But because we are in the routes file we do router.get()
router.get('/', (req, res) => {
    // We want to fetch al the itmes from the database
    // We take the model, "Item" and use the find method
    Item.find()
        // which will return a promise
        .sort({ date: -1 }) // sort the data by date in desc order( desc use -1: asc use 1)
        .then(
            // inside the returned promise it will return the data or items
            items => res.json(items)) // res.json() sends a JSON response (with the correct content-type) that is the parameter converted to a JSON string using the JSON
})


// @route POST request to /paths
// @desc Create an Item
// @acess Private

router.post('/', auth, (req, res) => {
    // We want to construct an item to put in the data base
    const newItem = new Item({
        name: req.body.name
    })


    newItem.save()

        .then(
            // returns the item we are saving
            item => res.json(item)) // get the item and turn it into JSON

})


// @route Delete request to /paths:id
// @desc Delete a Item
// @acess Private

router.delete('/:id', auth, (req, res) => {
    Item
        .findById(req.params.id)
        .then(item => item.remove() // this is to remove the item
        .then(() => res.json({ success: true }))) // gives us another return from a promise
        .catch(err => res.status(404).json({ success: false }))

})



module.exports = router