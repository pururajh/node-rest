const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prodcd: String,
    name: String,
    price: Number
});
module.exports = mongoose.model('Product', prodSchema);