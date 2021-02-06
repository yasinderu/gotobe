const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const CategoryController = require('../controllers/category');

router.get('/', checkAuth, CategoryController.category_getAll);

router.post('/insertPost', checkAuth, CategoryController.category_create);

router.get('/:categoryId', checkAuth, CategoryController.category_findById);

router.put('/updateCategory', checkAuth, CategoryController.category_updateById);

router.delete(
	'/deleteCategory/:categoryId',
	checkAuth,
	CategoryController.category_remove
);

module.exports = router;
