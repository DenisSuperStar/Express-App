//подключение express
const express = require('express');
//вызов функции express для создания приложения
const app = express();
//подключаем модуль для работы с путями директорий
const path = require('path');
//подключаем маршрутизатор из express модуля
const {Router} = require('express');
//вызываем функцию-маршрутизатор
const commonRouter = Router();
const userRouter = Router();
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
//подключение файла маршрутизации
const routing = require('./routes/routing');


//инициализация движка представлений hbs
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//регистрация движка handlebars по ключу hbs
app.engine('hbs', hbs.engine);
//указываем, что по умолчанию будем использовать handlebars
app.set('view engine', 'hbs');
//регистрируем папку с представлениями для сайта
app.set('views', 'views');
//настройка комплитора sass
app.use(compileSass({
    root: path.resolve(),   //путь к директории приложения
    sourceMap: true,
    sourceComments: true,   //включает комментарии в выходной css
    watchFiles: true,       //обновление файлов при каждом изменении
    logToConsole: true      //если true, то будет логировать console.error при ошибках
}));
//регистрируем статические файлы стилей
app.use(express.static(path.resolve() + "/public"));
//регистрируем роуты
app.use(routing);

//определение функции start для запуска приложения
/*const start = async () => {
    try {
        //параметры конфига
        const user_name = 'Denis';
        const password = 'ItProger1994';
        const database_name = 'app_database';
        // подключение бд
        await mongoose.connect(`mongodb+srv://${user_name}:${password}@cluster0.teho8.mongodb.net/${database_name}`, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        //запуск сервера
        app.listen(port, () => {
            console.log('Server has been started...');
        });
    } catch(err) {
        //вывод ошибки
        console.log(err);
    }
}

start();*/
app.listen(port, () => {
    console.log('Server has been started...');
});