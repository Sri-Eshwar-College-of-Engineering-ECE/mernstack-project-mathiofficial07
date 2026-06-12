const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://mathiyazhagan907_db_user:1234@cluster0.y7ftvp4.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Test/Health Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running and healthy' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
