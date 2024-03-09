const bcrypt = require("bcrypt");

const { User } = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");

const SignupHandler = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        return res.send(Failure(404, 'name , email , password cannot be empty'));

    }

    const uniqueEmail = await User.findOne({ email: email });

    if (!uniqueEmail) {

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const securedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: securedPassword
        })

        return res.send(Success(201, { user }));

    }

    return res.send(Failure(403, 'User already exists with this email'));

}

const LoginHandler = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.send(Failure(404, 'email , password cannot be empty'));

    }

    const user = await User.findOne({ email: email }).select('password');

    if (!user) {

        return res.send(Failure(404, 'user not found'));

    }

    const verifiedUser = await bcrypt.compare(password, user.password);

    if (!verifiedUser) {

        return res.send(Failure(403, 'Invalid password'));

    }

    return res.send(Success(200, 'User login successful'));

}

module.exports = {

    SignupHandler,
    LoginHandler

}