const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Your cart is empty" });
    }

    // Check stock
    for (let item of cart.items) {
      if (item.quantity > item.product.stock) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for ${item.product.name}` });
      }
    }

    // Reduce stock
    for (let item of cart.items) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    // Create order
    const order = new Order({
      user: userId,
      items: cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
      })),
      total: cart.items.reduce(
        (acc, i) => acc + i.product.price * i.quantity,
        0
      ),
    });

    await order.save();

    // Clear user's cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Admin updates order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "Cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid order status" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    order.updatedAt = new Date();
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
