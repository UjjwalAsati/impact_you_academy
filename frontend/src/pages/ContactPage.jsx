import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles, 
  ChevronDown, 
  MessageSquare,
  Clock,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ContactPage() {
  // --- INTERNAL ANIMATION STYLES ---
  const animationStyles = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .animate-float { animation: float 3s ease-in-out infinite; }
  `;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    programInterest: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programs = [
    'Recruiter Foundation Program (30 Days)',
    'Advanced Staffing & TA Program (45-60 Days)',
    'Fast-Track Recruiter Certification (15 Days)',
    'Specialized Hiring Modules',
    'General Inquiry',
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.programInterest) newErrors.programInterest = 'Please select a program';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `${formData.programInterest}\n\n${formData.message}`
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit inquiry");

      toast.success("Thank you! We will contact you shortly.");
      setFormData({ name: "", email: "", phone: "", programInterest: "", message: "" });
    } catch (error) {
      console.error("Inquiry submit error:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div data-testid="contact-page" className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
      <style>{animationStyles}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-white pt-24 md:pt-32 pb-10">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" />
            <div className="absolute bottom-[10%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-yellow-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 md:mt-0">
          
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold mb-6 md:mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span>We're Here to Help</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 md:mb-8 leading-tight">
            Let's Start Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Career Journey
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed px-4">
            Connect with our program advisors to discuss your career objectives, learn about our training programs, or schedule a consultation.
          </p>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToContact}
          className="relative z-10 animate-fade-up delay-300 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity animate-bounce mt-8 md:mt-12 flex-shrink-0 cursor-pointer pb-8"
          aria-label="Scroll to contact section"
        >
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Get In Touch</span>
          <ChevronDown className="text-slate-500" />
        </button>
      </section>

      {/* --- CONTACT MAIN SECTION --- */}
      <section id="contact-section" className="py-16 md:py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* LEFT: Contact Info */}
            <div className="lg:col-span-1 space-y-8 md:space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Get in Touch
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Our program advisors are available to discuss your training needs and answer any questions you may have.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                
                {/* Phone (Clickable tel: link) */}
                <a 
                  href="tel:+916269391942"
                  className="group flex items-start gap-4 md:gap-5 p-5 md:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                    <Phone size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                    <p className="text-slate-600 font-medium">+91 62693 91942</p>
                    <p className="text-xs text-slate-400 mt-1">Tap to call us directly</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/916269391942" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 md:gap-5 p-5 md:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-300 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <MessageCircle size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">WhatsApp</h3>
                    <p className="text-slate-600 font-medium">+91 62693 91942</p>
                    <p className="text-xs text-slate-400 mt-1">Chat with us directly</p>
                  </div>
                </a>

                {/* Email (Clickable mailto: link) */}
                <a 
                  href="mailto:impactyouacademy@gmail.com"
                  className="group flex items-start gap-4 md:gap-5 p-5 md:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                    <Mail size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600 font-medium truncate sm:break-all sm:whitespace-normal">impactyouacademy@gmail.com</p>
                    <p className="text-xs text-slate-400 mt-1">Tap to send an email</p>
                  </div>
                </a>

                {/* Office Location (Clickable Maps link) */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=315+MG+Road,+Indore,+MP,+India"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 md:gap-5 p-5 md:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                    <MapPin size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Office Location</h3>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Impact You Academy<br />
                      3rd Floor, 315 MG Road<br />
                      Indore – 452010, MP, India
                    </p>
                    <p className="text-xs text-slate-400 mt-2">Tap to view on Google Maps</p>
                  </div>
                </a>

              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 md:p-10">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="text-yellow-500 w-5 h-5 md:w-6 md:h-6" />
                    Send us a Message
                  </h2>
                  <p className="text-sm md:text-base text-slate-500 mt-2">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-medium text-sm">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-yellow-400 focus:ring-yellow-100 ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium text-sm">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-yellow-400 focus:ring-yellow-100 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                     {/* Phone */}
                     <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-medium text-sm">Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-yellow-400 focus:ring-yellow-100 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Program Interest */}
                    <div className="space-y-2">
                      <Label htmlFor="program" className="text-slate-700 font-medium text-sm">Interested Program <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.programInterest}
                        onValueChange={(value) => handleChange('programInterest', value)}
                      >
                        <SelectTrigger className={`h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-yellow-400 focus:ring-yellow-100 ${errors.programInterest ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program, index) => (
                            <SelectItem key={index} value={program}>{program}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.programInterest && <p className="text-xs text-red-500">{errors.programInterest}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 font-medium text-sm">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your career goals..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`rounded-xl bg-slate-50 border-slate-200 focus:border-yellow-400 focus:ring-yellow-100 resize-none ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 md:h-14 bg-slate-900 text-white font-bold rounded-xl hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : (
                      <span className="flex items-center gap-2">
                        Submit Inquiry <Send size={18} />
                      </span>
                    )}
                  </Button>
                  
                  <p className="text-xs text-slate-400 text-center mt-4">
                    By submitting this form, you agree to our privacy policy and to be contacted regarding your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT TO EXPECT SECTION --- */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 md:mb-12">
            What Happens Next?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
            
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-100 -z-10" />
            
            {/* Connecting Line (Mobile Only) */}
            <div className="md:hidden absolute top-12 bottom-12 left-1/2 w-0.5 bg-slate-100 -translate-x-1/2 -z-10" />

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full border-4 border-yellow-50 flex items-center justify-center mb-4 md:mb-6 shadow-sm z-10">
                <Clock className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 bg-white px-2">1. Initial Contact</h3>
              <p className="text-slate-500 text-sm px-4 md:px-0 max-w-[250px] mx-auto">Our advisor reviews your inquiry and reaches out within 24 hours.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full border-4 border-yellow-50 flex items-center justify-center mb-4 md:mb-6 shadow-sm z-10">
                <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 bg-white px-2">2. Consultation</h3>
              <p className="text-slate-500 text-sm px-4 md:px-0 max-w-[250px] mx-auto">A detailed discussion to align our programs with your career goals.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full border-4 border-yellow-50 flex items-center justify-center mb-4 md:mb-6 shadow-sm z-10">
                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 bg-white px-2">3. Enrollment</h3>
              <p className="text-slate-500 text-sm px-4 md:px-0 max-w-[250px] mx-auto">We guide you through the seamless admission and onboarding process.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
