const { body } = require('express-validator');

exports.companyValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('Company name is required'),
        body('description').optional(),
        // Add more validation rules as needed
    ];
};
