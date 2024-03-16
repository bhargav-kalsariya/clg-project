const router = require('express').Router();
const UserController = require('../Controllers/UserController');
const AuthoraizedUser = require('../Middlewares/AuthoraizedUser');

router.get('/details', AuthoraizedUser, UserController.getUserDetailsHandler);

module.exports = router;