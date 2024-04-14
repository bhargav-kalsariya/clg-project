const express = require('express');
const connect = require("./Configs/Database");
const dotenv = require('dotenv');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

dotenv.config('./.env');
connect();

const app = express();
const port = process.env.PORT || 3000;
const MainRoute = require('./Routers/MainRoute');

app.use(express.json());
app.use(cookie_parser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use('/api', MainRoute);

app.listen(port, () => {

    console.log('listening on port ' + port);

});