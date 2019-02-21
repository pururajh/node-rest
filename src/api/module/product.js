const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prodcd: String,
    name: String,
    price: { type: Number, required: true }
});
module.exports = mongoose.model('Product', prodSchema);