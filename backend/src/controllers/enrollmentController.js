const Enrollment = require("../models/Enrollment");
const Program = require("../models/Program");

// ==============================
// USER: Create Enrollment
// ==============================
exports.createEnrollment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { programId } = req.body;

    if (!programId) {
      return res.status(400).json({
        message: "Program ID is required"
      });
    }

    const program = await Program.findById(programId);

    if (!program || !program.isActive) {
      return res.status(404).json({
        message: "Program not found"
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      program: programId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: "Already enrolled in this program",
        enrollment: existingEnrollment
      });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      program: programId,
      totalAmount: program.price,
      paidAmount: 0,
      remainingAmount: program.price,
      paymentStatus: "unpaid",
      status: "pending"
    });

    res.status(201).json({
      message: "Enrollment created",
      enrollment
    });
  } catch (error) {
    console.error("Create enrollment error:", error);

    // Handles duplicate index race condition
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Already enrolled in this program"
      });
    }

    res.status(500).json({
      message: "Failed to create enrollment"
    });
  }
};

// ==============================
// USER: Get My Enrollments
// ==============================
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user._id
    })
      .populate(
        "program",
        "title duration price allowSeatBooking seatBookingAmount"
      )
      .sort({ createdAt: -1 });

    res.json(enrollments);
  } catch (error) {
    console.error("Get my enrollments error:", error);

    res.status(500).json({
      message: "Failed to fetch enrollments"
    });
  }
};

// ==============================
// ADMIN: Get All Enrollments
// ==============================
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("user", "name email")
      .populate(
        "program",
        "title duration price allowSeatBooking seatBookingAmount"
      )
      .sort({ createdAt: -1 });

    res.json(enrollments);
  } catch (error) {
    console.error("Get all enrollments error:", error);

    res.status(500).json({
      message: "Failed to fetch enrollments"
    });
  }
};

// ==============================
// ADMIN: Update Enrollment Status
// ==============================
exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "active", "completed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found"
      });
    }

    enrollment.status = status;

    await enrollment.save();

    res.json({
      message: "Enrollment status updated",
      enrollment
    });
  } catch (error) {
    console.error("Update enrollment status error:", error);

    res.status(500).json({
      message: "Failed to update enrollment status"
    });
  }
};