'use strict';
const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect('mongodb://localhost:27017/upload-files-database')
    .then(()=> console.log('mongodb connection successfull...'));
}