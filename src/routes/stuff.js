const express = require('express');
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/device/', stuffCtrl.createThing);

router.put('/device/:id', auth, stuffCtrl.modifyThing);

router.delete('/device/:id', auth, stuffCtrl.deleteThing);

router.get('/device/:id', auth, stuffCtrl.getOneThing);

router.get('/device/', auth, stuffCtrl.getAllThings);

module.exports = router;