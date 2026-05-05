const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Netflix"
  price: { type: Number, required: true }, // e.g., 15.99
  category: String,
  billingDate: Date,
  status: { type: String, default: 'Active' }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);