const { body } = require('express-validator');

exports.reportValidationRules = () => {
    return [
        body('description').notEmpty().withMessage('Report description is required'),
        // Add more validation rules as needed
    ];
};
