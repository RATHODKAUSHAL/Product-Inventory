const express = require('express');
const { getCategories } = require('../controllers/categoryController.js');

const router = express.Router();

router.get('/', getCategories);

module.exports = router;
