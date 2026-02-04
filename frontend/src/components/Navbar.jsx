import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav 
      data-testid="main-navbar" 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-medium' 
          : 'bg-white border-b border-slate-200'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group" 
            data-testid="nav-logo-link"
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_talent-academy-pro/artifacts/5gcxqlzy_logo.jpeg" 
              alt="Impact You Academy" 
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              data-testid="academy-logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 relative group ${
                  isActive(link.path)
                    ? 'text-navy'
                    : 'text-charcoal hover:text-navy'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-gold to-gold-light transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link to="/payment">
              <button className="btn-gold px-6 py-2.5 text-sm">
                Enroll Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-navy p-2 rounded-lg hover:bg-navy/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            data-testid="mobile-menu" 
            className="lg:hidden py-6 space-y-2 border-t border-slate-200 animate-fade-in"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-navy bg-navy/5 border-l-4 border-gold'
                    : 'text-charcoal hover:text-navy hover:bg-navy/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/payment" onClick={() => setIsOpen(false)}>
              <button className="w-full btn-gold mt-4">
                Enroll Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
