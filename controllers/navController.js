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

module.exports.upload = (req, res, next) => {
    const fileData = req.file;

    if (!fileData.originalname) {
        res.status(500).send(`
            <span class="upload-warning">
                Вы пытаетесь загрузить файл без имени.
            </span>
        `);

        const propertyFileError = new PropertyFileError('Передан файл с пустым именем.');
        propertyFileError.reqStatusCode();
        propertyFileError.viewStackCall();

        throw propertyFileError;
    } else if (!fileData.mimetype) {
        res.status(500).send(`
            <span class="upload-danger">
                Вы пытаетесь загрузить файл без расширения.
            </span>
        `);

        const propertyFileError = new PropertyFileError('Передан файл с пустым расширением.');
        propertyFileError.reqStatusCode();
        propertyFileError.viewStackCall();

        throw propertyFileError;
    } else if (fileData.mimetype.indexOf('audio') === 1) {
        res.status(500).send(`
            <span class="upload-danger">
                Вы пытаетесь загрузить файл не аудио типа.
            </span>
        `);

        const propertyFileError = new PropertyFileError('Расширение файла не соответсвует аудиоформату.');
        propertyFileError.reqStatusCode();
        propertyFileError.viewStackCall();

        throw propertyFileError;
    } else if (!fileData.size) {
        res.status(500).send(`
            <span class="upload-danger">
                Вы пытаетесь загрузить пустой файл.
            </span>
        `);

        const propertyFileError = new PropertyFileError('Размер файла не может быть = 0.');
        propertyFileError.reqStatusCode();
        propertyFileError.viewStackCall();

        throw propertyFileError;
    } else if (fileData.size > 10 * 8 * 1024 * 1024) {
        res.status(500).send(`
            <span class="upload-danger">
                Превышен допустимый размер файла.
            </span>
        `);

        const propertyFileError = new PropertyFileError('Файл не был загружен. Он слишком большой.');
        propertyFileError.reqStatusCode();
        propertyFileError.viewStackCall();

        throw propertyFileError;
    } else {
        const fileFolder = fileData.destination;
        const fileName = fileData.filename;
        const originName = fileData.originalname;

        //выводим некоторые параметры для проверки
        console.log('Передаем директорию файла: ' + this.fileFolder);
        console.log('Передаем название файла: ' + this.fileName);
        console.log('Передаем оригинальное название файла: ' + this.originName);

        const musicFile = new MusicFile(fileFolder, fileName, originName);
        musicFile.saveFile();

        res.status(200).send(`
            <span class="upload-success">Файл загружен.</span>
        `);
    }
}