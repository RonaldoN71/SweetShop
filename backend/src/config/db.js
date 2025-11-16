const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment file depending on test or normal run
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

/**
 * Connect to MongoDB using the connection string from env file.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected → ${mongoose.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Stop the server if DB fails
  }
};

module.exports = connectDB;
