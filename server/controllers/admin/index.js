import express from "express";
export const router = express.Router();

import {
  getDashboardPieChartData,
  getAllContributors,
  getContributorDetails,
  getAllMaintainers,
  getMaintainerDetails,
} from "./adminController.js";
import { searchContributors } from "./contributorSearchController.js";
import { exportContributors } from "./contributorExportController.js";
import { deleteMaintainer } from "./maintainerDeleteController.js";
import { deleteContributor } from "./contributorDeleteController.js";
import { searchMaintainers } from "./maintainerSearchController.js";

// Admin routes
router.get("/dashboard/pie-chart", getDashboardPieChartData);
router.get("/contributors", getAllContributors);
router.get("/maintainers", getAllMaintainers);
router.get("/maintainers/search", searchMaintainers);
router.get("/maintainers/:id", getMaintainerDetails);
router.delete("/maintainers/:id", deleteMaintainer);
router.delete("/contributors/:id", deleteContributor);
router.get("/contributors/search", searchContributors);
router.get("/contributors/export", exportContributors);
router.get("/contributors/:id", getContributorDetails);

export default router;