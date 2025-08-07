const router = require('express').Router();
const adminAuth = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const { register, login } = require('../controllers/adminController');
const { createProduct } = require('../controllers/productController');

router.post('/register', register);
router.post('/login', login);
router.post('/products', adminAuth, adminOnly, createProduct);

module.exports = router;