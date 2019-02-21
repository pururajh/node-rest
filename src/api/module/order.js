const mongoose = require('mongoose');
const Product = require('./product');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: Product},
    quantity: {type: Number, required:  true}
});
module.exports = mongoose.model('Order', orderSchema);