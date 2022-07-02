
import React,{useState, useEffect} from 'react';
import './App.css';
import { gettingSingleFileData, gettingMultipleFileData } from './data/api';
import FileUploadScreen from './screens/FileUploadScreen';


function App() {
  const [getSingleFile, setGetSingleFile] = useState([]);
  const [getMultipleFile, setGetMultipleFile] = useState([]);


  //📌📌📌
  const  get_Single_File_Data_list = async()=>{
      try {
          const fileslist = await gettingSingleFileData();
          setGetSingleFile(fileslist);
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    get_Single_File_Data_list();
    
  }, []);


//📌📌📌
  const  get_Multiple_File_Data_list = async()=>{
      try {
          const fileslist = await gettingMultipleFileData();
          setGetMultipleFile(fileslist);
      } catch (error) {
          console.log(error);
      }
  }

  // use effect
  useEffect(() => {
    get_Single_File_Data_list();
    get_Multiple_File_Data_list();

    
  }, []);

  return (
    <>
    <div className="container">
      <h3 className="text-center text-danger font-weight-bolder pt-5 "> Single and Multiple file uploaded in this course</h3>
      <hr className="w-50 mx-auto"/>
      <FileUploadScreen
       getSingle={()=>{get_Single_File_Data_list()}}  getMultiple={()=>{get_Multiple_File_Data_list()}}/>
    </div>   

    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-6">
          <h4 className="text-weight-success text-danger">Single File List</h4>
          <div className="row">
            {getSingleFile.map((file, index)=>{
                return <div className="col-6" key={file._id}>
                  <div className="card mb-2 p-0 border-0">
                    <img src={`http://localhost:8080/${file.filePath}`} className="card-image-top img-responsive" height={200} alt="imgError" />
                  </div>
                </div>
            })}
          </div>
        </div>

        <div className="col-6">
          <h4 className="text-weight-success text-danger">Multiple File List</h4>
            {getMultipleFile.map((element, index)=>
              <div key={element._id}>
                <div className="card mb-2 p-0 border-0">
                  <h5>{element.title}</h5>
                    <div className="row">
                      {element.files.map((e, idx)=>
                          <div className="col-6" key={e.filePath}>
                            <div className="card mb-2 p-0 border-0">
                              <img src={`http://localhost:8080/${e.filePath}`} className="card-image-top img-responsive" height={200} alt="imgError" />
                            </div>
                        </div>
                      )}
                    </div>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
    </>
  );
}

export default App;
