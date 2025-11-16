const router = require('express').Router();
const sweetCtrl = require('../controllers/sweet.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const upload = require("../middleware/upload.middleware");


router.get('/', auth, sweetCtrl.listSweets);
router.get('/:id', auth, sweetCtrl.getSweet);

router.post("/", auth, role("admin"), upload.single("image"), sweetCtrl.createSweet);
router.put("/:id", auth, role("admin"), upload.single("image"), sweetCtrl.updateSweet);


router.post('/:id/purchase', auth, sweetCtrl.purchase);
router.post('/:id/restock', auth, role('admin'), sweetCtrl.restock);

router.delete('/:id', auth, role('admin'), sweetCtrl.deleteSweet);

module.exports = router;
