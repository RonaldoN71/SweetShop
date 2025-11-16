// Sets up Cloudinary so our app can upload images.
// We read the keys from the .env file and pass them to Cloudinary's config.

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // your Cloudinary account ID
  api_key: process.env.CLOUDINARY_API_KEY,         // public API key
  api_secret: process.env.CLOUDINARY_API_SECRET,   // secret key (keep safe)
});

module.exports = cloudinary;
