const express = require('express');
const deviceCtrl = require('../controllers/device');
const auth = require('../middleware/auth');
const verifyUser = require('../controllers/user').userExist;

const router = express.Router();

/**
 * Only iot team must use this
 * This route is used to create a Device 
 * Device main information must be sent in json format as request body
 * For any information about device, refer to /src/models/Device.js
 * Please, respect the data types
 * Example request body (required field) : {chipid: value, rssi: value}
 * optional field {sensor: {}}
 */
router.post('/', deviceCtrl.createDevice);

/**
 * This route is used to link user with his/her new device
 * A json data format must be sent as request body e.g below
 * {userId: 'IdOfUser', chipid: 'MainIdOfTheDevice', otherInfo: 'informations'}
 * firstly: we check if the user exist, before processing
 * Only dev team must use it
 * For any information about device, refer to /src/models/Device.js
 * Please, respect the data types
 */
router.post('/check-chipid/', auth, verifyUser, deviceCtrl.findChipId);

/** Modifier les information d'un appareil
 * This route is used to update device information in mobile side
 * A json data format must be sent as request body e.g {propertyName: 'ChangedValue'}
 * deviceId must be sent as request params
 * firstly: user have to be authenticated
 * Only dev team must use it and only changeable properties can be change
 * For any information about device, refer to /src/models/Device.js
 * Please, respect the data types
 */
router.put('/:id', auth, verifyUser, deviceCtrl.modifyDevice);

/**
 * This route is used to update sensors values
 * A json data format must be sent as request body e.g below
 * {sensor: {humidity: intValue, temperature: intValue, cga: intValue, pm: intValue}}
 * chipid must be sent as request params
 * firstly: user have to be authenticated
 * Only iot team must use it
 * For any information about device, refer to /src/models/Device.js
 * Please, respect the data types
 */
router.put('/sensor/:chipid', deviceCtrl.modifySensorsValue);

/**
 * This route is used to get all user's devices
 * userId must be sent as request params
 * firstly: user have to be authenticated
 * secondly: user must exist in the database
 * Only dev team must use it
 * For any information about device, refer to /src/models/Device.js
 * Please, respect the data types
 */
router.get('/user/list/:userId', auth, verifyUser, deviceCtrl.getUserDevices);

router.get('/user/:chipid', auth, deviceCtrl.getOneDevice);

router.get('/', auth, deviceCtrl.getAllDevices);

/** Supprimer un appareil
 * This route is used to delete a user device (mobile side)
 * firstly: user have to be authenticated
 * Just send deviceId as request params
 * Only dev team must use it and only changeable properties can be change
 * For any information about device, refer to /src/models/Device.js
 * Please, respect the data types
 */
router.delete('/:id', auth, verifyUser, deviceCtrl.deleteDevice);

module.exports = router;
