const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const sweetRoutes = require("./routes/sweet.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Allow frontend to access backend
app.use(cors({
  origin: [
    "https://mithaas-khaki.vercel.app",  // Deployed frontend
    "http://localhost:3000"             // Frontend (local)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

// Centralized error handler
app.use(errorHandler);

module.exports = app;
