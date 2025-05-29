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
    const contributor = await User.findById(req.params.id).populate({
      path: 'portfolio',
      populate: {
        path: 'skills',
        model: 'Skill'
      }
    });

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

// @desc   Create a new project (Admin)
// @route  POST /api/admin/projects
// @access Private/Admin
const createProject = async (req, res) => {
  try {
    const { title, description, status, maintainer } = req.body;

    const project = await Project.create({
      title,
      description,
      status,
      maintainer,
      approval: "Pending"
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc   Get project counts
// @route  GET /api/admin/projects/counts
// @access Private/Admin
const getProjectCounts = async (req, res) => {
  try {
    const total = await Project.countDocuments();
    const approved = await Project.countDocuments({ approval: 'Approved' });
    const pending = await Project.countDocuments({ approval: 'Pending' });
    const rejected = await Project.countDocuments({ approval: 'Rejected' });

    res.status(200).json({ total, approved, pending, rejected });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc   Get all projects
// @route  GET /api/admin/projects
// @access Private/Admin
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getDashboardPieChartData, getAllContributors, getContributorDetails, getAllMaintainers, getMaintainerDetails, createProject, getProjectCounts,getProjects };

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