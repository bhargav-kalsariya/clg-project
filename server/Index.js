const express = require('express');
const connect = require("./Configs/Database");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config('./.env');
connect();

const app = express();
const port = process.env.PORT || 3000;
const MainRoute = require('./Routers/MainRoute');

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use('/api', MainRoute);

app.listen(port, () => {

    console.log('listening on port ' + port);

});