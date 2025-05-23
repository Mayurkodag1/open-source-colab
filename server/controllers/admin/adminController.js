import User from "../../models/user.js";
import Project from "../../models/project.js";
import Issue from "../../models/issue.js";

// Get data for admin dashboard pie chart
export const getDashboardPieChartData = async (req, res) => {
  try {
    const totalContributors = await User.countDocuments({ role: 'contributor' });
    const totalMaintainers = await User.countDocuments({ role: 'maintainer' });
    const totalProjects = await Project.countDocuments();
    const totalIssues = await Issue.countDocuments();

    res.status(200).json({
      totalContributors,
      totalMaintainers,
      totalProjects,
      totalIssues,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all contributors (name and ID)
export const getAllContributors = async (req, res) => {
  try {
    const contributors = await User.find({ role: 'contributor' }).select('_id firstName lastName');
    res.status(200).json(contributors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get contributor details by ID
export const getContributorDetails = async (req, res) => {
  try {
    const contributor = await User.findById(req.params.id).populate('portfolio');

    if (!contributor || contributor.role !== 'contributor') {
      return res.status(404).json({ message: "Contributor not found" });
    }

    res.status(200).json(contributor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all maintainers (name and ID)
export const getAllMaintainers = async (req, res) => {
  try {
    const maintainers = await User.find({ role: 'maintainer' }).select('_id firstName lastName');
    res.status(200).json(maintainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get maintainer details by ID
export const getMaintainerDetails = async (req, res) => {
  try {
    const maintainer = await User.findById(req.params.id);

    if (!maintainer || maintainer.role !== 'maintainer') {
      return res.status(404).json({ message: "Maintainer not found" });
    }

    res.status(200).json(maintainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};