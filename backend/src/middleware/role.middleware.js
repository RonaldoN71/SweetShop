// Simple role check middleware.
// Makes sure a user is logged in and has the required role (e.g., "admin").

module.exports = (requiredRole) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== requiredRole) {
    return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
  }

  next();
};
