// Importing payment service and utilities
const { createOrder, verifyPayment } = require('../services/paymentService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

// Handler for creating a Razorpay order
const createOrderHandler = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const { order, payment } = await createOrder(userId, courseId);
    res.status(201).json(new ApiResponse(201, { order, payment }, 'Order created successfully'));
  } catch (error) {
    next(error);
  }
};

// Handler for verifying Razorpay payment
const verifyPaymentHandler = async (req, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    await verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    res.status(200).json(new ApiResponse(200, null, 'Payment verified successfully'));
  } catch (error) {
    next(error);
  }
};

// Exporting controller functions
module.exports = { createOrderHandler, verifyPaymentHandler };