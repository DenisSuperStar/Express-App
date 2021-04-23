//подключаем только Router из библиотеки express
const {Router} = require('express');
//инициализируем Router
const router = Router();

/*
    маршрутизация для главного меню сайта
*/

//роутер страницы авторизации в существующем аккаунте
router.get('/account', (req, res) => {
    res.render('account', {
        title: 'Войти на MusicTube',
        isAccount: true
    })
})

//роутер страницы для создания новой учетной записи
router.get('/create', (req, res) => {
    res.render('create', {
       title: 'Создать новый аккаунт на MusicTube',
       isCreate: true 
    })
})

/*
    маршрутизация для навигационного меню сайта
*/

//роутер главной страницы
router.get('/', (req, res) => {
    res.render('index', {
        title: 'MusicTube.Ваши любимые исполнители.',
        isMain: true
    });
})

//роутер для страницы просмотра новинок
router.get('/new', (req, res) => {
    res.render('new', {
        title: 'Скачать новинки бесплатно.',
        isNew: true
    })
})

//роутер для ознакомления и прослушивания композиций по исполнителям
router.get('/artist', (req, res) => {
    res.render('artist', {
        title: 'Скачать песни популярных исполнителей в формате mp3',
        isArtist: true
    })
});

//роутер для ознакомления с музыкальными стилями
router.get('/genres', (req, res) => {
    res.render('genre', {
        title: 'Список музыкальных стилей',
        isStyle: true
    })
});

//роутер страницы добавления композиции
router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Добавить композицию в плейлист.',
        isAdd: true
    })
})

//экспортируем во вне наш router
module.exports = router;