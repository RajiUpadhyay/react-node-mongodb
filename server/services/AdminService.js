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
const saveThumbImage = (thumbImages, sku, callback) => {
    thumbImages.forEach((image, index) => {
        const format = image.mimetype.split('/')[1];
        image.mv(`${path.join(__dirname, '../../public/product-images/thumbs/')}${sku}-${index}.${format}`, (err => {
            if (err) return reject(err);

            if (thumbImages.length - 1 === index) {
                callback();
            }
        }));
    });
};

/***************************************************************************
 * INSERT OR UPDATE INTO DATABASE API CALLS
 * ***************************************************************************/
exports.insertCategory = (body) => {
    return new Promise((resolve, reject) => {
        const { category_type } = body
        Category.findOne({ category_type }, (err, category) => {
            if (err) return reject({ error: err });
            if (!category) {
                let category = new Category;
                category.category_type = body.category_type;
                category.save((err, category) => {
                    if (err) return reject(err);
                    resolve({ category, success: { message: 'Category added successfully.' } });
                });
            } else {
                resolve({ failure: { message: `Category already exists with name: ${category.category_type}` } });
            }
        });
    });
}

exports.insertColor = (body) => {
    return new Promise((resolve, reject) => {
        Color.findOne({ color_code: body.color_code }, (err, color) => {
            if (err) return reject({ error: err });
            if (!color) {
                let color = new Color;
                color.color_name = body.color_name.toLowerCase();
                color.color_code = body.color_code.toLowerCase();
                color.save((err, color) => {
                    if (err) return reject(err);
                    resolve({ color, success: { message: 'Color added successfully.' } });
                });
            } else {
                resolve({ failure: { message: `Color already exists with name: ${color.color_name}` } });
            }
        });
    });
}

exports.insertSize = (body) => {
    return new Promise((resolve, reject) => {
        const { size_name, product_type, category_type } = body;
        Size.findOne({ size_name, product_type, category_type }, (err, size) => {
            if (err) return reject({ error: err });
            if (!size) {
                let size = new Size;
                size.size_name = body.size_name;
                size.product_type = body.product_type;
                size.category_type = body.category_type;
                size.save((err, size) => {
                    if (err) return reject(err);
                    resolve({ size, success: { message: 'Size added successfully.' } });
                });
            } else {
                resolve({ failure: { message: `Size already exists with name: ${size.size_name}` } });
            }
        });
    });
}

exports.insertCountry = (body) => {
    return new Promise((resolve, reject) => {
        Country.findOne({ country_code: body.country_code }, (err, country) => {
            if (err) return reject({ error: err });
            if (!country) {
                let country = new Country;
                country.country_name = body.country_name.toLowerCase();
                country.country_code = body.country_code.toUpperCase();
                country.save((err, country) => {
                    if (err) return reject(err);
                    resolve({ country, success: { message: 'Country added successfully.' } });
                });
            } else {
                resolve({ failure: { message: `Country already exists with name: ${country.country_name}` } });
            }
        });
    });
}

exports.insertState = (body) => {
    return new Promise((resolve, reject) => {
        State.findOne({ state_code: body.state_code, country_code: body.country_code }, (err, state) => {
            if (err) return reject({ error: err });
            if (!state) {
                let state = new State;
                state.state_name = body.state_name.toLowerCase();
                state.country_code = body.country_code.toUpperCase();
                state.state_code = body.state_code.toUpperCase();
                state.save((err, state) => {
                    if (err) return reject(err);
                    resolve({ state, success: { message: 'State added successfully.' } });
                });
            } else {
                resolve({ failure: { message: `State already exists with name: ${state.state_name}` } });
            }
        });
    });
}

exports.insertCity = (body) => {
    return new Promise((resolve, reject) => {
        City.findOne({ city_code: body.city_name, state_code: body.state_code, country_code: body.state_code }, (err, city) => {
            if (err) return reject({ error: err });
            if (!city) {
                let city = new City;
                city.state_code = body.state_code.toUpperCase();
                city.country_code = body.country_code.toUpperCase();
                city.city_name = body.city_name.toLowerCase();
                city.save((err, city) => {
                    if (err) return reject(err);
                    resolve({ city, success: { message: 'City added successfully.' } });
                });
            } else {
                resolve({ failure: { message: `City already exists with name: ${city.city_name}` } });
            }
        });
    });
}

exports.insertBrand = (body) => {
    return new Promise((resolve, reject) => {
        const { brand_name, product_type, category_type } = body;
        Brand.findOne({ brand_name, product_type, category_type }, (err, brand) => {
            if (err) return reject({ error: err });
            if (!brand) {
                let brand = new Brand;
                brand.brand_name = brand_name.toLowerCase();
                brand.product_type = product_type.toLowerCase();
                brand.category_type = category_type;
                brand.save((err, brand) => {
                    if (err) return reject(err);
                    resolve({ brand, success: { message: 'Brand added successfully.' } });
                });
            } else {
                resolve({ failure: { message: `Brand already exists with name: ${brand.brand_name}` } });
            }
        });
    });
}

exports.insertProductType = (body) => {
    return new Promise((resolve, reject) => {
        ProductType.findOne({ product_type: body.product_type, category_type: body.category_type }, (err, type) => {
            if (err) return reject({ error: err });
            if (!type) {
                let type = new ProductType;
                type.category_type = body.category_type;
                type.product_type = body.product_type;
                type.save((err, type) => {
                    if (err) return reject(err);
                    resolve({ type, success: { message: 'Product Type added successfully.' } });
                });
            } else {
                resolve({ failure: { message: `Product Type already exists with name: ${type.product_type}` } });
            }
        });
    });
}

exports.insertProduct = (req) => {
    const productBody = req.body;
    return new Promise((resolve, reject) => {
        Product.findOne({ sku: productBody.sku }, (err, product) => {
            if (err) return reject({ error: err });
            if (!product) {
                let product = new Product;
                product.product_name = productBody.product_name.toLowerCase();
                product.product_price = productBody.product_price;
                product.rating = productBody.rating;
                product.quantity = productBody.quantity;
                product.product_discount = productBody.product_discount;
                product.category_type = productBody.category_type;
                product.product_type = productBody.product_type.toLowerCase();
                product.product_gender = productBody.product_gender.toLowerCase();
                product.sale_or_new = productBody.sale_or_new.toLowerCase();

                product.product_brand = JSON.parse(productBody.product_brand).map(el => {
                    el.value = el.value.toLowerCase();
                    return el;
                });
                product.product_color = JSON.parse(productBody.product_color).map(el => {
                    el.value = el.value.toLowerCase();
                    return el;
                });
                product.product_size = JSON.parse(productBody.product_size).map(el => {
                    el.value = el.value.toLowerCase();
                    return el;
                });
                product.created_by = productBody.created_by.toLowerCase();
                product.sku = productBody.sku.toLowerCase();
                product.created_at = new Date;
                product.updated_at = new Date;

                product.save((err, product) => {
                    if (err) return reject(err);
                    const thumbFiles = [];
                    const mainFiles = [];
                    
                    req.files.thumb_image_0 && thumbFiles.push(req.files.thumb_image_0);
                    req.files.thumb_image_1 && thumbFiles.push(req.files.thumb_image_1);
                    req.files.thumb_image_2 && thumbFiles.push(req.files.thumb_image_2);
                    req.files.thumb_image_3 && thumbFiles.push(req.files.thumb_image_3);

                    req.files.product_image_0 && mainFiles.push(req.files.product_image_0);
                    req.files.product_image_1 && mainFiles.push(req.files.product_image_1);
                    req.files.product_image_2 && mainFiles.push(req.files.product_image_2);
                    req.files.product_image_3 && mainFiles.push(req.files.product_image_3);

                    mainFiles.forEach((productMainImage, index) => {
                        const mainImageFormat = productMainImage.mimetype.split('/')[1];
                        const imagePath = `${path.join(__dirname, '../../public/product-images/main/')}${productBody.sku}-${index}.${mainImageFormat}`;
                        
                        productMainImage.mv(imagePath, function (err) {
                            if (err) return reject(err);
                            if (mainFiles.length - 1 === index) {
                                saveThumbImage(thumbFiles, productBody.sku, () => {
                                    resolve({ success: { message: `Product Added Successfully` } });
                                });
                            }
                        });
                    })
                });
            } else {
                resolve({ failure: { message: `Product already exists with name: ${productBody.product_name}` } });
            }
        });
    });
}

/***************************************************************************
 * GET API CALLS
 * ***************************************************************************/
exports.categoryList = (query) => {
    const queryObject = {};
    return new Promise((resolve, reject) => {
        Category.find(queryObject, (err, list) => {
            if (err) return reject(err);
            resolve({ list });
        });
    });
}

exports.productTypeList = (query) => {
    const queryObject = {};
    if (query.category_type) queryObject['category_type'] = query.category_type;

    return new Promise((resolve, reject) => {
        if (query.distinct) {
            ProductType.distinct('product_type', {}).exec((err, list) => {
                if (err) return reject(err);
                resolve({ list: list.map(li => ({ product_type: li })) });
            });
        } else {
            ProductType.find(queryObject, (err, list) => {
                if (err) return reject(err);
                resolve({ list });
            });
        }

    });
}

exports.colorList = (query) => {
    const queryObject = {};
    return new Promise((resolve, reject) => {
        Color.find(queryObject, (err, list) => {
            if (err) return reject(err);
            resolve({ list });
        });
    });
}

exports.sizeList = (query) => {
    const queryObject = {...query};
    return new Promise((resolve, reject) => {
        Size.find(queryObject, (err, list) => {
            if (err) return reject(err);
            resolve({ list });
        });
    });
}

exports.countryList = (query) => {
    const queryObject = {...query};
    return new Promise((resolve, reject) => {
        Country.find(queryObject, (err, list) => {
            if (err) return reject(err);
            resolve({ list });
        });
    });
}

exports.stateList = (query) => {
    const queryObject = {...query};
    return new Promise((resolve, reject) => {
        State.find(queryObject, (err, list) => {
            if (err) return reject(err);
            resolve({ list });
        });
    });
}

exports.cityList = (query) => {
    const queryObject = {...query};
    return new Promise((resolve, reject) => {
        City.find(queryObject, (err, list) => {
            if (err) return reject(err);
            resolve({ list });
        });
    });
}

exports.brandList = (query) => {
    const queryObject = {};

    return new Promise((resolve, reject) => {
        let queryObject = {};

        if(query.product_type) queryObject.product_type = query.product_type;
        if(query.category_type) queryObject.category_type = query.category_type;

        console.log('=====>', queryObject)
        if (query.distinct) {
            Brand.find(queryObject).distinct('brand_name', (err, list) => {
                if (err) return reject(err);
                resolve({ list: list.map(li => ({ brand_name: li })) });
            });
        } else {
            Brand.find(queryObject, (err, list) => {
                if (err) return reject(err);
                resolve({ list });
            });
        }
    });
}

exports.productList = (query) => {
    if(query.product_brand) {
        query.product_brand = {
            $elemMatch: {"value": {$in: (query.product_brand || '').split(',')}}
        }
    }

    if(query.product_color) {
        query.product_color = {
            $elemMatch: {"value": {$in: (query.product_color || '').split(',')}}
        }
    }

    if(query.product_size) {
        query.product_size = {
            $elemMatch: {"value": {$in: (query.product_size || '').split(',')}}
        }
    }

    return new Promise((resolve, reject) => {
        Product.find(query, (err, list) => {
            if (err) return reject(err);
            resolve({ list });
        });
    });
}

/***************************************************************************
 * DELETE API CALLS
 * ***************************************************************************/
exports.deleteDocument = (query) => {
    console.log('test', query, query.model.split('-').map(el => el.replace(el[0], el[0].toUpperCase())).join(''))
    const queryObject = {};
    if(query._id) queryObject._id = query._id;
    return new Promise((resolve, reject) => {
        const modelName = query.model.split('-').map(el => el.replace(el[0], el[0].toUpperCase())).join('');
        eval(modelName).remove(queryObject, (err, list) => {
            if (err) return resolve({failure: {
                message: `Error occurred while deleting ${modelName}!`
            }});
            resolve({success: {
                message: `${modelName} deleted successfully.`
            }});
        });
    });
}