// frontend/src/pages/PaymentPage.jsx

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import {
  createPaymentOrder,
  verifyPayment,
  getMyEnrollments
} from "../services/paymentService";

import {
  Shield,
  Lock,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Trash2,
  CreditCard,
  CalendarCheck,
  IndianRupee
} from "lucide-react";

export default function PaymentPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [existingEnrollment, setExistingEnrollment] = useState(null);

  const [selectedPaymentType, setSelectedPaymentType] =
    useState("full_payment");

  const [loadingEnrollment, setLoadingEnrollment] =
    useState(true);

  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  const {
    cartItems,
    removeFromCart
  } = useCart();

  const {
    isAuthenticated,
    token,
    user
  } = useAuth();

  const navigate = useNavigate();

  const program = cartItems[0];

  // ==============================
  // AUTH
  // ==============================
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsVisible(true);
  }, [isAuthenticated, navigate]);

  // ==============================
  // LOAD EXISTING ENROLLMENT
  //
  // IMPORTANT:
  // If no successful payment has happened,
  // there should be NO enrollment.
  // ==============================
  useEffect(() => {
    const loadEnrollment = async () => {
      if (!token || !program?._id) {
        setLoadingEnrollment(false);
        return;
      }

      try {
        setLoadingEnrollment(true);
        setError("");

        const enrollments =
          await getMyEnrollments(token);

        const foundEnrollment =
          enrollments.find(
            (item) =>
              item.program?._id === program._id
          );

        setExistingEnrollment(
          foundEnrollment || null
        );

        // Existing partial payment means
        // only remaining payment is allowed.
        if (
          foundEnrollment &&
          Number(foundEnrollment.paidAmount || 0) > 0 &&
          Number(foundEnrollment.remainingAmount || 0) > 0
        ) {
          setSelectedPaymentType(
            "remaining_payment"
          );
        } else {
          setSelectedPaymentType(
            "full_payment"
          );
        }
      } catch (err) {
        console.error(
          "Enrollment loading error:",
          err
        );

        setError(
          "Unable to load your enrollment details."
        );
      } finally {
        setLoadingEnrollment(false);
      }
    };

    loadEnrollment();
  }, [token, program?._id]);

  // ==============================
  // EMPTY CART
  // ==============================
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="p-8 text-center">
          <p className="text-charcoal mb-4">
            Your cart is empty.
          </p>

          <Link to="/programs">
            <Button className="btn-primary">
              Browse Programs
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // ==============================
  // FINANCIAL VALUES
  // ==============================
  const totalAmount = Number(
    existingEnrollment?.totalAmount ??
      program.price ??
      0
  );

  const paidAmount = Number(
    existingEnrollment?.paidAmount ?? 0
  );

  const remainingAmount = Number(
    existingEnrollment?.remainingAmount ??
      totalAmount
  );

  const seatBookingAmount = Number(
    program.seatBookingAmount ?? 999
  );

  const hasPartialPayment =
    paidAmount > 0 &&
    remainingAmount > 0;

  const fullyPaid =
    paidAmount > 0 &&
    remainingAmount <= 0;

  // ==============================
  // SELECTED PAYMENT AMOUNT
  // ==============================
  const selectedAmount = useMemo(() => {
    if (
      selectedPaymentType ===
      "remaining_payment"
    ) {
      return remainingAmount;
    }

    if (
      selectedPaymentType ===
      "seat_booking"
    ) {
      return seatBookingAmount;
    }

    return totalAmount;
  }, [
    selectedPaymentType,
    remainingAmount,
    seatBookingAmount,
    totalAmount
  ]);

  // ==============================
  // SECURITY FEATURES
  // ==============================
  const securityFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: "256-bit SSL Encryption"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      text: "PCI DSS Compliant"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "Secure Payment Gateway"
    }
  ];

  // ==============================
  // PAYMENT
  // ==============================
  const handlePayment = async () => {
    if (paying || !program?._id) {
      return;
    }

    try {
      setPaying(true);
      setError("");

      let paymentType =
        selectedPaymentType;

      // Existing partial enrollment:
      // always pay remaining amount.
      if (hasPartialPayment) {
        paymentType =
          "remaining_payment";
      }

      const order =
        await createPaymentOrder(
          program._id,
          token,
          paymentType,
          existingEnrollment?._id || null
        );

      if (!order?.orderId) {
        throw new Error(
          "Unable to create payment order."
        );
      }

      const options = {
        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        // Backend returns amount in paise.
        amount:
          order.amount,

        currency:
          order.currency || "INR",

        name:
          "Impact You Academy",

        description:
          paymentType ===
          "seat_booking"
            ? `${program.title} - Seat Booking`
            : paymentType ===
              "remaining_payment"
            ? `${program.title} - Remaining Payment`
            : `${program.title} - Full Payment`,

        order_id:
          order.orderId,

        prefill: {
          name:
            user?.name || "",

          email:
            user?.email || ""
        },

        theme: {
          color: "#0F172A"
        },

        handler: async function (
          response
        ) {
          try {
            setPaying(true);
            setError("");

            // IMPORTANT:
            // Razorpay success alone is NOT enough.
            // Our backend verifies the signature,
            // amount and captured status.
            const verification =
              await verifyPayment(
                response,
                token
              );

            if (
              !verification ||
              !verification.success
            ) {
              throw new Error(
                "Payment verification failed."
              );
            }

            const verifiedEnrollment =
              verification.enrollment;

            // Update local state before navigating.
            if (verifiedEnrollment) {
              setExistingEnrollment({
                _id:
                  verifiedEnrollment.id,

                totalAmount:
                  verifiedEnrollment.totalAmount,

                paidAmount:
                  verifiedEnrollment.paidAmount,

                remainingAmount:
                  verifiedEnrollment.remainingAmount,

                paymentStatus:
                  verifiedEnrollment.paymentStatus,

                status:
                  verifiedEnrollment.status,

                program: {
                  _id: program._id,
                  title: program.title
                }
              });
            }

            if (
              Number(
                verifiedEnrollment?.remainingAmount ||
                  0
              ) > 0
            ) {
              alert(
                `Payment successful! Remaining balance: ₹${Number(
                  verifiedEnrollment.remainingAmount
                ).toLocaleString("en-IN")}`
              );
            } else {
              alert(
                "Payment successful! Your course is fully paid."
              );
            }

            navigate("/dashboard");
          } catch (
            verificationError
          ) {
            console.error(
              "Payment verification error:",
              verificationError
            );

            setError(
              verificationError.message ||
                "Payment verification failed. Please contact support."
            );

            alert(
              verificationError.message ||
                "Payment verification failed."
            );
          } finally {
            setPaying(false);
          }
        },

        modal: {
          ondismiss:
            function () {
              // User closed Razorpay.
              // DO NOT create an enrollment.
              setPaying(false);
            }
        }
      };

      if (
        typeof window.Razorpay !==
        "function"
      ) {
        throw new Error(
          "Razorpay is not loaded. Please refresh the page and try again."
        );
      }

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.on(
        "payment.failed",
        function (
          response
        ) {
          console.error(
            "Razorpay payment failed:",
            response
          );

          setError(
            response?.error?.description ||
              "Payment failed. Please try again."
          );

          setPaying(false);
        }
      );

      razorpay.open();
    } catch (err) {
      console.error(
        "Payment error:",
        err
      );

      setError(
        err.message ||
          "Payment failed. Please try again."
      );

      setPaying(false);
    }
  };

  // ==============================
  // FULLY PAID UI
  // ==============================
  if (fullyPaid) {
    return (
      <div className="min-h-screen bg-slate-50">

        <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light py-20">
          <div className="container-custom">

            <Link
              to="/programs"
              className="inline-flex items-center text-slate-300 hover:text-gold mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Link>

            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Course Already Paid
            </h1>

          </div>
        </section>

        <section className="py-12">

          <div className="container-custom max-w-2xl">

            <Card className="p-8 text-center">

              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />

              <h2 className="text-2xl font-bold text-navy">
                You're fully paid!
              </h2>

              <p className="text-charcoal mt-2">
                {program.title}
              </p>

              <div className="mt-6 bg-slate-50 rounded-lg p-5">

                <div className="flex justify-between">
                  <span>
                    Total Course Fee
                  </span>

                  <strong>
                    ₹
                    {totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div className="flex justify-between mt-2 text-green-700">
                  <span>
                    Total Paid
                  </span>

                  <strong>
                    ₹
                    {paidAmount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div className="flex justify-between mt-2">
                  <span>
                    Remaining
                  </span>

                  <strong>
                    ₹0
                  </strong>
                </div>

              </div>

              <Button
                className="btn-primary mt-6"
                onClick={() =>
                  navigate(
                    "/dashboard"
                  )
                }
              >
                Go to Dashboard
              </Button>

            </Card>

          </div>

        </section>

      </div>
    );
  }

  return (
    <div
      data-testid="payment-page"
      className="min-h-screen bg-slate-50"
    >

      {/* ================= HEADER ================= */}
      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light py-20 relative overflow-hidden">

        <div className="container-custom relative z-10">

          <Link
            to="/programs"
            className="inline-flex items-center text-slate-300 hover:text-gold mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>

          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Complete Your Enrollment
          </h1>

          <p className="text-slate-300 mt-2">
            Choose how you'd like to pay
          </p>

        </div>

      </section>

      {/* ================= MAIN ================= */}
      <section className="py-12">

        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* PROGRAM */}
            <Card className="p-6 border-2 border-slate-200">

              <div className="flex justify-between items-start gap-4">

                <div>

                  <h2 className="text-xl font-bold text-navy">
                    {program.title}
                  </h2>

                  <p className="text-sm text-charcoal mt-1">
                    {program.duration ||
                      "Professional Program"}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-xl font-bold text-navy">
                    ₹
                    {totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  {!existingEnrollment && (
                    <button
                      onClick={() =>
                        removeFromCart(
                          program._id
                        )
                      }
                      className="flex items-center text-sm text-red-500 mt-2 hover:underline"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  )}

                </div>

              </div>

            </Card>

            {/* ================= EXISTING PAYMENT ================= */}
            {existingEnrollment &&
              paidAmount > 0 && (
                <Card className="p-6 border-2 border-green-200 bg-green-50">

                  <h3 className="font-bold text-green-800 mb-4">
                    Your Payment Status
                  </h3>

                  <div className="grid grid-cols-3 gap-4">

                    <div>
                      <p className="text-xs text-green-700">
                        Course Fee
                      </p>

                      <p className="font-bold text-green-900">
                        ₹
                        {totalAmount.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-green-700">
                        Already Paid
                      </p>

                      <p className="font-bold text-green-900">
                        ₹
                        {paidAmount.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-green-700">
                        Remaining
                      </p>

                      <p className="font-bold text-green-900">
                        ₹
                        {remainingAmount.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                  </div>

                </Card>
              )}

            {/* ================= PAYMENT OPTIONS ================= */}
            <Card className="p-6 border-2 border-slate-200">

              <h2 className="text-xl font-bold text-navy mb-5">
                Choose Payment Option
              </h2>

              {loadingEnrollment ? (

                <p className="text-sm text-charcoal">
                  Loading your enrollment details...
                </p>

              ) : (

                <div className="space-y-4">

                  {/* FULL PAYMENT */}
                  {!hasPartialPayment && (
                    <label
                      className={`block border-2 rounded-xl p-5 cursor-pointer transition ${
                        selectedPaymentType ===
                        "full_payment"
                          ? "border-navy bg-slate-50"
                          : "border-slate-200"
                      }`}
                    >

                      <div className="flex items-start gap-4">

                        <input
                          type="radio"
                          name="paymentType"
                          value="full_payment"
                          checked={
                            selectedPaymentType ===
                            "full_payment"
                          }
                          onChange={() =>
                            setSelectedPaymentType(
                              "full_payment"
                            )
                          }
                          className="mt-1"
                        />

                        <div className="flex-1">

                          <div className="flex justify-between">

                            <div>

                              <p className="font-bold text-navy">
                                Pay Full Amount
                              </p>

                              <p className="text-sm text-charcoal mt-1">
                                Pay the complete course
                                fee now.
                              </p>

                            </div>

                            <strong className="text-lg text-navy">
                              ₹
                              {totalAmount.toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                          </div>

                        </div>

                      </div>

                    </label>
                  )}

                  {/* SEAT BOOKING */}
                  {!hasPartialPayment &&
                    program.allowSeatBooking && (

                      <label
                        className={`block border-2 rounded-xl p-5 cursor-pointer transition ${
                          selectedPaymentType ===
                          "seat_booking"
                            ? "border-gold bg-amber-50"
                            : "border-slate-200"
                        }`}
                      >

                        <div className="flex items-start gap-4">

                          <input
                            type="radio"
                            name="paymentType"
                            value="seat_booking"
                            checked={
                              selectedPaymentType ===
                              "seat_booking"
                            }
                            onChange={() =>
                              setSelectedPaymentType(
                                "seat_booking"
                              )
                            }
                            className="mt-1"
                          />

                          <div className="flex-1">

                            <div className="flex justify-between">

                              <div>

                                <p className="font-bold text-navy flex items-center">

                                  <CalendarCheck className="w-5 h-5 mr-2" />

                                  Book Your Seat

                                </p>

                                <p className="text-sm text-charcoal mt-1">
                                  Reserve your seat now
                                  and pay the balance
                                  later.
                                </p>

                              </div>

                              <strong className="text-lg text-navy">
                                ₹
                                {seatBookingAmount.toLocaleString(
                                  "en-IN"
                                )}
                              </strong>

                            </div>

                            <div className="mt-4 text-sm">

                              <span className="font-semibold">
                                Remaining later:
                              </span>{" "}

                              ₹
                              {Math.max(
                                totalAmount -
                                  seatBookingAmount,
                                0
                              ).toLocaleString(
                                "en-IN"
                              )}

                            </div>

                          </div>

                        </div>

                      </label>
                    )}

                  {/* REMAINING PAYMENT */}
                  {hasPartialPayment && (

                    <div className="border-2 border-gold rounded-xl p-5 bg-amber-50">

                      <div className="flex items-start gap-4">

                        <div className="p-2 bg-white rounded-lg">
                          <IndianRupee className="w-6 h-6 text-gold" />
                        </div>

                        <div className="flex-1">

                          <p className="font-bold text-navy">
                            Pay Remaining Amount
                          </p>

                          <p className="text-sm text-charcoal mt-1">
                            Your previous payment has
                            already been deducted.
                          </p>

                          <p className="text-2xl font-bold text-navy mt-3">
                            ₹
                            {remainingAmount.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                      </div>

                    </div>
                  )}

                </div>
              )}

            </Card>

            {/* ================= ERROR ================= */}
            {error && (

              <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg text-sm">
                {error}
              </div>

            )}

            {/* ================= PAY BUTTON ================= */}
            <Button
              className="w-full py-6 text-base font-semibold btn-gold"
              onClick={handlePayment}
              disabled={
                paying ||
                loadingEnrollment ||
                selectedAmount <= 0
              }
            >

              <span className="flex items-center justify-center">

                <CreditCard className="w-5 h-5 mr-2" />

                {paying
                  ? "Processing..."
                  : selectedPaymentType ===
                    "seat_booking"
                  ? `Book Seat for ₹${seatBookingAmount.toLocaleString(
                      "en-IN"
                    )}`
                  : selectedPaymentType ===
                    "remaining_payment"
                  ? `Pay Remaining ₹${remainingAmount.toLocaleString(
                      "en-IN"
                    )}`
                  : `Pay ₹${totalAmount.toLocaleString(
                      "en-IN"
                    )}`}

                <ChevronRight className="w-5 h-5 ml-2" />

              </span>

            </Button>

          </div>

          {/* ================= RIGHT SUMMARY ================= */}
          <div>

            <Card className="p-6 border-2 border-slate-200 sticky top-24">

              <h3 className="text-lg font-bold text-navy mb-4 border-b pb-3">
                Payment Summary
              </h3>

              <div className="flex justify-between mb-2">

                <span className="text-charcoal">
                  Course Fee
                </span>

                <span className="font-semibold">
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="flex justify-between mb-2">

                <span className="text-charcoal">
                  Already Paid
                </span>

                <span className="font-semibold text-green-700">
                  ₹
                  {paidAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="border-t pt-3 mt-3 flex justify-between text-lg font-bold text-navy">

                <span>
                  {selectedPaymentType ===
                  "seat_booking"
                    ? "Pay Now"
                    : "Amount Due"}
                </span>

                <span>
                  ₹
                  {selectedAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              {selectedPaymentType ===
                "seat_booking" && (

                <p className="text-xs text-charcoal mt-3">

                  Remaining ₹
                  {Math.max(
                    totalAmount -
                      paidAmount -
                      selectedAmount,
                    0
                  ).toLocaleString(
                    "en-IN"
                  )}{" "}
                  can be paid later.

                </p>
              )}

              <p className="text-xs text-charcoal mt-4">
                Inclusive of all applicable taxes.
              </p>

            </Card>

            <Card className="p-5 mt-6 border-2">

              <h4 className="text-sm font-semibold text-navy mb-3 flex items-center">

                <Shield className="w-4 h-4 mr-2 text-gold" />

                Secure Payment

              </h4>

              {securityFeatures.map(
                (feature, index) => (

                  <div
                    key={index}
                    className="flex items-center text-xs text-charcoal mb-2"
                  >

                    <span className="mr-2 text-gold">
                      {feature.icon}
                    </span>

                    {feature.text}

                  </div>

                )
              )}

            </Card>

          </div>

        </div>

      </section>

    </div>
  );
}