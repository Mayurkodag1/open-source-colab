import express from "express";
export const router = express.Router();
import {router as authRouter} from "./auth/index.js";

router.use("/auth", authRouter);

export default router;