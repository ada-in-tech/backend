const express = require('express');
const collaborationController = require('../controllers/collaborationController');
const { requireAuth, checkRole } = require('../middleware/auth');
const { collaborationValidationRules } = require('../validationRules/collaborationValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', collaborationValidationRules(), validate, collaborationController.createCollaboration);
router.post('/create', requireAuth, collaborationValidationRules(), validate, collaborationController.createCollaboration);
router.get('/', requireAuth, collaborationController.getAllCollaborations);
router.get('/:id', requireAuth, collaborationController.getCollaborationById);
router.put('/:id', requireAuth, collaborationController.updateCollaboration);
router.delete('/:id', requireAuth, collaborationController.deleteCollaboration);

module.exports = router;
