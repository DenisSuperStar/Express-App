const PropertyFileError = require('../models/error.js');
const ServerError = require('../models/error.js');
const MusicFile = require('../models/musicFile.js');

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
        isAdd: true
    });
}

module.exports.upload = (req, res, next) => {
    const fileData = req.file;

    if (!fileData.originalnam) {
        res.send('<span class="upload__warning">Наименование файла не должно быть пустым.</span>');

        //Выброс ошибки 
    } else if (!fileData.mimetype) {
        res.send('<span class="upload__danger">Формат файла должен быть задан.</span>');

        //Выброс ошибки
    } else if (fileData.mimetype.indexOf('audio') === -1) {
        res.send('<span class="upload__danger">Расширение файла не соответствует аудиоформату.</span>');

        //Выброс ошибки
    } else if (!fileData.size) {
        res.send('<span class="upload__danger">Размер файла не может быть = 0.</span>');

        //Выброс ошибки
    } else if (fileData.size > 10 * 8 * 1024 * 1024) {
        res.send('<span class="upload__danger">Файл не был загружен. Он слишком большой.</span>');

        //Выброс ошибки
    } else if (fileData) {
        const fileFolder = fileData.destination;
        const fileName = fileData.filename;
        const originName = fileData.originalname;

        //инициализация конструктора класса
        //сохранение в бд
        res.send('<span class="upload__success">Файл загружен</span>');
    } else {
        res.send('Упс! Что-то пошло не так...');

        //генерация серверной ошибки
        //выброс ошибки
    }
}