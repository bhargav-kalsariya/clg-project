const { User } = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");

const getUserDetailsHandler = async (req, res) => {

    try {

        const currentUserId = req._id;
        const currentUser = await User.findById(currentUserId);

        return res.send(Success(200, { currentUser }));

    } catch (error) {

        return res.send(Failure(500, "user not found" + error.message));

    }

};

module.exports = {

    getUserDetailsHandler

}