const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
{
    userName: {type: String, trim: true, required: true, unique: true},
    email: {type: String, lowercase: true, trim: true, index: { unique: true, sparse: true }},
    password: {type: String, required: true},
    phone: {type: String, lowercase: true, trim: true, index: { unique: true, sparse: true }}
},
{
    timestamps: { createdAt: true }
}
);

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);