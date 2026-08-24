const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: String,

    duration: String,

    // Full course price in INR
    price: {
      type: Number,
      required: true,
      min: 0
    },

    // Whether students can reserve a seat by paying a smaller amount
    allowSeatBooking: {
      type: Boolean,
      default: false
    },

    // Amount required to reserve a seat
    seatBookingAmount: {
      type: Number,
      default: 999,
      min: 1
    },

    certification: String,

    schedule: String,

    learningOutcomes: [String],

    modules: [
      {
        title: String,
        topics: [String]
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);