const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct
} = require('../controllers/productController.js');

const router = express.Router();

// Validation rules for creating a product
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Product name must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category must be selected'),
  body('categories.*')
    .isMongoId()
    .withMessage('Invalid category ID')
];

// Routes
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', productValidation, createProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
