const express = require('express');
const router = express.Router();
const orderController = require('../controller/c-orders');
const AuthCheck = require('../middleware/auth-check')

router.get('/', AuthCheck, orderController.orders_get_all);
router.get('/:orderId', AuthCheck, orderController.orders_get_by_id);
router.post('/', AuthCheck, orderController.orders_create);
router.patch('/:orderId', AuthCheck, orderController.orders_update_by_id);
router.delete('/:orderId', AuthCheck, orderController.orders_delete_by_id);

module.exports = router;