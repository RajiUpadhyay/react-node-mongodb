const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ColorSchema = new Schema({
    color_name: { type: String, required: true },
    color_code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: { unique: true }
    }
});

module.exports = mongoose.model('Color', ColorSchema);