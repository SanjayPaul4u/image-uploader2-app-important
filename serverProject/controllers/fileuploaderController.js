'use strict';
const singleFile = require('../models/singlefile');
const multipleFile = require('../models/multipleFile');

// for choosing only single file
const singleFileUpload = async(req, res, next)=>{
    try {
        const file  = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)// bellow function
        };

        const insartFile = new singleFile(file);
        const savedFile = await insartFile.save();
        console.log('file___:', savedFile);
        res.status(201).send("file uploaded successfully");
    } catch (error) {
        res.status(400).send(error.message)
    }

}
// for choosing only multiple  file
const multipleFileUpload = async(req, res, next)=>{
    try {
        // console.log(req.files);

        let fileArr = [];

        req.files.forEach((element)=>{
            const file = {
            fileName: element.originalname,
            filePath: element.path,
            fileType: element.mimetype,
            fileSize: fileSizeFormatter(element.size, 2)// bellow function
            }
            fileArr.push(file);
        })
        // console.log('fileArray = ', fileArr);

        // saving data
        const multipleFileData = new multipleFile({
            title: req.body.title,
            files: fileArr
        })
        const save_m_FileData = await multipleFileData.save();
        console.log(save_m_FileData);

        res.status(201).send("file uploaded successfully");
    } catch (error) {
        res.status(400).send(error.message)
    }

}

    // get all single file📌
    const getAllSingleFiles = async(req, res, next)=>{
        try {
            const file = await singleFile.find();
            console.log("all singlefile___:", file);

            res.status(200).send(file);
        } catch (error) {
            res.status(400).send(error.message)
        }
    
    }
   

    // get all multiple files📌
    const getAllMultipleFiles = async(req, res, next)=>{
        try {
            const file = await multipleFile.find();
            console.log("all singlefile___:", file);

            res.status(200).send(file);
        } catch (error) {
            res.status(400).send(error.message)
        }
    
    }

        




// convert file size in kb, mb etc
const fileSizeFormatter = (bytes, decimal)=>{
    if(bytes===0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];

    const index = Math.floor(Math.log(bytes)/ Math.log(1000));
    return parseFloat((bytes/ Math.pow(1000, index)).toFixed(dm)) +' '+sizes[index];
}

module.exports = {
    singleFileUpload,
    multipleFileUpload,
    getAllSingleFiles,
    getAllMultipleFiles
}