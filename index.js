//подключение express
const express = require('express');
//вызов функции express для создания приложения
const app = express();
//подключаем модуль для работы с путями директорий
const path = require('path');
//подключаем маршрутизатор из express модуля
const {Router} = require('express');
//вызываем функцию-маршрутизатор
const mainRouter = Router();
const genreRouter = Router();
//подключение модуля handlebars
const exphbs = require('express-handlebars');
//подключение компилятора sass
const compileSass = require('express-compile-sass');
//подключение модуля работы с файлами
const multer = require('multer');
//вызываем функцию multer и указываем директорию хранения загружаемых файлов
const upload = multer({dest: 'uploads/'});
//инициализация порта
const port = process.env.PORT || 3000;
//подключение драйвера mongoose
const mongoose = require('mongoose');
//подключение контроллеров
const navigController = require('./controllers/navController.js');
const genreController = require('./controllers/genreController.js');

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

//описание маршрутов общих адресов
mainRouter.get('/', navigController.index);
mainRouter.get('/new', navigController.new);
mainRouter.get('/artist', navigController.artist);
mainRouter.get('/genres', navigController.genre);
mainRouter.get('/add', navigController.add);
mainRouter.post('/add', upload.single('file'), navigController.upload);

//сопоставляем маршрут с конечной точкой
app.use('/', mainRouter);

//описание маршрутов множества /genre
genreRouter.use('/pop', genreController.pop);
genreRouter.use('/rock', genreController.rock);
genreRouter.use('/rap', genreController.rap);
genreRouter.use('/electronics', genreController.electronics);
genreRouter.use('/chanson', genreController.chanson);
genreRouter.use('/metal', genreController.metal);
genreRouter.use('/classic', genreController.classic);
genreRouter.use('/rnb', genreController.rnb);
genreRouter.use('/jazz', genreController.jazz);
genreRouter.use('/country', genreController.country);
genreRouter.use('/folk', genreController.folk);
genreRouter.use('/instrumental', genreController.instrumental);

//сопоставляем маршрут с конечной точкой для /genres
app.use('/genres', genreRouter);

//обработка ошибки 404 в маршруте
app.use((req, res, next) => {
    res.status(404).send('Страница не найдена');
});

//прослушивание порта и запуск сервера
app.listen(port, () => {
    console.log('Сервер был запущен...');
});