const jwt = require('jsonwebtoken');

const { Failure } = require("../utilities/ResponseWrapper");
const { User } = require('../Models/UserSchema');

module.exports = async (req, res, next) => {

    if (
        !req.headers ||
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer')
    ) {

        return res.send(Failure(403, 'Authorization header is required'));

    };

    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) {

        return res.send(Failure(403, 'token is required'));

    }

    try {

        const verifiedToken = jwt.verify(accessToken, process.env.ACCESSTOEKN_PRIVATE_KEY);
        const verifiedUser = await User.findById(verifiedToken._id);

        if (!verifiedUser) {

            return res.send(Failure(404, 'User not found'));

        }

        req._id = verifiedToken._id;

        next();

    } catch (error) {

        return res.send(Failure(403, 'token is invalid'));

    }

};