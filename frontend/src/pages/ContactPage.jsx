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
  CheckCircle2
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

  return (
    <div data-testid="contact-page" className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
      <style>{animationStyles}</style>

      {/* --- HERO SECTION (Full Screen Flex) --- */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-white pt-32 pb-10">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span>We're Here to Help</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Let's Start Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Career Journey
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            Connect with our program advisors to discuss your career objectives, learn about our training programs, or schedule a consultation.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 animate-fade-up delay-300 flex flex-col items-center gap-2 opacity-50 animate-bounce mt-12 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Get In Touch</span>
          <ChevronDown className="text-slate-400" />
        </div>
      </section>

      {/* --- CONTACT MAIN SECTION --- */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* LEFT: Contact Info */}
            <div className="lg:col-span-1 space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Get in Touch
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Our program advisors are available to discuss your training needs and answer any questions you may have.
                </p>
              </div>

              <div className="space-y-6">
                <div className="group flex items-start gap-5 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                    <p className="text-slate-600 font-medium">+91 (XXX) XXX-XXXX</p>
                    <p className="text-xs text-slate-400 mt-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="group flex items-start gap-5 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600 font-medium break-all">info@impactyouacademy.com</p>
                    <p className="text-xs text-slate-400 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="group flex items-start gap-5 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Office Location</h3>
                    <p className="text-slate-600 font-medium">
                      Business District, Corporate Tower<br />
                      Floor 5, City, State - 000000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="text-yellow-500" />
                    Send us a Message
                  </h2>
                  <p className="text-slate-500 mt-2">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-medium">Full Name <span className="text-red-500">*</span></Label>
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
                      <Label htmlFor="email" className="text-slate-700 font-medium">Email Address <span className="text-red-500">*</span></Label>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* Phone */}
                     <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number <span className="text-red-500">*</span></Label>
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
                      <Label htmlFor="program" className="text-slate-700 font-medium">Interested Program <span className="text-red-500">*</span></Label>
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
                    <Label htmlFor="message" className="text-slate-700 font-medium">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your career goals..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`rounded-xl bg-slate-50 border-slate-200 focus:border-yellow-400 focus:ring-yellow-100 ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-slate-900 text-white font-bold rounded-xl hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
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
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            What Happens Next?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-100 -z-10" />

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-yellow-50 flex items-center justify-center mb-6 shadow-sm z-10">
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Initial Contact</h3>
              <p className="text-slate-500 text-sm px-4">Our advisor reviews your inquiry and reaches out within 24 hours.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-yellow-50 flex items-center justify-center mb-6 shadow-sm z-10">
                <MessageSquare className="w-10 h-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. Consultation</h3>
              <p className="text-slate-500 text-sm px-4">A detailed discussion to align our programs with your career goals.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-yellow-50 flex items-center justify-center mb-6 shadow-sm z-10">
                <CheckCircle2 className="w-10 h-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. Enrollment</h3>
              <p className="text-slate-500 text-sm px-4">We guide you through the seamless admission and onboarding process.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}