const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 * Represents application users (both normal users and admins).
 */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true 
    },

    password: { type: String, required: true },

    // role allows us to control access (e.g., admin only actions)
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    },
  },
  { timestamps: true }
);

/**
 * Hash the password before saving the user.
 * (Only runs if the password field was modified)
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

/**
 * Compare a plain password with the hashed one stored in DB.
 */
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
