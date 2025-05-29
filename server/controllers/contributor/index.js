import express from "express";
import { createPortfolio, getPortfolio, updatePortfolio, deletePortfolio } from "./portfolioController.js";
import { searchProjects } from "./projectSearchController.js";
import { getRecommendedProjects, getRecommendedSkills } from "./recommendationController.js";
import verifyToken from "../../middleware/authMiddleware.js";

export const router = express.Router();


// Portfolio routes
router.post("/portfolios", createPortfolio);
router.get("/portfolios", getPortfolio);
router.put("/portfolios", updatePortfolio);
router.delete("/portfolios", deletePortfolio);

// Project search routes
router.get("/projects/search", searchProjects);

// Recommendation routes
router.get("/recommendations/projects", verifyToken, getRecommendedProjects);
router.get("/recommendations/skills", verifyToken, getRecommendedSkills);
