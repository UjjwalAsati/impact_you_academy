const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/', inquiryController.createInquiry);
router.get('/', protect, adminOnly, inquiryController.getAllInquiries);
router.patch('/:id', protect, adminOnly, inquiryController.updateInquiryStatus);

module.exports = router;
