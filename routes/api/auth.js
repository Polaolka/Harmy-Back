const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");

const {
  validateBody,
  authenticate,
  uploadAva, passport
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");

// google
router.get("/google", passport.authenticate("google", {scope: ["email" , "profile"]}));
router.get("/google/callback", passport.authenticate("google", {session: false}), ctrlWrapper(ctrl.googleAuth));


// signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail) );

router.post("/verify", validateBody(schemas.verifySchema), ctrlWrapper(ctrl.resendVerifyEmail) );

// login
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

// logout
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

// update user`s name or avatar
router.patch(
  "/update-user",
  authenticate,
  uploadAva.single("avatar"),
  ctrlWrapper(ctrl.updateUser)
);

// api/verify

router.post(
  "/verifyUser",
  ctrlWrapper(ctrl.verifyUser)
  );

  
  module.exports = router;