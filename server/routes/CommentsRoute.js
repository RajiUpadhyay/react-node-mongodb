const express = require('express');
const router = express.Router();

const auth = require('../middleware/AuthMiddleware');
const commentsController = require('../controllers/CommentsController');

router.get('/', auth.loginRequired, commentsController.getComments);
router.post('/create', auth.loginRequired, commentsController.createComment);
router.delete('/delete/:commentId', auth.loginRequired, commentsController.deleteComment);

module.exports = router;
