const sql = require('./db');

const Category = function (category) {
	this.title = category.title;
};

Category.create = (newCategory, result) => {
	sql.query('INSERT INTO categories SET ? ', newCategory, (err, res) => {
		if (err) {
			console.log('error', err);
			result(err, null);
			return;
		}
		console.log('created category : ', { id: res.insertId, ...newCategory });
		return result(null, { id: res.insertId, ...newCategory });
	});
};

Category.getAll = result => {
	sql.query('SELECT * FROM categories', (err, res) => {
		if (err) {
			console.log('error', err);
			result(err, null);
			return;
		}
		console.log('categories : ', res);
		return result(null, res);
	});
};

Category.findByTitle = (category, result) => {
	sql.query(`SELECT * FROM categories WHERE title = '${category.title}'`, (err, res) => {
		if (err) {
			console.log('error', err);
			result(err, null);
			return;
		}
		if (res.length) {
			console.log('category found : ', res[0]);
			result(null, res[0]);
			return;
		}
		return result({ kind: 'not_found' }, null);
	});
};

Category.findById = (id, result) => {
	sql.query(`SELECT * FROM categories WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log('error', err);
		}
		if (res.length) {
			console.log('category found : ', res[0]);
			return result(null, res[0]);
		}
		return result({ kind: 'not_found' }, null);
	});
};

Category.updateById = (id, category, result) => {
	sql.query(
		'UPDATE categories SET title = ? WHERE id = ?',
		[category.title, id],
		(err, res) => {
			if (err) {
				console.log('error', err);
				result(null, err);
				return;
			}
			if (res.affectedRows === 0) {
				result({ kind: 'not_found' }, null);
				return;
			}
			console.log('updated category : ', { id: id, ...category });
			return result(null, { id: id, ...category });
		}
	);
};

Category.remove = (id, result) => {
	sql.query(`DELETE FROM categories WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log('error', err);
			result(null, err);
			return;
		}
		if (res.affectedRows === 0) {
			result({ kind: 'not_found' }, null);
			return;
		}
		console.log('deleted category with Id : ', { id: id });
		return result(null, res);
	});
};

module.exports = Category;
