const express = require('express');
const professionalController = require('../controllers/professionalController');
const { professionalValidationRules } = require('../validationRules/professionalValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', professionalValidationRules(), validate, professionalController.createProfessional);
router.get('/', professionalController.getAllProfessionals);
router.get('/:id', professionalController.getProfessionalById);
router.put('/:id', professionalValidationRules(), validate, professionalController.updateProfessional);
router.delete('/:id', professionalController.deleteProfessional);

module.exports = router;