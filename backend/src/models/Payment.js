const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    amount: Number,
    currency: {
      type: String,
      default: 'INR'
    },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
      default: 'created'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
