import User from '../../models/user.js';
import Portfolio from '../../models/portfolio.js';
// @desc    Export contributors data
// @route   GET /api/admin/contributors/export
// @access  Admin
const exportContributors = async (req, res) => {
  try {
    // Fetch all contributors with their portfolio data
    const contributors = await User.find({ role: 'contributor' })
      .select('-password') // Exclude password
      .populate('portfolio'); // Populate portfolio details

    if (!contributors || contributors.length === 0) {
      return res.status(404).json({ message: 'No contributors found' });
    }

    // Prepare data for CSV export
    // Flatten the structure to include portfolio details directly
    const dataToExport = contributors.map(contributor => {
      const contributorObj = contributor.toObject();
      const portfolioObj = contributorObj.portfolio ? contributorObj.portfolio : {};

      // Combine user and portfolio data, excluding the nested portfolio object
      const { portfolio, ...userWithoutPortfolio } = contributorObj;

      return {
        ...userWithoutPortfolio,
        // Add specific portfolio fields you want to include, e.g.:
        skills: portfolioObj.skills ? portfolioObj.skills.join(', ') : '',
        githubUrl: portfolioObj.githubUrl || '',
        linkedinUrl: portfolioObj.linkedinUrl || '',
        websiteUrl: portfolioObj.websiteUrl || '',
        bio: portfolioObj.bio || '',
      };
    });

    // Define CSV fields - adjust based on the actual User and Portfolio models
    const fields = [
      '_id',
      'name',
      'email',
      'createdAt',
      'updatedAt',
      // Add portfolio fields here, e.g.:
      'skills',
      'githubUrl',
      'linkedinUrl',
      'websiteUrl',
      'bio',
    ];

    // Manually generate CSV content
    const header = fields.join(',');
    const rows = dataToExport.map(row => fields.map(fieldName => {
      const value = row[fieldName];
      // Handle potential commas or quotes in data by enclosing in double quotes and escaping existing double quotes
      if (value === null || value === undefined) {
        return '';
      }
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(','));

    const csv = [header, ...rows].join('\n');

    res.header('Content-Type', 'text/csv');
    res.attachment('contributors_export.csv');
    res.send(csv);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { exportContributors };