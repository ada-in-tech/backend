const { body } = require('express-validator');

exports.communityGroupValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('description').optional(),
        // Add more validation rules as needed
    ];
};
