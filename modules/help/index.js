const express = require("express");
const router = express.Router();
const helpController = require("./controller");
const auth = require("../../middleware/auth");

router.post("/create",[auth], helpController.createHelpRequest);


module.exports = router;
