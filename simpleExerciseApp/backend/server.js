const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const exerciseRoutes = require('./routes/exercises')

require('dotenv').config();

const app = express()
const port = process.env.PORT || 2500

app.use(cors())
app.use(express.json())

const URI = process.env.mongoURI

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>
    console.log('MongoDb connected......'))
.catch(err => console.log(err))

app.use('/users', userRoutes)
app.use('/exercises', exerciseRoutes)


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})