import express from "express";

import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";
import "./auth.swagger.js";

import {
  registerSchema,
  loginSchema,
} from "./auth.validation.js";

import {
  register,
  login,
  me,
} from "./auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/me",
  authenticate,
  me
);


console.log("Auth routes loaded");
export default router;