import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Lock, Mail, ArrowRight, Loader2, Sparkles, Shield, TrendingUp, Award } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// Floating stat pill
const StatPill = ({ icon: Icon, label, value, delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.6, type: "spring", bounce: 0.4 }}
    className="absolute hidden md:flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-100 text-xs font-bold select-none pointer-events-none"
    style={{ left: x, top: y }}
  >
    <div className="w-6 h-6 rounded-lg bg-yellow-100 flex items-center justify-center">
      <Icon size={12} className="text-yellow-600" />
    </div>
    <div>
      <div className="text-slate-900 leading-none">{value}</div>
      <div className="text-slate-400 font-medium leading-none mt-0.5">{label}</div>
    </div>
  </motion.div>
);

// Animated grid background
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// Particle crowd background
const CrowdBackground = ({ isAttracting }) => {
  const crowdMembers = useMemo(() => 
    Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      initialLeft: Math.random() * 100,
      initialTop: Math.random() * 100,
      size: 14 + Math.random() * 18,
      offsetX: (Math.random() - 0.5) * 180,
      offsetY: (Math.random() - 0.5) * 180,
      delay: Math.random() * 0.3,
    })), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {crowdMembers.map((m) => (
        <motion.div
          key={m.id}
          animate={isAttracting ? {
            left: `calc(50% + ${m.offsetX}px)`,
            top: `calc(50% + ${m.offsetY}px)`,
            scale: 0.6,
            opacity: 0.7,
          } : {
            left: `${m.initialLeft}%`,
            top: `${m.initialTop}%`,
            scale: 1,
            opacity: 0.12,
          }}
          transition={{ duration: 0.9, delay: isAttracting ? m.delay : 0, ease: [0.4, 0, 0.2, 1] }}
          className="absolute"
        >
          <User
            size={m.size}
            className={`transition-colors duration-500 ${isAttracting ? 'text-yellow-500' : 'text-slate-400'}`}
            style={{ fill: isAttracting ? 'rgba(234,179,8,0.15)' : 'none' }}
          />
        </motion.div>
      ))}
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAttracting, setIsAttracting] = useState(false);
  const [focused, setFocused] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(async () => {
      try {
        const userData = await login(formData);
        if (userData?.role === "admin") navigate("/admin");
        else navigate("/dashboard");
      } catch (err) {
        setError(err.message || "Invalid credentials");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden pt-20">
      <GridBackground />
      <CrowdBackground isAttracting={isAttracting} />

      {/* Ambient glow blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Floating stat pills */}
      <StatPill icon={Award} label="Certified Pros" value="2,400+" delay={0.8} x="3%" y="35%" />
      <StatPill icon={Shield} label="Industry Partners" value="150+" delay={1.0} x="72%" y="28%" />
      <StatPill icon={Sparkles} label="Active Cohorts" value="8 Live" delay={1.1} x="72%" y="65%" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        {/* Card glow on attract */}
        <AnimatePresence>
          {isAttracting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-2 bg-yellow-400/20 rounded-[2.5rem] blur-xl pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/60 border border-white p-8 overflow-hidden">
          {/* Subtle top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-t-3xl" />

          {/* Card inner glow */}
          <motion.div
            animate={isAttracting ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-50/60 to-transparent rounded-3xl pointer-events-none"
          />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-4 shadow-lg shadow-slate-900/20"
            >
              <User size={22} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-extrabold text-slate-900 tracking-tight"
            >
              Welcome Back
            </motion.h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">Sign in to your learning portal</p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-5 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center font-semibold border border-red-100"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Email */}
            <motion.div
              animate={focused === 'email' ? { scale: 1.01 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors duration-200 ${focused === 'email' ? 'text-yellow-500' : 'text-slate-400'}`} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => { setFocused('email'); setIsAttracting(false); }}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-slate-300"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              animate={focused === 'password' ? { scale: 1.01 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors duration-200 ${focused === 'password' ? 'text-yellow-500' : 'text-slate-400'}`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => { setFocused('password'); setIsAttracting(false); }}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-slate-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <span className="text-xs font-bold">{showPassword ? "HIDE" : "SHOW"}</span>
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/forgot-password" className="text-xs font-bold text-slate-500 hover:text-yellow-600 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setIsAttracting(true)}
              onMouseLeave={() => setIsAttracting(false)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full overflow-hidden group bg-slate-900 text-white font-bold rounded-xl py-4 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 mt-2"
            >
              <motion.div
                animate={isAttracting ? { opacity: 1 } : { opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 transition-opacity duration-300"
              />
              {/* Shimmer */}
              <motion.div
                animate={{ x: ["-200%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 w-1/2"
              />
              <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Login Now</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Divider with feature highlights */}
          <div className="relative z-10 mt-7 pt-6 border-t border-slate-100">
            <div className="flex justify-center gap-6 mb-5">
              {[
                { label: "Secure Login", icon: "🔒" },
                { label: "24/7 Access", icon: "⚡" },
                { label: "Live Support", icon: "💬" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-extrabold text-slate-900 hover:text-yellow-600 transition-colors">
                Create one free →
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
