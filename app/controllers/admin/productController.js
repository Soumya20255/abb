const Product = require('../../models/Product');
const Category = require('../../models/Category');
const UploadService = require('../../services/uploadService');

// List all products
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate('category')
      .sort({ createdAt: -1 });

    res.render('admin/products/list', {
      title: 'Product Management',
      products,
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (error) {
    console.error('List products error:', error);
    req.flash('error', 'Error loading products');
    res.redirect('/admin');
  }
};

// Show add product form
exports.showAddForm = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false }).sort({ name: 1 });

    res.render('admin/products/form', {
      title: 'Add Product',
      product: null,
      categories,
      error: req.flash('error')
    });
  } catch (error) {
    console.error('Show add form error:', error);
    req.flash('error', 'Error loading form');
    res.redirect('/admin/products');
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;

    // Check if image was uploaded
    if (!req.file) {
      req.flash('error', 'Product image is required');
      return res.redirect('/admin/products/add');
    }

    const product = new Product({
      name,
      category,
      description,
      price: parseFloat(price),
      image: req.file.filename
    });

    await product.save();

    req.flash('success', 'Product added successfully');
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Add product error:', error);
    
    // Delete uploaded file if product creation failed
    if (req.file) {
      UploadService.deleteFile(req.file.filename);
    }
    
    req.flash('error', 'Error adding product');
    res.redirect('/admin/products/add');
  }
};

// Show edit product form
exports.showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    const categories = await Category.find({ isDeleted: false }).sort({ name: 1 });

    if (!product || product.isDeleted) {
      req.flash('error', 'Product not found');
      return res.redirect('/admin/products');
    }

    res.render('admin/products/form', {
      title: 'Edit Product',
      product,
      categories,
      error: req.flash('error')
    });
  } catch (error) {
    console.error('Show edit form error:', error);
    req.flash('error', 'Error loading product');
    res.redirect('/admin/products');
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product || product.isDeleted) {
      req.flash('error', 'Product not found');
      
      // Delete uploaded file if any
      if (req.file) {
        UploadService.deleteFile(req.file.filename);
      }
      
      return res.redirect('/admin/products');
    }

    // Update product fields
    product.name = name;
    product.category = category;
    product.description = description;
    product.price = parseFloat(price);

    // If new image is uploaded, delete old image and update
    if (req.file) {
      UploadService.deleteFile(product.image);
      product.image = req.file.filename;
    }

    await product.save();

    req.flash('success', 'Product updated successfully');
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Update product error:', error);
    
    // Delete uploaded file if update failed
    if (req.file) {
      UploadService.deleteFile(req.file.filename);
    }
    
    req.flash('error', 'Error updating product');
    res.redirect(`/admin/products/edit/${req.params.id}`);
  }
};

// Delete product (soft delete)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || product.isDeleted) {
      req.flash('error', 'Product not found');
      return res.redirect('/admin/products');
    }

    // Delete the image file
    UploadService.deleteFile(product.image);

    // Soft delete the product
    await product.softDelete();

    req.flash('success', 'Product deleted successfully');
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Delete product error:', error);
    req.flash('error', 'Error deleting product');
    res.redirect('/admin/products');
  }
};
