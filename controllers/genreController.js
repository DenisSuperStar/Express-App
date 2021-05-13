module.exports.pop = (req, res) => {
    res.render('pop', {
        title: 'Слушайте и качайте музыкальные композиции популярных поп-исполнителей.'
    });
}

module.exports.rock = (req, res) => {
    res.render('rock', {
        title: 'Слушайте и качайте музыкальные композиции популярных рок-исполнителей.'
    });
}

module.exports.rap = (req, res) => {
    res.render('rap', {
        title: 'Слушайте и качайте музыкальные композиции популярных реп-исполнителей.'
    });
}

module.exports.electronics = (req, res) => {
    res.render('electronics', {
        title: 'Слушайте и качайте популярные музыкальные электроник композиции.'
    });
}

module.exports.chanson = (req, res) => {
    res.render('chanson', {
        title: 'Слушайте и качайте музыкальные композиции популярных шансонье.'
    });
}

module.exports.metal = (req, res) => {
    res.render('metal', {
        title: 'Слушайте и качайте музыкальные композиции популярных рок-металлистов.'
    });
}

module.exports.classic = (req, res) => {
    res.render('classic', {
        title: 'Слушайте и качайте музыкальные композиции популярных классиков.'
    });
}

module.exports.rnb = (req, res) => {
    res.render('rnb', {
        title: 'Слушайте и качайте музыкальные композиции популярных rnb-исполнителей.'
    });
}

module.exports.jazz = (req, res) => {
    res.render('jazz', {
        title: 'Слушайте и качайте музыкальные композиции популярных jazz-исполнителей.'
    });
}

module.exports.country = (req, res) => {
    res.render('country', {
        title: 'Слушайте и качайте музыкальные композиции популярных исполнителей кантри.'
    });
}

module.exports.folk = (req, res) => {
    res.render('folk', {
        title: 'Слушайте и качайте музыкальные композиции популярных фолк-исполнителей.'
    });
}

module.exports.instrumental = (req, res) => {
    res.render('instrumental', {
        title: 'Слушайте и качайте музыкальные композиции популярных фолк-исполнителей.'
    });
}