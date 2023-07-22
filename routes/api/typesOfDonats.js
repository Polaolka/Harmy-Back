const express = require("express");

const ctrl = require("../../controllers/donats");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getTypesOfDonats));

module.exports = router;