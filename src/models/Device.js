const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
    ip: {type: String, required: true},
    description: {type: String, required: true},
    rssi: {type: String, required: true},
    chipid: {type: String, required: true},
    bootCount: {type: Number, required: true},
    wakeup_reason: {type: String, required: true},
    userId: {type: String, default: null, required: true},
})

module.exports = mongoose.model('Device', deviceSchema);