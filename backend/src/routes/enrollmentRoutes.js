const express = require('express');
const router = express.Router();

const enrollmentController = require('../controllers/enrollmentController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

/**
 * USER routes
 */
router.post('/', protect, enrollmentController.createEnrollment);
router.get('/my', protect, enrollmentController.getMyEnrollments);

/**
 * ADMIN routes
 */
router.get('/', protect, adminOnly, enrollmentController.getAllEnrollments);
router.patch('/:id/status', protect, adminOnly, enrollmentController.updateEnrollmentStatus);

module.exports = router;
