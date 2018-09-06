const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let BrandSchema = new Schema({
    brand_name: { type: String, required: true },
    product_type: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    category_type: {
        type: String,
        required: true,
        trim: true,
        index: true
    }
});

module.exports = mongoose.model('Brand', BrandSchema);