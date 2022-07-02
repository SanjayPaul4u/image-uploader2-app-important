const mongoose  = require('mongoose');

const  Schema = mongoose.Schema;

const multipleFileSchma = new Schema({
    title: {
        type: String,
        required: true
    },
    files:[Object]

},{timestamps: true});

module.exports = mongoose.model('multipleFile', multipleFileSchma);



