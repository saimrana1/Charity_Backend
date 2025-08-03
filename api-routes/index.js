const express = require("express");
const router = express.Router();
const authModule=require("../modules/auth")

// route /api/v1

router.use("/auth", authModule);
// router.use("/users", userModule);

module.exports = router;
