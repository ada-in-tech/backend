const { body } = require('express-validator');

exports.newcomerValidationRules = () => {
    return [
        // Validation rules for newcomer specific fields
        body('goals').isArray(),
        body('challenges').isArray(),
        // Add more rules as needed
    ];
};
