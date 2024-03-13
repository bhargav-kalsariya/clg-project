const router = require('express').Router();
const CartController = require('../Controllers/CartController');
const AuthoraizedUser = require('../Middlewares/AuthoraizedUser');

router.post('/addProduct', AuthoraizedUser, CartController.addProductToCartHandler);
router.delete('/removeProduct', AuthoraizedUser, CartController.removeProductFromCartHandler);

module.exports = router;