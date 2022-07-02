'usestrict';

const express = require('express');
const {upload} = require('../helpers/filehelper');
const {singleFileUpload, multipleFileUpload, getAllSingleFiles, getAllMultipleFiles} = require('../controllers/fileuploaderController');

const router = express.Router();

// single file POST: api/singleFile
router.post('/singleFile', upload.single('file'), singleFileUpload);

// multiple file POST: api/multipleFile
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);


// getting single file POST: api/allsinglefile 📌
router.get('/allsinglefile',  getAllSingleFiles);


// getting single file POST: api/allsinglefile 📌
router.get('/allmultiplefile',  getAllMultipleFiles);

module.exports={
    routes: router
}