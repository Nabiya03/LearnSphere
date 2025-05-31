// Importing Sequelize for database connection
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Initializing Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});


module.exports = { sequelize };