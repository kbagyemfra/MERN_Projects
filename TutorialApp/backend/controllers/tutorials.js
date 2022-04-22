const Tutorial = require("../models/Tutorial");

const getAllTutorials = async (req, res) => {
  try {
    const title = req.query.title;
    var condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};
    const tutorials = await Tutorial.find(condition); // get all the tutorials from DB

    res.status(200).json({ tutorials });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createTutorials = async (req, res) => {
  try {
    const tutorial = await Tutorial.create(req.body);
    res.status(201).json({ tutorial });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getTutorial = async (req, res) => {
  try {
    const { id: tutorialID } = req.params;
    const tutorial = await Tutorial.findOne({ _id: tutorialID }); // get a specific the tutorials from DB

    // null exception
    if (!tutorial) {
      return res
        .status(404)
        .json({ msg: `No tutorial with id : ${tutorialID}` });
    }

    res.status(200).json({ tutorial });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteTutorial = async (req, res) => {
  try {
    const { id: tutorialID } = req.params;
    const tutorials = await Tutorial.findOneAndDelete({ _id: tutorialID }); // delete a specific the tutorials from DB

    // null exception
    if (!tutorials) {
      return res
        .status(404)
        .json({ msg: `No tutorial with id : ${tutorialID}` });
    }

    res.status(200).json({ tutorials });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteAllTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.deleteMany({}); // delete all the tutorials from DB

    res.status(200).json({ message: "All data is deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateTutorial = async (req, res) => {
  try {
    const { id: tutorialID } = req.params;

    const tutorials = await Tutorial.findOneAndUpdate(
      { _id: tutorialID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // null exception
    if (!tutorials) {
      return res
        .status(404)
        .json({ msg: `No tutorial with id : ${tutorialID}` });
    }

    res.status(200).json({ tutorials });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllTrue = async (req, res) => {
  try {
    const tutorials = await Tutorial.find({ published: true }); // get all the tutorials from DB

    res.status(200).json({ tutorials });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllTutorials,
  createTutorials,
  getTutorial,
  updateTutorial,
  deleteTutorial,
  deleteAllTutorials,
  getAllTrue,
};
