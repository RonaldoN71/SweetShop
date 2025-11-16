const multer = require("multer");

// Store uploaded files in memory instead of saving to disk.
// This is useful because we upload directly to Cloudinary.
const storage = multer.memoryStorage();

// Multer instance that handles single or multiple uploads.
const upload = multer({ storage });

module.exports = upload;
