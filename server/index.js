
require('dotenv').config();
require('./database/mongoose').connect();
const express = require('express');

const {PORT} = process.env;

const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));

app.use('/',require('./routes'));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));