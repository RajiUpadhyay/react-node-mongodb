const express = require('express');
const router = express.Router();

const auth = require('../middleware/AuthMiddleware');
const adminController = require('../controllers/AdminController');

/***************************************************************************
 * POST & PUSH API
 * ***************************************************************************/
router.post('/category/create', auth.loginRequired, adminController.insertCategory);
router.post('/color/create', auth.loginRequired, adminController.insertColor);
router.post('/size/create', auth.loginRequired, adminController.insertSize);
router.post('/country/create', auth.loginRequired, adminController.insertCountry);
router.post('/state/create', auth.loginRequired, adminController.insertState);
router.post('/city/create', auth.loginRequired, adminController.insertCity);
router.post('/brand/create', auth.loginRequired, adminController.insertBrand);
router.post('/product-type/create', auth.loginRequired, adminController.insertProductType);
router.post('/product/create', auth.loginRequired, adminController.insertProduct);

/***************************************************************************
 * GET API
 * ***************************************************************************/
router.get('/category/list', adminController.categoryList);
router.get('/product-type/list', adminController.productTypeList);
router.get('/color/list', adminController.colorList);
router.get('/size/list', adminController.sizeList);
router.get('/country/list', adminController.countryList);
router.get('/state/list', adminController.stateList);
router.get('/city/list', adminController.cityList);
router.get('/brand/list', adminController.brandList);
router.get('/product/list', adminController.productList);

/***************************************************************************
 * DELETE API
 * ***************************************************************************/
router.delete('/category/delete', auth.loginRequired, adminController.deleteDocument);
router.delete('/product-type/delete', auth.loginRequired, adminController.deleteDocument);
router.delete('/color/delete', auth.loginRequired, adminController.deleteDocument);
router.delete('/size/delete', auth.loginRequired, adminController.deleteDocument);
router.delete('/country/delete', auth.loginRequired, adminController.deleteDocument);
router.delete('/state/delete', auth.loginRequired, adminController.deleteDocument);
router.delete('/city/delete', auth.loginRequired, adminController.deleteDocument);
router.delete('/brand/delete', auth.loginRequired, adminController.deleteDocument);
router.delete('/product/delete', auth.loginRequired, adminController.deleteDocument);

module.exports = router;
