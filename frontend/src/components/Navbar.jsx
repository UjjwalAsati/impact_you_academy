import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isAuthenticated, isAdmin, logout, user } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEnrollNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/programs');
    }
  };

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
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/logo.jpeg"
              alt="Impact You Academy"
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 relative group ${
                  isActive(link.path)
                    ? 'text-navy'
                    : 'text-charcoal hover:text-navy'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-gold to-gold-light transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            {/* User Dashboard Link */}

            {/* Admin Link */}
            {isAuthenticated && isAdmin && (
              <Link
              to="/admin"
              className="px-4 py-2 text-sm font-semibold text-gold hover:text-gold-light transition"
              >
                Admin
              </Link>
            )}
            {isAuthenticated && !isAdmin && (
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 text-charcoal hover:text-navy"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={handleEnrollNow}
              className="btn-gold px-6 py-2.5 text-sm"
            >
              Enroll Now
            </button>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-sm font-semibold text-navy hover:text-gold">
                  Login
                </Link>
                <Link to="/register">
                  <button className="border border-navy px-5 py-2 rounded-lg text-sm font-semibold hover:bg-navy hover:text-white transition">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 text-sm font-semibold text-charcoal">
                  <User size={16} />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-navy p-2 rounded-lg hover:bg-navy/5 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 space-y-2 border-t border-slate-200 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-navy bg-navy/5 border-l-4 border-gold'
                    : 'text-charcoal hover:text-navy hover:bg-navy/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 font-semibold text-gold"
              >
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated && !isAdmin && (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 font-semibold text-navy hover:bg-navy/5 rounded-lg"
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={() => {
                handleEnrollNow();
                setIsOpen(false);
              }}
              className="w-full btn-gold mt-4"
            >
              Enroll Now
            </button>

            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full border border-navy text-navy py-2 rounded-lg mt-4">
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full btn-gold mt-3">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full mt-4 flex items-center justify-center space-x-2 text-red-600 font-semibold"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
