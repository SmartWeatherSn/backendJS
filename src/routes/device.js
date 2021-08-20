const express = require('express');
const deviceCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', deviceCtrl.createThing);

router.put('/:id', auth, deviceCtrl.modifyThing);

router.delete('/:id', auth, deviceCtrl.deleteThing);

router.get('/:id', auth, deviceCtrl.getOneThing);

router.get('/', auth, deviceCtrl.getAllThings);

module.exports = router;