import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>Last updated: February 12, 2026</p>
          <p>Impact You Academy ("us", "we", or "our") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.</p>
          <h2 className="text-2xl font-bold text-slate-800">Data Collection</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you, including Email address, First name and last name, and Phone number.</p>
          <h2 className="text-2xl font-bold text-slate-800">Payments</h2>
          <p>We use third-party services for payment processing (e.g. Razorpay). We will not store or collect your payment card details.</p>
        </div>
      </div>
    </div>
  );
}