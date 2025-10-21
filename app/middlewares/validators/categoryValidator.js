const Joi = require('joi');

const categoryValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .required()
    .messages({
      'string.empty': 'Category name is required',
      'string.min': 'Category name must be at least 2 characters long',
      'string.max': 'Category name must not exceed 100 characters',
      'any.required': 'Category name is required'
    })
});

const validateCategory = (req, res, next) => {
  const { error } = categoryValidationSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => detail.message);
    req.flash('error', errors.join(', '));
    const redirectUrl = req.get('Referrer') || req.get('Referer') || '/admin/categories';
    return res.redirect(redirectUrl);
  }
  
  next();
};

module.exports = { validateCategory };
