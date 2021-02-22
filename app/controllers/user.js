const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const setExpireTime = hour => {
	return hour * 60 * 60;
};

exports.user_signup = (req, res, next) => {
	if (!req.body) {
		return res.status(400).json({
			message: 'Content cannot be empty',
		});
	}

	User.findEmail(req.body.email, (err, user) => {
		if (!user) {
			bcrypt.hash(req.body.password, 10, (error, hash) => {
				if (error) {
					res.status(500).json({
						error: error,
					});
				} else {
					const user = new User({
						name: req.body.name,
						email: req.body.email,
						username: req.body.username,
						password: hash,
					});
					User.create(user, (err, user) => {
						if (err) {
							res.status(500).json({
								message: err || 'Error occured while creating new user',
							});
						} else
							res.status(200).json({
								message: 'User created',
							});
					});
				}
			});
		} else {
			res.status(500).json({
				message: 'User already exists',
			});
		}
	});
};

exports.user_getAll = (req, res, next) => {
	User.getAll((err, data) => {
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

exports.user_findById = (req, res, next) => {
	User.findById(req.params.userId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				return res.status(404).json({
					message: 'User Not Found',
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

exports.user_login = (req, res, next) => {
	if (!req.body) {
		return res.status(400).json({
			message: 'Content cannot be empty',
		});
	}

	User.findEmail(req.body.email, (err, user) => {
		if (err) {
			if (err.kind === 'not_found') {
				return res.status(404).json({
					message: 'User not found',
				});
			}
			return res.status(500).json({
				message: err,
			});
		}

		bcrypt.compare(req.body.password, user.password, (error, result) => {
			if (error) {
				return res.status(401).json({
					message: 'Auth failed',
				});
			}
			if (result) {
				const token = jwt.sign(
					{
						email: user.email,
						userId: user.id,
					},
					process.env.JWT_KEY || 'secret',
					{
						expiresIn: '2h',
					}
				);
				return res.status(200).json({
					message: 'Auth success',
					value: {
						id: user.id,
						name: user.name,
						username: user.username,
						email: user.email,
					},
					token: { value: token, expiresIn: setExpireTime(2) },
				});
			}
			res.status(401).json({
				message: 'Auth Failed',
			});
		});
	});
};

exports.user_update = (req, res, next) => {
	if (!req.body) {
		return res.status(400).json({
			message: 'Content cannot be empty',
		});
	}

	User.updateById(req.body.id, new User(req.body), (err, user) => {
		if (err) {
			if (err.kind === 'not_found') {
				return res.status(404).json({
					message: 'User not found',
				});
			}
			return res.status(500).json({
				message: err,
			});
		}
		return res.status(200).json({
			message: 'Success update user',
			user: user,
		});
	});
};

exports.user_remove = (req, res, next) => {
	User.remove(req.params.id, (err, user) => {
		if (err) {
			if (err.kind === 'not_found') {
				return res.status(404).json({
					message: 'User not found',
				});
			}
			return res.status(500).json({
				message: err,
			});
		}
		return res.status(200).json({
			user: user,
		});
	});
};
