const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const PostController = require('../controllers/post');

router.get('/getByUser', checkAuth, PostController.post_findByUserId);

router.get('/getById/:postId', checkAuth, PostController.post_findById);

router.get(
	'/getByCategoryAndUserId',
	checkAuth,
	PostController.post_findByCategoryAndUserId
);

router.get('/getByCategory', checkAuth, PostController.post_findByCategoryId);

router.get('/', checkAuth, PostController.post_getAll);

router.post('/insertPost', checkAuth, PostController.post_create);

router.put('/updatePost', checkAuth, PostController.post_updateById);

router.delete('/deletePost/:postId', checkAuth, PostController.post_remove);

module.exports = router;
