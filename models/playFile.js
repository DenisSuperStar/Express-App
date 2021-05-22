//подключение модуля mongoose
const mongoose = require('mongoose');
//импорт функционала для определения схемы таблицы бд их модуля mongoose
const { Schema } = require('mongoose');

//определение схемы таблицы свойств музыкального файла
const fileSchema = new Schema({
   fileId: {
       type: Number,
       required: true,
       unique: true
   },
   singerName: {
       type: String,
       required: true
   },
   songName: {
       type: String,
       required: true
   },
   srcPath: {
       type: String,
       required: true
   }
}, {
    versionKey: false //отключение версионности
});

const Play = mongoose.model('Play', fileSchema);
module.exports = Play;