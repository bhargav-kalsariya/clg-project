const router = require('express').Router();
const AuthRoute = require('../Routers/AuthRoute');

router.use('/auth', AuthRoute);

module.exports = router;