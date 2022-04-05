const mongoose = require('mongoose')

// for creating a schema make a variable first
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({ 
    name: {
        type: String,
        required: true 
    }, 
    email: {
        type: String,
        required: true,
        unique: true
},
    password: { 
        type: String,
        required: true 
    },
    date: { 
        type: Date,
        default: Date.now // this will give current date and time
    }
})


// Without the below code you have no acces to anything in the file
module.exports = User = mongoose.model('user', UserSchema)
            // Now this should be exported to be brought to other files