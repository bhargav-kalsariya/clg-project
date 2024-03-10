const router = require('express').Router();
const ProductController = require('../Controllers/ProductController');
const AuthoraizedUser = require('../Middlewares/AuthoraizedUser');

router.get('/', AuthoraizedUser, ProductController.getAllProductsHandler);

module.exports = router;