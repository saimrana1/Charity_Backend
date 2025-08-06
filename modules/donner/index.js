const express = require("express");
const router = express.Router();
const donationController = require("./controller");
const auth=require("../../middleware/auth/index")

router.post("/create",[auth], donationController.createDonation);


module.exports = router;
