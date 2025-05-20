import express from "express";
import { check } from "express-validator";
import { contributorRegister } from "./contributorRegister.js";
import { contributorLogin } from "./contributorLogin.js";
import { maintainerRegister } from "./maintainerRegister.js";
import { maintainerLogin } from "./maintainerLogin.js";
import { forgotPasswordRequest } from "./forgotPasswordRequest.js";
import { resetPassword } from "./resetPassword.js";

export const router = express.Router();

router.post(
  "/contributor/register",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    check("confirmPassword", "Confirm password is required").exists(),
  ],
  contributorRegister
);
router.post(
  "/contributor/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  contributorLogin
);
router.post(
  "/maintainer/register",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    check("confirmPassword", "Confirm password is required").exists(),
  ],
  maintainerRegister
);
router.post(
  "/maintainer/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  maintainerLogin
);

router.post(
  "/forgotpassword",
  [
    check("email", "Please include a valid email").isEmail(),
  ],
  forgotPasswordRequest
);

router.put(
  "/resetpassword/:resettoken",
  [
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  resetPassword
);
