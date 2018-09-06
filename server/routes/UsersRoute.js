const express = require('express');
const router = express.Router();

const auth = require('../middleware/AuthMiddleware');
const usersController = require('../controllers/UsersController');

router.post('/create', usersController.createUser);
router.post('/login', usersController.login);
router.get('/current-user', auth.loginRequired, usersController.currentUser);
router.put('/change-password', auth.loginRequired, usersController.changePassword);
router.post('/address/create', auth.loginRequired, usersController.createAddress);

module.exports = router;
