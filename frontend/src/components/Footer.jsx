import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white mt-auto relative overflow-hidden pt-16">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="container-custom pt-24 pb-16 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <img 
              src="/logo.jpeg" 
              alt="Impact You Academy" 
              className="h-16 w-auto mb-4 rounded-lg"
              data-testid="footer-logo"
            />
            <p className="text-sm text-slate-300 leading-relaxed">
              Professional training for staffing and talent acquisition careers. Building tomorrow's recruitment leaders.
            </p>
            <div className="flex items-center space-x-2">
              <div className="h-1 w-12 bg-gradient-to-r from-gold to-gold-light rounded-full"></div>
              <p className="text-xs text-gold font-semibold uppercase tracking-wider">
                Excellence • Integrity • Growth
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 heading-font flex items-center" data-testid="footer-quick-links-heading">
              <span className="text-gold mr-2">•</span> Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/programs', label: 'Programs', testId: 'footer-link-programs' },
                { to: '/curriculum', label: 'Curriculum', testId: 'footer-link-curriculum' },
                { to: '/practical-training', label: 'Practical Training', testId: 'footer-link-practical' },
                { to: '/certification', label: 'Certification', testId: 'footer-link-certification' },
                { to: '/about', label: 'About Us', testId: 'footer-link-about' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    data-testid={link.testId} 
                    className="text-sm text-slate-300 hover:text-gold transition-all duration-300 flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-lg mb-6 heading-font flex items-center" data-testid="footer-contact-heading">
              <span className="text-gold mr-2">•</span> Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Phone size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Call Us</p>
                  <p className="text-sm text-slate-200 font-medium" data-testid="footer-phone">+91 (XXX) XXX-XXXX</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Email Us</p>
                  <p className="text-sm text-slate-200 font-medium break-all" data-testid="footer-email">info@impactyouacademy.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Visit Us</p>
                  <p className="text-sm text-slate-200 font-medium" data-testid="footer-address">Business District, Corporate Tower<br />City, State - 000000</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-bold text-lg mb-6 heading-font flex items-center" data-testid="footer-legal-heading">
              <span className="text-gold mr-2">•</span> Connect With Us
            </h4>
            <p className="text-sm text-slate-300 mb-4">Stay updated with our latest programs and industry insights.</p>
            <div className="flex space-x-3 mb-6">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gold/20 border border-white/10 hover:border-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Social media link"
                >
                  <Icon size={18} className="text-slate-300 hover:text-gold transition-colors" />
                </a>
              ))}
            </div>
            <ul className="space-y-2">
              <li><a href="#" data-testid="footer-link-privacy" className="text-xs text-slate-400 hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" data-testid="footer-link-terms" className="text-xs text-slate-400 hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" data-testid="footer-link-refund" className="text-xs text-slate-400 hover:text-gold transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-400" data-testid="footer-copyright">
              © {new Date().getFullYear()} Impact You Academy. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Crafted with <span className="text-gold">♥</span> for aspiring recruitment professionals
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
