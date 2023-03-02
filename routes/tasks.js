const express = require("express");
const passport = require("passport");
const router = express.Router();

const tasksController = require("../controllers/tasks_controller");
router.post("/create", passport.checkAuthentication, tasksController.create);
router.get(
  "/destory/:id",
  passport.checkAuthentication,
  tasksController.destroy
);

module.exports = router;
