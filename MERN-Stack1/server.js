// Importing what we need

const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // this deals with file paths

const paths = require("./routes/paths"); // this is a path to a file
const puser = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");

const app = express();

app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to MongoDB
// by using mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  // due to deprecation you have to pass the second part, the object

  .then(() => console.log("MongoDB connected....")) // <-- call back fxn
  .catch((err) => console.log(err));

// Makes it possible to use routes in paths.js
app.use("/paths", paths);
app.use("/users", puser);
app.use("/auth", auth);

// Server static assets if n production
if (process.env.NODE_ENV === "production") {
  // set a static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    // this is directing it to the html file
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Creating a variable for the port we will use

const PORT = process.env.PORT || 8000;

// We want the app to listen to the port so

// PORT is the variable in the listen() fxn
// the other fxn is a callback if you want something to happen
// which we do, we want to know if the app is listening
app.listen(PORT, () => console.log(`Server listening on port...${PORT}`));
