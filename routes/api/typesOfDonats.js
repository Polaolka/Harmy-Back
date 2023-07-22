const express = require("express");

const ctrl = require("../../controllers/donats");

const { authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getTypesOfDonats));

module.exports = router;