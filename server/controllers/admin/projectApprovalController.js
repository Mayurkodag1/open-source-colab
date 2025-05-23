// server/controllers/admin/projectApprovalController.js

import Project from '../../models/project.js';

// @desc   Get all pending projects
// @route  GET /api/admin/projects/pending
// @access Private/Admin
const getPendingProjects = async (req, res) => {
  try {
    const projects = await Project.find({ approval: 'Pending' }).populate('maintainer', 'name email');
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc   Get project details
// @route  GET /api/admin/projects/:id
// @access Private/Admin
const getProjectDetails = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('maintainer', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc   Approve project
// @route  PUT /api/admin/projects/:id/approve
// @access Private/Admin
const approveProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { approval: 'Approved' }, { new: true });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project approved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc   Reject project
// @route  PUT /api/admin/projects/:id/reject
// @access Private/Admin
const rejectProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { approval: 'Rejected' }, { new: true });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc   Search pending projects
// @route  GET /api/admin/projects/pending/search?query=
// @access Private/Admin
const searchPendingProjects = async (req, res) => {
  try {
    const { query } = req.query;

    const projects = await Project.find({
      approval: 'Pending',
      $text: { $search: query },
    }, {
      score: { $meta: "textScore" }
    })
    .sort({ score: { $meta: "textScore" } })
    .populate('maintainer', 'name email');

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getPendingProjects, getProjectDetails, approveProject, rejectProject, searchPendingProjects };