const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const { register, login } = require('../controllers/adminController');
const { createProduct } = require('../controllers/productController');
const { validateRegister, validateLogin } = require('../validators/adminValidator');


router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/products', auth, adminOnly, createProduct);

module.exports = router;