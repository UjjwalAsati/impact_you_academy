import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPaymentOrder } from "../services/paymentService";

import {
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  Lock,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Trash2,
} from "lucide-react";

export default function PaymentPage() {
  
  const [isVisible, setIsVisible] = useState(false);

  const { cartItems, removeFromCart, totalAmount } = useCart();
  const { isAuthenticated, token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setIsVisible(true);
  }, [isAuthenticated, navigate]);


  const securityFeatures = [
    { icon: <Shield className="w-5 h-5" />, text: "256-bit SSL Encryption" },
    { icon: <Lock className="w-5 h-5" />, text: "PCI DSS Compliant" },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: "Secure Payment Gateway" },
  ];
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="p-8 text-center">
          <p className="text-charcoal mb-4">Your cart is empty.</p>
          <Link to="/programs">
            <Button className="btn-primary">Browse Programs</Button>
          </Link>
        </Card>
      </div>
    );
  }
const handlePayment = async () => {
  try {
    const program = cartItems[0];

    const order = await createPaymentOrder(program._id, token);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount * 100,
      currency: order.currency,
      name: "Impact You Academy",
      description: program.title,
      order_id: order.orderId,
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#0F172A",
      },
      handler: function (response) {
        console.log("Payment success:", response);
        alert("Payment successful! Your enrollment will be activated shortly.");
        navigate("/dashboard");
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment error:", error);
    alert("Payment failed. Please try again.");
  }
};



  return (
    <div data-testid="payment-page" className="min-h-screen bg-slate-50">
      {/* Header */}
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
            Your Enrollment Cart
          </h1>
          <p className="text-slate-300 mt-2">
            Review your selected programs and complete payment
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-12">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT: CART */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-navy">
              Selected Programs ({cartItems.length})
            </h2>

            {
              cartItems.map((program) => (
                <Card
                  key={program._id}
                  className="p-6 border-2 border-slate-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-navy">
                        {program.title}
                      </h3>
                      <p className="text-sm text-charcoal">
                        {program.duration || "Professional Program"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-navy">
                        ₹{Number(program.price || 0).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(program._id)}
                        className="flex items-center text-sm text-red-500 mt-2 hover:underline"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            }

            {/* PAYMENT METHOD */}
            <div className="pt-6">
            <Button
              className="w-full py-6 text-base font-semibold btn-gold"
              onClick={handlePayment}
            >
              <span className="flex items-center justify-center">
                Pay Securely with Razorpay
                <ChevronRight className="w-5 h-5 ml-2" />
              </span>
            </Button>
          </div>

          </div>

          {/* RIGHT: SUMMARY */}
          <div>
            <Card className="p-6 border-2 border-slate-200 sticky top-24">
              <h3 className="text-lg font-bold text-navy mb-4 border-b pb-3">
                Order Summary
              </h3>

              <div className="flex justify-between mb-2">
                <span className="text-charcoal">Programs</span>
                <span className="font-semibold">{cartItems.length}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-navy mt-4">
                <span>Total</span>
                <span>₹{Number(totalAmount || 0).toLocaleString()}</span>
              </div>

              <p className="text-xs text-charcoal mt-2">
                Inclusive of all taxes
              </p>
            </Card>

            <Card className="p-5 mt-6 border-2">
              <h4 className="text-sm font-semibold text-navy mb-3 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-gold" />
                Secure Payment
              </h4>
              {securityFeatures.map((f, i) => (
                <div key={i} className="flex items-center text-xs text-charcoal mb-2">
                  <span className="mr-2 text-gold">{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
