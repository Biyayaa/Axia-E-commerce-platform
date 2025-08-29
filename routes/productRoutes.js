const express = require('express');
const router = express.Router();
const {getAllProducts, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { validateCreateProduct } = require('../validators/productValidator');


router.get('/', auth, getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.post('/', auth, adminMiddleware, validateCreateProduct, createProduct);
router.put('/:id', auth, adminMiddleware, updateProduct);
router.delete('/:id', auth, adminMiddleware, deleteProduct);

module.exports = router;