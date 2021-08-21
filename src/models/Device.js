const mongoose = require("mongoose");

const sensor = mongoose.Schema({
    Humidity: {type: String, default: 0},
    Temperature: {type: String, default: 0},
    CGA: {type: String, default: 0},
    PM2_5: {type: String, default: 0},
    PM10: {type: String, default: 0},
})

const deviceSchema = mongoose.Schema({
    ip: {type: String, required: true},
    description: {type: String, default: ''},
    rssi: {type: String, required: true},
    chipid: {type: String, required: true},
    sensor: {type: sensor},
    userId: {type: String, default: null}
},
{
    timestamps: { createdAt: true }
});

module.exports = mongoose.model('Device', deviceSchema);