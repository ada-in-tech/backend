const express = require('express');
const communityGroupController = require('../controllers/communityGroupController');
const { communityGroupValidationRules } = require('../validationRules/communityGroupValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', communityGroupValidationRules(), validate, communityGroupController.createCommunityGroup);
router.get('/', communityGroupController.getAllCommunityGroups);
router.get('/:id', communityGroupController.getCommunityGroupById);
router.put('/:id', communityGroupValidationRules(), validate, communityGroupController.updateCommunityGroup);
router.delete('/:id', communityGroupController.deleteCommunityGroup);

module.exports = router;
