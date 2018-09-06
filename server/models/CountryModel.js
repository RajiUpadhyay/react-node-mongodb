const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CountrySchema = new Schema({
    country_name: { type: String, required: true },
    country_code: { type: String, required: true }
});

module.exports = mongoose.model('Country', CountrySchema);