const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Referencing the specific variant inside the product array
  productName: { type: String, required: true },
  weight: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  totalPrice: { type: Number, required: true },
  notes: { type: String, default: "" },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'], 
    default: 'Pending' 
  },
  orderDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const MongooseOrder = mongoose.model('Order', orderSchema);

// Dynamic proxy that routes calls to MongoDB or JSON DB depending on connection state
const OrderProxy = new Proxy(MongooseOrder, {
  construct(target, args) {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      return new target(...args);
    } else {
      const { getMockOrderModel } = require('../utils/jsonDb');
      const MockModel = getMockOrderModel();
      return new MockModel(...args);
    }
  },
  get(target, prop, receiver) {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      const val = Reflect.get(target, prop, receiver);
      if (typeof val === 'function') return val.bind(target);
      return val;
    } else {
      const { getMockOrderModel } = require('../utils/jsonDb');
      const MockModel = getMockOrderModel();
      const val = Reflect.get(MockModel, prop);
      if (typeof val === 'function') return val.bind(MockModel);
      return val;
    }
  }
});

module.exports = OrderProxy;
