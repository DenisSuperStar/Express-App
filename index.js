//подключение модуля обработки кодов состояния
const createError = require('http-errors');
//подключение express
const express = require('express');
//вызов функции express для создания приложения
const app = express();
//подключаем модуль для работы с путями директорий
const path = require('path');
//подключение модуля авторизации passport
const passport = require('passport');
//подключение модуля handlebars
const exphbs = require('express-handlebars');
//подключение компилятора sass
const compileSass = require('express-compile-sass');
//подключение модуля работы с файлами
const multer = require('multer');
//вызываем функцию multer и указываем директорию хранения загружаемых файлов
const upload = multer({dest: 'uploads/'});
//подключаем модуль body parser
const bodyParser = require('body-parser');
//У объекта body parser вызываем функцию urlencoded
const urlEncodedParser = bodyParser.urlencoded({extended: false});
//инициализация порта
const port = process.env.PORT || 3000;
//подключение контроллеров
const routeController = require('./controllers/routeController.js');
const addNewUserController = require('./controllers/addNewUserController.js');
const autenticateController = require('./controllers/autenticateController');
const uploadFileController = require('./controllers/uploadFileController.js');
const genreController = require('./controllers/genreController.js');

/*
    Добавить скрипт mongoConnect,
    прослушивание...
*/

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

//регистрация движка как основного по умолчанию
app.set('view engine', 'hbs');

//регистрируем папку с представлениями для express приложения
app.set('views', 'views');

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

//описание маршрутов для путей, начинающихся с /
app.get('/', routeController.index);
app.get('/new', routeController.new);
app.get('/artist', routeController.artist);
app.get('/genres', routeController.genre);
app.post('/upload', upload.single('fileData'), uploadFileController.uploadFile);

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

//прослушивание порта и запуск сервера
app.listen(port, () => {
    console.log('Сервер был запущен...');
});

/*
    1) Добавить коннект к базе данных
    3) Добавить страницу с url секрет и сделать переадесацию на страницу загрузки файлов формы
    4) На странице загрузки файлов формы добавить список музыкальных жанров
    6) Добавить плагин jquery для стилизации формы загрузки файлов
    7) Разобраться с валидацией на бекенде
    8) Подобрать jquery плагин для аудиоплеера для поддержки кроссбраузерности
    9) Добавить минимальную адаптивность
*/