const crypto = require("crypto");

const razorpay = require("../services/razorpayService");
const Program = require("../models/Program");
const Payment = require("../models/Payment");
const Enrollment = require("../models/Enrollment");

// ==============================
// USER: Create Razorpay Order
// ==============================
exports.createOrder = async (req, res) => {
  try {
    const {
      programId,
      paymentType,
      enrollmentId
    } = req.body;

    // ==========================================
    // VALIDATE REQUEST
    // ==========================================

    if (!programId) {
      return res.status(400).json({
        message: "Program ID required"
      });
    }

    if (
      !paymentType ||
      ![
        "full_payment",
        "seat_booking",
        "remaining_payment"
      ].includes(paymentType)
    ) {
      return res.status(400).json({
        message: "Invalid payment type"
      });
    }

    // ==========================================
    // FIND PROGRAM
    // ==========================================

    const program = await Program.findById(programId);

    if (!program || !program.isActive) {
      return res.status(404).json({
        message: "Program not available"
      });
    }

    // ==========================================
    // FIND EXISTING ENROLLMENT ONLY
    //
    // IMPORTANT:
    // We NEVER create an enrollment here.
    //
    // A brand-new student should only get an
    // enrollment after successful payment.
    // ==========================================

    let enrollment = null;

    if (enrollmentId) {
      enrollment = await Enrollment.findOne({
        _id: enrollmentId,
        user: req.user._id,
        program: program._id
      });
    }

    if (!enrollment) {
      enrollment = await Enrollment.findOne({
        user: req.user._id,
        program: program._id
      });
    }

    // ==========================================
    // NORMALIZE EXISTING ENROLLMENT
    // ==========================================

    if (enrollment) {
      // Older enrollment compatibility
      if (
        enrollment.totalAmount === undefined ||
        enrollment.totalAmount === null ||
        Number(enrollment.totalAmount) <= 0
      ) {
        enrollment.totalAmount = program.price;
      }

      if (
        enrollment.paidAmount === undefined ||
        enrollment.paidAmount === null
      ) {
        enrollment.paidAmount = 0;
      }

      enrollment.remainingAmount = Math.max(
        Number(enrollment.totalAmount) -
          Number(enrollment.paidAmount),
        0
      );

      if (enrollment.remainingAmount === 0) {
        enrollment.paymentStatus = "paid";
      } else if (
        Number(enrollment.paidAmount) > 0
      ) {
        enrollment.paymentStatus = "partially_paid";
      } else {
        enrollment.paymentStatus = "unpaid";
      }

      await enrollment.save();

      // Already fully paid
      if (
        enrollment.paymentStatus === "paid" ||
        Number(enrollment.remainingAmount) <= 0
      ) {
        return res.status(400).json({
          message: "This program is already fully paid"
        });
      }
    }

    // ==========================================
    // DETERMINE PAYMENT AMOUNT
    // ==========================================

    let amount;
    let actualPaymentType;

    // ==========================================
    // EXISTING PARTIAL ENROLLMENT
    // ==========================================

    if (
      enrollment &&
      Number(enrollment.paidAmount) > 0
    ) {
      amount = enrollment.remainingAmount;
      actualPaymentType = "remaining_payment";
    }

    // ==========================================
    // NEW SEAT BOOKING
    // ==========================================

    else if (paymentType === "seat_booking") {
      if (!program.allowSeatBooking) {
        return res.status(400).json({
          message:
            "Seat booking is not available for this program"
        });
      }

      if (
        !program.seatBookingAmount ||
        Number(program.seatBookingAmount) <= 0 ||
        Number(program.seatBookingAmount) >=
          Number(program.price)
      ) {
        return res.status(400).json({
          message: "Invalid seat booking amount"
        });
      }

      amount = Number(program.seatBookingAmount);
      actualPaymentType = "seat_booking";
    }

    // ==========================================
    // NEW FULL PAYMENT
    // ==========================================

    else {
      amount = enrollment
        ? Number(enrollment.remainingAmount)
        : Number(program.price);

      actualPaymentType = "full_payment";
    }

    // ==========================================
    // VALIDATE AMOUNT
    // ==========================================

    amount = Number(amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount"
      });
    }

    // ==========================================
    // REUSE EXISTING UNPAID PAYMENT
    //
    // This prevents duplicate Razorpay orders
    // when the user clicks the payment button
    // multiple times.
    // ==========================================

    const existingPaymentQuery = {
      user: req.user._id,
      program: program._id,
      amount,
      paymentType: actualPaymentType,
      status: "created"
    };

    // Existing enrollment:
    // attach payment to it.
    //
    // New enrollment:
    // keep enrollment null until payment succeeds.
    if (enrollment) {
      existingPaymentQuery.enrollment =
        enrollment._id;
    } else {
      existingPaymentQuery.enrollment = null;
    }

    const existingPayment =
      await Payment.findOne(
        existingPaymentQuery
      ).sort({ createdAt: -1 });

    if (existingPayment) {
      return res.json({
        orderId:
          existingPayment.razorpayOrderId,

        amount:
          Math.round(
            Number(existingPayment.amount) * 100
          ),

        amountInRupees:
          Number(existingPayment.amount),

        currency:
          existingPayment.currency,

        enrollmentId:
          enrollment?._id || null,

        paymentId:
          existingPayment._id,

        paymentType:
          existingPayment.paymentType,

        totalAmount:
          enrollment?.totalAmount ||
          program.price,

        paidAmount:
          enrollment?.paidAmount || 0,

        remainingAmount:
          enrollment?.remainingAmount ??
          program.price
      });
    }

    // ==========================================
    // CREATE RAZORPAY ORDER
    // ==========================================

    const amountInPaise =
      Math.round(amount * 100);

    const order =
      await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,

        notes: {
          platform:
            "impact-you-academy",

          programId:
            program._id.toString(),

          userId:
            req.user._id.toString(),

          paymentType:
            actualPaymentType,

          enrollmentId:
            enrollment?._id?.toString() || ""
        }
      });

    // ==========================================
    // CREATE PAYMENT INTENT
    //
    // IMPORTANT:
    // New students have enrollment = null.
    // Enrollment will be created only after
    // successful Razorpay verification.
    // ==========================================

    const payment =
      await Payment.create({
        user: req.user._id,

        program: program._id,

        enrollment:
          enrollment?._id || null,

        razorpayOrderId:
          order.id,

        amount,

        currency: "INR",

        paymentType:
          actualPaymentType,

        status: "created"
      });

    // ==========================================
    // RESPONSE
    // ==========================================

    res.json({
      orderId:
        order.id,

      // Razorpay expects paise
      amount:
        amountInPaise,

      // UI-friendly rupee amount
      amountInRupees:
        amount,

      currency:
        "INR",

      enrollmentId:
        enrollment?._id || null,

      paymentId:
        payment._id,

      paymentType:
        actualPaymentType,

      totalAmount:
        enrollment?.totalAmount ||
        program.price,

      paidAmount:
        enrollment?.paidAmount || 0,

      remainingAmount:
        enrollment?.remainingAmount ??
        program.price
    });

  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to create payment order"
    });
  }
};

// ==============================
// USER: Verify Razorpay Payment
// ==============================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;

    // ==========================================
    // VALIDATE VERIFICATION DATA
    // ==========================================

    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message:
          "Payment verification data is incomplete"
      });
    }

    // ==========================================
    // FIND OUR PAYMENT
    // ==========================================

    const payment =
      await Payment.findOne({
        razorpayOrderId:
          razorpay_order_id,

        user:
          req.user._id
      });

    if (!payment) {
      return res.status(404).json({
        message:
          "Payment order not found"
      });
    }

    // ==========================================
    // IDEMPOTENCY
    // ==========================================

    if (payment.status === "paid") {
      const enrollment =
        payment.enrollment
          ? await Enrollment.findById(
              payment.enrollment
            )
          : null;

      return res.json({
        success: true,

        message:
          "Payment already verified",

        enrollment
      });
    }

    // ==========================================
    // VERIFY RAZORPAY SIGNATURE
    // ==========================================

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          `${payment.razorpayOrderId}|${razorpay_payment_id}`
        )
        .digest("hex");

    const receivedBuffer =
      Buffer.from(
        razorpay_signature,
        "utf8"
      );

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
        "utf8"
      );

    if (
      receivedBuffer.length !==
        expectedBuffer.length ||
      !crypto.timingSafeEqual(
        receivedBuffer,
        expectedBuffer
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid payment signature"
      });
    }

    // ==========================================
    // ASK RAZORPAY FOR ACTUAL PAYMENT STATUS
    // ==========================================

    const razorpayPayment =
      await razorpay.payments.fetch(
        razorpay_payment_id
      );

    if (
      razorpayPayment.order_id !==
      payment.razorpayOrderId
    ) {
      return res.status(400).json({
        message:
          "Payment order mismatch"
      });
    }

    // ==========================================
    // VERIFY AMOUNT
    // ==========================================

    const expectedAmount =
      Math.round(
        Number(payment.amount) * 100
      );

    if (
      Number(razorpayPayment.amount) !==
      expectedAmount
    ) {
      return res.status(400).json({
        message:
          "Payment amount mismatch"
      });
    }

    // ==========================================
    // VERIFY CAPTURE STATUS
    // ==========================================

    if (
      razorpayPayment.status !== "captured" &&
      razorpayPayment.captured !== true
    ) {
      return res.status(400).json({
        message:
          "Payment has not been captured yet. Please try again shortly."
      });
    }

    // ==========================================
    // MARK PAYMENT AS PAID
    // ==========================================

    const updatedPayment =
      await Payment.findOneAndUpdate(
        {
          _id: payment._id,
          status: "created"
        },
        {
          $set: {
            razorpayPaymentId:
              razorpay_payment_id,

            razorpaySignature:
              razorpay_signature,

            status: "paid"
          }
        },
        {
          new: true
        }
      );

    if (!updatedPayment) {
      const existingPayment =
        await Payment.findById(
          payment._id
        );

      const enrollment =
        existingPayment?.enrollment
          ? await Enrollment.findById(
              existingPayment.enrollment
            )
          : null;

      return res.json({
        success: true,

        message:
          "Payment already processed",

        enrollment
      });
    }

    // ==========================================
    // FIND EXISTING ENROLLMENT
    // ==========================================

    let enrollment = null;

    if (updatedPayment.enrollment) {
      enrollment =
        await Enrollment.findOne({
          _id:
            updatedPayment.enrollment,

          user:
            updatedPayment.user,

          program:
            updatedPayment.program
        });
    }

    // ==========================================
    // IF NO ENROLLMENT EXISTS,
    // CREATE IT NOW — AFTER SUCCESSFUL PAYMENT
    // ==========================================

    if (!enrollment) {
      const program =
        await Program.findById(
          updatedPayment.program
        );

      if (!program) {
        return res.status(404).json({
          message:
            "Program not found"
        });
      }

      enrollment =
        await Enrollment.findOne({
          user:
            updatedPayment.user,

          program:
            updatedPayment.program
        });

      if (!enrollment) {
        enrollment =
          await Enrollment.create({
            user:
              updatedPayment.user,

            program:
              updatedPayment.program,

            totalAmount:
              program.price,

            paidAmount:
              0,

            remainingAmount:
              program.price,

            paymentStatus:
              "unpaid",

            status:
              "pending"
          });
      }

      // Attach enrollment to payment
      updatedPayment.enrollment =
        enrollment._id;

      await updatedPayment.save();
    }

    // ==========================================
    // CALCULATE ALL SUCCESSFUL PAYMENTS
    // ==========================================

    const paidPayments =
      await Payment.find({
        enrollment:
          enrollment._id,

        status:
          "paid"
      });

    const totalPaid =
      paidPayments.reduce(
        (sum, item) =>
          sum +
          Number(item.amount || 0),
        0
      );

    // ==========================================
    // UPDATE ENROLLMENT TOTALS
    // ==========================================

    enrollment.paidAmount =
      Math.min(
        totalPaid,
        Number(enrollment.totalAmount)
      );

    enrollment.remainingAmount =
      Math.max(
        Number(enrollment.totalAmount) -
          Number(enrollment.paidAmount),
        0
      );

    // ==========================================
    // UPDATE PAYMENT STATUS
    // ==========================================

    if (
      enrollment.remainingAmount === 0
    ) {
      enrollment.paymentStatus =
        "paid";
    } else if (
      enrollment.paidAmount > 0
    ) {
      enrollment.paymentStatus =
        "partially_paid";
    } else {
      enrollment.paymentStatus =
        "unpaid";
    }

    // ==========================================
    // PAYMENT SUCCESS = SEAT RESERVED
    // ==========================================

    if (
      enrollment.paidAmount > 0
    ) {
      enrollment.status =
        "active";
    }

    await enrollment.save();

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    res.json({
      success: true,

      message:
        "Payment verified successfully",

      payment: {
        id:
          updatedPayment._id,

        amount:
          updatedPayment.amount,

        type:
          updatedPayment.paymentType,

        status:
          updatedPayment.status
      },

      enrollment: {
        id:
          enrollment._id,

        totalAmount:
          enrollment.totalAmount,

        paidAmount:
          enrollment.paidAmount,

        remainingAmount:
          enrollment.remainingAmount,

        paymentStatus:
          enrollment.paymentStatus,

        status:
          enrollment.status
      }
    });

  } catch (error) {
    console.error(
      "Verify payment error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to verify payment"
    });
  }
};