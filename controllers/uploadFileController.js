//подключение модуля работы с http errors
const createError = require('http-errors');
//подключение файла модели объекта музыкального файла
const MusicFile = require('../models/musicFile.js');

//экспорт функции для обработки файлов
module.exports.uploadFile = (req, res, next) => {
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
}