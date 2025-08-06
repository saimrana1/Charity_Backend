const express = require("express");
const router = express.Router();
const authModule=require("../modules/auth")
const donationModule= require("../modules/donner/index")
const helpModule=require("../modules/help/index")
const adminModule=require("../modules/admin/auth/index")
const userModule=require("../modules/user/index")
// route /api/v1

router.use("/auth", authModule);
router.use("/user", userModule);
router.use("/auth/admin", adminModule);
router.use("/donation", donationModule);
router.use("/help", helpModule);

module.exports = router;
