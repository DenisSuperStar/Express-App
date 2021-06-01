//подключаем модель исполняемого файла
const Play = require('../models/playFile.js');
const searchChansonSingers = () => {this.genre == 'chanson';}
const searchClassicSingers = () => {this.genre == 'classic'}
const searchCountrySingers = () => {this.genre == 'country';}
const searchElectronSingers = () => {this.genre == 'electron';}
const searchFolkSingers = () => {this.genre == 'folk';}
const searchInstrumSingers = () => {this.genre == 'instrum';}
const searchJazzSingers = () => {this.genre == 'jazz';}
const searchMetalSingers = () => {this.genre == 'metal';}
const searchPopSingers = () => {this.genre == 'pop';}
const searchRapSingers = () => {this.genre == 'rap';}
const searchRnbSingers = () => {this.genre == 'rnb';}
const searchRockSingers = () => {this.genre == 'rock';}

module.exports.chanson = async (req, res) => {
    res.render('chanson', {
        title: 'Слушайте и качайте музыкальные композиции популярных шансонье.',
        singles: await Play.find(searchChansonSingers),
        header: 'Популярный шансон.' 
    });
}

module.exports.classic = async (req, res) => {
    res.render('classic', {
        title: 'Слушайте и качайте музыкальные композиции популярных классиков.',
        singles: await Play.find(searchClassicSingers),
        header: 'Классическая музыка'
    });
}

module.exports.country = async (req, res) => {
    res.render('country', {
        title: 'Слушайте и качайте музыкальные композиции популярных исполнителей кантри.',
        singles: await Play.find(searchCountrySingers),
        header: 'Популярное кантри.'
    });
}

module.exports.electronics = async (req, res) => {
    res.render('electronics', {
        title: 'Слушайте и качайте популярные музыкальные электроник композиции.',
        singles: await Play.find(searchElectronSingers),
        header: 'Популярная электроника.'
    });
}

module.exports.folk = async (req, res) => {
    res.render('folk', {
        title: 'Слушайте и качайте музыкальные композиции популярных фолк-исполнителей.',
        singles: await Play.find(searchFolkSingers),
        header: 'Популярный фолк.'
    });
}

module.exports.instrumental = async (req, res) => {
    res.render('instrumental', {
        title: 'Слушайте и качайте музыкальные композиции популярных фолк-исполнителей.',
        singles: await Play.find(searchInstrumSingers),
        header: 'Популярный инструментал.'
    });
}

module.exports.jazz = async (req, res) => {
    res.render('jazz', {
        title: 'Слушайте и качайте музыкальные композиции популярных jazz-исполнителей.',
        singles: await Play.find(searchJazzSingers),
        header: 'Популярный джазз.'
    });
}

module.exports.metal = async (req, res) => {
    res.render('metal', {
        title: 'Слушайте и качайте музыкальные композиции популярных рок-металлистов.',
        singles: await Play.find(searchMetalSingers),
        header: 'Популярный метал.'
    });
}

module.exports.pop = async (req, res) => {
    res.render('pop', {
        title: 'Слушайте и качайте музыкальные композиции популярных поп-исполнителей.',
        singles: await Play.find(searchPopSingers),
        header: 'Популярные треки поп жанра.'
    });
}

module.exports.rap = async (req, res) => {
    res.render('rap', {
        title: 'Слушайте и качайте музыкальные композиции популярных реп-исполнителей.',
        singles: await Play.find(searchRapSingers),
        header: 'Популярный реп.'
    });
}

module.exports.rnb = async (req, res) => {
    res.render('rnb', {
        title: 'Слушайте и качайте музыкальные композиции популярных rnb-исполнителей.',
        singles: await Play.find(searchRnbSingers),
        header: 'Популярные рнб треки.'
    });
}

module.exports.rock = async (req, res) => {
    res.render('rock', {
        title: 'Слушайте и качайте музыкальные композиции популярных рок-исполнителей.',
        singles: await Play.find(searchRockSingers),
        header: 'Популярный рок.'
    });
}