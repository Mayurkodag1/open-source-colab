import express from "express";
export const router = express.Router();
import {router as authRouter} from "./auth/index.js";
import {router as contributorRouter} from "./contributor/index.js";
import {router as maintainerRouter} from "./maintainer/index.js";
import {router as adminRouter} from "./admin/index.js";
import chatRouter from "./chatController.js";

router.use("/auth", authRouter);
router.use("/contributor", contributorRouter);
router.use("/maintainer", maintainerRouter);
router.use("/admin", adminRouter);
router.use("/chat", chatRouter);

export default router;