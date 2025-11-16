/**
 * Sweet Controller
 * -----------------
 * Handles all CRUD and inventory operations for Sweet items.
 * Follows clean code conventions and includes clear inline documentation.
 */

const Sweet = require("../models/Sweet");
const cloudinary = require("../config/cloudinary");

/**
 * Upload an image buffer to Cloudinary.
 * Returns a Promise that resolves with the Cloudinary upload result.
 *
 * @param {Buffer} buffer - Raw image file buffer from Multer
 * @returns {Promise<Object>} - Cloudinary upload result containing secure_url
 */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });

    // Send buffer to Cloudinary
    stream.end(buffer);
  });
};

/**
 * @desc   Create a new sweet item
 * @route  POST /api/sweets
 * @access Admin
 */
exports.createSweet = async (req, res, next) => {
  try {
    let imageUrl = "";

    // Upload image if file is provided
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploaded.secure_url;
    }

    // Create sweet entry in database
    const sweet = await Sweet.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      image: imageUrl || req.body.image, // fallback to a URL if provided manually
    });

    res.status(201).json(sweet);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Get all sweets
 * @route  GET /api/sweets
 * @access Authenticated users
 */
exports.listSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Get single sweet by ID
 * @route  GET /api/sweets/:id
 * @access Authenticated users
 */
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

/**
 * @desc   Update sweet details
 * @route  PUT /api/sweets/:id
 * @access Admin
 */
exports.updateSweet = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    // Upload new image if provided
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
 * @desc   Purchase a sweet item (reduce stock)
 * @route  POST /api/sweets/:id/purchase
 * @access Authenticated users
 */
exports.purchase = async (req, res, next) => {
  try {
    const amount = Number(req.body.quantity);

    // Validate quantity
    if (!Number.isInteger(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet)
      return res.status(404).json({ message: "Sweet not found" });

    // Check stock availability
    if (sweet.quantity < amount)
      return res.status(400).json({ message: "Not enough stock" });

    // Deduct stock
    sweet.quantity -= amount;
    await sweet.save();

    res.json({ message: "Purchased", sweet });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Restock a sweet item (increase stock)
 * @route  POST /api/sweets/:id/restock
 * @access Admin
 */
exports.restock = async (req, res, next) => {
  try {
    const amount = Number(req.body.quantity);

    // Validate quantity
    if (!Number.isInteger(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid restock quantity" });

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet)
      return res.status(404).json({ message: "Sweet not found" });

    // Add stock
    sweet.quantity += amount;
    await sweet.save();

    res.json({ message: "Restocked", sweet });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Delete a sweet
 * @route  DELETE /api/sweets/:id
 * @access Admin
 */
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
