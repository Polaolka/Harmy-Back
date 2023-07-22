const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/admin");

const {
  validateBody,
//   authenticate,
  validateRole,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

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


  module.exports = router;