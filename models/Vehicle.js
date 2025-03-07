const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
