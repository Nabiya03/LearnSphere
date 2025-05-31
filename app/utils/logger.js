// Importing Winston for logging functionality
const winston = require('winston');
const dotenv = require('dotenv');

dotenv.config();

// Defining custom severity levels for logging
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Defining colors for each log level to enhance visibility
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'magenta',
  debug: 'white'
};

// Linking colors to severity levels
winston.addColors(colors);

// Customizing log format with timestamp, colorized output, and message structure
const format = winston.format.combine(
  winston.format.timestamp({ format: 'DD MMM, YYYY - HH:mm:ss:ms' }), // Adding timestamp
  winston.format.colorize({ all: true }), // Enabling colorized output
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}` // Formatting log message
  )
);

// Defining transports for logging (console only)
const transports = [
  new winston.transports.Console() // Logging to console
];

// Creating the logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug', // Using environment variable or default to 'debug'
  levels, // Applying custom severity levels
  format, // Applying custom log format
  transports // Using console transport
});

// Exporting logger for use across the application
module.exports = logger;