const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

/**
 * Admin routes
 */
router.get('/users', protect, adminOnly, adminController.getAllUsers);
router.get('/dashboard', protect, adminOnly, adminController.getDashboardStats);

module.exports = router;
