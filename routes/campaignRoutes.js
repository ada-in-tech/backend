const express = require('express');
const campaignController = require('../controllers/campaignController');
const { requireAuth } = require('../middleware/auth');
const { campaignValidationRules } = require('../validationRules/campaignValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', campaignValidationRules(), validate, campaignController.createCampaign);
router.post('/', requireAuth, campaignController.createCampaign);
router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaignById);
router.put('/:id', requireAuth, campaignController.updateCampaign);
router.delete('/:id', requireAuth, campaignController.deleteCampaign);

module.exports = router;
