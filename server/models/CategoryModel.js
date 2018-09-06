const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    category_type: { type: String, required: true }
});

module.exports = mongoose.model('Category', CategorySchema);