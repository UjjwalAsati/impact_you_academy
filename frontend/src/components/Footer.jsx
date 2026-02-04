import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-navy text-white mt-auto">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_talent-academy-pro/artifacts/5gcxqlzy_logo.jpeg" 
              alt="Impact You Academy" 
              className="h-16 w-auto mb-4"
              data-testid="footer-logo"
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              Professional training for staffing and talent acquisition careers.
            </p>
            <p className="text-xs text-gold font-medium">
              Confidence | Clarity | Character
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 heading-font" data-testid="footer-quick-links-heading">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/programs" data-testid="footer-link-programs" className="text-sm text-gray-300 hover:text-gold transition-colors">Programs</Link></li>
              <li><Link to="/curriculum" data-testid="footer-link-curriculum" className="text-sm text-gray-300 hover:text-gold transition-colors">Curriculum</Link></li>
              <li><Link to="/practical-training" data-testid="footer-link-practical" className="text-sm text-gray-300 hover:text-gold transition-colors">Practical Training</Link></li>
              <li><Link to="/certification" data-testid="footer-link-certification" className="text-sm text-gray-300 hover:text-gold transition-colors">Certification</Link></li>
              <li><Link to="/about" data-testid="footer-link-about" className="text-sm text-gray-300 hover:text-gold transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4 heading-font" data-testid="footer-contact-heading">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="mt-1 text-gold" />
                <div>
                  <p className="text-sm text-gray-300" data-testid="footer-phone">+91 (XXX) XXX-XXXX</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="mt-1 text-gold" />
                <div>
                  <p className="text-sm text-gray-300" data-testid="footer-email">info@impactyouacademy.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 text-gold" />
                <div>
                  <p className="text-sm text-gray-300" data-testid="footer-address">Business District, Corporate Tower<br />City, State - 000000</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4 heading-font" data-testid="footer-legal-heading">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" data-testid="footer-link-privacy" className="text-sm text-gray-300 hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" data-testid="footer-link-terms" className="text-sm text-gray-300 hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" data-testid="footer-link-refund" className="text-sm text-gray-300 hover:text-gold transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <p className="text-center text-sm text-gray-400" data-testid="footer-copyright">
            © {new Date().getFullYear()} Impact You Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
