import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock, ArrowRight, Loader2, UserPlus } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // State to trigger the "Crowd Attraction" animation
  const [isAttracting, setIsAttracting] = useState(false);

  // Generate random positions for the "Crowd" background
  // Using useMemo to prevent re-calculation on every render
  const crowdMembers = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      initialLeft: Math.random() * 100, 
      initialTop: Math.random() * 100,
      duration: 3 + Math.random() * 5,
      size: 16 + Math.random() * 20,
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate slight delay for smooth UI transition
    setTimeout(async () => {
      try {
        await register(formData);
        // After successful registration, send user to programs
        navigate("/programs");
      } catch (err) {
        setError(err.message || "Registration failed. Please try again.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden">
      
      {/* --- 1. THE ANIMATED CROWD BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {crowdMembers.map((member) => (
          <div
            key={member.id}
            className="absolute transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              // If attracting: Move towards center. If not: Use initial random position.
              left: isAttracting ? '50%' : `${member.initialLeft}%`,
              top: isAttracting ? '50%' : `${member.initialTop}%`,
              transform: isAttracting 
                ? `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0.5)` 
                : 'translate(0, 0) scale(1)',
              opacity: isAttracting ? 0.8 : 0.15,
            }}
          >
            <User 
                size={member.size} 
                className={`transition-colors duration-500 ${isAttracting ? 'text-yellow-500 fill-yellow-500/20' : 'text-slate-400'}`}
            />
          </div>
        ))}
      </div>

      {/* --- 2. THE GLASS CARD --- */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200 border border-white">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white mb-4 shadow-lg">
             <UserPlus size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-sm text-slate-500 mt-1">Join us and start your journey today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Field */}
          <div className="group">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setIsAttracting(false)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="group">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setIsAttracting(false)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="group">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setIsAttracting(false)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* --- 3. THE MAGIC BUTTON --- */}
          <button
            type="submit"
            disabled={loading}
            // Events to trigger background animation
            onMouseEnter={() => setIsAttracting(true)}
            onMouseLeave={() => setIsAttracting(false)}
            className="
              relative w-full overflow-hidden group
              bg-slate-900 text-white font-bold rounded-xl py-4
              shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.6)]
              transition-all duration-500 transform hover:-translate-y-1
            "
          >
            {/* Background Gradient Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Register Now</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-slate-900 hover:text-yellow-600 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;