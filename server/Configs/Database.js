const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config('../.env');
const configrationUrl = process.env.DATABASEURL;

const connect = async () => {

    try {

        await mongoose.connect(configrationUrl);

    } catch (error) {

        process.exit(1);

    }

}

module.exports = connect;