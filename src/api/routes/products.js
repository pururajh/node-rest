const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AuthCheck = require('../middleware/auth-check');
const Product = require('../module/product.js');

router.get('/', AuthCheck, (req, res, next)=>{
    Product.find().exec().then(doc => {
        console.log('Find all data',doc);
        if(doc.length>=0){
            res.status(200).json(doc);
        } else {
            res.status(200).json({
                message:'no data'
            });
        } 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(doc);
    });
    /*res.status(200).json({
        message: 'Get request invoked'
    })*/
});

router.get('/:prodId', AuthCheck, (req, res, next)=>{
    const prodId = req.params.prodId;
    Product.findById(prodId).exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error:err });
    });
});

router.post('/', AuthCheck, (req, res, next)=>{
    /*const prod = {
        prodcd: req.body.prodcd,
        name: req.body.name,
        price: req.body.price
    };*/
    
    const prod = new Product({
        _id: new mongoose.Types.ObjectId(),
        prodcd:req.body.prodcd,
        name: req.body.name,
        price: req.body.price
    });
    prod.save().then(result =>{
        console.log('Inserting data to mongo',result); 
        res.status(201).json({
            message: 'Post request invoked',
            Product: prod
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            message: 'Error in inserting data'
        })
    });
});

router.patch('/:prodId', AuthCheck, (req, res, next)=>{
    const id = req.params.prodId;
    const updateOps = {};
    for( const ops of req.body){
        updateOps[ops.propName]=ops.propValue;
    }
    //for raw update assignment
    /*Product.update({_id: id}, {$set: {name:req.body.newName, price:req.body.newPrice}}).exec().then({
    })*/
    //for dynamic update assignment
    Product.update({_id: id}, {$set: updateOps}).exec().then(result =>{
        console.log('Updated necessary values', result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    /*res.status(200).json({
        message: 'Requested for updates'
    })*/
});

router.delete('/:prodId', AuthCheck, (req, res, next)=>{
    const id = req.params.prodId;
    Product.remove({_id:id}).exec().then(result => {
        console.log('Deleting data from mongo',result); 
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    /*res.status(200).json({
        message: 'Requested for deletes'
    })*/
});


module.exports = router;