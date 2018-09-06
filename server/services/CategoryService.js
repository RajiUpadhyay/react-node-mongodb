const mongoose = require('mongoose');
const path = require('path');

const Category = require('../models/CategoryModel');
const ProductType = require('../models/ProductTypeModel');
const Color = require('../models/ColorModel');
const Size = require('../models/SizeModel');
const Country = require('../models/CountryModel');
const State = require('../models/StateModel');
const City = require('../models/CityModel');
const Brand = require('../models/BrandModel');
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
exports.productCount = (query) => {
    return new Promise((resolve, reject) => {
        const countObject = {};
        Category.find({}, (err, categoryList) => {
            if (err) return reject(err);

            categoryList.forEach((cat, index) => {
                Product.find({ category_type: cat._id }, (err, products) => {
                    if (err) return reject(err);
                    countObject[cat._id] = products.length

                    if (categoryList.length === Object.keys(countObject).length) {
                        resolve(countObject);
                    }
                });
            });
        })
    });
}

exports.categoryProductList = (query) => {
    const queryObject = {};

    queryObject.category_type = query.category_type;
    if (query.product_type) queryObject.product_type = query.product_type;

    if (query.product_brand) {
        queryObject.product_brand = {
            $elemMatch: { "value": { $in: (query.product_brand || '').split(',') } }
        }
    }

    if (query.product_color) {
        queryObject.product_color = {
            $elemMatch: { "value": { $in: (query.product_color || '').split(',') } }
        }
    }

    if (query.product_size) {
        queryObject.product_size = {
            $elemMatch: { "value": { $in: (query.product_size || '').split(',') } }
        }
    }

    return new Promise((resolve, reject) => {
        Product.find(queryObject, '', { skip: +query.skip || 0, limit: +query.limit }, (err, list) => {
            if (err) return reject(err);
            resolve({ list });
        });
    });
}

/***************************************************************************
 * DELETE API CALLS
 * ***************************************************************************/