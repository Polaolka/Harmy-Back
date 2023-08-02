const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/admin");
const ctrlTypes = require("../../controllers/donats");

const {
  validateBody,
  validateRole,
  uploadFund,
  isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/user");
const { typeShemas } = require("../../models/typesOfDonats");
const { fundSchemas } = require("../../models/charitableFund");

const { ctrlWrapper } = require("../../helpers");

// get all users
router.get("/users", validateRole, ctrlWrapper(ctrl.getAllUsers) );


// PATCH /users
router.patch(
    "/update-role",
    validateRole,
    validateBody(schemas.updateRoleSchema),
    ctrlWrapper(ctrl.updateRole)
  );

// get all types of donats
router.get("/typesOfDonats", validateRole, ctrlWrapper(ctrlTypes.getTypesOfDonats));

// add type of donats
router.post("/typesOfDonats", validateRole, validateBody(typeShemas.addTypeOfDonatsSchema), ctrlWrapper(ctrl.addTypesOfDonats));


// adding a new fund
router.post("/add-new-fund", validateRole, uploadFund.single("fundIMG"), validateBody(fundSchemas.addFundSchema), ctrlWrapper(ctrl.addFund));

// deleting a fund by id
router.delete("/delete-fund/:id", validateRole, isValidId, ctrlWrapper(ctrl.deleteOneFund));

  module.exports = router;