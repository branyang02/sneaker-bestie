const mongoose = require('mongoose');

// create a Schema
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true},
    password: { type: String, required: true }
});

// convert Schema to a Model
module.exports = mongoose.model('User', userSchema);