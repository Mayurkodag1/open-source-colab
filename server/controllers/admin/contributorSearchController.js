import User from '../../models/user.js';

// @desc    Search for contributors
// @route   GET /api/admin/contributors/search
// @access  Admin
import Portfolio from '../../models/portfolio.js';
// @desc    Search for contributors
// @route   GET /api/admin/contributors/search
// @access  Admin
const searchContributors = async (req, res) => {
  console.log('searchContributors reached', req.query);
  const { name, email, skills } = req.query;

  // Basic validation
  if (!name && !email && !skills) {
    return res.status(400).json({ message: 'Please provide name, email, or skills for search' });
  }

  try {
    const userQuery = {};
    if (name) {
      // Case-insensitive partial match for name
      userQuery.name = { $regex: name, $options: 'i' };
    }
    if (email) {
      // Case-insensitive partial match for email
      userQuery.email = { $regex: email, $options: 'i' };
    }

    // Only search for users with the 'contributor' role
    userQuery.role = 'contributor';

    let contributors = await User.find(userQuery).select('-password').populate({
      path: 'portfolio',
      populate: {
        path: 'skills',
        model: 'Skill'
      }
    }); // Exclude password and populate portfolio and skills

    if (skills) {
      const skillArray = skills.split(',').map(skill => skill.trim());
      contributors = contributors.filter(contributor => {
        if (contributor.portfolio && contributor.portfolio.skills) {
          return skillArray.every(skill => contributor.portfolio.skills.some(s => s.name === skill));
        }
        return false;
      });
    }

    // If portfolio details are needed in the response, remove this map
    contributors = contributors.map(contributor => contributor.toObject());
    res.status(200).json(contributors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { searchContributors };