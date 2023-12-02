const express = require('express');
const workshopController = require('../controllers/workshopController');
const { requireAuth, checkRole } = require('../middleware/auth');
const { workshopValidationRules } = require('../validationRules/workshopValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', workshopValidationRules(), validate, workshopController.createWorkshop);
// Only instructors or admins can create or update workshops
router.post('/', requireAuth, checkRole('instructor'), workshopController.createWorkshop);
router.put('/:id', requireAuth, checkRole('instructor'), workshopController.updateWorkshop);

// All authenticated users can view workshops
router.get('/', requireAuth, workshopController.getAllWorkshops);
router.get('/:id', requireAuth, workshopController.getWorkshopById);

// Only admins can delete workshops
router.delete('/:id', requireAuth, checkRole('admin'), workshopController.deleteWorkshop);

module.exports = router;
