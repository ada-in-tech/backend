const { body } = require('express-validator');

exports.feedbackValidationRules = () => {
    return [
        body('content').notEmpty().withMessage('Feedback content is required'),
        // Add more validation rules as needed
    ];
};
