const express = require('express');
const jobListingController = require('../controllers/jobListingController');
const { requireAuth, checkRole } = require('../middleware/auth');
const { jobListingValidationRules } = require('../validationRules/jobListingValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', jobListingValidationRules(), validate, jobListingController.createJobListing);
router.post('/', requireAuth, checkRole('company'), jobListingController.createJobListing);
router.get('/', requireAuth, jobListingController.getAllJobListings);
router.get('/:id', requireAuth, jobListingController.getJobListingById);
router.put('/:id', requireAuth, checkRole('company'), jobListingController.updateJobListing);
router.delete('/:id', requireAuth, checkRole('company'), jobListingController.deleteJobListing);

module.exports = router;
