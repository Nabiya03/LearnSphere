// Importing required modules
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Middleware to handle errors and log them
const errorMiddleware = (err, req, res, next) => {
  // Logging error details with request context
  logger.error(`${err.message} - ${req.method} ${req.url}`, {
    errors: err.errors || [],
    stack: err.stack,
  });

  // Handling ApiError instances
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  // Handling generic errors
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    errors: [err.message],
  });
};

// Exporting error middleware
module.exports = errorMiddleware;