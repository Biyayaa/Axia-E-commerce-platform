const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', auth, productController.getAllProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.post('/', auth, adminMiddleware, productController.createProduct);
router.put('/:id', auth, adminMiddleware, productController.updateProduct);
router.delete('/:id', auth, adminMiddleware, productController.deleteProduct);

module.exports = router;