// Importing auth service and utilities
const { register, login } = require('../services/authService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

// Handler for user registration
const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await register(email, password, role);
    res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
  } catch (error) {
    next(error);
  }
};

// Handler for user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    res.status(200).json(new ApiResponse(200, { user, token }, 'Login successful'));
  } catch (error) {
    next(error);
  }
};

// Exporting controller functions
module.exports = { registerUser, loginUser };