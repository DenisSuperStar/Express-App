//подключение модуля работы с http errors
const createError = require('http-errors');
//подключение модуля генерации id
const { v4: uuidv4 } = require('uuid');
//подключаем модель исполняемого файла
const Play = require('../models/playFile.js');

//экспорт функции для обработки файлов
module.exports.uploadFile = async (req, res, next) => {
    const {file} = req;
    if (!file) {// Если отправляем пустую форму...
        res.send('Упс! Что-то пошло не так... Возможно, вы отправили пустую форму.');
    } else {
        const {originalname, destination, ...othersData} = file;
        const pathToFile = './' + destination + originalname;
        const targetId = parseInt(Math.random());
        //понять, откуда приходит переменная жанр!
        
        //сохраняем данные файла в базу
        try {
            const playedFile = new Play(
                uuidv4(),
                originalname,
                destination,
                pathToFile,
                'Рок', /* временно ставим жанр "Рок" */
                targetId
            );

            await playedFile.save();

            res.send('Аудиофайл загружен.');

            return next(createError(201, 'Загружен новый аудиофайл.'));
        } catch(err) {
            res.send('Упс! Что-то пошло не так...');

            return next(createError(500, 'Синтаксическая ошибка в исполняемом коде во время загрузки файла.'));
        }
    }
}