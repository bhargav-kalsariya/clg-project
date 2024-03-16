const router = require('express').Router();
const AuthRoute = require('../Routers/AuthRoute');
const ProductRoute = require('../Routers/ProductRoute');
const CategoryRoute = require('../Routers/CategoryRoute');
const CartRoute = require('../Routers/CartRoute');
const UserRoute = require('../Routers/UserRoute');

router.use('/auth', AuthRoute);
router.use('/product', ProductRoute);
router.use('/category', CategoryRoute);
router.use('/cart', CartRoute);
router.use('/user', UserRoute);

module.exports = router;