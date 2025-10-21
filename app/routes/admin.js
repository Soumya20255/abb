const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/admin/dashboardController');
const categoryController = require('../controllers/admin/categoryController');
const productController = require('../controllers/admin/productController');
const { validateCategory } = require('../middlewares/validators/categoryValidator');
const { validateProduct } = require('../middlewares/validators/productValidator');
const upload = require('../middlewares/multer');

// Dashboard
router.get('/', dashboardController.getDashboard);

// Category routes
router.get('/categories', categoryController.listCategories);
router.get('/categories/add', categoryController.showAddForm);
router.post('/categories/add', validateCategory, categoryController.addCategory);
router.get('/categories/edit/:id', categoryController.showEditForm);
router.post('/categories/edit/:id', validateCategory, categoryController.updateCategory);
router.post('/categories/delete/:id', categoryController.deleteCategory);

// Product routes
router.get('/products', productController.listProducts);
router.get('/products/add', productController.showAddForm);
router.post('/products/add', upload.single('image'), validateProduct, productController.addProduct);
router.get('/products/edit/:id', productController.showEditForm);
router.post('/products/edit/:id', upload.single('image'), validateProduct, productController.updateProduct);
router.post('/products/delete/:id', productController.deleteProduct);

module.exports = router;
