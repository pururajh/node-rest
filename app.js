const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');

//routers for the app
const prodRoute = require('./api/routes/product');
const orderRoute = require('./api/routes/order');

app.use(morgan('dev'));

app.use('/product', prodRoute);
app.use('/order', orderRoute);
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


//if above routes not found, can be used to check sanity too
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
    /*res.status(200).json ({
        message: 'node sanity server check'
    });*/
    
});
//error from application 
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {message: error.message}
    });
});
module.exports= app;