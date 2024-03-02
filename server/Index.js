const express = require('express');
const connect = require("./Configs/Database");
const dotenv = require('dotenv');

dotenv.config('./.env');
connect();

const app = express();
const port = process.env.PORT || 3000;
const MainRoute = require('./Routers/MainRoute');

app.use(express.json());
app.use('/api', MainRoute);

app.listen(port, () => {

    console.log('listening on port ' + port);

});