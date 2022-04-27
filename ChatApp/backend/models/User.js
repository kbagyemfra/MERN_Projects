const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
    trim: true,
    maxLength: [20, "maximum of 20 characters"],
  },
  newMessage: {
    type: Object,
    default: {},
  },
  status: {
    type: String,
    default: "offline",
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    maxLength: [20, "maximum of 20 characters"],
    unique: true,
    index: true,
    validate: [isEmail, "invalid email address"],
  },
  password: {
    type: String,
    required: [true, "password must be provided"],
    trim: true,
    maxLength: [10, "maximum of 10 characters"],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to log in user
UserSchema.statics.login = async function (email, password) {
  // find email in database
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

UserSchema.plugin(uniqueValidator, {
  message: "Error, Seems like the {PATH} is already taken.",
});

module.exports = mongoose.model("User", UserSchema);
