// middleware/auth.js

const { AuthError } = require('../utils/errorClasses');

const authenticate = (req, res, next) => {
  const EXPECTED_API_KEY = process.env.API_KEY;
  const apiKey = req.header('X-API-Key');

  if (!apiKey || apiKey !== EXPECTED_API_KEY) {
    // If key is missing or invalid, throw an AuthError (401)
    return next(new AuthError('Access Denied: Invalid or missing X-API-Key.'));
  }
  
  // Authentication successful
  next();
};

module.exports = authenticate;