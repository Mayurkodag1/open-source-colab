import express from "express";
export const router = express.Router();
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getAllIssues,
  createProjectValidation,
  updateProjectValidation,
} from "./projectController.js";
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  createIssueValidation,
  updateIssueValidation,
} from "./issueController.js";

// Project Routes
router.post("/projects", createProject);
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

// Issue Routes
router.get("/issues", getAllIssues);
router.post("/projects/:projectId/issues", createIssueValidation, createIssue);
router.get("/projects/:projectId/issues", getIssues);
router.get("/projects/:projectId/issues/:issueId", getIssueById);
router.put("/projects/:projectId/issues/:issueId", updateIssueValidation, updateIssue);
router.delete("/projects/:projectId/issues/:issueId", deleteIssue);