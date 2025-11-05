// server.js

// Core Modules
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file immediately
dotenv.config();

// Middleware and Route Imports
const loggerMiddleware = require('./middleware/logger');
const productRoutes = require('./routes/productRoutes');
const { NotFoundError } = require('./utils/errorClasses'); // Custom error for 404

const app = express();
const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000

// --- GLOBAL MIDDLEWARE (Task 3) ---

// 1. Custom Logger Middleware
app.use(loggerMiddleware);

// 2. JSON Body Parser Middleware (Required for POST and PUT requests)
app.use(express.json());

// --- CORE ROUTES (Task 1 & 2) ---

// "Hello World" root route (Task 1)
app.get('/', (req, res) => {
    res.send('Hello World! Product Management API is operational.');
});

// Mount the Product API Routes (Task 2)
app.use('/api/products', productRoutes);

// --- ERROR HANDLING (Task 4) ---

// 1. 404 Not Found Handler (Must be placed after all valid routes)
app.use((req, res, next) => {
    // If we reach here, no route matched, so we throw a 404
    next(new NotFoundError(`The resource ${req.originalUrl} was not found.`));
});

// 2. Global Error Handling Middleware (The four-argument handler: err, req, res, next)
app.use((err, req, res, next) => {
    // Determine the status code: use the status property from custom errors, or default to 500
    const statusCode = err.status || 500;
    
    // Log the error details for server-side debugging
    console.error(`[${new Date().toISOString()}] ${statusCode} ERROR: ${err.message}`);

    // Send the structured error response back to the client
    res.status(statusCode).json({
        status: 'error',
        message: err.message,
        type: err.name, // e.g., NotFoundError, ValidationError
        // Optionally include specific validation errors if available
        errors: err.errors || undefined
    });
});

// --- START SERVER (Task 1) ---

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});