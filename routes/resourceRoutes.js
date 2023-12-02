const express = require('express');
const resourceController = require('../controllers/resourceController');
const { resourceValidationRules } = require('../validationRules/resourceValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', resourceValidationRules(), validate, resourceController.createResource);
router.get('/', resourceController.getAllResources);
router.get('/:id', resourceController.getResourceById);
router.put('/:id', resourceValidationRules(), validate, resourceController.updateResource);
router.delete('/:id', resourceController.deleteResource);

module.exports = router;
