const router = require('express').Router();
const AuthRoute = require('../Routers/AuthRoute');
const ProductRoute = require('../Routers/ProductRoute');
const CategoryRoute = require('../Routers/CategoryRoute');

router.use('/auth', AuthRoute);
router.use('/product', ProductRoute);
router.use('/category', CategoryRoute);

module.exports = router;