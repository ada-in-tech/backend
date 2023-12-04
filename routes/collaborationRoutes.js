const express = require('express');
const collaborationController = require('../controllers/collaborationController');
const { requireAuth } = require('../middleware/auth');
const { collaborationValidationRules } = require('../validationRules/collaborationValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', collaborationValidationRules(), validate, collaborationController.createCollaboration);
router.get('/', requireAuth, collaborationController.getAllCollaborations);
router.get('/user/:userId', requireAuth, collaborationController.getUserCollaborations);
router.get('/:id', requireAuth, collaborationController.getCollaborationById);
router.put('/:id', requireAuth, collaborationController.updateCollaboration);
router.delete('/:id', requireAuth, collaborationController.deleteCollaboration);

module.exports = router;
