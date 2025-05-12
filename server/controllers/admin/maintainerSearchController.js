import User from "../../models/user.js";

const searchMaintainers = async (req, res) => {
  try {
    const { query, firstName, lastName, email, startDate, endDate, lastLoginStartDate, lastLoginEndDate } = req.query;

    const filter = { role: "maintainer" };

    if (query) {
      const searchRegex = new RegExp(query, "i");
      filter.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
      ];
    }

    if (firstName) {
      filter.firstName = new RegExp(firstName, "i");
    }
    if (lastName) {
      filter.lastName = new RegExp(lastName, "i");
    }
    if (email) {
      filter.email = new RegExp(email, "i");
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    if (lastLoginStartDate || lastLoginEndDate) {
      filter.lastLogin = {};
      if (lastLoginStartDate) {
        filter.lastLogin.$gte = new Date(lastLoginStartDate);
      }
      if (lastLoginEndDate) {
        filter.lastLogin.$lte = new Date(lastLoginEndDate);
      }
    }

    const maintainers = await User.find(filter).select("-password");

    res.status(200).json(maintainers);
  } catch (error) {
    console.error("Error searching maintainers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { searchMaintainers };