const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../module/user');
const AuthCheck = require('../middleware/auth-check');
const config = require('../../config/config');


router.get('/', (req, res, next) => {
    User.find().exec().then(result => {
        console.log(result);
        if (result.length >= 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json({
                message: 'no data'
            });
        }
    })

});

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId).exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/signUp', (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length >= 1) {
            return res.status(422).json({
                message: 'Mail exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        userName: req.body.userName
                    });
                    user.save().then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created'
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            message: 'Error in creating user',
                            error: err
                        });
                    });
                }
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });

});

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length < 1) {
            console.log('user lengh->', user.length);
            return res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                } if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    config().secret,
                    {
                        expiresIn: '1d'
                    }
                    );
                    return res.status(200).json({ 
                        message: 'Auth successful',
                        token: token
                    });
                }
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

/*router.patch('/:orderId', (req, res, next)=>{
    res.status(200).json({
        message: 'Requested for updates-Order'
    })
});*/

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id }).exec().then(result => {
        console.log('Deleting data from mongo', result);
        res.status(200).json(result);
    }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    /*res.status(200).json({
        message: 'Requested for deletes'
    })*/
});



module.exports = router;