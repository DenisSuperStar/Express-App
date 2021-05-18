const PropertyFileError = require('../models/error.js');
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
        isAdd: true,
        musicFiles: MusicFile.getAll()
    });
}


module.exports.upload = (req, res, next) => { // передать в next ошибку
    const fileData = req.file;

    if (!fileData.originalname) {
        res.send('Вы пытаетесь загрузить файл без имени.');     //Status Code = 500 if use res.sendStatus(500)

        const propertyFileError = new PropertyFileError('Значение имени файла не определено...');
        propertyFileError.reqStatusCode();
        propertyFileError.viewStackCall();

        throw propertyFileError;
    } else if (!fileData.mimetype) {
        res.send('Вы пытаетесь загрузить файл без расширения.'); //Status Code = 500

        const propertyFileError = new PropertyFileError('Файл не имеет расширения, либо оно удалено...');
        propertyFileError.reqStatusCode();
        propertyFileError.viewStackCall();

        throw propertyFileError;
    } else if (fileData.mimetype.indexOf('audio') === -1) {
        res.send('Вы пытаетесь загрузить файл не аудио типа.');  //Status Code = 500

        const propertyFileError = new PropertyFileError('Файл имеет расширение другого типа...');
        propertyFileError.reqStatusCode();
        propertyFileError.viewStackCall();

        throw propertyFileError;
    } else if (!fileData.size) {
        res.send('Вы пытаетесь загрузить пустой файл.');        //Status Code = 500

        const propertyFileError = new PropertyFileError('По каким-то причинам размер файла 0, либо он изначаально был пуст...');
        propertyFileError.reqStatusCode();
        propertyFileError.viewStackCall();

        throw propertyFileError;
    } else if (fileData.size > 10 * 8 * 1024 * 1024) {
        res.send('Файл не был загружен. Он слишком большой.');  //Status Code = 500
    } else {
        const fileFolder = fileData.destination;
        const fileName = fileData.filename;
        const originName = fileData.originalname;

        const musicFile = new MusicFile(fileFolder, fileName, originName);
        musicFile.saveFile();

        res.send('Файл загружен.'); //Status Code = 201, Created if use res.sendStatus(201)

        const propertyFileError = new PropertyFileError('Загружен новый музыкальный файл.', 201);
        propertyFileError.reqStatusCode();
    }

    res.redirect('/'); ///???
}

module.exports.create = (req, res) => {
    res.render('createAccount', {
        title: 'Регистрация на MusicSearch.'
    });
}

module.exports.add = (req, res, next) => { //передать в next ошибку
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    /*res.send(`${res.body.userFirstName}, ${res.body.userLastName}, ${res.body.userAge}, ${res.body.userGender}, ${res.body.email}`);*/
}

module.exports.exist = (req, res) => {
    res.render('existAccount', {
        title: 'Вход в аккаунт на MusicSearch.'
    });
}