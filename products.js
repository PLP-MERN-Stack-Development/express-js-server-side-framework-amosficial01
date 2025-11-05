// data/products.js

const { v4: uuidv4 } = require('uuid'); // Use uuid for unique identifiers

let products = [
  // Initial product data (Ensure all required fields are present)
  { id: uuidv4(), name: 'Laptop Pro X', description: 'High-performance computing.', price: 1500.00, category: 'Electronics', inStock: true },
  { id: uuidv4(), name: 'Cotton T-Shirt', description: 'Soft, organic cotton.', price: 29.99, category: 'Apparel', inStock: true },
  { id: uuidv4(), name: 'Espresso Machine', description: 'Home brewing at its finest.', price: 450.00, category: 'Home Goods', inStock: false },
  { id: uuidv4(), name: 'Wireless Mouse', description: 'Ergonomic and reliable.', price: 45.00, category: 'Electronics', inStock: true },
];

// CRUD Helper Functions
const getProducts = () => products;
const findProduct = (id) => products.find(p => p.id === id);

const addProduct = (productData) => {
    const newProduct = { id: uuidv4(), ...productData };
    products.push(newProduct);
    return newProduct;
};

const updateProduct = (id, updates) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    // Merge existing product with updates, ensuring ID remains constant
    products[index] = { ...products[index], ...updates, id };
    return products[index];
};

const deleteProduct = (id) => {
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    return products.length < initialLength; // Returns true if a product was deleted
};

module.exports = {
  getProducts,
  findProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};