const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const REQUIRED_PASSWORD_LENGTH = 8;

let subBrandSchema = mongoose.Schema({value: String}, { _id: false });
let subColorSchema = mongoose.Schema({value: String}, { _id: false });
let subSizeSchema = mongoose.Schema({value: String}, { _id: false });

let ProductSchema = new Schema({
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    rating: { type: Number, required: true },
    quantity: { type: Number, required: true },
    product_discount: { type: Number, default: 0 },
    category_type: { type: String, required: true },
    product_type: { type: String, required: true },
    product_gender: { type: String, required: true },
    sale_or_new: { type: String },

    product_brand: [subBrandSchema],
    product_color: [subColorSchema],
    product_size: [subSizeSchema],

    created_by: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: { unique: true }
    },
    created_at: Date,
    updated_at: Date
}, { versionKey: false });

module.exports = mongoose.model('Product', ProductSchema);