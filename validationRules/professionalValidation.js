const { body } = require('express-validator');

exports.professionalValidationRules = () => {
    return [
        // Validation rules for professional specific fields
        body('experience').isString(),
        body('areasOfExpertise').isArray(),
        // Add more rules as needed
    ];
};
