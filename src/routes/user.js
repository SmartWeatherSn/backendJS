const express = require('express');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.loginByEmail);
router.post('/new-password', userCtrl.newPassword);

module.exports = router;