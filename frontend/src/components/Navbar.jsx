import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// --- Premium Animation Easing ---
const customEase = [0.22, 1, 0.36, 1];

const mobileMenuVariants = {
  closed: { 
    opacity: 0, 
    clipPath: "circle(0px at calc(100% - 40px) 40px)",
    transition: { duration: 0.5, ease: customEase }
  },
  open: { 
    opacity: 1, 
    clipPath: "circle(150% at calc(100% - 40px) 40px)",
    transition: { duration: 0.7, ease: customEase }
  }
};

const linkVariants = {
  closed: { y: 20, opacity: 0 },
  open: i => ({
    y: 0, 
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: customEase }
  })
};

const smoothSpring = {
  type: "spring",
  stiffness: 250,
  damping: 25,
  mass: 0.5,
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, isAdmin, logout, user } = useAuth();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle scroll state
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
    { path: '/staffing-training', label: 'Staffing' },
    { path: '/curriculum', label: 'Curriculum' },
    { path: '/practical-training', label: 'Training' }, 
    { path: '/certification', label: 'Certification' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // Exact path matching
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const handleEnrollNow = () => {
    setIsOpen(false);
    if (!isAuthenticated) navigate('/register');
    else if (isAdmin) navigate('/admin');
    else navigate('/programs');
  };

  return (
    <>
      {/* --- DESKTOP & MOBILE NAVBAR WRAPPER --- */}
      <nav
        data-testid="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? 'pt-4 px-4 pointer-events-none' : 'pt-0 px-0'
        }`}
      >
        <div 
          className={`relative pointer-events-auto flex items-center justify-between w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled 
              ? 'max-w-7xl bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full border border-white/40 py-2 px-4 md:px-8 mx-auto' 
              : 'bg-white border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8 shadow-none rounded-none mx-auto'
          }`}
        >
          {/* LOGO WITH UNIQUE 3D FLIP ANIMATION */}
          <Link to="/" className="flex-shrink-0 flex items-center z-50 group perspective-[1000px]">
            <motion.div
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src="/logo.png"
                alt="Impact You Academy"
                className={`w-auto object-contain transition-all duration-500 rounded-lg shadow-sm ${isScrolled ? 'h-10' : 'h-12'}`}
              />
            </motion.div>
          </Link>

          {/* DESKTOP LINKS (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center justify-center space-x-1 flex-1 px-8"> 
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const hovered = hoveredPath === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-4 py-2 text-sm font-bold transition-colors duration-200 z-10 ${
                    active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span className="relative z-20">{link.label}</span>
                  
                  {/* Active Indicator */}
                  {active && (
                    <motion.div 
                      layoutId="active-pill" 
                      className="absolute inset-0 bg-yellow-400/20 rounded-full z-10" 
                      transition={smoothSpring}
                    />
                  )}
                  
                  {/* Hover Indicator */}
                  <AnimatePresence>
                    {hovered && !active && (
                      <motion.div 
                        layoutId="hover-pill" 
                        className="absolute inset-0 bg-slate-100 rounded-full z-0" 
                        transition={smoothSpring}
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}

            {/* Admin / Dashboard Links */}
            {isAuthenticated && isAdmin && (
              <Link to="/admin" className={`relative px-4 py-2 text-sm font-bold transition-colors ${isActive('/admin') ? 'text-yellow-600' : 'text-slate-500 hover:text-slate-900'}`}>
                Admin
              </Link>
            )}
            {isAuthenticated && !isAdmin && (
              <Link to="/dashboard" className={`relative px-4 py-2 text-sm font-bold transition-colors ${isActive('/dashboard') ? 'text-yellow-600' : 'text-slate-500 hover:text-slate-900'}`}>
                Dashboard
              </Link>
            )}
          </div>

          {/* RIGHT ACTIONS (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4 z-50">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                  Log In
                </Link>
                
                {/* GLOWING ENROLL BUTTON */}
                <div className="relative group">
                  {/* Animated Glow Ring Background */}
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"
                  />
                  
                  <button
                    onClick={handleEnrollNow}
                    className="relative px-6 py-2.5 text-sm font-bold text-slate-900 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full flex items-center gap-2 overflow-hidden shadow-sm"
                  >
                    <span className="relative z-10 flex items-center gap-1 drop-shadow-sm">
                      Enroll Now <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </span>
                    {/* Continuous Shimmer Sweep */}
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 z-0"
                    />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700">
                    <User size={14} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{user?.name?.split(' ')[0]}</span>
                </div>
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <div className="flex items-center lg:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900 hover:bg-yellow-100'}`}
            >
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3, ease: customEase }}>
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-slate-950 text-white overflow-y-auto"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col min-h-screen px-6 pt-32 pb-12 relative z-10">
              <div className="flex-1 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div custom={i} variants={linkVariants} initial="closed" animate="open" exit="closed" key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between text-3xl md:text-4xl font-black tracking-tight"
                    >
                      <span className={`${isActive(link.path) ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600' : 'text-slate-300 group-hover:text-white transition-colors'}`}>
                        {link.label}
                      </span>
                      {isActive(link.path) && <Sparkles className="text-yellow-500" size={24} />}
                    </Link>
                  </motion.div>
                ))}

                {isAuthenticated && isAdmin && (
                  <motion.div custom={navLinks.length} variants={linkVariants} initial="closed" animate="open" exit="closed">
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-3xl font-black text-slate-300 hover:text-white">Admin Panel</Link>
                  </motion.div>
                )}
                
                {isAuthenticated && !isAdmin && (
                  <motion.div custom={navLinks.length} variants={linkVariants} initial="closed" animate="open" exit="closed">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-3xl font-black text-slate-300 hover:text-white">Dashboard</Link>
                  </motion.div>
                )}
              </div>

              {/* Mobile Menu Footer / Actions */}
              <motion.div 
                variants={{ closed: { opacity: 0, y: 20 }, open: { opacity: 1, y: 0, transition: { delay: 0.5, ease: customEase } } }}
                initial="closed" animate="open" exit="closed"
                className="mt-12 pt-8 border-t border-slate-800 space-y-4"
              >
                {!isAuthenticated ? (
                  <>
                    <button onClick={handleEnrollNow} className="w-full py-4 text-center text-slate-900 text-lg font-black bg-yellow-500 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.3)] flex justify-center items-center gap-2 transition-transform active:scale-95">
                      Enroll Now <ChevronRight size={20} />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-3 text-center font-bold text-white bg-slate-800 rounded-full border border-slate-700 active:bg-slate-700 transition-colors">
                        Log In
                      </Link>
                      <Link to="/register" onClick={() => setIsOpen(false)} className="w-full py-3 text-center font-bold text-slate-900 bg-white rounded-full active:bg-slate-200 transition-colors">
                        Sign Up
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                       <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500"><User size={24} /></div>
                       <div>
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Logged In As</p>
                         <p className="text-lg font-bold text-white">{user?.name}</p>
                       </div>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 text-red-500 font-bold bg-red-500/10 rounded-full border border-red-500/20 active:bg-red-500/20 transition-colors">
                      <LogOut size={20} /> Logout
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

