const { body } = require('express-validator');

exports.collaborationValidationRules = () => {
    return [
        body('sender')
            .notEmpty()
            .withMessage('Sender ID is required')
            .isMongoId()
            .withMessage('Sender ID must be a valid MongoDB ObjectId'),

        body('receiver')
            .notEmpty()
            .withMessage('Receiver ID is required')
            .isMongoId()
            .withMessage('Receiver ID must be a valid MongoDB ObjectId'),

        // Additional rules can be added here if you have more fields in your Collaboration model
    ];
};
