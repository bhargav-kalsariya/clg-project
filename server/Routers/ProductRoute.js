const router = require('express').Router();
const ProductController = require('../Controllers/ProductController');
const AuthoraizedUser = require('../Middlewares/AuthoraizedUser');
const isAdmin = require('../Middlewares/isAdmin');

router.get('/', AuthoraizedUser, isAdmin, ProductController.getAllProductsHandler);

module.exports = router;