//подключение модуля обработки кодов состояния
const createError = require('http-errors');
//подключение express
const express = require('express');
//вызов функции express для создания приложения
const app = express();
//подключаем модуль для работы с путями директорий
const path = require('path');
//подключение модуля для работы с бд mongo
const mongoose = require('mongoose');
//подключение модуля авторизации passport
const passport = require('passport');
//подключение модуля handlebars
const exphbs = require('express-handlebars');
//подключение компилятора sass
const compileSass = require('express-compile-sass');
//подключение модуля работы с файлами
const multer = require('multer');
//Настройка параметра storageConfig
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const {originalname} = file; // 1)

        cb(null, originalname); //2), 1) + 2) = cb(null, file.originalname)
    }
});

//Настройка фильтра для загружаемых файлов
const filterTypeFile = (req, file, cb) => {
    const {mimetype} = file;

    if (mimetype.indexOf('mpeg') === -1) {
        cb(null, false);
    } else {
        cb(null, true);
    }
}

//подключение и инициализация модуля multer
const upload = multer({storage: storageConfig, fileFilter: filterTypeFile});

//подключаем модуль body parser
const bodyParser = require('body-parser');
//У объекта body parser вызываем функцию urlencoded
const urlEncodedParser = bodyParser.urlencoded({extended: false});
//инициализация порта
const port = process.env.PORT || 3000;
const hostType = 'localhost';
const hostDb = 27017;
const dbName = 'appMusicDb';
//подключение контроллеров
const routeController = require('./controllers/routeController.js');
const addNewUserController = require('./controllers/addNewUserController.js');
const autenticateController = require('./controllers/autenticateController');
const uploadFileController = require('./controllers/uploadFileController.js');
const genreController = require('./controllers/genreController.js');

//Устанавливаем соединение с бд
mongoose.connect(`mongodb://${hostType}:${hostDb}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log(err.message);
        process.exit(-1);
    }

    //Если не возникло ошибки, то выполняем прослушивание порта и запуск сервера
    app.port(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
});

//инициализация библиотеки passport
app.use(passport.initialize);
//инициализация сессии
app.use(passport.session);
//вызываем у контроллера авторизации функцию проверки пользовательских данных
autenticateController.checkDataUser(passport);

//инициализация движка представлений
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//регистрация движка handlebars по ключу hbs
app.engine('hbs', hbs.engine);

//указание самого шаблонизатора
app.set('view engine', 'hbs');

//указание пути к директории с шаблонами
app.set('views', './views');

//настройка компилятора sass
app.use(compileSass({
    root: path.resolve(), //путь к директории приложения
    sourceMap: true,
    sourceComments: true, //включает комментарий в выходной css
    watchFiles: true,     //обновление файлов при каждом изменении
    logToConsole: true    //если true, то будет логировать console.error при ошибках
}));

//регистрируем статические файлы стилей
app.use(express.static(path.resolve() + '/public'));

app.use(upload.single('fileData'));

//описание маршрутов для путей, начинающихся с /
app.get('/', routeController.index);
app.get('/new', routeController.new);
app.get('/artist', routeController.artist);
app.get('/genres', routeController.genre);
app.post('/upload', uploadFileController.uploadFile);

app.get('/create', urlEncodedParser, routeController.create);
app.post('/create', urlEncodedParser, addNewUserController.addUser);
app.get('/account', routeController.exist);

//описание маршрутов для путей, начинающихся с /genres
app.get('/genres/pop', genreController.pop);
app.get('/genres/rock', genreController.rock);
app.get('/genres/rap', genreController.rap);
app.get('/genres/electronics', genreController.electronics);
app.get('/genres/chanson', genreController.chanson);
app.get('/genres/metal', genreController.metal);
app.get('/genres/classic', genreController.classic);
app.get('/genres/rnb', genreController.rnb);
app.get('/genres/jazz', genreController.jazz);
app.get('/genres/country', genreController.country);
app.get('/genres/folk', genreController.folk);
app.get('/genres/instrumental', genreController.instrumental);

//обработка ошибки 404
app.use((req, res, next) => {
    res.send('Страница не найдена.');

    next(createError(404, 'Запрашиваемая страница не найдена.'));
});