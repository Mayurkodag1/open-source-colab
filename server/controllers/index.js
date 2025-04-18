import express from "express";
export const router = express.Router();
import {router as authRouter} from "./auth/index.js";
import {router as contributorRouter} from "./contributor/index.js";

router.use("/auth", authRouter);
router.use("/contributor", contributorRouter);


export default router;