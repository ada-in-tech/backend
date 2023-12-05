const express = require('express');
const courseController = require('../controllers/courseController');
const { requireAuth } = require('../middleware/auth');
const { courseValidationRules } = require('../validationRules/courseValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', courseValidationRules(), validate, courseController.createCourse);
router.post('/', requireAuth, courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', requireAuth, courseController.updateCourse);
router.delete('/:id', requireAuth, courseController.deleteCourse);

module.exports = router;
