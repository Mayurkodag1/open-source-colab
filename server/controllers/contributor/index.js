import express from "express";
import { createPortfolio, getPortfolio, updatePortfolio, deletePortfolio } from "./contributor/portfolioController.js";

export const router = express.Router();


// Portfolio routes
router.post("/portfolios", createPortfolio);
router.get("/portfolios/:userId", getPortfolio);
router.put("/portfolios/:userId", updatePortfolio);
router.delete("/portfolios/:userId", deletePortfolio);