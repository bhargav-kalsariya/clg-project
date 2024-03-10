const router = require('express').Router();
const AuthRoute = require('../Routers/AuthRoute');
const ProductRoute = require('../Routers/ProductRoute');

router.use('/auth', AuthRoute);
router.use('/product', ProductRoute);

module.exports = router;