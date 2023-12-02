const express = require('express');
const reportController = require('../controllers/reportController');
const { reportValidationRules } = require('../validationRules/reportValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', reportValidationRules(), validate, reportController.createReport);
router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.put('/:id', reportValidationRules(), validate, reportController.updateReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
