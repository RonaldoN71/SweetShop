const mongoose = require("mongoose");

// Sweet item schema for the shop
const SweetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    description: { type: String, default: "" },
    image: { type: String, default: "" }, // cloudinary url for the uploaded image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sweet", SweetSchema);
