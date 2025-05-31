// Importing Sequelize and database configuration
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const logger = require('../utils/logger');

// Importing individual model definitions
const userModel = require('./user');
const courseModel = require('./course');
const paymentModel = require('./payment');

// Initializing models
const User = userModel(sequelize);
const Course = courseModel(sequelize);
const Payment = paymentModel(sequelize);

// Setting up model associations
User.hasMany(Course, { foreignKey: 'instructorId' });
Course.belongsTo(User, { foreignKey: 'instructorId' });
User.hasMany(Payment, { foreignKey: 'userId' });
Course.hasMany(Payment, { foreignKey: 'courseId' });
Payment.belongsTo(User, { foreignKey: 'userId' });
Payment.belongsTo(Course, { foreignKey: 'courseId' });

// Logging model initialization
logger.info('Models initialized and associations set up', {
  models: ['User', 'Course', 'Payment'],
});

// Exporting sequelize instance and models
module.exports = { sequelize, User, Course, Payment };