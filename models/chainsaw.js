const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chainsawSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Chainsaw = mongoose.model('Chainsaw', chainsawSchema);
module.exports = Chainsaw;