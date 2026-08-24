const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true
    },

    // Course fee locked at the time of enrollment
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    // Total successfully paid by this student
    paidAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    // Amount still outstanding
    remainingAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "partially_paid", "paid"],
      default: "unpaid"
    },

    status: {
      type: String,
      enum: ["pending", "active", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// A student should have only one enrollment per program
enrollmentSchema.index(
  { user: 1, program: 1 },
  { unique: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);