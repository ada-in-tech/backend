const express = require('express');
const courseController = require('../controllers/courseController');
const { requireAuth, checkRole } = require('../middleware/auth');
const { courseValidationRules } = require('../validationRules/courseValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

// Only instructors or admins can create or update courses
router.post('/', courseValidationRules(), validate, courseController.createCourse);
router.post('/', requireAuth, checkRole('instructor'), courseController.createCourse);
router.get('/', courseController.getAllCourses); // Open for all
router.get('/:id', courseController.getCourseById); // Open for all
router.put('/:id', requireAuth, checkRole('instructor'), courseController.updateCourse);
router.delete('/:id', requireAuth, checkRole('admin'), courseController.deleteCourse);

module.exports = router;
