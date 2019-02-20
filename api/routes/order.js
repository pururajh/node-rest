const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Get request invoked-Order'
    })
});

router.get('/:orderId', (req, res, next)=>{
    const orderId = req.params.orderId;
    if(orderId === 'simple'){
        res.status(200).json({
            message: 'You have food as order id'
        })
    } else{
        res.status(200).json({
            message: 'You just passed one id for order'
        })
    }
});

router.post('/', (req, res, next)=>{
    const order = {
        prodId: req.body.prodId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Post request invoked- Order',
        order: order
    })
});

router.patch('/:orderId', (req, res, next)=>{
    res.status(200).json({
        message: 'Requested for updates-Order'
    })
});

router.delete('/:orderId', (req, res, next)=>{
    res.status(200).json({
        message: 'Requested for deletes-Order'
    })
});


module.exports = router;