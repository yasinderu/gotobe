const Post = require('../models/post');

exports.post_create = (req, res, next) => {
	if (!req.body) {
		return res.status(500).json({
			message: 'Content cannot be empty',
		});
	}
	const newPost = new Post(req.body);
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
		res.status(200).json({
			value: data,
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
		res.status(200).json({
			value: data,
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
