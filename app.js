const express = require('express');
const app = express();
var cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

global.__basedir = __dirname;

const userRoutes = require('./app/routes/user');
const categoryRoutes = require('./app/routes/category');
const postRoutes = require('./app/routes/post');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.headers === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to goto API' });
});

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
