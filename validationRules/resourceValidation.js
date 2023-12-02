const { body } = require('express-validator');

exports.resourceValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('type').notEmpty().withMessage('Resource type is required'),
        // Add more validation rules as needed
    ];
};
