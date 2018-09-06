const adminService = require('../services/AdminService');
/***************************************************************************
 * POST/PUT API
 * ***************************************************************************/
exports.insertCategory = (req, res) => adminService.insertCategory(req.body).then(data => res.send(data));
exports.insertColor = (req, res) => adminService.insertColor(req.body).then(data => res.send(data));
exports.insertSize = (req, res) => adminService.insertSize(req.body).then(data => res.send(data));
exports.insertCountry = (req, res) => adminService.insertCountry(req.body).then(data => res.send(data));
exports.insertState = (req, res) => adminService.insertState(req.body).then(data => res.send(data));
exports.insertCity = (req, res) => adminService.insertCity(req.body).then(data => res.send(data));
exports.insertBrand = (req, res) => adminService.insertBrand(req.body).then(data => res.send(data));
exports.insertProduct = (req, res) => adminService.insertProduct(req).then(data => res.send(data));
exports.insertProductType = (req, res) => adminService.insertProductType(req.body).then(data => res.send(data));

/***************************************************************************
 * GET API
 * ***************************************************************************/
exports.categoryList = (req, res) => adminService.categoryList(req.query).then(list => res.send(list));
exports.productTypeList = (req, res) => adminService.productTypeList(req.query).then(list => res.send(list));
exports.sizeList = (req, res) => adminService.sizeList(req.query).then(list => res.send(list));
exports.colorList = (req, res) => adminService.colorList(req.query).then(list => res.send(list));
exports.countryList = (req, res) => adminService.countryList(req.query).then(list => res.send(list));
exports.stateList = (req, res) => adminService.stateList(req.query).then(list => res.send(list));
exports.cityList = (req, res) => adminService.cityList(req.query).then(list => res.send(list));
exports.brandList = (req, res) => adminService.brandList(req.query).then(list => res.send(list));
exports.productList = (req, res) => adminService.productList(req.query).then(list => res.send(list));

/***************************************************************************
 * DELETE API
 * ***************************************************************************/
exports.deleteDocument = (req, res) => adminService.deleteDocument(req.body).then(response => res.send(response));