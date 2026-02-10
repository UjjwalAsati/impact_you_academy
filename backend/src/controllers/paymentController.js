const razorpay = require("../services/razorpayService");
const Program = require("../models/Program");
const Payment = require("../models/Payment");
const Enrollment = require("../models/Enrollment");

exports.createOrder = async (req, res) => {
  try {
    const { programId } = req.body;

    if (!programId) {
      return res.status(400).json({ message: "Program ID required" });
    }

    const program = await Program.findById(programId);
    if (!program || !program.isActive) {
      return res.status(404).json({ message: "Program not available" });
    }

    const amount = program.price * 100; // INR → paise

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        platform: "impact-you-academy",
        programId: program._id.toString(),
        userId: req.user._id.toString()
      }
    });

    // Create enrollment as PENDING
    const enrollment = await Enrollment.create({
      user: req.user._id,
      program: program._id,
      status: "pending"
    });

    // Save payment intent
    const payment = await Payment.create({
      user: req.user._id,
      program: program._id,
      razorpayOrderId: order.id,
      amount: program.price,
      status: "created"
    });

    res.json({
      orderId: order.id,
      amount: program.price,
      currency: "INR",
      enrollmentId: enrollment._id
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
};
