// Importing required modules
const razorpay = require('../config/razorpay');
const { Payment, Course } = require('../models');
const ApiError = require('../utils/apiError');
const { PAYMENT_STATUS } = require('../utils/constants');
const logger = require('../utils/logger');

// Creating a Razorpay order for course payment
const createOrder = async (userId, courseId) => {
  logger.info('Creating payment order', { userId, courseId });
  const course = await Course.findByPk(courseId);
  if (!course) {
    logger.warn('Course not found for payment', { courseId });
    throw new ApiError(404, 'Course not found');
  }
  const order = await razorpay.orders.create({
    amount: course.price * 100, // Razorpay expects amount in paise
    currency: 'INR',
    receipt: `receipt_${userId}_${courseId}`,
  });
  const payment = await Payment.create({
    userId,
    courseId,
    razorpayOrderId: order.id,
    amount: course.price,
    status: PAYMENT_STATUS.PENDING,
  });
  logger.info('Payment order created successfully', { orderId: order.id, courseId });
  return { order, payment };
};

// Verifying Razorpay payment
const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  logger.info('Verifying payment', { razorpayOrderId, razorpayPaymentId });
  const crypto = require('crypto');
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');
  if (generatedSignature !== razorpaySignature) {
    logger.warn('Payment verification failed: Invalid signature', { razorpayOrderId });
    throw new ApiError(400, 'Invalid payment signature');
  }
  const payment = await Payment.update(
    { status: PAYMENT_STATUS.COMPLETED },
    { where: { razorpayOrderId } }
  );
  logger.info('Payment verified successfully', { razorpayOrderId });
  return payment;
};

// Exporting payment service functions
module.exports = { createOrder, verifyPayment };