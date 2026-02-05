import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Shield, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Users, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export default function PaymentPage() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const programs = [
    {
      id: 'foundation',
      title: 'Recruiter Foundation Program',
      duration: '30 Days',
      audience: 'Graduates & Career Starters',
      price: '₹18,000',
      originalPrice: '₹24,000',
      features: ['Full-cycle recruitment training', 'Sourcing lab sessions', 'Interview coordination', 'Professional certification'],
    },
    {
      id: 'advanced',
      title: 'Advanced Staffing & TA Program',
      duration: '45-60 Days',
      audience: 'HR Professionals & Recruiters',
      price: '₹35,000',
      originalPrice: '₹45,000',
      features: ['Strategic TA planning', 'Stakeholder management', 'Recruitment analytics', 'Career mentorship'],
    },
    {
      id: 'fasttrack',
      title: 'Fast-Track Certification',
      duration: '15 Days',
      audience: 'Experienced Professionals',
      price: '₹15,000',
      originalPrice: '₹20,000',
      features: ['Accelerated curriculum', 'Industry best practices', 'Professional certification', 'Career counseling'],
    },
  ];

  const paymentMethods = [
    {
      id: 'card',
      title: 'Credit / Debit Card',
      description: 'Visa, Mastercard, Rupay',
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: 'upi',
      title: 'UPI Payment',
      description: 'GPay, PhonePe, Paytm',
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      description: 'All major banks supported',
      icon: <Building2 className="w-6 h-6" />,
    },
  ];

  const securityFeatures = [
    { icon: <Shield className="w-5 h-5" />, text: '256-bit SSL Encryption' },
    { icon: <Lock className="w-5 h-5" />, text: 'PCI DSS Compliant' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'Secure Payment Gateway' },
  ];

  return (
    <div data-testid="payment-page" className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section 
        data-testid="payment-header" 
        className={`bg-gradient-to-br from-navy-dark via-navy to-navy-light py-16 lg:py-24 lg:py-32 relative overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <Link 
            to="/programs" 
            className="inline-flex items-center text-slate-300 hover:text-gold transition-colors mb-6 group"
            data-testid="back-to-programs"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Programs
          </Link>
          <div className={`max-w-2xl transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 heading-font">
              Program Enrollment
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Select your program and complete enrollment to begin your professional journey in recruitment and talent acquisition.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section data-testid="payment-main-section" className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column - Program Selection & Payment */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Step 1: Program Selection */}
              <div className={`transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                  <h2 className="text-xl font-bold text-navy heading-font">Select Your Program</h2>
                </div>
                
                <div className="space-y-4">
                  {programs.map((program) => (
                    <Card
                      key={program.id}
                      data-testid={`program-option-${program.id}`}
                      hover={false}
                      className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                        selectedProgram?.id === program.id
                          ? 'border-gold bg-gold/5 shadow-glow-gold'
                          : 'border-slate-200 hover:border-navy/30 hover:shadow-medium'
                      }`}
                      onClick={() => setSelectedProgram(program)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start space-x-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
                              selectedProgram?.id === program.id ? 'border-gold bg-gold' : 'border-slate-300'
                            }`}>
                              {selectedProgram?.id === program.id && (
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-navy heading-font mb-1">
                                {program.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal mb-3">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1 text-gold" />
                                  {program.duration}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1 text-gold" />
                                  {program.audience}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {program.features.map((feature, idx) => (
                                  <span 
                                    key={idx} 
                                    className="text-xs px-2 py-1 bg-slate-100 text-charcoal rounded-full"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right md:min-w-[120px] pl-9 md:pl-0">
                          <div className="text-2xl font-bold text-navy">{program.price}</div>
                          <div className="text-sm text-charcoal line-through">{program.originalPrice}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    selectedProgram ? 'bg-navy' : 'bg-slate-300'
                  }`}>
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                  <h2 className={`text-xl font-bold heading-font transition-colors ${
                    selectedProgram ? 'text-navy' : 'text-slate-400'
                  }`}>
                    Select Payment Method
                  </h2>
                </div>
                
                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-opacity duration-300 ${
                  selectedProgram ? 'opacity-100' : 'opacity-50 pointer-events-none'
                }`}>
                  {paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      data-testid={`payment-method-${method.id}`}
                      hover={false}
                      className={`p-5 cursor-pointer transition-all duration-300 border-2 text-center ${
                        selectedPaymentMethod?.id === method.id
                          ? 'border-gold bg-gold/5 shadow-glow-gold'
                          : 'border-slate-200 hover:border-navy/30 hover:shadow-soft'
                      }`}
                      onClick={() => selectedProgram && setSelectedPaymentMethod(method)}
                    >
                      <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                        selectedPaymentMethod?.id === method.id ? 'bg-gold/20 text-gold' : 'bg-slate-100 text-charcoal'
                      }`}>
                        {method.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-navy mb-1">{method.title}</h3>
                      <p className="text-xs text-charcoal">{method.description}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Proceed Button */}
              <div className={`transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <Button
                  data-testid="proceed-to-payment-btn"
                  disabled={!selectedProgram || !selectedPaymentMethod}
                  className={`w-full py-6 text-base font-semibold transition-all duration-300 ${
                    selectedProgram && selectedPaymentMethod
                      ? 'btn-gold'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    Proceed to Secure Payment
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </span>
                </Button>
                <p className="text-xs text-center text-charcoal mt-3">
                  You will be redirected to our secure payment gateway
                </p>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className={`sticky top-24 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <Card 
                  data-testid="order-summary-card"
                  hover={false}
                  className="p-6 border-2 border-slate-200 bg-white"
                >
                  <h3 className="text-lg font-bold text-navy mb-6 heading-font border-b border-slate-200 pb-4">
                    Order Summary
                  </h3>
                  
                  {selectedProgram ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-base font-semibold text-navy mb-1">
                          {selectedProgram.title}
                        </h4>
                        <p className="text-sm text-charcoal">{selectedProgram.duration} • Online Program</p>
                      </div>
                      
                      <div className="border-t border-slate-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal">Program Fee</span>
                          <span className="text-charcoal line-through">{selectedProgram.originalPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal">Discount</span>
                          <span className="text-green-600 font-medium">Limited Offer</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-slate-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-semibold text-navy">Total Amount</span>
                          <span className="text-2xl font-bold text-navy">{selectedProgram.price}</span>
                        </div>
                        <p className="text-xs text-charcoal mt-1">Inclusive of all taxes</p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-sm text-charcoal">
                        Select a program to view order details
                      </p>
                    </div>
                  )}
                </Card>

                {/* Security Assurance */}
                <Card 
                  data-testid="security-card"
                  hover={false}
                  className="p-5 mt-6 border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white"
                >
                  <h4 className="text-sm font-semibold text-navy mb-4 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-gold" />
                    Secure Payment
                  </h4>
                  <div className="space-y-3">
                    {securityFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-charcoal">
                        <span className="text-gold mr-2">{feature.icon}</span>
                        {feature.text}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Support Info */}
                <div className="mt-6 p-4 bg-navy/5 rounded-xl">
                  <p className="text-xs text-charcoal text-center">
                    Need help? Contact us at{' '}
                    <a href="mailto:info@impactyouacademy.com" className="text-navy font-medium hover:text-gold transition-colors">
                      info@impactyouacademy.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section 
        data-testid="trust-section" 
        className={`py-12 bg-white border-t border-slate-200 transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            <div className="flex items-center space-x-2 text-charcoal">
              <Shield className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium">100% Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 text-charcoal">
              <CheckCircle2 className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium">Instant Confirmation</span>
            </div>
            <div className="flex items-center space-x-2 text-charcoal">
              <Lock className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium">Data Privacy Protected</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
