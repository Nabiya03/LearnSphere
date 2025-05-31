// Importing required Sequelize modules
const { DataTypes } = require('sequelize');

// Defining the Course model
module.exports = (sequelize) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    instructorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return Course;
};