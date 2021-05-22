//подключение модуля работы с http errors
const createError = require('http-errors');
//подключение модуля генерации id
const { v4: uuidv4 } = require('uuid');
//подключение модуля генерации hash пароля
const bcrypt = require('bcrypt');
//подключение файла модели пользователя
const User = require('../models/user.js');
//длина соли для хеширования пароля
const saltLength = 10;


//экспорт функции по обработке и добавлении данных пользователя
module.exports.addUser = (req, res, next) => {
    if (!req.body) {
        res.send('Пользователь не найден.');

        return next(createError(400, 'Текущий пользователь не найден.'));
    }

    try {
        const {personEmail, personPassword, ...userData} = req.body;
        const findExistEmail = await User.findOne({userEmail: personEmail});

        if (findExistEmail) {
            res.send('Такой пользователь уже существует.');
            
            return next(createError(403, 'Такой пользователь уже существует.'));
        }

        const hashedPassword = bcrypt.hash(personPassword, saltLength);
        const user = new User(
            uuidv4(),
            userData.personFirstName,
            userData.personLastName,
            userData.personAge,
            userData.personGender,
            personEmail,
            hashedPassword
        );

        await user.save();
        res.send('Пользователь зарегистрирован.');

        return next(createError(201, 'Пользователь зарегистрирован.'));
    } catch(err) {
        res.send('Упс! Что-то пошло не так...');

        return next(createError(500, 'Синтаксическая ошибка в исполняемом код во время регистрации.'));
    }
}