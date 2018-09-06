const categoryService = require('../services/CategoryService');
/***************************************************************************
 * POST/PUT API
 * ***************************************************************************/


/***************************************************************************
 * GET API
 * ***************************************************************************/
exports.productCount = (req, res) => categoryService.productCount(req.query).then(list => res.send(list));
exports.categoryProductList = (req, res) => categoryService.categoryProductList(req.query).then(list => res.send(list));

/***************************************************************************
 * DELETE API
 * ***************************************************************************/
