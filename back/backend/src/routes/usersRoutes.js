const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, updateUserPassword } = require('../controllers/usersController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleChecker } = require('../utils/roleChecker');

router.get('/', authMiddleware, roleChecker('admin'), getAllUsers);
router.post('/', authMiddleware, roleChecker('admin'), createUser);
router.put('/:id/password', authMiddleware, roleChecker('admin'), updateUserPassword);

module.exports = router;
