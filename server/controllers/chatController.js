import Message from "../models/message.js";
import Project from "../models/project.js"; // Assuming Project model exists
import Issue from "../models/issue.js"; // Assuming Issue model exists
import User from "../models/user.js"; // Assuming User model exists
import verifyToken from "../middleware/authMiddleware.js"; // Assuming authMiddleware exists
import express from "express";
import axios from 'axios'; // Import axios for HTTP requests
import { getMentorResponse } from '../utils/llmService.js'; // Import the LLM service
import { URL } from 'url'; // Import URL for parsing GitHub URLs

const router = express.Router();

// Helper function to ensure a 'mentor' user exists and return its ID
const getOrCreateMentorUserId = async () => {
    let mentorUser = await User.findOne({ email: 'mentor_bot@example.com' });   
    if (!mentorUser) {
        // Create a new user for the mentor bot
        mentorUser = new User({
            firstName: 'Mentor', // Required field
            lastName: 'Bot',     // Required field
            email: `mentor_bot@example.com`,
            password: 'a_very_secure_and_random_password_for_mentor_bot_123!@#', // A placeholder password, not used for login
            role: 'maintainer' // Using an existing valid role
        });
        await mentorUser.save();
        console.log("Created new mentor_bot user.");
    }
    return mentorUser._id;
};

// Helper function to fetch GitHub README.md content
const fetchGithubReadme = async (repoUrl) => {
    if (!repoUrl) {
        return "";
    }
    try {
        // Extract owner and repo name from the GitHub URL
        const urlParts = repoUrl.split('/');
        const owner = urlParts[3];
        const repo = urlParts[4];
        if (!owner || !repo) {
            console.warn(`Invalid GitHub repository URL: ${repoUrl}`);
            return "";
        }
        const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
        const response = await axios.get(readmeUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching README.md from ${repoUrl}:`, error.message);
        return "";
    }
};

// Helper function to get GitHub repository tree
async function getGitHubTree(repoUrl) {
    try {
        // Parse owner and repo from GitHub URL
        const { pathname } = new URL(repoUrl);
        const [_, owner, repo] = pathname.split('/');

        // Step 1: Get default branch info
        const repoInfo = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
        const defaultBranch = repoInfo.data.default_branch;

        // Step 2: Get SHA of latest commit on the default branch
        const branchInfo = await axios.get(`https://api.github.com/repos/${owner}/${repo}/branches/${defaultBranch}`);
        const latestCommitSha = branchInfo.data.commit.sha;

        // Step 3: Get the full tree
        const treeResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/${latestCommitSha}?recursive=1`);
        const tree = treeResponse.data.tree;

        // Step 4: Format into tree string
        const treeString = formatTree(tree);
        return treeString;

    } catch (error) {
        console.error('Error fetching repo tree:', error.message);
        return ""; // Return empty string on error
    }
}

// Format tree paths into a visual directory tree
function formatTree(tree) {
    const output = [];
    const paths = tree.map(item => item.path).sort();

    for (const path of paths) {
        const depth = path.split('/').length - 1;
        output.push('  '.repeat(depth) + '└── ' + path.split('/').pop());
    }

    return output.join('\n');
}


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

        // Handle @mentor messages
        if (content.startsWith('@mentor')) {
            const mentorUserId = await getOrCreateMentorUserId(); // Get the mentor bot's user ID
            const userQuery = content.substring('@mentor'.length).trim();

            // Fetch recent chat history
            const chatHistory = await Message.find({ project: projectId })
                .populate('sender', 'username') // Populate sender with username
                .sort('timestamp')
                .limit(20); // Get last 20 messages for context

            // Fetch project details
            const projectDetails = await Project.findById(projectId);
            const issues = await Issue.find({ project: projectId }); // Fetch issues related to the project

            // Combine project details and issues
            const fullProjectDetails = {
                title: projectDetails.title,
                description: projectDetails.description,
                repo_url: projectDetails.repo_url,
                issues: issues.map(issue => ({ title: issue.title, description: issue.description }))
            };

            // Fetch GitHub README.md content
            const readmeContent = await fetchGithubReadme(fullProjectDetails.repo_url);
            // Fetch GitHub repository tree
            const repoTree = await getGitHubTree(fullProjectDetails.repo_url);

            const githubContext = `README.md:\n${readmeContent}\n\nRepository Tree:\n${repoTree}`;

            const mentorResponse = await getMentorResponse(userQuery, chatHistory, fullProjectDetails, githubContext);

            const mentorMessage = new Message({
                sender: mentorUserId, // Use the actual mentor user ID
                project: projectId,
                content: mentorResponse,
                type: 'mentor' // Add a type field for mentor messages
            });
            await mentorMessage.save();
            return res.status(200).json(mentorMessage);
        }

        const message = new Message({
            sender,
            project: projectId,
            content
        });

        const createdMessage = await message.save();

        // Populate sender details before sending response
        await createdMessage.populate('sender', '_id username'); // Populate sender details with _id and username

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
        const issue = await Issue.findById(issueId).populate('project', 'maintainer title description'); // Populate project to get maintainer, title, description
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        // Check if the user is the reporter of the issue or the maintainer of the project
        const isReporter = issue.createdBy.equals(sender);
        const isMaintainer = issue.project.maintainer.equals(sender);

        if (!isReporter && !isMaintainer) {
            return res.status(403).json({ message: 'Not authorized to send messages to this issue chat' });
        }

        // Handle @mentor messages
        if (content.startsWith('@mentor')) {
            const mentorUserId = await getOrCreateMentorUserId(); // Get the mentor bot's user ID
            const userQuery = content.substring('@mentor'.length).trim();

            // Fetch recent chat history for the issue
            const chatHistory = await Message.find({ issue: issueId })
                .populate('sender', 'firstName lastName')
                .sort('timestamp')
                .limit(20); // Get last 20 messages for context

            // Project details associated with the issue
            const projectDetails = await Project.findById(issue.project._id);
            const issuesInProject = await Issue.find({ project: issue.project._id });

            const fullProjectDetails = {
                title: projectDetails.title,
                description: projectDetails.description,
                repo_url: projectDetails.repo_url,
                issues: issuesInProject.map(i => ({ title: i.title, description: i.description }))
            };

            // Fetch GitHub README.md content
            const readmeContent = await fetchGithubReadme(fullProjectDetails.repo_url);
            // Fetch GitHub repository tree
            const repoTree = await getGitHubTree(fullProjectDetails.repo_url);

            const githubContext = `README.md:\n${readmeContent}\n\nRepository Tree:\n${repoTree}`;

            const mentorResponse = await getMentorResponse(userQuery, chatHistory, fullProjectDetails, githubContext);

            const mentorMessage = new Message({
                sender: mentorUserId, // Use the actual mentor user ID
                issue: issueId,
                content: mentorResponse,
                type: 'mentor' // Add a type field for mentor messages
            });
            await mentorMessage.save();
            return res.status(200).json(mentorMessage);
        }

        const message = new Message({
            sender,
            issue: issueId,
            content
        });

        const createdMessage = await message.save();

        // Populate sender details before sending response
        await createdMessage.populate('sender', '_id username'); // Populate sender details with _id and username

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
            .populate({ path: 'sender', select: 'firstName lastName' }) // Populate sender with username
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
            .populate('sender', 'username') // Populate sender with username
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
