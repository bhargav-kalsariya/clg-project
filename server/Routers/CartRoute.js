const router = require('express').Router();
const CartController = require('../Controllers/CartController');
const AuthoraizedUser = require('../Middlewares/AuthoraizedUser');

router.post('/checkout', AuthoraizedUser, CartController.cartItemCheckoutHandler);

module.exports = router;