

const axios = require('axios');

const apiUrl = 'http://localhost:8080/api/';

export const singleFileUpload = async (data, options)=>{
    try {
        await axios.post(apiUrl+'singleFile', data, options)
    } catch (error) {
        throw error;
    }
}

export const gettingSingleFileData = async ()=>{
    try {
        const {data}  =await axios.get(apiUrl+'allsinglefile');
        return data;
    } catch (error) {
        throw error;
    }
}

export const multipleFileUpload = async (data, options)=>{
    try {
        await axios.post(apiUrl+'multipleFiles', data, options)
    } catch (error) {
        throw error;
    }
}

export const gettingMultipleFileData = async ()=>{
    try {
        const {data}  =await axios.get(apiUrl+'allmultiplefile');
        return data;
    } catch (error) {
        throw error;
    }
}