import Message from "../models/message.js";
import Project from "../models/project.js"; // Assuming Project model exists
import Issue from "../models/issue.js"; // Assuming Issue model exists
import User from "../models/user.js"; // Assuming User model exists
import verifyToken from "../middleware/authMiddleware.js"; // Assuming authMiddleware exists
import express from "express";
const router = express.Router();
// @desc    Send a message to a project chat
// @route   POST /api/chat/project/:projectId
// @access  Private (Contributors/Maintainers)
const sendProjectMessage = async (req, res) => {
    const { projectId } = req.params;
    const { content } = req.body;
    const sender = req.userId; // User ID is attached to req.userId by auth middleware

    try {
        // Optional: Verify if the user is a contributor or maintainer of the project
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // Add logic here to check if req.user._id is a contributor or maintainer of 'project'

        const message = new Message({
            sender,
            project: projectId,
            content
        });

        const createdMessage = await message.save();

        // Populate sender details before sending response
        await createdMessage.populate('sender', '_id'); // Populate sender details with _id

        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send a message to an issue chat
// @route   POST /api/chat/issue/:issueId
// @access  Private (Contributors/Maintainers)
const sendIssueMessage = async (req, res) => {
    const { issueId } = req.params;
    const { content } = req.body;
    const sender = req.userId; // User ID is attached to req.userId by auth middleware

    try {
        // Optional: Verify if the user is involved in the issue (assignee, reporter, or project contributor/maintainer)
        const issue = await Issue.findById(issueId);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        // Add logic here to check if req.user._id is related to 'issue'

        const message = new Message({
            sender,
            issue: issueId,
            content
        });

        const createdMessage = await message.save();

        // Populate sender details before sending response
        await createdMessage.populate('sender', '_id'); // Populate sender details with _id

        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get messages for a project chat
// @route   GET /api/chat/project/:projectId
// @access  Private (Contributors/Maintainers)
const getProjectMessages = async (req, res) => {
    const { projectId } = req.params;

    try {
        // Optional: Verify if the user is a contributor or maintainer of the project
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // Add logic here to check if req.user._id is a contributor or maintainer of 'project'

        const messages = await Message.find({ project: projectId })
            .populate('sender', '_id') // Populate sender details with _id
            .sort('timestamp'); // Sort by timestamp

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get messages for an issue chat
// @route   GET /api/chat/issue/:issueId
// @access  Private (Contributors/Maintainers)
const getIssueMessages = async (req, res) => {
    const { issueId } = req.params;

    try {
        // Optional: Verify if the user is involved in the issue
        const issue = await Issue.findById(issueId);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        // Add logic here to check if req.user._id is related to 'issue'

        const messages = await Message.find({ issue: issueId })
            .populate('sender', '_id') // Populate sender details with _id
            .sort('timestamp'); // Sort by timestamp

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Protect all chat routes
router.use(verifyToken);

// Project chat routes
router.post('/project/:projectId', sendProjectMessage);
router.get('/project/:projectId', getProjectMessages);

// Issue chat routes
router.post('/issue/:issueId', sendIssueMessage);
router.get('/issue/:issueId', getIssueMessages);

export default router;