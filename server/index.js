
require('dotenv').config();
require('./database/mongoose').connect();
const express = require('express');

const cors = require('cors');
// for cookies
const cookieParser = require('cookie-parser');
// for uploading files
const fileUpload = require('express-fileupload');

// cloudinary for uploading image
const cloudinary = require('cloudinary');

// port
const {PORT} = process.env;

// app
const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));

app.use(cors({
    origin: process.env.CLIENT_URL,
}));

// for cookie
app.use(cookieParser());
// for uploading files
app.use(fileUpload({
        useTempFiles: true,
        tempFileDir:"/tmp/",
    })
);

// cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

// routes
app.use('/',require('./routes'));

// listen server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));