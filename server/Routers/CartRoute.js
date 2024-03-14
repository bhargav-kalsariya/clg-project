const router = require('express').Router();
const CartController = require('../Controllers/CartController');
const AuthoraizedUser = require('../Middlewares/AuthoraizedUser');

router.post('/addProduct', AuthoraizedUser, CartController.addProductToCartHandler);
router.delete('/removeProduct', AuthoraizedUser, CartController.removeProductFromCartHandler);
router.put('/updateQuantity', AuthoraizedUser, CartController.updateProductQuantityHandler);

module.exports = router;