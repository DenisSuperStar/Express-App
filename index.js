//подключение express
const express = require('express');
//подключение драйвера mongoose
const mongoose = require('mongoose');
//подключение движка handlebars
const exphbs = require('express-handlebars');
//подключение файла маршрутизации
const routing = require('./routes/routing');
//инициализация порта
const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

/*
    регистрация движка handlebars по ключу hbs
*/
app.engine('hbs', hbs.engine);
//указываем, что по умолчанию будем использовать handlebars
app.set('view engine', 'hbs');
//регистрируем папку с представлениями для сайта
app.set('views', 'views');

app.use(express.static('/assets/MusicTube.png'));
app.use(express.static('/jquery/audio.min.js'));
//регистрируем роуты
app.use(routing);

//определение функции start для запуска приложения
const start = async () => {
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
        app.listen(PORT, () => {
            console.log('Server has been started...');
        });
    } catch(err) {
        //вывод ошибки
        console.log(err);
    }
}

start();