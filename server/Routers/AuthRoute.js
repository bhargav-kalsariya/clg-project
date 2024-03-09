const router = require('express').Router();
const AuthController = require('./../Controllers/AuthController');

router.post('/signup', AuthController.SignupHandler);
router.post('/login', AuthController.LoginHandler);

module.exports = router;