import Order from "../models/Order.js";
import Product from "../product/Product.js";

// POST /api/orders - Create a new order
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;
    const userId = req.user.id;

    // Update stock for each item in the order
    for (const item of orderItems) {
      const productId = item._id || item.productId;
      
      if (productId) {
        const product = await Product.findById(productId);
        
        if (product) {
          // Subtract the ordered quantity from stock
          product.countInStock = Math.max(0, product.countInStock - item.quantity);
          await product.save();
        }
      }
    }

    // Create the order
    const order = await Order.create({
      user: userId,
      orderItems: orderItems.map((item) => ({
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        productId: item._id || item.productId,
      })),
      shippingAddress,
      totalPrice,
      isPaid: true, // Assumed paid
      paidAt: Date.now(),
      status: "pending",
    });

    res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders - Get current user's orders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/:id - Get a specific order
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Check if the order belongs to the user
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to view this order." });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/orders/:id/cancel - Cancel an order
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Check if the order belongs to the user
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to cancel this order." });
    }

    // Check if order can be cancelled (only pending or processing)
    if (order.status === "shipped" || order.status === "delivered" || order.status === "cancelled") {
      return res.status(400).json({ message: "Order cannot be cancelled at this stage." });
    }

    // Restore stock for each item in the order
    for (const item of order.orderItems) {
      const productId = item.productId;
      
      if (productId) {
        const product = await Product.findById(productId);
        
        if (product) {
          // Add the ordered quantity back to stock
          product.countInStock = product.countInStock + item.quantity;
          await product.save();
        }
      }
    }

    // Update order status to cancelled
    order.status = "cancelled";
    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
