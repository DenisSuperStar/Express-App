const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//определение схемы
const userSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userAge: {
        type: Number,
        required: true
    },
    userGender: {
        type: Boolean,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

const User = mongoose.model('User', userSchema);
module.exports = User;