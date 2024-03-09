const User = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");

const SignupHandler = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        return res.send(Failure(404, 'name , email , password cannot be empty'));

    }

    const uniqueEmail = await User.findOne({ email: email });

    if (uniqueEmail) {

        return res.send(Failure(403, 'User already exists with this email'));

    }

    return res.send(Success(201, 'user saved securely'));

}

module.exports = {

    SignupHandler

}