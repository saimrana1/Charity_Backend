const express = require("express");
const router = express.Router();
const authController = require("./controller.js");

router.post("/login", authController.loginUser);

router.post("/signup", authController.signupUser);
module.exports = router;
