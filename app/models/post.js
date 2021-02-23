const sql = require('./db');

const Post = function (post) {
	this.title = post.title;
	this.description = post.description;
	this.img = post.img;
	this.category_id = post.categoryId;
	this.author = post.author;
	this.lat = post.lat;
	this.lng = post.lng;
	this.user_id = post.userId;
};

Post.create = (newPost, result) => {
	sql.query('INSERT INTO posts SET ?', newPost, (err, res) => {
		if (err) {
			console.log('error', err);
			result(null, err);
			return;
		}
		console.log('created post : ', { id: res.insertId, ...newPost });
		return result(null, { id: res.insertId, ...newPost });
	});
};

Post.getAll = result => {
	sql.query(
		'SELECT posts.title AS postTitle, posts.description, posts.img, posts.author, categories.title AS categoryTitle FROM posts INNER JOIN categories ON posts.category_id = categories.id',
		(err, res) => {
			if (err) {
				console.log('error', err);
				return result(err, null);
			}
			console.log('posts : ', res);
			return result(null, res);
		}
	);
};

Post.findByUserId = (userId, result) => {
	sql.query(`SELECT * FROM posts WHERE user_id = ${userId}`, (err, res) => {
		if (err) {
			console.log('error', err);
			result(err, null);
			return;
		}
		console.log('posts : ', res);
		return result(null, res);
	});
};

Post.findByCategoryId = (categoryId, result) => {
	sql.query(
		`SELECT posts.title AS postTitle, posts.description, posts.img, posts.author, categories.title AS categoryTitle FROM posts INNER JOIN categories ON posts.category_id = categories.id WHERE category_id = ${categoryId}`,
		(err, res) => {
			if (err) {
				console.log('error', err);
				return result(err, null);
			}
			console.log('posts : ', res);
			return result(null, res);
		}
	);
};

Post.findByCategoryAndUserId = (categoryId, userId, result) => {
	sql.query(
		`SELECT * FROM posts WHERE category_id = ${categoryId} && userId = ${userId}`,
		(err, res) => {
			if (err) {
				console.log('error', err);
				return result(err, null);
			}
			console.log('posts : ', res);
			return result(null, res);
		}
	);
};

Post.findById = (id, result) => {
	sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log('error', err);
			result(null, err);
			return;
		}
		if (res.length) {
			console.log('post : ', res[0]);
			result(null, res[0]);
			return;
		}
		return result({ kind: 'not_found' }, null);
	});
};

Post.updateById = (id, post, result) => {
	sql.query(
		`UPDATE posts SET title = ?, description = ?, img = ?, category_id = ?, author = ?, lat = ?, lng = ? WHERE id = ${id} && user_id = ${post.user_id}`,
		[
			post.title,
			post.description,
			post.img,
			post.category_id,
			post.author,
			post.lat,
			post.lng,
		],
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
			console.log('updated post : ', { id: id, ...post });
			return result(null, { id: id, ...post });
		}
	);
	console.log();
};

Post.remove = (id, result) => {
	sql.query(`DELETE FROM posts WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log('error', err);
			result(null, err);
			return;
		}
		if (res.affectedRows === 0) {
			result({ kind: 'not_found' }, null);
			return;
		}
		console.log('deleted post with id : ', id);
		return result(null, res);
	});
};

module.exports = Post;
