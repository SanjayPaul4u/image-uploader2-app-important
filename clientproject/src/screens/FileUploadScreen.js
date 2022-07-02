import React,{useState} from 'react';
import { singleFileUpload } from '../data/api';
import { multipleFileUpload } from '../data/api';
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'


const FileUploadScreen = (props) => {
    const [singleFile, setSingleFile] = useState('');
    const [multipleFile, setMultipleFile] = useState('');
    const [title, setTitle] = useState('');
    const [singleProgress, setSingleProgress] = useState(0);
    const [multipleProgress, setMultipleProgress] = useState(0);


    // for progress 📌📌📌
    const singleFileProgressOption = {
        onUploadProgress: (progressEvent) =>{
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded/1000)*100) /(total/1000));
            setSingleProgress(percentage);
        }
    }
    const multipleFileProgressOption = {
        onUploadProgress: (progressEvent) =>{
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded/1000)*100) /(total/1000));
            setMultipleProgress(percentage);
        }
    }

    

    //SingleFileChange 📌📌📌
    const SingleFileChange=(e)=>{
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);
    }

    //uploadSingleFile 📌📌📌
    const uploadSingleFile =async()=>{
         // console.log(singleFile);


        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData, singleFileProgressOption);

        props.getSingle();
    }


    //MultipleFileChange 📌📌📌
    const MultipleFileChange=(e)=>{
        setMultipleFile(e.target.files);
        setMultipleProgress(0);
    }

    //uploadMultipleFile 📌📌📌
    const uploadMultipleFile = async()=>{
        const formData = new FormData()
        formData.append('title', title);
        for (let i = 0; i < multipleFile.length; i++) {
            formData.append('files', multipleFile[i]);            
        }
      
        await multipleFileUpload(formData, multipleFileProgressOption);
        props.getMultiple();
    }




    

  return (
    <div className='row my-3'>
        <div className="col-md-6 col-xxl-6 col-6 mx-auto text-center bg-warning">
            <div className="form-group">
                <label className='mx-2'> Select Single File</label>
                    <input type="file" className='form-control' onChange={(e)=>{SingleFileChange(e)}}/>
            </div>
            <div className="row">
                <div className="col-10 col-md-10 col-xxl-10">
                    <button className="btn btn-outline-info my-2" onClick={()=>{uploadSingleFile()}}>Upload</button>
                </div>
                <div className="col-2">
                    <CircularProgressbar 
                    value={singleProgress} 
                    text={`${singleProgress}%`} 
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'butt',
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}/>
                
                </div>
            </div>
        </div>
        

        <div className="col-md-6 col-xxl-6 col-6 mx-auto text-center bg-info">
            <div className="row">
                {/* for title */}
                <div className="col-6">
                    <label>Title</label>
                    <input type="text" className='form-control' onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                {/* for select image */}
                <div className="col-6">
                    <div className="form-group">
                    <label className='mx-2'> Select Multiple Files</label>
                        <input type="file" className='form-control'multiple onChange={(e)=>{MultipleFileChange(e)}}/>{/* important here📌_______"multiple" */}
                    </div>
                    <div className="row">
                        <div className="col-8 col-md-8 col-xxl-8">
                            <button className="btn btn-outline-light my-2" onClick={()=>{uploadMultipleFile()}}>Upload</button>{/* important here📌_______"uploadMultipleFile()" */}
                        </div>
                        <div className="col-4">
                            <CircularProgressbar 
                            value={multipleProgress} 
                            text={`${multipleProgress}%`} 
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}/>
                        
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default FileUploadScreen