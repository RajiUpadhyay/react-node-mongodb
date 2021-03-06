const mongoose = require('mongoose');
const path = require('path');

const Product = require('../models/ProductModel');

/***************************************************************************
 * PRIVATE FUNCTIONS ONLY
 * ***************************************************************************/


/***************************************************************************
 * INSERT OR UPDATE INTO DATABASE API CALLS
 * ***************************************************************************/

/***************************************************************************
 * GET API CALLS
 * ***************************************************************************/
exports.singleProduct = (query) => {
    return new Promise((resolve, reject) => {
        Product.findOne(query, (err, product) => {
            if (err) return reject(err);
            resolve(product);
        });
    });
}

/***************************************************************************
 * DELETE API CALLS
 * ***************************************************************************/
