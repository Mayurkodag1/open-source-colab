import ContributionEvent from '../models/contributionEvent.js';
import User from '../models/user.js';

// @desc    Get total contribution counts for a user
// @route   GET /api/users/:userId/contributions/counts
// @access  Private
const getContributionCounts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let totalContributions = 0;
    let projectContributions = 0;

    if (user.role === 'maintainer') {
      // Count issues created and resolved by the maintainer
      const issueContributions = await ContributionEvent.countDocuments({
        user: userId,
        eventType: { $in: ['maintainer_issue_created', 'maintainer_issue_resolved','maintainer_project_created'] },
      });

      // Count projects created by the maintainer
      projectContributions = await ContributionEvent.countDocuments({
        user: userId,
        eventType: 'maintainer_project_created',
      });

      totalContributions = issueContributions + projectContributions;
    } else if (user.role === 'contributor') {
      // Count issues resolved by the contributor
      totalContributions = await ContributionEvent.countDocuments({
        user: userId,
        eventType: 'contributor_issue_resolved',
      });
      projectContributions = 0;
    }

    res.status(200).json({
      totalContributions: totalContributions,
      projectContributions: projectContributions, // Only relevant for maintainers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a list of contribution events for a user
// @route   GET /api/users/:userId/contributions
// @access  Private
const getContributionEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Add pagination

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const query = { user: userId };

    // Add role-based filtering if needed
    // if (user.role === 'contributor') {
    //   query.eventType = 'contributor_issue_resolved';
    // }

    const contributionEvents = await ContributionEvent.find(query)
      .populate('project')
      .sort({ timestamp: -1 }) // Sort by timestamp descending
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await ContributionEvent.countDocuments(query);

    res.status(200).json({
      contributionEvents,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get total contribution counts for the logged-in user
// @route   GET /api/contributions/counts
// @access  Private
const getMyContributionCounts = async (req, res) => {
  try {
    const userId = req.userId;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let totalContributions = 0;
    let projectContributions = 0;

    if (user.role === 'maintainer') {
      // Count issues created and resolved by the maintainer
      const issueContributions = await ContributionEvent.countDocuments({
        user: userId,
        eventType: { $in: ['maintainer_issue_created', 'maintainer_issue_resolved','maintainer_project_created'] },
      });

      // Count projects created by the maintainer
      projectContributions = await ContributionEvent.countDocuments({
        user: userId,
        eventType: 'maintainer_project_created',
      });

      totalContributions = issueContributions + projectContributions;
    } else if (user.role === 'contributor') {
      // Count issues resolved by the contributor
      totalContributions = await ContributionEvent.countDocuments({
        user: userId,
        eventType: 'contributor_issue_resolved',
      });
      projectContributions = 0;
    }

    res.status(200).json({
      totalContributions: totalContributions,
      projectContributions: projectContributions, // Only relevant for maintainers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a list of contribution events for the logged-in user
// @route   GET /api/contributions
// @access  Private
const getMyContributionEvents = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query; // Add pagination

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const query = { user: userId };

    // Add role-based filtering if needed
    // if (user.role === 'contributor') {
    //   query.eventType = 'contributor_issue_resolved';
    // }

    const contributionEvents = await ContributionEvent.find(query)
      .populate('project')
      .sort({ timestamp: -1 }) // Sort by timestamp descending
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await ContributionEvent.countDocuments(query);

    res.status(200).json({
      contributionEvents,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new contribution event (for contributors)
// @route   POST /api/contributions
// @access  Private
const createContributionEvent = async (req, res) => {
  try {
    const { title, eventType, projectId, description, link } = req.body;
    const userId = req.userId; // Assuming authMiddleware adds userId to req

    // Validate input
    if (!eventType || !description || !title) {
      return res.status(400).json({ message: 'Event type, description, and title are required' });
    }

    const contributionEvent = await ContributionEvent.create({
      user: userId,
      eventType,
      project:projectId, // Can be null if not provided
      description,
      link, // Can be null if not provided
    });

    res.status(201).json({
      message: 'Contribution event recorded successfully',
      contributionEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export { getContributionCounts, getContributionEvents, getMyContributionCounts, getMyContributionEvents, createContributionEvent };