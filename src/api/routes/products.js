const express = require('express');
const router = express.Router();
const AuthCheck = require('../middleware/auth-check');
const productController = require('../controller/c-products');

router.get('/', AuthCheck, productController.products_get_all);
router.get('/:prodId', AuthCheck, productController.products_get_by_id);
router.post('/', AuthCheck, productController.products_create);
router.patch('/:prodId', AuthCheck, productController.products_update_by_id);
router.delete('/:prodId', AuthCheck, productController.products_delete_by_id);

module.exports = router;