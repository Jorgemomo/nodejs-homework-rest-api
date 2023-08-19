const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { registerSchema, loginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
