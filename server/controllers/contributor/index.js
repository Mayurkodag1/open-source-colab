import express from "express";
import { createPortfolio, getPortfolio, updatePortfolio, deletePortfolio } from "./portfolioController.js";

export const router = express.Router();


// Portfolio routes
router.post("/portfolios", createPortfolio);
router.get("/portfolios", getPortfolio);
router.put("/portfolios", updatePortfolio);
router.delete("/portfolios", deletePortfolio);