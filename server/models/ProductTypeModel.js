const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ProductTypeSchema = new Schema({
    product_type: { type: String, required: true },
    category_type: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
});

module.exports = mongoose.model('Product-type', ProductTypeSchema);