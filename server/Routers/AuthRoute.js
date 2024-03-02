const router = require('express').Router();
const AuthController = require('./../Controllers/AuthController');

router.get('/signup', AuthController.SignupHandler);

module.exports = router;