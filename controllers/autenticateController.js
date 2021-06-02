//подключение модуля passport-local
const passportLocal = require('passport-local');
//импорт интересующей стратегии
const {Strategy} = passportLocal;
//подключение файла модели пользователя
const User = require('../models/user.js');

//импорт функции, авторизации пользователя по email и пароль
module.exports.checkDataUser = (authenticate) => {
    authenticate.use(new Strategy({
        usernameField: 'authEmail',
        passwordField: 'authPassword'
    }, async (username, password, done) => {
        await User.findOne({userEmail: username}, (err, user) => {
            if (err) return done(err);

            if ((!user) || (!user.validPassword(password))) {
                return done(null, false, {message: 'Некорректный email или пароль.'});
            }

            return done(null, user);
        });
    }));
}