const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');

// user registration route
router.post('/register', authCtrl.register);

// user login route
router.post('/login', authCtrl.login);

module.exports = router;
