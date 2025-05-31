// Importing required modules
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const { ROLES } = require('../utils/constants');

// Middleware to authenticate JWT token
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(new ApiError(401, 'No token provided'));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid token'));
  }
};

// Middleware to authorize based on user roles
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Access denied'));
  }
  next();
};

// Exporting middleware functions
module.exports = { authenticate, authorize };