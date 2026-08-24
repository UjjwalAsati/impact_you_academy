const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

const {
  protect
} = require("../middlewares/authMiddleware");

// Create Razorpay order
router.post(
  "/create-order",
  protect,
  paymentController.createOrder
);

// Verify successful Razorpay payment
router.post(
  "/verify",
  protect,
  paymentController.verifyPayment
);

module.exports = router;