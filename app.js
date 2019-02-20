const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongo = require('mongodb');

//routers for the app
const prodRoute = require('./src/api/routes/product');
const orderRoute = require('./src/api/routes/order');

app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());
//body parser should be used before router. 
//if you use after it might say undeficed while reading body propertues
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

/*app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, Content-Type, Accept, Authorization");
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, PUT');
        return res.status(200).json({});
    }

});*/

app.use('/product', prodRoute);
app.use('/order', orderRoute);

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