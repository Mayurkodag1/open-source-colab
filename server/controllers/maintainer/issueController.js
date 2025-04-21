import { body, validationResult } from 'express-validator';
import Issue from '../../models/issue.js';
import Project from '../../models/project.js'; // Need to import Project model to check if project exists
import verifyToken from "../../middleware/authMiddleware.js";

// Validation for creating an issue
const createIssueValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('status').notEmpty().withMessage('Status is required').isIn(['Open', 'In Progress', 'Resolved']).withMessage('Invalid status value'),
  body('priority').notEmpty().withMessage('Priority is required').isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority value'),
];

// Validation for updating an issue
const updateIssueValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('status').optional().notEmpty().withMessage('Status cannot be empty').isIn(['Open', 'In Progress', 'Resolved']).withMessage('Invalid status value'),
  body('priority').optional().notEmpty().withMessage('Priority cannot be empty').isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority value'),
];

// @desc    Create a new issue
// @route   POST /api/maintainer/projects/:projectId/issues
// @access  Private (Maintainer/Contributor)
const createIssue = [
  verifyToken,
  createIssueValidation,
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const { title, description, status, priority } = req.body;

      // Check if the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        res.status(404);
        throw new Error('Project not found');
      }

      // Assuming the user ID (maintainer or contributor) is available in req.userId
      const issue = await Issue.create({
        project: projectId,
        title,
        description,
        status,
        priority,
        createdBy: req.userId,
      });

      res.status(201).json(issue);
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
];

// @desc    Get all issues
// @route   GET /api/maintainer/projects/:projectId/issues
// @access  Private (Maintainer/Contributor)
const getIssues = [
  verifyToken,
  async (req, res) => {
    try {
      const { projectId } = req.params;

      // Check if the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        res.status(404);
        throw new Error('Project not found');
      }

      // Fetch issues for the specified project
      const issues = await Issue.find({ project: projectId });

      res.status(200).json(issues);
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
];

// @desc    Get a single issue by ID
// @route   GET /api/maintainer/projects/:projectId/issues/:issueId
// @access  Private (Maintainer/Contributor)
const getIssueById = [
  verifyToken,
  async (req, res) => {
    try {
      const { projectId, issueId } = req.params;

      // Check if the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        res.status(404);
        throw new Error('Project not found');
      }

      const issue = await Issue.findOne({ _id: issueId, project: projectId });

      if (!issue) {
        res.status(404);
        throw new Error('Issue not found for this project');
      }

      res.status(200).json(issue);
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
];

// @desc    Update an issue by ID
// @route   PUT /api/maintainer/projects/:projectId/issues/:issueId
// @access  Private (Maintainer/Contributor)
const updateIssue = [
  verifyToken,
  updateIssueValidation,
  async (req, res) => {
    try {
      const { projectId, issueId } = req.params;
      const updates = req.body;

      // Check if the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        res.status(404);
        throw new Error('Project not found');
      }

      let issue = await Issue.findOne({ _id: issueId, project: projectId });

      if (!issue) {
        res.status(404);
        throw new Error('Issue not found for this project');
      }

      // Optional: Add authorization check if only the creator or maintainer can update
      // if (issue.createdBy.toString() !== req.userId && project.maintainer.toString() !== req.userId) {
      //   res.status(401);
      //   throw new Error('Not authorized to update this issue');
      // }

      issue = await Issue.findOneAndUpdate({ _id: issueId, project: projectId }, updates, {
        new: true,
      });

      res.status(200).json(issue);
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
];

// @desc    Delete an issue by ID
// @route   DELETE /api/maintainer/projects/:projectId/issues/:issueId
// @access  Private (Maintainer)
const deleteIssue = [
  verifyToken,
  async (req, res) => {
    try {
      const { projectId, issueId } = req.params;

      // Check if the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        res.status(404);
        throw new Error('Project not found');
      }

      const issue = await Issue.findOne({ _id: issueId, project: projectId });

      if (!issue) {
        res.status(404);
        throw new Error('Issue not found for this project');
      }

      // Ensure the logged-in user is the maintainer of the project to delete issues
      if (project.maintainer.toString() !== req.userId) {
        res.status(401);
        throw new Error('Not authorized to delete issues for this project');
      }

      await issue.deleteOne();

      res.status(200).json({ id: issueId });
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
];

export {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  createIssueValidation,
  updateIssueValidation,
};