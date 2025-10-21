const Category = require('../../models/Category');
const Product = require('../../models/Product');

// Show dashboard with statistics
exports.getDashboard = async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments({ isDeleted: false });
    const totalProducts = await Product.countDocuments({ isDeleted: false });

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      totalCategories,
      totalProducts,
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    req.flash('error', 'Error loading dashboard');
    res.redirect('/admin');
  }
};
