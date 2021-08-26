const mongoose = require("mongoose");

const sensor = mongoose.Schema({
    humidity: {type: Number, default: 0},
    temperature: {type: Number, default: 0},
    cga: {type: Number, default: 0},
    pm: {type: Number, default: 0},
},{
    timestamps: { createdAt: true }
})

const deviceSchema = mongoose.Schema({
    ip: {type: String, required: true},
    description: {type: String, default: ''},
    rssi: {type: String, required: true},
    chipid: {type: String, required: true, unique: true},
    sensor: {type: sensor},
    userId: {type: String, default: null, index: { unique: true, sparse: true }}
},
{
    timestamps: { createdAt: true }
});

module.exports = mongoose.model('Device', deviceSchema);