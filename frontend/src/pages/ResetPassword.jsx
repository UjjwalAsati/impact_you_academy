import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock, ArrowRight, Loader2, CheckCircle2, Sparkles, ShieldCheck, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Password strength
const PasswordStrength = ({ password }) => {
  const score = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const colors = ["bg-slate-200", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  if (!password) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : 'bg-slate-200'}`} />
        ))}
      </div>
      <p className={`text-xs font-bold ${score <= 1 ? 'text-red-500' : score === 2 ? 'text-yellow-600' : score === 3 ? 'text-blue-500' : 'text-green-600'}`}>
        {labels[score]} password
      </p>
    </motion.div>
  );
};

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess(true);
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden">

      {/* Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid3)" />
        </svg>
      </div>

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

      {/* Floating security badges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute left-[5%] top-[30%] hidden md:flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-100"
      >
        <ShieldCheck size={16} className="text-green-500" />
        <span className="text-xs font-bold text-slate-700">256-bit Encrypted</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0 }}
        className="absolute right-[5%] top-[60%] hidden md:flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-100"
      >
        <KeyRound size={16} className="text-yellow-500" />
        <span className="text-xs font-bold text-slate-700">Secure Reset</span>
      </motion.div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm"
      >
        <Sparkles size={14} className="text-yellow-500" />
        <span className="text-xs font-bold text-slate-700 tracking-wide">Impact You Academy</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/60 border border-white p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-t-3xl" />

          {/* Success state */}
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6 mx-auto"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">All Done!</h2>
                <p className="text-slate-500 text-sm mb-6 font-medium">Your password has been reset successfully.</p>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-medium">
                  <Loader2 size={14} className="animate-spin" />
                  Redirecting to login...
                </div>
              </motion.div>
            ) : (
              <motion.div key="form">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-4 shadow-lg shadow-slate-900/20"
                  >
                    <KeyRound size={22} />
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reset Password</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Choose a strong new password below</p>
                </div>

                {/* Message */}
                <AnimatePresence>
                  {message && !success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mb-5 p-3 text-sm rounded-xl text-center font-semibold border ${
                        isError
                          ? 'bg-red-50 text-red-600 border-red-100'
                          : 'bg-green-50 text-green-600 border-green-100'
                      }`}
                    >
                      {message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* New password */}
                  <motion.div
                    animate={focused === 'password' ? { scale: 1.01 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 transition-colors ${focused === 'password' ? 'text-yellow-500' : 'text-slate-400'}`} />
                      </div>
                      <input
                        type="password"
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocused('password')}
                        onBlur={() => setFocused(null)}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-slate-300"
                        required
                      />
                    </div>
                    <PasswordStrength password={password} />
                  </motion.div>

                  {/* Confirm */}
                  <motion.div
                    animate={focused === 'confirm' ? { scale: 1.01 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 transition-colors ${focused === 'confirm' ? 'text-yellow-500' : 'text-slate-400'}`} />
                      </div>
                      <input
                        type="password"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setFocused('confirm')}
                        onBlur={() => setFocused(null)}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-slate-300"
                        required
                      />
                      {/* Match indicator */}
                      {confirmPassword && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            {password === confirmPassword
                              ? <CheckCircle2 size={18} className="text-green-500" />
                              : <div className="w-4 h-4 rounded-full bg-red-400" />
                            }
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full overflow-hidden group bg-slate-900 text-white font-bold rounded-xl py-4 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 mt-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 w-1/2"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                      {loading ? (
                        <><Loader2 className="animate-spin" size={20} /><span>Resetting...</span></>
                      ) : (
                        <><span>Reset Password</span><ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-200" /></>
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Security note */}
                <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <ShieldCheck size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    This reset link is single-use and expires in 1 hour. Your account security is our priority.
                  </p>
                </div>

                <p className="text-center mt-5 text-sm text-slate-500">
                  Remember your password?{" "}
                  <Link to="/login" className="font-extrabold text-slate-900 hover:text-yellow-600 transition-colors">
                    Back to Login →
                  </Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
