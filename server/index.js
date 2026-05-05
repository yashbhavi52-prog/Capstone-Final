const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Subscription = require('./Subscription');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your MongoDB Connection String
mongoose.connect('mongodb://localhost:27017/subtracker');

// GET all subscriptions for your Dashboard
app.get('/api/subscriptions', async (req, res) => {
  const subs = await Subscription.find();
  res.json(subs);
});

// POST a new subscription (from your AddEdit page)
app.post('/api/subscriptions', async (req, res) => {
  const newSub = new Subscription(req.body);
  await newSub.save();
  res.status(201).json(newSub);
});

app.listen(5000, () => console.log('API Server running on port 5000'));