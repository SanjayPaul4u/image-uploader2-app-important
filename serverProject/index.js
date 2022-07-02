'usestrict';
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const fileRouter= require('./routes/file-upload-routes');

require('./database')();

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', fileRouter.routes);


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
}) 

