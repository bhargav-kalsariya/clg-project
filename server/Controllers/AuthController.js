const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config('../.env');

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

        await User.create({
            name,
            email,
            password: securedPassword
        })

        return res.send(Success(201, 'user created successfully'));

    }

    return res.send(Failure(403, 'User already exists with this email'));

}

const LoginHandler = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.send(Failure(404, 'email , password cannot be empty'));

    }

    try {

        const user = await User.findOne({ email: email }).select('+password');

        if (!user) {

            return res.send(Failure(404, 'user not found'));

        }

        const verifiedUser = await bcrypt.compare(password, user.password);

        if (!verifiedUser) {

            return res.send(Failure(403, 'Invalid password'));

        }

        const accessToken = generateAccessToken({ _id: user._id });
        const refreshToken = generateRefreshToken({ _id: user._id });

        res.cookie('jwt', refreshToken, {

            httpOnly: true,
            secure: true,

        });

        return res.send(Success(200, { accessToken }));

    } catch (error) {

        return res.send(Failure(500, { error }));

    }

}

const generateAccessToken = (data) => {

    try {

        const accessToken = jwt.sign(data, process.env.ACCESSTOEKN_PRIVATE_KEY, {
            expiresIn: '1d',
        });

        return accessToken;

    } catch (error) {

        return res.send(Failure(500, { error }));

    }

};

const generateRefreshToken = (data) => {

    try {

        const refreshToken = jwt.sign(data, process.env.REFRESHTOKEN_PRIVATE_KEY, {
            expiresIn: '1y',
        });

        return refreshToken;

    } catch (error) {

        return res.send(Failure(500, { error }));

    }

};

module.exports = {

    SignupHandler,
    LoginHandler

}