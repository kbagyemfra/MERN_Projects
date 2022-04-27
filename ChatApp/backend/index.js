// imports
const express = require("express");
const users = require("./routes/users");
require("dotenv").config();
const connectDB = require("./db/connect");
const cors = require("cors");

// Variables
const app = express();
const PORT = 4000;
const URI = process.env.MONGO_URI;
const rooms = ["general", "tech", "finance", "crypto"];
const corsOptions = {
  origin: "http://localhost:3000",
};

// Middleware
app.use(express.urlencoded({ extended: true })); // allows data from front end
app.use(express.json());
app.use(cors(corsOptions));
const notFound = require("./middleware/not-found.js");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// // DB Config
// const db = config.get("mongoURI");

// routes
app.use("/api/v1/users", users);
app.use(notFound);

// Listeners
const listen = async () => {
  try {
    await connectDB(URI); // connect DB
    app.listen(PORT, console.log(`Running on PORT ${PORT}.....`));
  } catch (error) {
    console.log(error);
  }
};

listen();
// app.listen(PORT, console.log(`Running on PORT ${PORT}.....`));
