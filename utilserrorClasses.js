// utils/errorClasses.js

/** Base class for custom operational errors */
class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name; // e.g., 'NotFoundError'
    this.status = status || 500;
    // Captures the stack trace, excluding the constructor call
    Error.captureStackTrace(this, this.constructor);
  }
}

/** 404 Not Found Error */
class NotFoundError extends CustomError {
  constructor(message = 'Resource not found.') {
    super(message, 404);
  }
}

/** 400 Validation Error */
class ValidationError extends CustomError {
  constructor(message = 'Invalid request data.', errors = []) {
    super(message, 400);
    this.errors = errors; // Holds specific field validation issues
  }
}

/** 401/403 Authentication Error */
class AuthError extends CustomError {
  constructor(message = 'Authentication failed.') {
    super(message, 401);
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  AuthError,
  CustomError,
};