const express = require("express");

const ctrl = require("../../controllers/charitableFunds");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

// get all fund
router.get("/", ctrlWrapper(ctrl.getAllFund));

module.exports = router;
