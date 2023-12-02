const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const { feedbackValidationRules } = require('../validationRules/feedbackValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', feedbackValidationRules(), validate, feedbackController.createFeedback);
router.get('/', feedbackController.getAllFeedback);
router.get('/:id', feedbackController.getFeedbackById);
router.put('/:id', feedbackValidationRules(), validate, feedbackController.updateFeedback);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
