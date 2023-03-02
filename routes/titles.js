const express = require("express");
const passport = require("passport");
const router = express.Router();

const titleController = require("../controllers/titles_controller");

router.post("/create", passport.checkAuthentication, titleController.create);
router.get(
    "/destory/:id",
    passport.checkAuthentication,
    titleController.destroy
  );
module.exports = router;
