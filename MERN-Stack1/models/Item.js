// Next is API to get request  

const mongoose = require('mongoose')

// for creating a schema make a variable first

const Schema = mongoose.Schema

// Create Schema
const ItemSchema = new Schema({ // <------new Schema object
    name: {
        type: String,
        required: true // requires the object name
    }, 
    date: { 
        type: Date,
        default: Date.now // this will give current date and time
    }
})


// Without the below code you have no acces to anything in the file
module.exports = Item = mongoose.model('item', ItemSchema)
            // Now this should be exported to be brought to other files