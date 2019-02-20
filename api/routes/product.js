const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Get request invoked'
    })
});

router.get('/:prodId', (req, res, next)=>{
    const prodId = req.params.prodId;
    if(prodId === 'food'){
        res.status(200).json({
            message: 'You have food as prod id'
        })
    } else{
        res.status(200).json({
            message: 'You just passed one id'
        })
    }
});

router.post('/', (req, res, next)=>{
    const prod = {
        productId: req.body.prodId,
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Post request invoked',
        product: prod
    })
});

router.patch('/:prodId', (req, res, next)=>{
    res.status(200).json({
        message: 'Requested for updates'
    })
});

router.delete('/:prodId', (req, res, next)=>{
    res.status(200).json({
        message: 'Requested for deletes'
    })
});


module.exports = router;