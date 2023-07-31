const express = require("express");

const ctrl = require("../../controllers/donats");

const {
  validateVolunteerRole,
  // validateBody,
  authenticate,
} = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { isValidId } = require("../../middlewares");

// const { schemas } = require("../../models/donat");

const router = express.Router();

// all recipes
router.get("/main", ctrlWrapper(ctrl.getAllOpenAndPublicDonats));

// receiving donats by category
// router.get(
//   "/category/:category",
//   authenticate,
//   ctrlWrapper(ctrl.getByCategory)
// );

// getting popular donats
// router.get(
//   "/popular-donats",
//   authenticate,
//   ctrlWrapper(ctrl.getPopularDonats)
// );


// adding a new donat
router.post(
  "/add-new-request",
  authenticate,
  validateVolunteerRole,
  ctrlWrapper(ctrl.addDonat)
);

// // deleting a recipe by id
// router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteOne));

// // search for a recipe by name
// router.get("/title", authenticate, ctrlWrapper(ctrl.getByTitle));

// // searching for a recipe by ingredient name
// router.get("/ingredient", authenticate, ctrlWrapper(ctrl.getByIngredient));

// donat by id
router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getDonatById));


module.exports = router;
