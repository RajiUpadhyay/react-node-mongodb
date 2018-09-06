const express = require('express');
const router = express.Router();

const auth = require('../middleware/AuthMiddleware');
const categoryController = require('../controllers/CategoryController');

router.get('/count', categoryController.productCount);
router.get('/product/list', categoryController.categoryProductList);

module.exports = router;
