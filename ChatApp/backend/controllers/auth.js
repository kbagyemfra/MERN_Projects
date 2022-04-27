const User = require("../models/User");

const postSignUp = async (req, res) => {
  try {
    // Getting the request body
    console.log("Signing Up...", req.body);

    // creating user in database
    const user = await User.create(req.body);

    // responding with success and user created
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const postLogin = async (req, res) => {
  console.log("checking user for Login...");

  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.login(email, password);
    user.status = "online";
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    const error = err.message;
    res.status(500).json({ error });
  }
};

module.exports = { postSignUp, postLogin };
