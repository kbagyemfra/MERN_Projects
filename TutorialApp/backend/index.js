// import
const express = require("express");
const app = express();
const tutorials = require("./routes/tutorials");
const connectDB = require("./db/connect");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

require("dotenv").config();

const URI = process.env.MONGO_URI;

// middleware
app.use(cors(corsOptions));
app.use(express.static("./public"));
app.use(express.json());
const notFound = require("./middleware/not-found");

// routes
app.use("/api/v1/tutorials", tutorials);

app.use(notFound);

// listening
const port = 4000;

const start = async () => {
  try {
    await connectDB(URI);
    app.listen(port, console.log(`server is listening on Port ${port}....`));
  } catch (err) {
    console.log(`Cannot connect to database!`, err);
  }
};

start();
