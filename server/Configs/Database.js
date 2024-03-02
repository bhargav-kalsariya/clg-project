const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config('../.env');
const configrationUrl = process.env.DATABASEURL;

const connect = async () => {

    try {

        await mongoose.connect(configrationUrl);
        console.log('connection secured');

    } catch (error) {

        console.log(error);

    }

}

module.exports = connect;