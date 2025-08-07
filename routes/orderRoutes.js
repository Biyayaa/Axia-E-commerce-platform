const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');

// User routes
router.post('/checkout', auth, placeOrder);
router.get('/my-orders', auth, getUserOrders);

// Admin routes
router.get('/all-orders', auth, adminMiddleware, getAllOrders);
router.put('/update/:orderId', auth, adminMiddleware, updateOrderStatus);

module.exports = router;