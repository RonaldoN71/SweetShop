const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const sweetRoutes = require("./routes/sweet.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Allow frontend to access backend
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

// Centralized error handler
app.use(errorHandler);

module.exports = app;
