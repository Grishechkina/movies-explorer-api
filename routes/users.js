const router = require('express').Router();
const { updateUserValidation } = require('../validation/userValidation');
const {
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserValidation, updateUserProfile);

module.exports = router;
