// Basic error handler for catching server issues.
// Logs the error and sends a safe message to the client.

module.exports = (err, req, res, next) => {
  console.error("Error:", err.stack || err);

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong on the server",
  });
};
