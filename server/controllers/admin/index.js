import express from "express";
import { getAllSkills } from "./skillController.js";
export const router = express.Router();

import {
  getDashboardPieChartData,
  getAllContributors,
  getContributorDetails,
  getAllMaintainers,
  getMaintainerDetails,
  createProject,
  getProjectCounts
} from "./adminController.js";
import { searchContributors } from "./contributorSearchController.js";
import { exportContributors } from "./contributorExportController.js";
import { deleteMaintainer } from "./maintainerDeleteController.js";
import { deleteContributor } from "./contributorDeleteController.js";
import { searchMaintainers } from "./maintainerSearchController.js";
import { getPendingProjects, getProjectDetails, approveProject, rejectProject, searchPendingProjects } from "./projectApprovalController.js";
import { createProject, getDashboardPieChartData, getAllContributors, getContributorDetails, getAllMaintainers, getMaintainerDetails, getProjectCounts } from "./adminController.js";

// Admin routes
router.post("/projects", createProject);
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

router.get("/projects/pending/search", searchPendingProjects);
router.get("/projects/pending", getPendingProjects);
router.get("/projects/counts", getProjectCounts);
router.get("/projects/:id", getProjectDetails);
router.put("/projects/:id/approve", approveProject);
router.put("/projects/:id/reject", rejectProject);
router.get("/skills", getAllSkills);

export default router;