const express = require('express');
const router = express.Router();
const homeController = require('../controllers/customer/homeController');
const productController = require('../controllers/customer/productController');

// Homepage
router.get('/', homeController.getHomepage);

// Product detail routes (both slug and id)
router.get('/product/:slug', productController.getProductDetail);
router.get('/product/id/:id', productController.getProductDetail);

module.exports = router;
