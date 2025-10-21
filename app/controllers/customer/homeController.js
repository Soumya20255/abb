const Product = require('../../models/Product');
const Category = require('../../models/Category');

// Show homepage with all products, filtering, and search
exports.getHomepage = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isDeleted: false };

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Search by keyword in product name only
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query)
      .populate('category')
      .sort({ createdAt: -1 });

    const categories = await Category.find({ isDeleted: false }).sort({ name: 1 });

    res.render('customer/home', {
      title: 'Home - Product Catalog',
      products,
      categories,
      selectedCategory: category || '',
      searchKeyword: search || ''
    });
  } catch (error) {
    console.error('Homepage error:', error);
    res.status(500).render('error', { 
      message: 'Error loading products',
      error: {}
    });
  }
};
