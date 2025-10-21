const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin');
const customerRoutes = require('./customer');

// Admin routes
router.use('/admin', adminRoutes);

// Customer routes
router.use('/', customerRoutes);

module.exports = router;
