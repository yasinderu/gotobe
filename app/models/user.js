const sql = require('./db');

const User = function (user) {
	this.name = user.name;
	this.email = user.email;
	this.username = user.username;
	this.password = user.password;
};
User.create = (newUser, result) => {
	sql.query('INSERT INTO users SET ? ', newUser, (err, res) => {
		if (err) {
			console.log('error', err);
			result(err, null);
			return;
		}

		console.log('created user : ', { id: res.insertId, ...newUser });
		return result(null, { id: res.insertId, ...newUser });
	});
};

User.getAll = result => {
	sql.query('SELECT * FROM users', (err, res) => {
		if (err) {
			console.log('error', err);
			result(err, null);
			return;
		}
		console.log('users : ', res);
		return result(null, res);
	});
};

User.findEmail = (email, result) => {
	sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
		if (err) {
			console.log('error', err);
			result(err, null);
			return;
		}
		if (res.length) {
			console.log('user found : ', res[0]);
			result(null, res[0]);
			return;
		}
		return result({ kind: 'not_found' }, null);
	});
};

User.findById = (userId, result) => {
	sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
		if (err) {
			console.log('error', err);
			result(err, null);
			return;
		}
		if (res.length) {
			console.log('user found : ', res[0]);
			result(null, res[0]);
			return;
		}
		return result({ kind: 'not_found' }, null);
	});
};

User.updateById = (id, user, result) => {
	sql.query(
		'UPDATE users SET email = ?, name = ? WHERE id = ?',
		[user.email, user.name, id],
		(err, res) => {
			if (err) {
				console.log('error', err);
				result(err, null);
				return;
			}
			if (res.affectedRows === 0) {
				result({ kind: 'not_found' }, null);
				return;
			}
			console.log('updated user : ', { id: id, ...user });
			return result(null, { id: id, ...user });
		}
	);
};

User.remove = (id, result) => {
	sql.query(`DELETE FROM users WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log('error', err);
			result(err, null);
			return;
		}
		if (res.affectedRows === 0) {
			result({ kind: 'not_found' }, null);
			return;
		}
		console.log('deleted user with id : ', { id: id });
		return result(null, res);
	});
};

module.exports = User;
