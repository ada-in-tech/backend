const { body } = require('express-validator');

exports.resourceValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('link').notEmpty().withMessage('Resource link is required'),
        // Add more validation rules as needed
    ];
};
