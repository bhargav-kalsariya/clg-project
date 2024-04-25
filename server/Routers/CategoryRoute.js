const router = require('express').Router();
const CategoryController = require('../Controllers/CategoryController');
const AuthoraizedUser = require('../Middlewares/AuthoraizedUser');
const isAdmin = require('../Middlewares/isAdmin');

router.get('/', AuthoraizedUser, CategoryController.getAllCategoiesHandler);
router.post('/create', AuthoraizedUser, isAdmin, CategoryController.createCategoryHandler);
router.delete('/delete/:categoryId', AuthoraizedUser, isAdmin, CategoryController.deleteCategoryHandler);


module.exports = router;