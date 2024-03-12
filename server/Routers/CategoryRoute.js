const router = require('express').Router();
const CategoryController = require('../Controllers/CategoryController');
const AuthoraizedUser = require('../Middlewares/AuthoraizedUser');
const isAdmin = require('../Middlewares/isAdmin');

router.get('/', AuthoraizedUser, CategoryController.getAllCategoiesHandler);
router.post('/create', AuthoraizedUser, isAdmin, CategoryController.createCategoryHandler);

module.exports = router;