const express = require("express");
const router = express.Router();

const { getAllUsers, getUser } = require("../controllers/users");
const { postLogin, postSignUp } = require("../controllers/auth");

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser);

router.route("/login").post(postLogin);

router.route("/signup").post(postSignUp);

module.exports = router;
