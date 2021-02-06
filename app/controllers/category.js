const Category = require('../models/category');

exports.category_create = (req, res, next) => {
	Category.findByTitle(req.body, (err, category) => {
		if (category) {
			return res.status(500).json({
				message: `Category with title ${req.body.title} already exists`,
			});
		}
		const newCategory = new Category({
			title: req.body.title,
		});
		Category.create(newCategory, (err, data) => {
			if (err) {
				res.status(500).json({
					message: err,
				});
			} else {
				res.status(200).json({
					message: 'Category created',
					value: data,
				});
			}
		});
	});
};

exports.category_getAll = (req, res, next) => {
	Category.getAll((err, categories) => {
		if (err) {
			return res.status(500).json({
				message: err,
			});
		}
		return res.status(200).json({
			value: categories,
		});
	});
};

exports.category_findById = (req, res, next) => {
	Category.findById(req.params.categoryId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				return res.status(404).json({
					message: 'Category not found',
				});
			}
		}
		return res.status(200).json({
			value: data,
		});
	});
};

exports.category_updateById = (req, res, next) => {
	Category.findByTitle(req.body, (err, category) => {
		if (category) {
			return res.status(500).json({
				message: `Category with title ${req.body.title} already exists`,
			});
		}
		const newCategory = new Category({
			title: req.body.title,
		});
		Category.updateById(req.body.categoryId, newCategory, (err, data) => {
			if (err) {
				if (err.kind === 'not_found') {
					return res.status(404).json({
						message: 'Category not found',
					});
				}
				return res.status(500).json({
					message: err,
				});
			}
			return res.status(200).json({
				message: 'Update category success',
				value: data,
			});
		});
	});
};

exports.category_remove = (req, res, next) => {
	Category.remove(req.params.categoryId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				return res.status(404).json({
					message: `Category with id ${req.params.categoryId} not found`,
				});
			}
			return res.status(500).json({
				message: err,
			});
		}
		return res.status(200).json({
			message: 'Remove category success',
		});
	});
};
