import mongoose from "mongoose";
import Portfolio from "../../models/portfolio.js";
import verifyToken from "../../middleware/authMiddleware.js";
import { check, validationResult } from 'express-validator';
import User from "../../models/user.js";

// Create a new portfolio
export const createPortfolio = [
  verifyToken,
  check('summary').isString(), // Make summary required
  check('projects').optional().isArray(),
  check('socialLinks').optional().isObject(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  try {
    const { summary, skills, projects, socialLinks } = req.body;

    // Validate skills are valid ObjectIds
    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an array" });
    }

    if (skills) {
      for (let i = 0; i < skills.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(skills[i])) {
          return res.status(400).json({ message: "Invalid skill ID" });
        }
      }
    }

    const newPortfolio = new Portfolio({
      user: req.userId,
      summary,
      skills,
      projects,
      socialLinks,
    });
    const savedPortfolio = await newPortfolio.save();

    // Update the user with the portfolio ID
    await User.findByIdAndUpdate(req.userId, { portfolio: savedPortfolio._id });

    res.status(201).json(savedPortfolio);
  } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Get a portfolio by user ID
export const getPortfolio = [
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const portfolio = await Portfolio.findOne({ user: userId }).populate('skills');
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.status(200).json(portfolio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Update a portfolio by user ID
export const updatePortfolio = [
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const { summary, skills, projects, socialLinks } = req.body;
// Validate skills are valid ObjectIds
if (skills && !Array.isArray(skills)) {
  return res.status(400).json({ message: 'Skills must be an array' });
}

if (skills) {
  for (let i = 0; i < skills.length; i++) {
    if (!mongoose.Types.ObjectId.isValid(skills[i])) {
      return res.status(400).json({ message: 'Invalid skill ID' });
    }
  }
}

const updatedPortfolio = await Portfolio.findOneAndUpdate(
  { user: userId },
  { summary, skills, projects, socialLinks },
  { new: true }
).populate('skills');


      if (!updatedPortfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }

      res.status(200).json(updatedPortfolio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Delete a portfolio by user ID
export const deletePortfolio = [
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const deletedPortfolio = await Portfolio.findOneAndDelete({ user: userId });
      if (!deletedPortfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.status(200).json({ message: "Portfolio deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];
