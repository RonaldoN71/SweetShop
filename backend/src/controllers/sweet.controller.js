/**
 * Sweet Controller
 * -----------------
 * Handles CRUD and inventory operations for Sweet items.
 */

const Sweet = require("../models/Sweet");
const cloudinary = require("../config/cloudinary");

// Upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
};

exports.createSweet = async (req, res, next) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploaded.secure_url;
    }

    const sweet = await Sweet.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      image: imageUrl || req.body.image,
    });

    res.status(201).json(sweet);
  } catch (err) {
    next(err);
  }
};

exports.listSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    next(err);
  }
};

exports.getSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet)
      return res.status(404).json({ message: "Sweet not found" });
    res.json(sweet);
  } catch (err) {
    next(err);
  }
};

exports.updateSweet = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      updateData.image = uploaded.secure_url;
    }

    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(sweet);
  } catch (err) {
    next(err);
  }
};

/**
 * PURCHASE — FIXED VERSION
 */
exports.purchase = async (req, res, next) => {
  try {
    const amount = Number(req.body?.quantity || 1); // <— SAFELY HANDLES NO BODY

    if (!Number.isInteger(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet)
      return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity < amount)
      return res.status(400).json({ message: "Not enough stock" });

    sweet.quantity -= amount;
    await sweet.save();

    res.json({ message: "Purchased", sweet });
  } catch (err) {
    next(err);
  }
};

/**
 * RESTOCK — (safer version)
 */
exports.restock = async (req, res, next) => {
  try {
    const amount = Number(req.body?.quantity || 1);

    if (!Number.isInteger(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid restock quantity" });

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet)
      return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += amount;
    await sweet.save();

    res.json({ message: "Restocked", sweet });
  } catch (err) {
    next(err);
  }
};

exports.deleteSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet)
      return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
