const mongoose = require('mongoose');
const Product = require('../module/product');

exports.products_get_all = (req, res, next)=>{
    Product.find()
        .select("prodcd name price")
        .exec()
        .then(docs => {
            if(docs.length>=0){
            const response = {
                count: docs.length,
                products: docs.map(doc =>{
                    return  {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "Get",
                            url: "http://localhost:3030/product/"+doc._id
                        }
                    }
                })
            }  
            res.status(200).json(response);
        } else {
            res.status(200).json({
                message:'no data'
            });
        } 
        console.log('Find all data',response);
        /*if(docs.length>=0){
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message:'no data'
            });
        } */
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(docs);
    });
    /*res.status(200).json({
        message: 'Get request invoked'
    })*/
};

exports.products_get_by_id = (req, res, next)=>{
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
};

exports.products_create =  (req, res, next)=>{
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
};

exports.products_update_by_id = (req, res, next)=>{
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
};

exports.products_delete_by_id = (req, res, next)=>{
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
};