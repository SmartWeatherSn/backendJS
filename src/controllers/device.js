const Device = require('../models/Device');

exports.createDevice = (req, res) => {
    delete req.body._id;
    const thing = new Device({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({
            message: 'Post saved successfully!'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.findChipId = (req, res) => {
    Device.updateOne({
            $and: [{
                chipid: req.body.chipid
            }, {
                userId: null
            }]
        }, {
            userId: req.body.userId,
            name: req.body.name,
            description: req.body.description,
        }, {
            omitUndefined: true,
            new: true
        })
        .then((device) => {
            if ((!device) || (device.chipid !== req.body.chipid)) {
                return res.status(201).json({
                    code: "NoDeviceFound"
                })
            }
            return res.status(201).json({
                message: `Device with chipid: ${req.body.chipid} linked to userId: ${req.body.userId} successfully`
            })
        })
        .catch(error => res.status(400).json({
            error
        }))
}

exports.modifyDevice = (req, res) => {
    delete req.body.userId;
    Device.updateOne({
            _id: req.params.id
        }, {
            ...req.body
        })
        .then(() => res.status(200).json({
            message: "Device updated successfully!"
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.modifySensorsValue = (req, res) => {
    const io = req.app.get('io');
    Device.findOneAndUpdate({
            chipid: req.params.chipid
        }, {
            ...req.body
        })
        .then((device) => {
            if (device) {
                try {
                    io.to(device.userId.toString()).emit('newData', {
                        id: device._id,
                        sensor: req.body.sensor
                    });
                } catch (error) {
                    console.log(error);
                }
                res.status(200).json({
                    message: "Sensors updated successfully!"
                });
            } else {
                res.status(503).json({
                    message: "Unknown error"
                });
            }
        })
        .catch(error => res.status(400).json({
            ...error,
            message: 'error'
        }));
};

exports.deleteDevice = (req, res) => {
    Device.findOne({
            _id: req.params.id
        })
        .then(thing => {
            if (thing.userId.toString() !== req.userId.toString()) {
                return res.status(400).json({
                    message: 'Unauthorized'
                });
            }
            Device.updateOne({
                    _id: req.params.id
                }, {
                    userId: null,
                    deletedUser: thing.userId
                })
                .then(() => res.status(200).json({
                    message: "Deleted"
                }))
                .catch(error => res.status(400).json({
                    ...error,
                    message: "error"
                }));
        })
        .catch(error => res.status(404).json({
            error
        }));
};

exports.getOneDevice = (req, res) => {
    Device.findOne({
            chipid: req.params.chipid
        })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({
            error
        }));
};

exports.getUserDevices = (req, res) => {
    console.log('matt na!!');
    Device.find({
            userId: req.params.userId
        })
        .then(things => res.status(200).json(things))
        .catch(error => res.status(404).json({
            error
        }));
};

exports.getAllDevices = (req, res) => {
    Device.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({
            error
        }));
};