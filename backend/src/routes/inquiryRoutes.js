const express = require("express");
const router = express.Router();

const inquiryController = require("../controllers/inquiryController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// CUSTOMER
router.post("/", inquiryController.createInquiry);

// ADMIN
router.get("/", protect, adminOnly, inquiryController.getAllInquiries);
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  inquiryController.updateInquiryStatus
);

module.exports = router;
