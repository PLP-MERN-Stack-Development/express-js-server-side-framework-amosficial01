// middleware/validator.js

const { ValidationError } = require('../utils/errorClasses');

const validateProduct = (req, res, next) => {
  // Use req.body for incoming data
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  // Validation Checks (Task 2 required fields and types)
  if (!name || typeof name !== 'string' || name.length < 3) {
    errors.push('Name must be a string of at least 3 characters.');
  }
  if (!description || typeof description !== 'string') {
    errors.push('Description is required and must be a string.');
  }
  if (typeof price !== 'number' || price <= 0) {
    errors.push('Price must be a positive number.');
  }
  if (!category || typeof category !== 'string') {
    errors.push('Category is required.');
  }
  // Check specifically for boolean type (or string versions for flexibility, but requirement is boolean)
  if (typeof inStock !== 'boolean') {
      errors.push('inStock status must be a boolean (true/false).');
  }

  if (errors.length > 0) {
    // Throw a ValidationError (400) if validation fails
    return next(new ValidationError('Product data validation failed.', errors));
  }
  
  // Optionally clean up the body for the route handler
  req.validatedBody = req.body;
  
  next();
};

module.exports = validateProduct;