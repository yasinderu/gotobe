const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user');

router.get('/', UserControllers.user_getAll);

router.post('/signup', UserControllers.user_signup);

router.post('/signin', UserControllers.user_login);

module.exports = router;
