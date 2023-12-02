const { body } = require('express-validator');

const userValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        // Add other validation rules as needed
    ];
};

module.exports = { userValidationRules };
