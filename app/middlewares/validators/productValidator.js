const Joi = require('joi');

const productValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .required()
    .messages({
      'string.empty': 'Product name is required',
      'string.min': 'Product name must be at least 2 characters long',
      'string.max': 'Product name must not exceed 200 characters',
      'any.required': 'Product name is required'
    }),
  category: Joi.string()
    .required()
    .messages({
      'string.empty': 'Category is required',
      'any.required': 'Category is required'
    }),
  description: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description must not exceed 2000 characters',
      'any.required': 'Description is required'
    }),
  price: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'Price must be a valid number',
      'number.positive': 'Price must be greater than 0',
      'any.required': 'Price is required'
    })
});

const validateProduct = (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => detail.message);
    req.flash('error', errors.join(', '));
    const redirectUrl = req.get('Referrer') || req.get('Referer') || '/admin/products';
    return res.redirect(redirectUrl);
  }
  
  next();
};

module.exports = { validateProduct };
