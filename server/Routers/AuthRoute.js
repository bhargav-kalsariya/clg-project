const router = require('express').Router();
const AuthController = require('./../Controllers/AuthController');

router.post('/signup', AuthController.SignupHandler);
router.post('/login', AuthController.LoginHandler);
router.get('/refresh', AuthController.refreshTokenHandler);
router.get('/logout', AuthController.logoutHandler);

module.exports = router;