// Next is API to get request  

const mongoose = require('mongoose')

mongoose.Promise = global.Promise



// Create Schema
const TSchema =
    mongoose.Schema(
        {
            title: String,
            description: String,
            Published: Boolean,
        },
        { timestamps: true }
    )



module.exports = Tutorial = mongoose.model('tutorial', TSchema)
            // Now this should be exported to be brought to other files