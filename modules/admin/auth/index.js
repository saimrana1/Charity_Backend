const express = require("express");
const router = express.Router();
const adminController = require("./controller.js");

router.post("/login", adminController.loginAdmin);

module.exports = router;
