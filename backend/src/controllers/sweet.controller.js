const Sweet = require('../models/Sweet');
const cloudinary = require("../config/cloudinary");

// helper function to upload buffer to cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (error) reject(error);
        else resolve(result); // contains secure_url
      }
    );
    stream.end(buffer);
  });
};

exports.createSweet = async (req, res, next) => {
  try {
    let imageUrl = "";

    // If image file exists → upload to Cloudinary ROOT folder
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
      image: imageUrl || req.body.image, // fallback to direct URL
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
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json(sweet);
  } catch (err) {
    next(err);
  }
};

exports.updateSweet = async (req, res, next) => {
  try {
    let updateData = { ...req.body };

    // upload new image if file exists
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

exports.purchase = async (req, res, next) => {
  try {
    const amount = Number(req.body.quantity);
    if (!Number.isInteger(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity < amount)
      return res.status(400).json({ message: "Not enough stock" });

    sweet.quantity -= amount;
    await sweet.save();

    res.json({ message: "Purchased", sweet });
  } catch (err) {
    next(err);
  }
};

exports.restock = async (req, res, next) => {
  try {
    const amount = Number(req.body.quantity);
    if (!Number.isInteger(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid restock quantity" });

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

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
    if (!sweet) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
