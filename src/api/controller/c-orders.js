const mongoose = require('mongoose');
const Order = require('../module/order');

exports.orders_get_all = (req, res, next)=>{
    Order.find()
    .populate('product')
    .exec().then(result=>{
        console.log(result);
        res.status(200).json({
            message: 'All order found successfully',
            result: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'all order query failure'
        });
    });
};

exports.orders_get_by_id = (req, res, next)=>{
    const orderId = req.params.orderId;
    Order.findById({_id: orderId}).exec().then(result=>{
        console.log(result);
        res.status(200).json({
            message: 'Request found successfully'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Request query failure'
        });
    });
};

exports.orders_create = (req, res, next)=>{
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Order created successfully',
            OrderResponse: order
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Order creation failure'
        });
    });
};

exports.orders_update_by_id =(req, res, next)=>{
    const orderId = req.body.orderId;
    const updateOps = {};
    for( const ops of req.body){
        updateOps[ops.propName]=ops.propValue;
    }
    Order.update({_id:orderId}, {$set: updateOps}).exec().then(result=>{
        console.log(result);
        res.status(200).json({
            message: 'Order updated successfully'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Order update failure'
        });
    });
};

exports.orders_delete_by_id = (req, res, next)=>{
    const orderId = req.body.orderId;
    Order.remove({_id:orderId}).exec().then(result=>{
        console.log(result);
        res.status(200).json({
            message: 'Order deleted successfully'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Order delete failure'
        });
    });
};
