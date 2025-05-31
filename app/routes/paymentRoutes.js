
const express = require('express');
const { createOrderHandler, verifyPaymentHandler } = require('../controllers/paymentController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Defining payment routes with authentication
router.post('/create-order', authenticate, createOrderHandler);
router.post('/verify', authenticate, verifyPaymentHandler);


module.exports = router;