const Post = require('../models/post');
const fs = require('fs');
const imgUrl = 'http://localhost:3000/posts/files/';
const fileDir = __basedir + '/uploads/';

exports.post_create = (req, res, next) => {
	if (!req.body) {
		return res.status(500).json({
			message: 'Content cannot be empty',
		});
	}
	const newPost = new Post({
		title: req.body.title,
		description: req.body.description,
		img: req.file.filename,
		categoryId: req.body.categoryId,
		author: req.body.author,
		lat: req.body.lat,
		lng: req.body.lng,
		userId: req.body.userId,
	});

	console.log(newPost);

	Post.create(newPost, (err, data) => {
		if (err) {
			return res.status(200).json({
				message: err,
			});
		}
		res.status(200).json({
			message: 'Post created',
			value: data,
		});
	});
};

exports.post_getAll = (req, res, next) => {
	Post.getAll((err, data) => {
		if (err) {
			return res.status(500).json({
				message: err,
			});
		}
		const postData = [...data];
		for (let key in postData) {
			postData[key].img = { name: postData[key].img, url: imgUrl + postData[key].img };
		}
		res.status(200).json({
			value: postData,
		});
	});
};

exports.post_findByUserId = (req, res, next) => {
	Post.findByUserId(req.query.userId, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err,
			});
		}
		res.status(200).json({
			value: data,
		});
	});
};

exports.post_findByCategoryAndUserId = (req, res, next) => {
	Post.findByCategoryAndUserId(req.query.categoryId, req, query.userId, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err,
			});
		}
		res.status(200).json({
			value: data,
		});
	});
};

exports.post_findById = (req, res, next) => {
	Post.findById(req.params.postId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				return res.status(404).json({
					message: 'Post not found',
				});
			}
			return res.status(500).json({
				message: err,
			});
		}
		res.status(200).json({
			value: data,
		});
	});
};

exports.post_findByCategoryId = (req, res, next) => {
	Post.findByCategoryId(req.query.categoryId, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: err,
			});
		}
		const postData = [...data];
		for (let key in postData) {
			postData[key].img = { name: postData[key].img, url: imgUrl + postData[key].img };
		}
		res.status(200).json({
			value: postData,
		});
	});
};

exports.post_updateById = (req, res, next) => {
	if (!req.body) {
		return res.status(500).json({
			message: 'Content cannot be empty',
		});
	}
	const newPost = new Post(req.body);
	delete newPost.postId;
	Post.updateById(req.body.postId, newPost, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				return res.status(404).json({
					messasge: 'Post not found',
				});
			}
			return res.status(500).json({
				message: err,
			});
		}
		res.status(200).json({
			message: 'Success update post',
			value: data,
		});
	});
};

exports.post_remove = (req, res, next) => {
	Post.remove(req.params.postId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				return res.status(404).json({
					message: 'Post not found',
				});
			}
			return res.status(500).json({
				message: err,
			});
		}
		res.status(200).json({
			message: 'Success delete post',
			value: data,
		});
	});
};

exports.post_show_img = (req, res, next) => {
	fs.readFile(fileDir + req.params.filename, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: 'File does not exist',
			});
		}
		res.writeHead(200, { 'Content-Type': 'image/jpeg' || 'image/png' });
		res.write(data);
		return res.end();
	});
};
