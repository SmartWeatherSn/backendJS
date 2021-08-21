const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, default: null, unique: true},
    password: {type: String, required: true},
    telephone: {type: String, default: null, unique: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);