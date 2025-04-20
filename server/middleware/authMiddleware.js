import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret key

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;