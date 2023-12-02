const express = require('express');
const userController = require('../controllers/userController');
const { requireAuth, checkRole } = require('../middleware/auth');
const { userValidationRules } = require('../validationRules/userValidation');
const { validate } = require('../middleware/validate');
const router = express.Router();

router.post('/', userValidationRules(), validate, userController.createUser);

// Registration is open for all
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

// Only admins can view all users or delete a user
router.get('/', requireAuth, checkRole('admin'), userController.getAllUsers);
router.delete('/:id', requireAuth, checkRole('admin'), userController.deleteUser);

// Authenticated users can view and update their profiles
router.get('/:id', requireAuth, userController.getUserById);
router.put('/:id', requireAuth, userController.updateUser);

module.exports = router;
