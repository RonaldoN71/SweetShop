const mongoose = require("mongoose");

const SweetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    description: { type: String, default: "" },
    image: { type: String, default: "" }, // cloudinary URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sweet", SweetSchema);
