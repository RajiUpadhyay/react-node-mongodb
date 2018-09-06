const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CitySchema = new Schema({
    city_name: { type: String, required: true },
    country_code: { type: String, required: true },
    state_code: { type: String, required: true }
});

module.exports = mongoose.model('City', CitySchema);