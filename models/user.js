//подключение модуля mongoose
const mongoose = require('mongoose');
//импорт функционала для определения схемы таблицы бд из модуля mongoose
const { Schema } = require('mongoose');

//определение схемы таблицы данных пользователя
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
    versionKey: false //также отключение версионности
});

const User = mongoose.model('User', userSchema);
module.exports = User;