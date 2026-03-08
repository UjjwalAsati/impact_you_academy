import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle, Mail, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verify = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/verify-email/${token}`);
        const data = await res.json();
        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || "Verification failed. The link may have expired.");
        } else {
          setStatus("success");
          setMessage("Your email has been verified successfully!");
          setTimeout(() => navigate("/login"), 4000);
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden pt-20">

      {/* Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-ve" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-ve)" />
        </svg>
      </div>

      {/* Blobs — color shifts based on status */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${
          status === "success" ? "bg-green-200/40" : status === "error" ? "bg-red-200/40" : "bg-yellow-200/40"
        }`}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute left-[5%] top-[40%] hidden md:flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-100"
      >
        <ShieldCheck size={16} className="text-green-500" />
        <span className="text-xs font-bold text-slate-700">Secure Verification</span>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/60 border border-white overflow-hidden">
          {/* Top bar — color shifts with status */}
          <motion.div
            animate={{
              background: status === "success"
                ? "linear-gradient(to right, #4ade80, #10b981, #4ade80)"
                : status === "error"
                ? "linear-gradient(to right, #f87171, #ef4444, #f87171)"
                : "linear-gradient(to right, #facc15, #f59e0b, #facc15)"
            }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          />

          <div className="p-8 md:p-12 text-center">
            <AnimatePresence mode="wait">

              {/* ── LOADING ── */}
              {status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Spinning ring */}
                  <div className="relative inline-flex mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-yellow-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Mail size={24} className="text-yellow-500" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
                    Verifying Your Email
                  </h2>
                  <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto leading-relaxed mb-8">
                    Please hold on while we confirm your email address. This only takes a moment.
                  </p>

                  {/* Animated progress dots */}
                  <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-yellow-500"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── SUCCESS ── */}
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                >
                  {/* Pulsing check */}
                  <div className="relative inline-flex mb-6">
                    {[1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-green-400/40"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                      />
                    ))}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", bounce: 0.5, duration: 0.7 }}
                      className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.35)]"
                    >
                      <CheckCircle2 size={36} className="text-white" />
                    </motion.div>
                  </div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2"
                  >
                    Email Verified!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="text-slate-500 text-sm font-medium mb-6 max-w-xs mx-auto leading-relaxed"
                  >
                    {message} You now have full access to your Impact You Academy account.
                  </motion.p>

                  {/* What's next panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="text-left space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-7"
                  >
                    <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">You now have access to:</p>
                    {[
                      { emoji: "🎓", text: "All enrolled programs & cohorts" },
                      { emoji: "👥", text: "Mentor sessions & live workshops" },
                      { emoji: "📜", text: "Certification tracking dashboard" },
                    ].map(({ emoji, text }) => (
                      <div key={text} className="flex items-center gap-3">
                        <span className="text-base">{emoji}</span>
                        <span className="text-sm text-slate-600 font-medium">{text}</span>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                    className="space-y-3"
                  >
                    <Link to="/login">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        className="relative w-full overflow-hidden group bg-slate-900 text-white font-bold rounded-xl py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                          Go to Login <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </motion.button>
                    </Link>
                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                      <Loader2 size={11} className="animate-spin" />
                      Auto-redirecting in a few seconds...
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* ── ERROR ── */}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                >
                  {/* Shaking X */}
                  <div className="relative inline-flex mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, x: [0, -8, 8, -8, 8, 0] }}
                      transition={{ scale: { type: "spring", bounce: 0.5, duration: 0.5 }, x: { delay: 0.4, duration: 0.5 } }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)]"
                    >
                      <XCircle size={36} className="text-white" />
                    </motion.div>
                  </div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2"
                  >
                    Verification Failed
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="text-slate-500 text-sm font-medium mb-6 max-w-xs mx-auto leading-relaxed"
                  >
                    {message}
                  </motion.p>

                  {/* Common reasons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="text-left p-5 bg-red-50 rounded-2xl border border-red-100 mb-7"
                  >
                    <p className="text-xs font-extrabold text-red-400 uppercase tracking-widest mb-3">Common reasons:</p>
                    {[
                      "The link has already been used",
                      "The link expired (valid for 24 hours)",
                      "The link was copied incorrectly",
                    ].map((reason) => (
                      <div key={reason} className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span className="text-xs text-red-600 font-medium">{reason}</span>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    <Link to="/register">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        className="relative w-full overflow-hidden group bg-slate-900 text-white font-bold rounded-xl py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                          <RefreshCw size={15} />
                          Request New Verification Link
                        </span>
                      </motion.button>
                    </Link>
                    <Link to="/login" className="block text-center text-sm font-bold text-slate-500 hover:text-yellow-600 transition-colors">
                      Back to Login →
                    </Link>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
