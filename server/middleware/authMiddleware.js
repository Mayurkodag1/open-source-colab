import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET; // Replace with your actual secret key

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err); // Log the error
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    // The user ID is in decoded.user.id based on the login controller payload
    const userId = decoded.user.id;
    req.userId = userId;
    console.log("Authenticated user ID:", req.userId); // Log the user ID

    // Fetch the user from the database and attach it to the request
    try {
      const user = await User.findById(userId);
      if (user) {
        req.user = user;
      } else {
        console.error("User not found in database");
      }
    } catch (error) {
      console.error("Error fetching user from database:", error);
    }

    next();
  });
};

export default verifyToken;