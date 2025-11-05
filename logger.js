// middleware/logger.js

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  // Log request method, URL, and timestamp
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // Must call next() to pass control to the next middleware/route handler
};

module.exports = logger;