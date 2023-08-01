const express = require("express");

const ctrl = require("../../controllers/petition");

const { validateBody, authenticate, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/petition");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

// get all petition
router.get("/petition-list", ctrlWrapper(ctrl.getAllPetition));


// adding a new petition
router.post("/add-new-petition", authenticate, validateBody(schemas.addPetitionSchema), ctrlWrapper(ctrl.addPetition));

// get Own Petitions
router.get("/own-petitions", authenticate, ctrlWrapper(ctrl.getOwnPetition));

// deleting a petition by id
router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteOnePetition));

// get petition by Id
router.get(
  "/by-id/:id",
  isValidId,
  ctrlWrapper(ctrl.getByPetitionId)
);

module.exports = router;
