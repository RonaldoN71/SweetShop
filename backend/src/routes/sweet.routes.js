/**
 * Sweet Routes
 * ------------
 * Defines all routes for Sweet CRUD and inventory operations.
 * Includes role-based access control and file upload handling.
 */

const router = require("express").Router();
const sweetCtrl = require("../controllers/sweet.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

// =====================
// Public / User Routes
// =====================

/**
 * @route GET /api/sweets
 * @desc  Get all sweets
 * @access Authenticated users
 */
router.get("/", auth, sweetCtrl.listSweets);

/**
 * @route GET /api/sweets/:id
 * @desc  Get a single sweet by ID
 * @access Authenticated users
 */
router.get("/:id", auth, sweetCtrl.getSweet);

// =====================
// Admin Routes
// =====================

/**
 * @route POST /api/sweets
 * @desc  Create a new sweet (with optional image upload)
 * @access Admin
 */
router.post(
  "/",
  auth,
  role("admin"),
  upload.single("image"),
  sweetCtrl.createSweet
);

/**
 * @route PUT /api/sweets/:id
 * @desc  Update a sweet (with optional image upload)
 * @access Admin
 */
router.put(
  "/:id",
  auth,
  role("admin"),
  upload.single("image"),
  sweetCtrl.updateSweet
);

// =====================
// Inventory Routes
// =====================

/**
 * @route POST /api/sweets/:id/purchase
 * @desc  Purchase a sweet (reduce stock)
 * @access Authenticated users
 */
router.post("/:id/purchase", auth, sweetCtrl.purchase);

/**
 * @route POST /api/sweets/:id/restock
 * @desc  Restock a sweet (increase stock)
 * @access Admin
 */
router.post("/:id/restock", auth, role("admin"), sweetCtrl.restock);

/**
 * @route DELETE /api/sweets/:id
 * @desc  Delete a sweet
 * @access Admin
 */
router.delete("/:id", auth, role("admin"), sweetCtrl.deleteSweet);

module.exports = router;
