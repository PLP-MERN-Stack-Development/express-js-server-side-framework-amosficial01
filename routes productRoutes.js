// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productsModel = require('../data/products');

// Middleware Imports (for applying to specific routes)
const authenticate = require('../middleware/auth');
const validateProduct = require('../middleware/validator');
const { NotFoundError } = require('../utils/errorClasses');

// Helper to wrap async functions for error handling (Task 4)
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// ===================================
// Task 5 & 2: GET /api/products (Filtering, Search, Pagination)
// ===================================
router.get('/', asyncHandler(async (req, res) => {
    // --- IMPLEMENT FILTERING, SEARCH, AND PAGINATION LOGIC HERE ---
    let currentProducts = productsModel.getProducts();

    // 1. Filtering, 2. Search, 3. Pagination logic goes here using req.query

    res.json({ data: currentProducts });
}));


// ===================================
// Task 5: GET /api/products/stats (Product Statistics)
// ===================================
router.get('/stats', asyncHandler(async (req, res) => {
    // --- IMPLEMENT STATISTICS LOGIC HERE ---
    res.json({ message: "Product statistics endpoint ready." });
}));


// ===================================
// Task 2: GET /api/products/:id
// ===================================
router.get('/:id', asyncHandler(async (req, res, next) => {
    const product = productsModel.findProduct(req.params.id);
    if (!product) {
        return next(new NotFoundError(`Product ID ${req.params.id} not found.`));
    }
    res.json(product);
}));


// ===================================
// Task 2: POST /api/products (Requires Auth & Validation)
// ===================================
router.post('/', authenticate, validateProduct, asyncHandler(async (req, res) => {
    const newProduct = productsModel.addProduct(req.validatedBody);
    res.status(201).json(newProduct);
}));


// ===================================
// Task 2: PUT /api/products/:id (Requires Auth)
// ===================================
router.put('/:id', authenticate, validateProduct, asyncHandler(async (req, res, next) => {
    const updatedProduct = productsModel.updateProduct(req.params.id, req.validatedBody);
    if (!updatedProduct) {
        return next(new NotFoundError(`Product ID ${req.params.id} not found for update.`));
    }
    res.json(updatedProduct);
}));


// ===================================
// Task 2: DELETE /api/products/:id (Requires Auth)
// ===================================
router.delete('/:id', authenticate, asyncHandler(async (req, res, next) => {
    const success = productsModel.deleteProduct(req.params.id);
    if (!success) {
        return next(new NotFoundError(`Product ID ${req.params.id} not found for deletion.`));
    }
    res.status(204).end();
}));

module.exports = router;