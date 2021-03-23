const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const PostController = require('../controllers/post');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get('/getByUser', checkAuth, PostController.post_findByUserId);

router.get('/getById/:postId', PostController.post_findById);

router.get(
	'/getByCategoryAndUserId',
	checkAuth,
	PostController.post_findByCategoryAndUserId
);

router.get('/getByCategory', PostController.post_findByCategoryId);

router.get('/', PostController.post_getAll);

router.post('/insertPost', checkAuth, upload.single('img'), PostController.post_create);

router.put('/updatePost', checkAuth, PostController.post_updateById);

router.delete('/deletePost/:postId', checkAuth, PostController.post_remove);

router.get('/files/:filename', PostController.post_show_img);

module.exports = router;
