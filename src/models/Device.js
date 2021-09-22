const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const sensor = mongoose.Schema({
    humidity: {type: Number, default: 0},
    temperature: {type: Number, default: 0},
    cga: {type: Number, default: 0},
    pm: {type: Number, default: 0},
},
  { _id: false }
  ,{
    timestamps: { createdAt: true }
})

const deviceSchema = mongoose.Schema({
    chipid: {type: String, unique: true, required: true},
    description: {type: String, default: ''},
    name: {type: String, default: ''},
    rssi: {type: String, required: true},
    sensor: {type: sensor},
    deletedUser: {type: String, ref: 'User', index: { unique: true, sparse: true }},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', index: { unique: true, sparse: true }}
},
{
    timestamps: { createdAt: true }
});

deviceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Device', deviceSchema);
