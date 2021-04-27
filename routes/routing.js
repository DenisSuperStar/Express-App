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

//роутеры для страниц

router.get('/genres/pop', (req, res) => {
    res.render('pop', {
        title: 'Слушайте и качайте музыкальные композиции популярных поп-исполнителей.'
    })
});

router.get('/genres/rock', (req, res) => {
    res.render('rock', {
        title: 'Слушайте и качайте музыкальные композиции популярных рок-исполнителей.'
    });
});

router.get('/genres/rap', (req, res) => {
    res.render('rap', {
        title: 'Слушайте и качайте музыкальные композиции популярных реп-исполнителей.'
    });
});

router.get('/genres/electronics', (req, res) => {
    res.render('electronics', {
        title: 'Слушайте и качайте популярные музыкальные электроник композиции.'
    });
});

router.get('/genres/chanson', (req, res) => {
    res.render('chanson', {
        title: 'Слушайте и качайте музыкальные композиции популярных шансонье.'
    })
});

router.get('/genres/metal', (req, res) => {
    res.render('metal', {
        title: 'Слушайте и качайте музыкальные композиции популярных рок-металлистов.'
    });
});

router.get('/genres/classic', (req, res) => {
    res.render('classic', {
        title: 'Слушайте и качайте музыкальные композиции популярных классиков.'
    })
});

router.get('/genres/rnb', (req, res) => {
    res.render('rnb', {
        title: 'Слушайте и качайте музыкальные композиции популярных исполнителей rnb.'
    })
});

router.get('/genres/jazz', (req, res) => {
    res.render('jazz', {
        title: 'Слушайте и качайте музыкальные композиции популярных jazz-исполнителей.'
    });
});

router.get('/genres/country', (req, res) => {
    res.render('country', {
        title: 'Слушайте и качайте музыкальные композиции популярных исполнителей кантри.'
    });
});

router.get('/genres/folk', (req, res) => {
    res.render('folk', {
        title: 'Слушайте и качайте музыкальные композиции популярных фолк-исполнителей.'
    })
});

router.get('/genres/instrumental', (req, res) => {
    res.render('instrumental', {
        title: 'Слушайте и качайте популярную инструментальную музыку.'
    })
});

//экспортируем во вне наш router
module.exports = router;