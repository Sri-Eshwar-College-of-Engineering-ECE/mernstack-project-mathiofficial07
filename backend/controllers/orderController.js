const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendOrderNotification } = require('../utils/email');

// Get all orders (for Admin Dashboard)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Create new order (Store in DB + Send Email + Update Stock)
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    // Update Product Stock
    try {
      const product = await Product.findById(savedOrder.productId);
      if (product) {
        const variant = product.variants.id(savedOrder.variantId);
        if (variant) {
          variant.stock = Math.max(0, variant.stock - (savedOrder.quantity || 1));
          await product.save();
          console.log(`✅ Stock updated for ${product.name} (${variant.weight}). New stock: ${variant.stock}`);
        } else {
          console.warn(`⚠️ Variant ${savedOrder.variantId} not found for product ${savedOrder.productId}`);
        }
      } else {
        console.warn(`⚠️ Product ${savedOrder.productId} not found during stock update`);
      }
    } catch (stockError) {
      console.error('❌ Error updating stock:', stockError.message);
    }

    // Trigger Admin Email asynchronously (don't block the request)
    sendOrderNotification(savedOrder).catch(console.error);

    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order status', error: error.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};
