const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String, // Optional: If logged-in users are making purchases
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  paymentStatus: String,
  paymentIntentId: String, // Stripe's payment intent ID
  customerDetails: {
    name: String,
    email: String,
    phone: String,
    address: {
      line1: String,
      city: String,
      postal_code: String,
      country: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('anotherOrder', orderSchema);
