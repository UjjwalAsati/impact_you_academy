import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white mt-auto relative overflow-hidden pt-16 border-t border-white/5">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom pb-16 relative z-10">
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
                  <p className="text-xs text-slate-400 mb-1">Mobile</p>
                  <a href="tel:+916269391942" className="text-sm text-slate-200 font-medium hover:text-gold transition-colors" data-testid="footer-phone">
                    +91 62693 91942
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Email Us</p>
                  <a href="mailto:impactyouacademy@gmail.com" className="text-sm text-slate-200 font-medium break-all hover:text-gold transition-colors" data-testid="footer-email">
                    impactyouacademy@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Address</p>
                  <p className="text-sm text-slate-200 font-medium leading-relaxed" data-testid="footer-address">
                    Impact You Academy<br />
                    3rd Floor, 315 MG Road<br />
                    Indore – 452010, MP, India
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6 heading-font flex items-center" data-testid="footer-legal-heading">
              <span className="text-gold mr-2">•</span> Connect With Us
            </h4>
            <div className="flex space-x-3 mb-8">
              <a
                href="https://www.linkedin.com/company/impact-you-academy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gold/20 border border-white/10 hover:border-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-slate-300 group-hover:text-gold transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/impactyouacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gold/20 border border-white/10 hover:border-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-slate-300 group-hover:text-gold transition-colors" />
              </a>
            </div>

            {/* MANDATORY POLICY LINKS */}
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Policies</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-xs text-slate-400 hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-xs text-slate-400 hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="text-xs text-slate-400 hover:text-gold transition-colors">Refund Policy</Link></li>
              <li><Link to="/shipping-policy" className="text-xs text-slate-400 hover:text-gold transition-colors">Shipping & Delivery</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-400" data-testid="footer-copyright">
              © {new Date().getFullYear()} Impact You Academy. All rights reserved.
            </p>
            
            {/* ADDED DEVELOPERS LINK HERE */}
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              Crafted with <span className="text-gold">♥</span> by our{' '}
              <Link 
                to="/developers" 
                className="text-slate-300 hover:text-gold font-semibold transition-colors border-b border-transparent hover:border-gold pb-0.5"
              >
                Developers
              </Link>
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};
