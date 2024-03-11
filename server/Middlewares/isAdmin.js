const { User } = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");

module.exports = async (req, res, next) => {

    const currentUser = req._id;
    const verifiedUser = await User.findById(currentUser);

    if (!verifiedUser) {

        return res.send(Failure(404, 'User not found'));

    }

    if (verifiedUser.isAdmin) {

        return next();

    } else {

        return res.send(Success(200, 'you are not admin'));

    }

};