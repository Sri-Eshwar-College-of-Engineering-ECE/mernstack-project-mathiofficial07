const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  weight: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  variants: [variantSchema],
}, {
  timestamps: true
});

const MongooseProduct = mongoose.model('Product', productSchema);

// Dynamic proxy that routes calls to MongoDB or JSON DB depending on connection state
const ProductProxy = new Proxy(MongooseProduct, {
  construct(target, args) {
    if (mongoose.connection.readyState === 1) {
      return new target(...args);
    } else {
      const { getMockProductModel } = require('../utils/jsonDb');
      const MockModel = getMockProductModel();
      return new MockModel(...args);
    }
  },
  get(target, prop, receiver) {
    if (mongoose.connection.readyState === 1) {
      const val = Reflect.get(target, prop, receiver);
      if (typeof val === 'function') return val.bind(target);
      return val;
    } else {
      const { getMockProductModel } = require('../utils/jsonDb');
      const MockModel = getMockProductModel();
      const val = Reflect.get(MockModel, prop);
      if (typeof val === 'function') return val.bind(MockModel);
      return val;
    }
  }
});

module.exports = ProductProxy;
