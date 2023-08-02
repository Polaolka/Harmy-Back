const express = require("express");

const ctrl = require("../../controllers/units");

const { validateBody, uploadUnits, validateVolunteerRole } = require("../../middlewares");

const { schemas } = require("../../models/unit");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/unitsList", ctrlWrapper(ctrl.getAllUnits));

router.get("/unitName", validateBody(schemas.getUnitSchema), ctrlWrapper(ctrl.getByUnitName));

// adding a new unit
router.post(
    "/add-new-unit",
    validateVolunteerRole,
    uploadUnits.single("unitIMG"),
    ctrlWrapper(ctrl.addUnit)
  );

module.exports = router;