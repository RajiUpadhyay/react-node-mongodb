const express = require('express');
const router = express.Router();

const auth = require('../middleware/AuthMiddleware');
const productController = require('../controllers/ProductController');

router.get('/single', productController.singleProduct);

module.exports = router;
