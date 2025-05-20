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
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if the user is the maintainer
        const isMaintainer = project.maintainer.equals(sender);

        // Check if the user is associated with any issues in the project
        // Check if the user is a registered contributor
        const user = await User.findById(sender);
        const isContributorUser = user && user.role === 'contributor'; // Assuming 'role' field and 'contributor' value

        if (!isMaintainer && !isContributorUser) {
            return res.status(403).json({ message: 'Not authorized to send messages to this project chat' });
        }

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
        const issue = await Issue.findById(issueId).populate('project', 'maintainer'); // Populate project to get maintainer
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        // Check if the user is the reporter of the issue or the maintainer of the project
        const isReporter = issue.createdBy.equals(sender);
        const isMaintainer = issue.project.maintainer.equals(sender);

        if (!isReporter && !isMaintainer) {
            return res.status(403).json({ message: 'Not authorized to send messages to this issue chat' });
        }

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
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if the user is the maintainer
        const isMaintainer = project.maintainer.equals(req.userId);

        // Check if the user is associated with any issues in the project
        // Check if the user is a registered contributor
        const user = await User.findById(req.userId);
        const isContributorUser = user && user.role === 'contributor'; // Assuming 'role' field and 'contributor' value

        if (!isMaintainer && !isContributorUser) {
            return res.status(403).json({ message: 'Not authorized to view messages for this project chat' });
        }

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
        const issue = await Issue.findById(issueId).populate('project', 'maintainer'); // Populate project to get maintainer
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        // Check if the user is the reporter of the issue or the maintainer of the project
        const isReporter = issue.createdBy.equals(req.userId);
        const isMaintainer = issue.project.maintainer.equals(req.userId);

        if (!isReporter && !isMaintainer) {
            return res.status(403).json({ message: 'Not authorized to view messages for this issue chat' });
        }

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