import User from '../../models/user.js';
import Project from '../../models/project.js';
import Skill from '../../models/skill.js';
import Portfolio from '../../models/portfolio.js';

// Helper function to calculate skill match score
const calculateMatchScore = (contributorSkills, projectSkills) => {
  if (!contributorSkills || contributorSkills.length === 0 || !projectSkills || projectSkills.length === 0) {
    console.log("no contro\ibutor/project skills")
    return 0;
  }
  const contributorSkillIds = new Set(contributorSkills.map(skill => skill.toString()));
  let matchCount = 0;
  for (const projectSkill of projectSkills) {
    if (contributorSkillIds.has(projectSkill.toString())) {
      matchCount++;
    }
  }
  return matchCount;
};

// @desc    Get recommended projects for a contributor
// @route   GET /api/recommendations/projects
// @access  Private (Contributor)
export const getRecommendedProjects = async (req, res) => {
  try {
    const contributorId = req.user.id; // Assuming req.user.id is set by auth middleware

    // 1. Get contributor's skills
    const user = await User.findById(contributorId).populate({
      path: 'portfolio',
      populate: {
        path: 'skills',
        model: 'Skill'
      }
    });

    if (!user || user.role !== 'contributor') {
      return res.status(403).json({ message: 'Access denied. Only contributors can get project recommendations.' });
    }

    if (!user.portfolio || !user.portfolio.skills || user.portfolio.skills.length === 0) {
      return res.status(200).json({ message: 'No skills found in your portfolio. Please add skills to get recommendations.', projects: [] });
    }

    const contributorSkillIds = user.portfolio.skills.map(skill => skill._id);
    console.log("contributor skill ids",contributorSkillIds)

    // 2. Find all approved projects
    const projects = await Project.find({ approval: 'Approved' }).populate('skills');

    // 3. Calculate match score for each project
    const projectsWithScores = projects.map(project => {
      const projectSkillIds = project.skills.map(skill => skill._id);
      console.log("project",project)
      console.log("project skillid",projectSkillIds)
      const score = calculateMatchScore(contributorSkillIds, projectSkillIds);
      return { project, score };
    });

    // 4. Filter out projects with 0 score and sort by score (descending)
    const recommendedProjects = projectsWithScores
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.project);

    res.status(200).json({
      message: 'Recommended projects fetched successfully',
      projects: recommendedProjects,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get recommended skills for a contributor
// @route   GET /api/recommendations/skills
// @access  Private (Contributor)
export const getRecommendedSkills = async (req, res) => {
  try {
    const contributorId = req.user.id;

    // 1. Get contributor's current skills
    const user = await User.findById(contributorId).populate({
      path: 'portfolio',
      populate: {
        path: 'skills',
        model: 'Skill'
      }
    });

    if (!user || user.role !== 'contributor') {
      return res.status(403).json({ message: 'Access denied. Only contributors can get skill recommendations.' });
    }

    const contributorSkillIds = user.portfolio && user.portfolio.skills ?
      new Set(user.portfolio.skills.map(skill => skill._id.toString())) : new Set();

    // 2. Find approved projects that the contributor might be interested in (e.g., highly matched projects)
    // Re-using the project recommendation logic to find relevant projects
    const projects = await Project.find({ approval: 'Approved' }).populate('skills');

    // 2. Collect all skills from all approved projects
    const allRelevantProjectSkillIds = new Set();
    projects.forEach(project => {
      project.skills.forEach(skill => {
        allRelevantProjectSkillIds.add(skill._id.toString());
      });
    });

    // 4. Filter out skills the contributor already has
    const recommendedSkillIds = Array.from(allRelevantProjectSkillIds).filter(
      skillId => !contributorSkillIds.has(skillId)
    );

    // 5. Populate skill details
    const recommendedSkills = await Skill.find({ _id: { $in: recommendedSkillIds } });

    res.status(200).json({
      message: 'Recommended skills fetched successfully',
      skills: recommendedSkills,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
