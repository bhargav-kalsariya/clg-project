const router = require('express').Router();
const ProductController = require('../Controllers/ProductController');
const AuthoraizedUser = require('../Middlewares/AuthoraizedUser');
const isAdmin = require('../Middlewares/isAdmin');

router.get('/all', AuthoraizedUser, ProductController.getAllProductsHandler);
router.get('/:productId', AuthoraizedUser, ProductController.getParticularProductHandler);
router.post('/create', AuthoraizedUser, isAdmin, ProductController.createProductHandler);
router.get('/categoryWise/:categoryId', AuthoraizedUser, ProductController.getProductCategoryWiseHandler);
router.delete('/delete/:productId', AuthoraizedUser, isAdmin, ProductController.deleteProductHandler);

module.exports = router;