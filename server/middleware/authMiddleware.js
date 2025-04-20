import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret key

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err); // Log the error
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    // The user ID is in decoded.user.id based on the login controller payload
    req.userId = decoded.user.id;
    console.log("Authenticated user ID:", req.userId); // Log the user ID
    next();
  });
};

export default verifyToken;