// Importing Razorpay and environment variables
const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

// Initializing Razorpay instance with API keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;