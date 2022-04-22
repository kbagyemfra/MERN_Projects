const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const exerciseRoutes = require("./routes/exercises");

const app = express();
const port = process.env.PORT || 4500;

app.use(cors());
app.use(express.json());

const URI =
  "mongodb+srv://kdatabase:lifedata@cluster0.tkhmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected......"))
  .catch((err) => console.log(err));

app.use("/users", userRoutes);
app.use("/exercises", exerciseRoutes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
