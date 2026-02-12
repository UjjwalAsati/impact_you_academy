import React from 'react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Shipping & Delivery Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>Impact You Academy provides digital educational services and professional training programs.</p>
          <h2 className="text-2xl font-bold text-slate-800">Delivery of Services</h2>
          <p>For our online programs, access is granted immediately or within 24 hours of successful payment confirmation via our dashboard.</p>
          <p>There are no physical products to be shipped; therefore, no shipping charges apply.</p>
        </div>
      </div>
    </div>
  );
}