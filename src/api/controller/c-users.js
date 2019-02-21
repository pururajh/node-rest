const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../module/user');
const config = require('../../config/config');
//get all users
exports.users_get_all = (req, res, next) => {
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
};
//get users by id
exports.users_get_by_id = (req, res, next) => {
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
};
//user sign up
exports.users_signup = (req, res, next) => {
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

};
//user login
exports.users_login = (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
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
                } else {
                    return res.status(400).json({
                        message: 'password not correct'
                    });
                }
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

/*router.patch('/:orderId', (req, res, next)=>{
    res.status(200).json({
        message: 'Requested for updates-Order'
    })
});*/
//delete user by id
exports.users_delete_by_id = (req, res, next) => {
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
};