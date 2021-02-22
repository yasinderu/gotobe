const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.get('/', UserControllers.user_getAll);

router.get('/:userId', checkAuth, UserControllers.user_findById);

router.post('/signup', UserControllers.user_signup);

router.post('/signin', UserControllers.user_login);

module.exports = router;
