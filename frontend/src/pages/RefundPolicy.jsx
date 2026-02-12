import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Cancellation & Refund Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>We strive to provide the best training experience. Please read our refund policy below:</p>
          <h2 className="text-2xl font-bold text-slate-800">Course Cancellations</h2>
          <p>Cancellations made within 24 hours of enrollment are eligible for a full refund, provided no course materials have been accessed.</p>
          <h2 className="text-2xl font-bold text-slate-800">Refund Processing</h2>
          <p>Approved refunds will be processed via the original payment method (Razorpay) within 7-10 working days.</p>
        </div>
      </div>
    </div>
  );
}