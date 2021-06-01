//подключение модуля работы с http errors
const createError = require('http-errors');
//подключение модуля генерации id
const { v4: uuidv4 } = require('uuid');
//подключение модели, делает из originname две строки
const ConvertFullName = require('../models/convertFileName.js');
//подключаем модель исполняемого файла
const Play = require('../models/playFile.js');

//экспорт функции для обработки файлов
module.exports.uploadFile = async (req, res, next) => {
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
        const originName = originalname;
        const pathToFile = './' + fileFolder + fileName;
        //понять, откуда приходит переменная жанр!

        const convertOriginName = new ConvertFullName(originName);

        //сохраняем данные файла в базу
        try {
            const playedFile = new Play(
                uuidv4(),
                convertOriginName.getSingerName(),
                convertOriginName.getSongName(),
                pathToFile,
                'Рок', // вместо хардкорного значения, подставить значение из переменной.
                parseInt(Math.random())
            );

            await playedFile.save();

            res.send('Аудиофайл загружен.');

            return next(201, 'Загружен новый аудиофайл.');
        } catch(err) {
            res.send('Упс! Что-то пошло не так...');

            return next(createError(500, 'Синтаксическая ошибка в исполняемом коде во время загрузки файла.'));
        }
    }
}