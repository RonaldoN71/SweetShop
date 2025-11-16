/**
 * Auth Controller
 * ----------------
 * Handles user registration and login functionality.
 * Includes JWT generation and basic validation.
 */

const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Generate a signed JWT for a user.
 *
 * @param {Object} user - The Mongoose User document
 * @returns {string} - A signed JWT token
 */
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res, next) => {
  try {
    // Prevent destructuring crash if req.body is undefined
    const { name, email, password, role } = req.body || {};

    // Simple validation
    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const user = await User.create({ name, email, password, role });
    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Login existing user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    // Ensure required fields exist
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    // Lookup user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
