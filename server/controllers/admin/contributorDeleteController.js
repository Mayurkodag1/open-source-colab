import User from "../../models/user.js";
import Portfolio from "../../models/portfolio.js";

// @desc    Delete a contributor
// @route   DELETE /api/admin/contributors/:id
// @access  Admin (Authentication not implemented as per instructions)
const deleteContributor = async (req, res) => {
  try {
    const contributorId = req.params.id;

    // Find the contributor by ID
    const contributor = await User.findById(contributorId);

    if (!contributor) {
      return res.status(404).json({ message: 'Contributor not found' });
    }

    // Optional: Check if the user is actually a contributor if roles exist
    // if (contributor.role !== 'contributor') {
    //   return res.status(400).json({ message: 'User is not a contributor' });
    // }

    // Delete associated data (e.g., Portfolio)
    // This assumes a one-to-one relationship or similar where deleting the user
    // should also delete their portfolio. Adjust based on actual model relationships.
    await Portfolio.deleteOne({ user: contributorId }); // Assuming Portfolio model has a 'user' field referencing User ID

    // Delete the user
    await contributor.deleteOne();

    res.status(200).json({ message: 'Contributor removed successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { deleteContributor };