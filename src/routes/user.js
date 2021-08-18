const express = require('express');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;