import Issue from '../../models/issue.js';
import verifyToken from '../../middleware/authMiddleware.js';

// @desc    Get issues created by the logged-in contributor
// @route   GET /api/contributor/issues/my-issues
// @access  Private (Contributor)
const getIssuesCreatedByContributor = [
  verifyToken,
  async (req, res) => {
    try {
      // Assuming req.userId contains the ID of the logged-in user (contributor)
      const issues = await Issue.find({ createdBy: req.userId }).populate('project');

      res.status(200).json(issues);
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: error.message });
    }
  }
];

export {
  getIssuesCreatedByContributor,
};
