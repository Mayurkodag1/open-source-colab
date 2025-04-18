import express from "express";
import { contributorRegister } from "./contributorRegister.js";
import { contributorLogin } from "./contributorLogin.js";
import { maintainerRegister } from "./maintainerRegister.js";
import { maintainerLogin } from "./maintainerLogin.js";

export const router = express.Router();

router.post("/contributor/register", contributorRegister);
router.post("/contributor/login", contributorLogin);
router.post("/maintainer/register", maintainerRegister);
router.post("/maintainer/login", maintainerLogin);
