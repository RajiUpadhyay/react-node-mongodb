const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let StateSchema = new Schema({
    state_name: { type: String, required: true },
    state_code: { type: String, required: true },
    country_code: { type: String, required: true }
});

module.exports = mongoose.model('State', StateSchema);