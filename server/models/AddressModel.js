const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let AddressSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    phone: { type: Number, required: true },
    city_name: { type: String, required: true },
    apartment: { type: String, required: true },
    street: { type: String, required: true },
    zip: { type: String, required: true },
    state_code: { type: String, required: true },
    country_code: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
});

module.exports = mongoose.model('Address', AddressSchema);