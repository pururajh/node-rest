const mongoose = require('mongoose');
const Product = require('./product.js');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ordercd: String,
    product: Product,
    price: Number
});
module.exports = mongoose.model('Order', orderSchema);