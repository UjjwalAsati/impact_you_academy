import React from 'react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms and Conditions</h1>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>Welcome to Impact You Academy. By accessing this website, you agree to comply with these terms.</p>
          <h2 className="text-2xl font-bold text-slate-800">User Responsibilities</h2>
          <p>Users must provide accurate information during registration and enrollment. Unauthorized use of course materials is prohibited.</p>
          <h2 className="text-2xl font-bold text-slate-800">Intellectual Property</h2>
          <p>All content, including curriculum and training videos, is the property of Impact You Academy.</p>
        </div>
      </div>
    </div>
  );
}