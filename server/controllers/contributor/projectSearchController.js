import Project from "../../models/project.js";

export const searchProjects = async (req, res) => {
  try {
    // Implement project search logic here
    // Access search query parameters from req.query
    const { search, skills } = req.query;

    // Example: Basic search by keyword in project title or description
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Example: Search by skills (assuming skills is an array in the Project model)
    if (skills) {
      // Assuming skills is a comma-separated string from query params
      const skillArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillArray };
    }

    const projects = await Project.find(query);

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Error searching projects:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};