//подключение модуля работы с http errors
const createError = require('http-errors');
//подключение модуля генерации id
const { v4: uuidv4 } = require('uuid');
//подключение модуля генерации hash пароля
const bcrypt = require('bcrypt');
//подключение модуля passport
const passport = require('passport');
//подключение модуля passport-local
const passportLocal = require('passport-local');
//импорт интересующей стратегии
const {Strategy} = passportLocal;
//подключение файла модели объекта музыкального файла
const MusicFile = require('../models/musicFile.js');
//подключение файла модели пользователя
const User = require('../models/user.js');
//длина соли для хеширования пароля
const saltLength = 10;

module.exports.index = (req, res) => {
    res.render('index', {
        title: 'MusicSearch.Ваши любимые исполнители.',
        isMain: true
    });
}

module.exports.new = (req, res) => {
    res.render('new', {
        title: 'Скачать новинки бесплатно.',
        isNew: true
    });
}

module.exports.artist = (req, res) => {
    res.render('artist', {
        title: 'Скачать песни популярных исполнителей в формате mp3.',
        isArtist: true
    });
}

module.exports.genre = (req, res) => {
    res.render('genre', {
        title: 'Список музыкальных стилей.',
        isStyle: true
    });
}

module.exports.add = (req, res) => {
    res.render('add', {
        title: 'Добавить композицию в плейлист.',
        isAdd: true,
        musicFiles: MusicFile.getAll()
    });
}


module.exports.upload = (req, res, next) => {
    const {originalname, mimetype, size, ...fileData} = req.file;
    const maxSize = 8388608083886080;

    if (!originalname) {
        res.send('Имя файла не задано!');

        return next(createError(500, 'Значение имени файла не определено...'));
    } else if ((!mimetype) || (mimetype.indexOf('audio') === -1)) {
        res.send('Файл не может быть прочитан или имеет неверный формат!');

        return next(createError(500, 'Файл не может быть прочитан или распознан как имеющий другое расширение!'));
    } else if ((!size) || (size > maxSize)) {
        res.send('Вы пытаетесь загрузить пустой файл или файл слишком большого размера!');

        return next(createError(500, 'Попытка загрузить пустой файл или файл слишком большого размера!'));
    } else {
        const fileFolder = fileData.destination;
        const fileName = fileData.filename;

        const musicFile = new MusicFile(fileFolder, fileName, originalname);
        musicFile.save();

        res.send('Файл загружен.');

        return next(createError(201, 'Загружен новый аудиофайл.'));
    }
    /*
        Придумать переадресацию на страницу загрузки
    */
}

module.exports.create = (req, res) => {
    res.render('createAccount', {
        title: 'Регистрация на MusicSearch.'
    });
}

module.exports.add = async (req, res, next) => {
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

module.exports.exist = (req, res) => {
    res.render('existAccount', {
        title: 'Вход в аккаунт на MusicSearch.'
    });
}

module.exports.check = async (req, res, next) => {
    if (!req.body) {
        res.send('Пользователь не найден.');

        return next(createError(400, 'Текущий пользователь не найден.'));
    }

    try {
        //описываем механизм авторизации с помощью passport
        passport.use(new LocalStrategy({
            usernameField: 'authEmail',
            passwordField: 'authPassword'
        }, (username, password, done) => {
            await User.findOne({userEmail: username}, (err, user) => {
                if (err) return done(err);

                if ((!user) || (!user.validPassword(password))) {
                    return done(null, false, {message: 'Некорректный email или пароль.'});
                }
            });
        }));

    } catch(err) {
        res.send('Упс! Что-то пошло не так...');

        return next(createError(500, 'Синтаксическая ошибка в исполняемом коде во время авторизации.'));
    }
}