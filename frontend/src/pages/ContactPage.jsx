
import React, { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Mail, Phone, MapPin, Send, Sparkles, ChevronDown, MessageSquare, Clock, CheckCircle2, MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- ADVANCED ANIMATION COMPONENTS ---
const SpotlightCard = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <motion.div
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{ background: useMotionValue((v) => `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(234, 179, 8, 0.08), transparent 40%)`) }}
      />
      {/* Wrapper ensures content stays above the hover glow effect and is fully clickable */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default function ContactPage() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', programInterest: '', message: '' });
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
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
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
    if (!validateForm()) { toast.error('Please fix the errors in the form'); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, message: `${formData.programInterest}\n\n${formData.message}` })
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
    <div className="bg-slate-50 font-sans selection:bg-yellow-200 overflow-x-hidden">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-yellow-500 origin-left z-[60] shadow-[0_0_20px_rgba(234,179,8,1)]" style={{ scaleX: scrollYProgress }} />

      {/* --- HERO SECTION (Single Screen) --- */}
      <section className="relative w-full h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-white px-4">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg1 }} animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 45, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-blue-100/60 rounded-full blur-[100px] mix-blend-multiply" />
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg2 }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, -45, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-yellow-100/50 rounded-full blur-[100px] mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center mt-8">
          <motion.div initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6, duration: 1 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200/80 text-slate-800 text-sm font-bold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span>We're Here to Help</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-slate-900 pb-2 mb-6">
              Let's Start Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">
                Career Journey
              </span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
            Connect with our program advisors to discuss your career objectives, learn about our training programs, or schedule a consultation.
          </motion.p>
        </div>

        <button 
          onClick={scrollToContact} 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-yellow-600 transition-colors z-20 cursor-pointer"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Get In Touch</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </button>
      </section>

      {/* --- CONTACT MAIN SECTION (Wider & Larger Layout) --- */}
      <section id="contact-section" className="min-h-[100dvh] flex items-center py-16 lg:py-24 bg-slate-50 relative z-10 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* LEFT: Contact Info (Takes 5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  Get in Touch
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-600 text-lg font-medium leading-relaxed">
                  Our advisors are available to discuss your training needs and answer any questions you may have.
                </motion.p>
              </div>

              <div className="space-y-4">
                {/* Phone */}
                <SpotlightCard className="bg-white rounded-[1.5rem] border border-slate-200/80 shadow-sm hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-yellow-400">
                  <a href="tel:+916269391942" className="flex items-center gap-5 p-5 w-full text-left outline-none">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-0.5">Phone</h3>
                      <p className="text-slate-600 font-medium text-base">+91 62693 91942</p>
                    </div>
                  </a>
                </SpotlightCard>

                {/* WhatsApp */}
                <SpotlightCard className="bg-white rounded-[1.5rem] border border-slate-200/80 shadow-sm hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-green-400">
                  <a href="https://wa.me/916269391942" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-5 w-full text-left outline-none">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-0.5">WhatsApp</h3>
                      <p className="text-slate-600 font-medium text-base">+91 62693 91942</p>
                    </div>
                  </a>
                </SpotlightCard>

                {/* Email (With Fallback Copy to Clipboard) */}
                <SpotlightCard className="bg-white rounded-[1.5rem] border border-slate-200/80 shadow-sm hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-yellow-400">
                  <a 
                    href="mailto:impactyouacademy@gmail.com" 
                    onClick={(e) => {
                      navigator.clipboard.writeText('impactyouacademy@gmail.com');
                      toast.success("Email address copied to clipboard!");
                    }}
                    className="flex items-center gap-5 p-5 w-full text-left outline-none overflow-hidden"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                      <Mail size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-slate-900 text-base mb-0.5">Email</h3>
                      <p className="text-slate-600 font-medium text-base truncate">impactyouacademy@gmail.com</p>
                    </div>
                  </a>
                </SpotlightCard>

                {/* Office Location */}
                <SpotlightCard className="bg-white rounded-[1.5rem] border border-slate-200/80 shadow-sm hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-yellow-400">
                  <a href="https://www.google.com/maps/search/?api=1&query=315+MG+Road,+Indore,+MP,+India" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-5 w-full text-left outline-none">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">Office Location</h3>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">
                        Impact You Academy<br />
                        3rd Floor, 315 MG Road<br />
                        Indore – 452010, MP
                      </p>
                    </div>
                  </a>
                </SpotlightCard>
              </div>
            </div>

            {/* RIGHT: Contact Form (Takes 7 cols) */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="lg:col-span-7">
              <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
                    <MessageSquare className="text-yellow-500 w-8 h-8" />
                    Send us a Message
                  </h2>
                  <p className="text-base text-slate-500 mt-2 font-medium">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-bold text-sm">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`h-14 rounded-xl bg-slate-50 border-slate-200/80 focus:border-yellow-400 focus:ring-yellow-100 text-base px-4 ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && <p className="text-xs text-red-500 font-bold mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-bold text-sm">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`h-14 rounded-xl bg-slate-50 border-slate-200/80 focus:border-yellow-400 focus:ring-yellow-100 text-base px-4 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-xs text-red-500 font-bold mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {/* Phone */}
                     <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-bold text-sm">Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`h-14 rounded-xl bg-slate-50 border-slate-200/80 focus:border-yellow-400 focus:ring-yellow-100 text-base px-4 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 font-bold mt-1">{errors.phone}</p>}
                    </div>

                    {/* Program Interest */}
                    <div className="space-y-2">
                      <Label htmlFor="program" className="text-slate-700 font-bold text-sm">Interested Program <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.programInterest}
                        onValueChange={(value) => handleChange('programInterest', value)}
                      >
                        <SelectTrigger className={`h-14 rounded-xl bg-slate-50 border-slate-200/80 focus:border-yellow-400 focus:ring-yellow-100 text-base px-4 ${errors.programInterest ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                          {programs.map((program, index) => (
                            <SelectItem key={index} value={program} className="text-base py-3 cursor-pointer">{program}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.programInterest && <p className="text-xs text-red-500 font-bold mt-1">{errors.programInterest}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 font-bold text-sm">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your career goals..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`rounded-xl bg-slate-50 border-slate-200/80 focus:border-yellow-400 focus:ring-yellow-100 resize-none text-base p-4 ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-xs text-red-500 font-bold mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full h-14 bg-slate-900 text-white font-bold text-lg rounded-xl hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2 group mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>Submit Inquiry <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                  </motion.button>
                  
                  <p className="text-sm text-slate-400 text-center mt-4 font-medium">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- WHAT TO EXPECT SECTION --- */}
      <section className="py-24 bg-white border-t border-slate-200/50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-16 tracking-tight">
            What Happens Next?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-1 bg-slate-100 -z-10 rounded-full" />
            
            {/* Connecting Line (Mobile Only) */}
            <div className="md:hidden absolute top-12 bottom-12 left-1/2 w-1 bg-slate-100 -translate-x-1/2 -z-10 rounded-full" />

            {[
              { icon: Clock, title: "1. Initial Contact", desc: "Our advisor reviews your inquiry and reaches out within 24 hours." },
              { icon: MessageSquare, title: "2. Consultation", desc: "A detailed discussion to align our programs with your career goals." },
              { icon: CheckCircle2, title: "3. Enrollment", desc: "We guide you through the seamless admission and onboarding process." }
            ].map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }} className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white rounded-full border-[6px] border-slate-50 flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50 z-10 text-yellow-500">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 bg-white px-4 tracking-tight">{step.title}</h3>
                <p className="text-slate-600 text-base px-4 max-w-[280px] mx-auto font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
