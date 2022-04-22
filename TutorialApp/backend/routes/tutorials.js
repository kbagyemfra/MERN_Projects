const express = require("express");
const router = express.Router();

const {
  getAllTutorials,
  createTutorials,
  getTutorial,
  updateTutorial,
  deleteTutorial,
  deleteAllTutorials,
  getAllTrue,
} = require("../controllers/tutorials");

router
  .route("/")
  .get(getAllTutorials)
  .post(createTutorials)
  .delete(deleteAllTutorials);

router.route("/true").get(getAllTrue);

router
  .route("/:id")
  .get(getTutorial)
  .patch(updateTutorial)
  .delete(deleteTutorial);

module.exports = router;
