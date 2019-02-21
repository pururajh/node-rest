const express = require('express');
const router = express.Router();
const AuthCheck = require('../middleware/auth-check');
const userController = require('../controller/c-users');

router.get('/', AuthCheck, userController.users_get_all);
router.get('/:userId', AuthCheck, userController.users_get_by_id);
router.post('/signUp', userController.users_signup);
router.post('/login', userController.users_login);
/*router.patch('/:orderId', (req, res, next)=>{
    res.status(200).json({
        message: 'Requested for updates-Order'
    })
});*/
router.delete('/:userId', userController.users_delete_by_id);

module.exports = router;