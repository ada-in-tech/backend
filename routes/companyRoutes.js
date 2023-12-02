const express = require('express');
const companyController = require('../controllers/companyController');
const { companyValidationRules } = require('../validationRules/companyValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', companyValidationRules(), validate, companyController.createCompany);
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', companyValidationRules(), validate, companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;
