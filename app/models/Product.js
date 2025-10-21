const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Auto-generate unique slug before saving
productSchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    let slug = slugify(this.name, { lower: true, strict: true });
    
    // Check if slug exists and append counter if needed
    const slugRegEx = new RegExp(`^${slug}(-[0-9]+)?$`, 'i');
    const productsWithSlug = await mongoose.models.Product.find({
      slug: slugRegEx,
      _id: { $ne: this._id }
    });
    
    if (productsWithSlug.length > 0) {
      slug = `${slug}-${productsWithSlug.length + 1}`;
    }
    
    this.slug = slug;
  }
  next();
});

// Method to soft delete
productSchema.methods.softDelete = function() {
  this.isDeleted = true;
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
