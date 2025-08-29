const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { validateAddToCart, validateRemoveFromCart } = require('../validators/cartValidator');


router.get('/', auth, getCart);
router.post('/add', auth, validateAddToCart, addToCart);
router.post('/remove', auth, validateRemoveFromCart, removeFromCart);

module.exports = router;