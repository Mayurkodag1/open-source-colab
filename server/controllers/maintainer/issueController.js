import ContributionEvent from '../../models/contributionEvent.js';
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
    // Create a ContributionEvent for issue creation
    const foundProject = await Project.findById(projectId);
    if (!foundProject) {
      console.error("Project not found when creating contribution event");
    } else {
      const contributionEvent = {
        user: req.userId,
        project: projectId,
        eventType: 'maintainer_issue_created',
        eventDetails: {
          issueId: issue._id,
          issueTitle: issue.title,
          projectId: foundProject._id,
          projectTitle: foundProject.title,
        },
      };
      await ContributionEvent.create(contributionEvent);
    }

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

      // Check if a chat exists for this issue
      const hasChat = await Message.exists({ issue: issueId });

      res.status(200).json({ ...issue.toObject(), hasChat: !!hasChat });
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

      // Check if the issue status is being updated to 'Resolved'
      if (updates.status === 'Resolved' && issue.status !== 'Resolved') {
        const foundProject = await Project.findById(projectId);
        if (!foundProject) {
          console.error("Project not found when creating contribution event");
        } else {
          let eventType = 'contributor_issue_resolved';
          // Determine if the user resolving the issue is a maintainer or contributor
          // Assuming the user role is available in req.user after verifyToken
          if (req.user && req.user.role === 'maintainer') {
            eventType = 'maintainer_issue_resolved';
          }
          issue.status = 'Resolved';
          await issue.save();

          try {
            const contributionEvent = new ContributionEvent({
              user: req.userId,
              project: projectId,
              eventType: eventType,
              eventDetails: {
                issueId: issue._id,
                issueTitle: issue.title,
                projectId: foundProject._id,
                projectTitle: foundProject.title,
              },
            });
            await contributionEvent.save();
            console.log("Contribution event created:", contributionEvent);
            
          } catch (error) {
            console.error("Error creating contribution event:", error);
          }
        }
      }
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

// @desc    Get all issues across all projects
// @route   GET /api/maintainer/issues
// @access  Private (Maintainer)
const getAllIssues = [
  verifyToken,
  async (req, res) => {
    try {
      // Fetch all issues and populate project and createdBy fields
      const issues = await Issue.find({})
        .populate('project')
        .populate('createdBy');

      res.status(200).json(issues);
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
  getAllIssues,
  createIssueValidation,
  updateIssueValidation,
};