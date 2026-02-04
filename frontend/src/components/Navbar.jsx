import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/programs', label: 'Programs' },
    { path: '/curriculum', label: 'Curriculum' },
    { path: '/practical-training', label: 'Practical Training' },
    { path: '/certification', label: 'Certification' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav data-testid="main-navbar" className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" data-testid="nav-logo-link">
            <img 
              src="https://customer-assets.emergentagent.com/job_talent-academy-pro/artifacts/5gcxqlzy_logo.jpeg" 
              alt="Impact You Academy" 
              className="h-14 w-auto"
              data-testid="academy-logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-navy border-b-2 border-gold pb-1'
                    : 'text-charcoal hover:text-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-navy p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div data-testid="mobile-menu" className="lg:hidden py-6 space-y-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`block text-base font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-navy font-semibold'
                    : 'text-charcoal hover:text-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
