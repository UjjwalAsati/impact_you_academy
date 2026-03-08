import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Loader2, CheckCircle2, ArrowLeft, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Crowd background (consistent with Login/Register)
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
            className={`transition-colors duration-500 ${isAttracting ? "text-yellow-500" : "text-slate-400"}`}
            style={{ fill: isAttracting ? "rgba(234,179,8,0.15)" : "none" }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [isAttracting, setIsAttracting] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden pt-20">

      {/* Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-fp" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-fp)" />
        </svg>
      </div>

      <CrowdBackground isAttracting={isAttracting} />

      {/* Blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Card */}
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

        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/60 border border-white overflow-hidden">
          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-t-3xl" />

          {/* Inner glow on attract */}
          <motion.div
            animate={isAttracting ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-50/60 to-transparent rounded-3xl pointer-events-none"
          />

          <AnimatePresence mode="wait">
            {!sent ? (
              /* ── FORM STATE ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="p-8 md:p-10"
              >
                {/* Back link */}
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors mb-8 group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  Back to Login
                </Link>

                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-4 shadow-lg shadow-slate-900/20"
                  >
                    <Mail size={22} />
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Forgot Password?</h2>
                  <p className="text-sm text-slate-500 mt-2 font-medium max-w-xs mx-auto leading-relaxed">
                    No worries. Enter your email and we'll send you a reset link right away.
                  </p>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-5 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center font-semibold border border-red-100"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <motion.div
                    animate={focused ? { scale: 1.01 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 transition-colors duration-200 ${focused ? "text-yellow-500" : "text-slate-400"}`} />
                      </div>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
                        onFocus={() => { setFocused(true); setIsAttracting(false); }}
                        onBlur={() => setFocused(false)}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-slate-300"
                        required
                      />
                    </div>
                  </motion.div>

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
                      className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500"
                    />
                    <motion.div
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 0.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 w-1/2"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                      {loading ? (
                        <><Loader2 className="animate-spin" size={20} /><span>Sending...</span></>
                      ) : (
                        <><span>Send Reset Link</span><ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-200" /></>
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Info strip */}
                <div className="mt-7 pt-6 border-t border-slate-100 relative z-10">
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-lg flex-shrink-0">📬</span>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Check your spam folder if you don't see the email within a few minutes. The reset link expires in <strong className="text-slate-700">1 hour</strong>.
                    </p>
                  </div>
                </div>

                <p className="text-center mt-5 text-sm text-slate-500 relative z-10">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-extrabold text-slate-900 hover:text-yellow-600 transition-colors">
                    Sign up free →
                  </Link>
                </p>
              </motion.div>
            ) : (
              /* ── SUCCESS STATE ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="p-8 md:p-10 text-center"
              >
                {/* Animated check */}
                <div className="relative inline-flex mb-6">
                  {/* Pulse rings */}
                  {[1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-yellow-400/40"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                    />
                  ))}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 0.7 }}
                    className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.35)]"
                  >
                    <CheckCircle2 size={36} className="text-white" />
                  </motion.div>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2"
                >
                  Check Your Inbox!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-500 text-sm leading-relaxed mb-2 max-w-xs mx-auto"
                >
                  We've sent a password reset link to
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-xl mb-6"
                >
                  <Mail size={14} className="text-yellow-600" />
                  <span className="text-sm font-bold text-slate-800">{email}</span>
                </motion.div>

                {/* Steps */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-left space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-7"
                >
                  <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">Next steps</p>
                  {[
                    { step: "1", text: "Open the email from Impact You Academy" },
                    { step: "2", text: "Click the reset link (valid for 1 hour)" },
                    { step: "3", text: "Set your new password and log in" },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                        {step}
                      </div>
                      <span className="text-sm text-slate-600 font-medium">{text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Resend */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-slate-400 mb-5"
                >
                  Didn't receive it?{" "}
                  <button
                    onClick={() => { setSent(false); setEmail(""); }}
                    className="font-bold text-slate-600 hover:text-yellow-600 transition-colors"
                  >
                    Try again
                  </button>
                  {" "}or check your spam folder.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900 hover:text-yellow-600 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back to Login
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
