const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    duration: String,
    price: { type: Number, required: true },

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
