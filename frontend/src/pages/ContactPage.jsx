import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

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

    if (!formData.programInterest) {
      newErrors.programInterest = 'Please select a program';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - Replace with actual backend integration
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast.success('Thank you for your inquiry! We will contact you shortly.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        programInterest: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div data-testid="contact-page" className="min-h-screen">
      {/* Header Section */}
      <section data-testid="contact-header" className="bg-gradient-to-br from-slate-50 to-white py-24 lg:py-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6 heading-font">
              Contact Us
            </h1>
            <p className="text-lg text-charcoal leading-relaxed">
              Connect with our program advisors to discuss your career objectives, learn about our training programs, or schedule a consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section data-testid="contact-main-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6 heading-font">
                  Get in Touch
                </h2>
                <p className="text-sm text-charcoal leading-relaxed mb-8">
                  Our program advisors are available to discuss your training needs, answer questions about our programs, and guide you through the enrollment process.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <Card className="p-6 border-2 border-gray-200 bg-light-grey">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold bg-opacity-20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-navy mb-1" data-testid="contact-phone-label">
                        Phone
                      </h3>
                      <p className="text-sm text-charcoal" data-testid="contact-phone-number">
                        +91 (XXX) XXX-XXXX
                      </p>
                      <p className="text-xs text-steel-grey mt-1">
                        Mon - Fri: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-gray-200 bg-light-grey">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold bg-opacity-20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-navy mb-1" data-testid="contact-email-label">
                        Email
                      </h3>
                      <p className="text-sm text-charcoal break-all" data-testid="contact-email-address">
                        info@impactyouacademy.com
                      </p>
                      <p className="text-xs text-steel-grey mt-1">
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-gray-200 bg-light-grey">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold bg-opacity-20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-navy mb-1" data-testid="contact-address-label">
                        Office Location
                      </h3>
                      <p className="text-sm text-charcoal" data-testid="contact-office-address">
                        Business District<br />
                        Corporate Tower, Floor 5<br />
                        City, State - 000000
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-navy mb-6 heading-font">
                  Schedule a Consultation
                </h2>
                <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-charcoal mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      data-testid="form-input-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1" data-testid="form-error-name">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-charcoal mb-2 block">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      data-testid="form-input-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1" data-testid="form-error-email">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-charcoal mb-2 block">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      data-testid="form-input-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1" data-testid="form-error-phone">{errors.phone}</p>
                    )}
                  </div>

                  {/* Program Interest */}
                  <div>
                    <Label htmlFor="program" className="text-sm font-medium text-charcoal mb-2 block">
                      Program of Interest <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.programInterest}
                      onValueChange={(value) => handleChange('programInterest', value)}
                    >
                      <SelectTrigger 
                        data-testid="form-select-program"
                        className={`${errors.programInterest ? 'border-red-500' : ''}`}
                      >
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map((program, index) => (
                          <SelectItem 
                            key={index} 
                            value={program}
                            data-testid={`form-select-option-${index}`}
                          >
                            {program}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.programInterest && (
                      <p className="text-xs text-red-500 mt-1" data-testid="form-error-program">{errors.programInterest}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-charcoal mb-2 block">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      data-testid="form-input-message"
                      placeholder="Tell us about your career objectives and any specific questions you have..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1" data-testid="form-error-message">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    data-testid="form-submit-button"
                    className="btn-primary w-full py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Inquiry
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-steel-grey text-center">
                    By submitting this form, you agree to be contacted by Impact You Academy regarding your inquiry.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section data-testid="contact-info-section" className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-6 heading-font">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 border-2 border-gray-200 bg-white">
                <div className="w-12 h-12 rounded-full bg-gold bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-gold">1</span>
                </div>
                <h3 className="text-base font-semibold text-navy mb-2">
                  Initial Contact
                </h3>
                <p className="text-sm text-charcoal">
                  Program advisor reaches out within 24 hours
                </p>
              </Card>
              <Card className="p-6 border-2 border-gray-200 bg-white">
                <div className="w-12 h-12 rounded-full bg-gold bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-gold">2</span>
                </div>
                <h3 className="text-base font-semibold text-navy mb-2">
                  Consultation
                </h3>
                <p className="text-sm text-charcoal">
                  Detailed discussion of programs and career objectives
                </p>
              </Card>
              <Card className="p-6 border-2 border-gray-200 bg-white">
                <div className="w-12 h-12 rounded-full bg-gold bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-gold">3</span>
                </div>
                <h3 className="text-base font-semibold text-navy mb-2">
                  Enrollment
                </h3>
                <p className="text-sm text-charcoal">
                  Guidance through program selection and enrollment process
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
