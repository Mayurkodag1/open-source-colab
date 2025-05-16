import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { getMyContributionCounts, getMyContributionEvents } from "./contributionController.js";
import { getContributionCounts, getContributionEvents } from "./contributionController.js";
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
router.get("/contributions/counts", verifyToken, getMyContributionCounts);
router.get("/contributions", verifyToken, getMyContributionEvents);
router.get("/users/:userId/contributions/counts", getContributionCounts);
router.get("/users/:userId/contributions", getContributionEvents);
router.use("/chat", chatRouter);

export default router;