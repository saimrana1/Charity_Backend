const express = require("express");
const router = express.Router();
const userController = require("./controller.js");

router.get("/get", userController.getUsers);

module.exports = router;
