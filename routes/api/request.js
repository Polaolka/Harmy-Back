const express = require("express");

const ctrl = require("../../controllers/donats");

const {
  validateVolunteerRole,
  // validateBody,
  authenticate,
  uploadReport,
} = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { isValidId } = require("../../middlewares");

// const { schemas } = require("../../models/donat");

const router = express.Router();

// all donats
router.get("/main", ctrlWrapper(ctrl.getAllOpenAndPublicDonats));

// own donats
router.get("/own-requests", authenticate, ctrlWrapper(ctrl.getOwnRequest));

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

// array('photos', 3)
// adding a report
router.patch(
  "/add-report/:id",
  authenticate,
  validateVolunteerRole,
  uploadReport.array('photosReport', 3),
  ctrlWrapper(ctrl.addDonatsReport)
);

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
router.get("/:id", isValidId, ctrlWrapper(ctrl.getDonatById));


module.exports = router;
