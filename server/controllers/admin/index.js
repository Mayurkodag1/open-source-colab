import express from "express";
export const router = express.Router();

import {
  getDashboardPieChartData,
  getAllContributors,
  getContributorDetails,
  getAllMaintainers,
  getMaintainerDetails,
} from "./adminController.js";

// Admin routes
router.get("/dashboard/pie-chart", getDashboardPieChartData);
router.get("/contributors", getAllContributors);
router.get("/contributors/:id", getContributorDetails);
router.get("/maintainers", getAllMaintainers);
router.get("/maintainers/:id", getMaintainerDetails);

export default router;