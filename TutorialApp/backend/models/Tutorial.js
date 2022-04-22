const mongoose = require("mongoose");

const TutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "must provide title"],
      trim: true,
      maxlength: [20, "title can not be more than 10 characters"],
    },
    description: {
      type: String,
      required: [true, "must provide description"],
      trim: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutorial", TutorialSchema);
