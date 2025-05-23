import mongoose from 'mongoose';
import ContributionEvent from '../../models/contributionEvent.js';
import { body, validationResult } from 'express-validator';
import Project from '../../models/project.js';
import verifyToken from "../../middleware/authMiddleware.js";

// Validation for creating a project
const createProjectValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('status').notEmpty().withMessage('Status is required').isIn(['Open', 'In Progress', 'Closed']).withMessage('Invalid status value'),
  body('repo_url').optional().isURL().withMessage('Repo URL must be a valid URL'),
  body('skills').optional().isArray().withMessage('Skills must be an array').custom(skills => {
    if (!skills.every(skill => mongoose.Types.ObjectId.isValid(skill))) {
      throw new Error('All skills must be valid ObjectIds');
    }
    return true;
  }),
];

// Validation for updating a project
const updateProjectValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('status').optional().notEmpty().withMessage('Status cannot be empty').isIn(['Open', 'In Progress', 'Closed']).withMessage('Invalid status value'),
  body('repo_url').optional().isURL().withMessage('Repo URL must be a valid URL'),
];


// @desc    Create a new project
// @route   POST /api/maintainer/projects
// @access  Private (Maintainer)
const createProject = [
  verifyToken,
  createProjectValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, status, repo_url, skills } = req.body;

      // Assuming the maintainer's user ID is available in req.userId from auth middleware
      const project = await Project.create({
        title,
        description,
        status,
        repo_url,
        skills: skills || [],
        maintainer: req.userId,
      });

// Create a ContributionEvent for project creation
      const contributionEvent = {
        user: req.userId,
        project: project._id,
        eventType: 'maintainer_project_created',
        eventDetails: {
          projectId: project._id,
          projectTitle: project.title,
        },
      };
      await ContributionEvent.create(contributionEvent);
      res.status(201).json(project);
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
]

// @desc    Get all projects
// @route   GET /api/maintainer/projects
// @access  Private (Maintainer/Contributor)
const getProjects = [
  verifyToken,
  async (req, res) => {
    try {
      // Fetch projects created by the logged-in maintainer
      // Or fetch all projects if the user is a contributor (needs auth middleware adjustment)
      if (!req.userId) {
        return res.status(401).json({ message: "User ID not found in request" });
      }
      const projects = await Project.find({ maintainer: req.userId }); // Adjust based on user type

      res.status(200).json(projects);
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
]

// @desc    Get a single project by ID
// @route   GET /api/maintainer/projects/:id
// @access  Private (Maintainer/Contributor)
const getProjectById = [
  verifyToken,
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        res.status(404);
        throw new Error('Project not found');
      }

      // Ensure the logged-in user is the maintainer or a contributor
      // if (project.maintainer.toString() !== req.userId && req.user.role !== 'contributor') { // Example role check
      //   res.status(401);
      //   throw new Error('Not authorized to view this project');
      // }

      // Check if a chat exists for this project
      const hasChat = await Message.exists({ project: req.params.id });
      
      const projectObject = project.toObject();
      res.status(200).json({ ...projectObject, hasChat: !!hasChat });
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
]

// @desc    Update a project by ID
// @route   PUT /api/maintainer/projects/:id
// @access  Private (Maintainer)
const updateProject = [
  verifyToken,
  updateProjectValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        res.status(404);
        throw new Error('Project not found');
      }

      // Ensure the logged-in user is the maintainer of the project
      if (project.maintainer.toString() !== req.userId) {
        res.status(401);
        throw new Error('Not authorized to update this project');
      }

      const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
]

// @desc    Delete a project by ID
// @route   DELETE /api/maintainer/projects/:id
// @access  Private (Maintainer)
const deleteProject = [
  verifyToken,
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        res.status(404);
        throw new Error('Project not found');
      }

      // Ensure the logged-in user is the maintainer of the project
      if (project.maintainer.toString() !== req.userId) {
        res.status(401);
        throw new Error('Not authorized to delete this project');
      }

      await project.deleteOne();

      res.status(200).json({ id: req.params.id });
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
]

export {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  createProjectValidation,
  updateProjectValidation,
};