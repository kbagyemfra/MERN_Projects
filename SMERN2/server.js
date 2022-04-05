const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require("cors")

const tutorial = require('./routes/tutorial')

const app = express()

app.use(express.json())

// DB Config
// const db = require('./config/keys').mongoURI
const db = config.get('mongoURI')

const corsOption = {
    origin: "http://localhost:4040",
    MediaKeySystemAccess: "http://localhost:4040"

}

// use cors
app.use(cors(corsOption))

mongoose
.connect(db, { 
    useNewUrlParser: true,  
    useUnifiedTopology: true }) // we are passing in the db object here

.then(() => console.log('MongoDB connected....')) // <-- call back fxn

.catch(err => console.log(err)) 



// Use Routes
app.use('/tutorials', tutorial)




// Creating a variable for the port we will use

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server listening on port...${PORT}`) )






