const { User } = require("../Models/UserSchema");
const { Success } = require("../utilities/ResponseWrapper");

const getAllProductsHandler = async (req, res) => {

    const user = await User.findById(req._id);

    return res.send(Success(200, { user }));

}

module.exports = {

    getAllProductsHandler

}