const { body, validationResult } = require('express-validator');

exports.validateCreateProduct = [
  body('name')
    .notEmpty()
    .trim()
    .withMessage('Product name is required'),
  body('description')
    .optional()
    .isString()
    .trim()
    .withMessage('Description should be a string'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),
  body('category')
    .notEmpty()
    .trim()
    .withMessage('Category is required'),
  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];