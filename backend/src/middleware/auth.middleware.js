// auth.middleware.js
// Checks JWT token and attaches the user to req.user if valid

const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Ensure the Authorization header is present and properly formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user (without password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Invalid token user" });
    }

    next(); // authentication successful → continue
  } catch (err) {
    // Any error means token is invalid or expired
    return res.status(401).json({ message: "Invalid token" });
  }
};
