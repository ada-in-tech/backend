const express = require('express');
const newcomerController = require('../controllers/newcomerController');
const { newcomerValidationRules } = require('../validationRules/newcomerValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', newcomerValidationRules(), validate, newcomerController.createNewcomer);
router.get('/', newcomerController.getAllNewcomers);
router.get('/:id', newcomerController.getNewcomerById);
router.put('/:id', newcomerValidationRules(), validate, newcomerController.updateNewcomer);
router.delete('/:id', newcomerController.deleteNewcomer);

module.exports = router;
