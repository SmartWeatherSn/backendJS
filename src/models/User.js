const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: String,
    lastname: String,
    telephone: {type: String, default: null, unique: true},
    devices: {type: [String], default: []}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);