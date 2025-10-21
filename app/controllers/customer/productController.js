const Product = require('../../models/Product');

// Show product detail page
exports.getProductDetail = async (req, res) => {
  try {
    const { slug, id } = req.params;
    let product;

    // Find by slug or id
    if (slug) {
      product = await Product.findOne({ slug, isDeleted: false }).populate('category');
    } else if (id) {
      product = await Product.findOne({ _id: id, isDeleted: false }).populate('category');
    }

    if (!product) {
      return res.status(404).render('error', {
        message: 'Product not found',
        error: {}
      });
    }

    res.render('customer/product', {
      title: product.name,
      product
    });
  } catch (error) {
    console.error('Product detail error:', error);
    res.status(500).render('error', {
      message: 'Error loading product',
      error: {}
    });
  }
};
