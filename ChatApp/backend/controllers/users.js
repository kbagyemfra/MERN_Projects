const User = require("../models/User");

const getAllUsers = async (req, res) => {
  console.log("GetAllUsers");
  try {
    const user = await User.find({});
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getUser = async (req, res) => {
  console.log("getUser");
  try {
    const { id: userID } = req.params;
    const user = await User.findOne({ _id: userID }); // get a specific the users from DB
    // null exception
    if (!user) {
      return res.status(404).json({ msg: `No user with id : ${userID}` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// const createUser = async (req, res) => {
//   console.log("createUser");
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json({ user });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

module.exports = { getAllUsers, getUser };
