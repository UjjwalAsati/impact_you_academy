import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, isAdmin, logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger effect slightly earlier for smoother feel
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/programs', label: 'Programs' },
    // ADDED NEW LINK HERE
    { path: '/staffing-training', label: 'Staffing' },
    { path: '/curriculum', label: 'Curriculum' },
    { path: '/practical-training', label: 'Training' }, 
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
    if (!isAuthenticated) navigate('/login');
    else if (isAdmin) navigate('/admin');
    else navigate('/programs');
  };

  return (
    <nav
      data-testid="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-white/20 py-2' // Glass effect on scroll
          : 'bg-white border-transparent py-4' // Clean whitespace at top
      }`}
    >
      {/* Container limits width to keep items from spacing too far apart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* --- LEFT: Logo --- */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              src="/logo.png"
              alt="Impact You Academy"
              className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* --- CENTER: Navigation Links (Desktop) --- */}
          {/* Added 'hidden lg:flex' to hide on mobile/tablet, show on large screens */}
          <div className="hidden lg:flex items-center justify-center space-x-6"> 
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-yellow-600'
                    : 'text-gray-600 hover:text-yellow-600'
                }`}
              >
                {link.label}
                {/* Subtle animated underline dot for active state */}
                {isActive(link.path) && (
                  <span className="absolute -bottom-2 left-1/2 w-1 h-1 bg-yellow-500 rounded-full transform -translate-x-1/2" />
                )}
              </Link>
            ))}

            {/* RESTORED: Admin Link */}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className={`relative text-sm font-medium transition-colors duration-200 ${
                    isActive('/admin') ? 'text-yellow-600' : 'text-gray-600 hover:text-yellow-600'
                }`}
              >
                Admin Panel
              </Link>
            )}

            {/* RESTORED: Dashboard Link */}
            {isAuthenticated && !isAdmin && (
              <Link
                to="/dashboard"
                className={`relative text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                    isActive('/dashboard') ? 'text-yellow-600' : 'text-gray-600 hover:text-yellow-600'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* --- RIGHT: Action Buttons (Desktop) --- */}
          <div className="hidden lg:flex items-center space-x-4 ml-4">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-gray-700 hover:text-black transition-colors"
                >
                  Log In
                </Link>
               
                <Link to="/register">
                  <button className="px-5 py-2 text-sm font-semibold text-gray-800 border-2 border-gray-200 rounded-full hover:border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300">
                    Sign Up
                  </button>
                </Link>

                <button
                  onClick={handleEnrollNow}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                >
                  Enroll Now
                  <ChevronRight size={16} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-yellow-600">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>

          {/* --- MOBILE: Toggle Button --- */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU (Dropdown) --- */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* RESTORED: Mobile Admin Link */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/admin') ? 'bg-yellow-50 text-yellow-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Admin Panel
            </Link>
          )}

          {/* RESTORED: Mobile Dashboard Link */}
          {isAuthenticated && !isAdmin && (
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/dashboard') ? 'bg-yellow-50 text-yellow-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </Link>
          )}
          
          <div className="h-px bg-gray-100 my-4" />

          {/* Mobile Actions */}
          <div className="px-2 space-y-3">
            {!isAuthenticated ? (
              <>
               <button
                  onClick={() => {
                    handleEnrollNow();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 text-center text-white font-bold bg-yellow-500 rounded-lg shadow-md"
                >
                  Enroll Now
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-2.5 text-center font-semibold text-gray-700 bg-gray-50 rounded-lg border border-gray-200">
                      Log In
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-2.5 text-center font-semibold text-white bg-gray-800 rounded-lg">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-red-600 font-medium bg-red-50 rounded-lg"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};