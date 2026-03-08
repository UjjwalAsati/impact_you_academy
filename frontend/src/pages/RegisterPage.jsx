import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock, ArrowRight, Loader2, UserPlus, CheckCircle2, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Same crowd background reused
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

// Password strength indicator
const PasswordStrength = ({ password }) => {
  const score = useMemo(() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-slate-200", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-2"
    >
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : 'bg-slate-200'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
      <p className={`text-xs font-bold ${score <= 1 ? 'text-red-500' : score === 2 ? 'text-yellow-600' : score === 3 ? 'text-blue-500' : 'text-green-600'}`}>
        {labels[score]} password
      </p>
    </motion.div>
  );
};

// Benefit badge
const BenefitBadge = ({ icon, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex items-center gap-2"
  >
    <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
      <CheckCircle2 size={11} className="text-yellow-600" />
    </div>
    <span className="text-xs text-slate-600 font-medium">{text}</span>
  </motion.div>
);

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isAttracting, setIsAttracting] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      await register(formData);
      setSuccessMessage("Verification email sent! Please check your inbox.");
      setLoading(false);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden pt-24 pb-12">

      {/* Subtle grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>
      </div>

      <CrowdBackground isAttracting={isAttracting} />

      {/* Blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-yellow-200/40 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
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
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-t-3xl" />

          <motion.div
            animate={isAttracting ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-50/60 to-transparent rounded-3xl pointer-events-none"
          />

          {/* Header */}
          <div className="text-center mb-7 relative z-10">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-4 shadow-lg shadow-slate-900/20"
            >
              <UserPlus size={22} />
            </motion.div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">Join 2,400+ recruitment professionals</p>
          </div>

          {/* Social proof row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6 relative z-10"
          >
            <div className="flex -space-x-2">
              {["bg-blue-400", "bg-green-400", "bg-purple-400", "bg-pink-400"].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center`}>
                  <User size={10} className="text-white" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-semibold">Loved by 2,400+ pros</span>
          </motion.div>

          {/* Alerts */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center font-semibold border border-red-100"
              >
                {error}
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 p-4 bg-green-50 text-green-700 text-sm rounded-xl text-center font-semibold border border-green-200 flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} className="text-green-600" />
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Name */}
            <motion.div animate={focused === 'name' ? { scale: 1.01 } : { scale: 1 }} transition={{ duration: 0.2 }}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors ${focused === 'name' ? 'text-yellow-500' : 'text-slate-400'}`} />
                </div>
                <input
                  type="text" name="name" placeholder="John Doe"
                  value={formData.name} onChange={handleChange}
                  onFocus={() => { setFocused('name'); setIsAttracting(false); }}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-slate-300"
                  required
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div animate={focused === 'email' ? { scale: 1.01 } : { scale: 1 }} transition={{ duration: 0.2 }}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors ${focused === 'email' ? 'text-yellow-500' : 'text-slate-400'}`} />
                </div>
                <input
                  type="email" name="email" placeholder="you@example.com"
                  value={formData.email} onChange={handleChange}
                  onFocus={() => { setFocused('email'); setIsAttracting(false); }}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-slate-300"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div animate={focused === 'password' ? { scale: 1.01 } : { scale: 1 }} transition={{ duration: 0.2 }}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${focused === 'password' ? 'text-yellow-500' : 'text-slate-400'}`} />
                </div>
                <input
                  type="password" name="password" placeholder="Min. 8 characters"
                  value={formData.password} onChange={handleChange}
                  onFocus={() => { setFocused('password'); setIsAttracting(false); }}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-slate-300"
                  required
                />
              </div>
              <PasswordStrength password={formData.password} />
            </motion.div>

            {/* Terms note */}
            <p className="text-xs text-slate-400 text-center font-medium">
              By registering, you agree to our{" "}
              <span className="text-slate-600 font-bold cursor-pointer hover:text-yellow-600 transition-colors">Terms</span>
              {" & "}
              <span className="text-slate-600 font-bold cursor-pointer hover:text-yellow-600 transition-colors">Privacy Policy</span>
            </p>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setIsAttracting(true)}
              onMouseLeave={() => setIsAttracting(false)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full overflow-hidden group bg-slate-900 text-white font-bold rounded-xl py-4 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <motion.div
                animate={isAttracting ? { opacity: 1 } : { opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500"
              />
              <motion.div
                animate={{ x: ["-200%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 w-1/2"
              />
              <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                {loading ? (
                  <><Loader2 className="animate-spin" size={20} /><span>Creating Account...</span></>
                ) : (
                  <><span>Create My Account</span><ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-200" /></>
                )}
              </span>
            </motion.button>
          </form>

          {/* Benefits */}
          <div className="relative z-10 mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">What you get access to:</p>
            <div className="grid grid-cols-2 gap-2">
              <BenefitBadge text="Live cohort sessions" delay={0.6} />
              <BenefitBadge text="Expert mentorship" delay={0.7} />
              <BenefitBadge text="Career placement support" delay={0.8} />
              <BenefitBadge text="Verified certification" delay={0.9} />
            </div>
          </div>

          <p className="text-center mt-5 text-sm text-slate-500 relative z-10">
            Already have an account?{" "}
            <Link to="/login" className="font-extrabold text-slate-900 hover:text-yellow-600 transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
