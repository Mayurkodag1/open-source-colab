import User from "../../models/user.js";

// @desc    Delete a maintainer
// @route   DELETE /api/admin/maintainers/:id
// @access  Admin
export const deleteMaintainer = async (req, res) => {
  try {
    const maintainerId = req.params.id;

    const maintainer = await User.findOne({ _id: maintainerId, role: "maintainer" });

    if (!maintainer) {
      return res.status(404).json({ message: "Maintainer not found" });
    }

    await User.deleteOne({ _id: maintainerId });

    res.status(200).json({ message: "Maintainer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};