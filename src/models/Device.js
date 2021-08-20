const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
    ip: {type: String, required: true},
    description: {type: String, default: ''},
    rssi: {type: String, required: true},
    chipid: {type: String, required: true},
    userId: {type: String, default: null},
});

module.exports = mongoose.model('Device', deviceSchema);