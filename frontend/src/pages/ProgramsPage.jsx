import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  BookOpen, 
  ArrowRight, 
  Loader2,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

// Context & Services
import { useAuth } from '../context/AuthContext';
import { fetchPrograms } from '../services/programService';
import { useCart } from "../context/CartContext";

export default function ProgramsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const { addToCart } = useCart();
  
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openProgramId, setOpenProgramId] = useState(null);
  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await fetchPrograms();
        setPrograms(data);
      } catch (err) {
        setError(err.message || 'Failed to load programs');
      } finally {
        setLoading(false);
      }
    };
    loadPrograms();
  }, []);

  const handleEnrollClick = (program) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isAdmin) {
      alert('Admins cannot enroll in programs.');
      return;
    }
    addToCart({
      _id: program._id,
      title: program.title,
      price: program.price,
      duration: program.duration,
    });
    navigate('/payment');
  };

  // --- INTERNAL STYLES FOR ANIMATIONS ---
  const animationStyles = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .animate-float { animation: float 3s ease-in-out infinite; }
  `;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-yellow-600 animate-spin" />
        <p className="text-slate-500 font-medium">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100">
            <h3 className="text-xl font-bold text-red-600 mb-2">Unable to load programs</h3>
            <p className="text-slate-500 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                Try Again
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
      <style>{animationStyles}</style>

      {/* --- HERO SECTION (Fixed Layout) --- */}
      {/* Changed to flex-col with min-h-screen to manage vertical space properly */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-white pt-32 pb-10">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Content Container - Uses flex-grow to take up available space and center content */}
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Animated Badge */}
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span>Market-Ready Curriculum</span>
          </div>

          {/* Animated Title */}
          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Professional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Training Programs
            </span>
          </h1>

          {/* Animated Description */}
          {/* Reduced bottom margin to let flexbox handle spacing */}
          <p className="animate-fade-up delay-300 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            Choose the right path for your career. From foundational recruitment skills to advanced talent acquisition strategies designed by industry experts.
          </p>
        </div>

        {/* Scroll Down Indicator - No longer absolute, sits naturally at the bottom */}
        <div className="relative z-10 animate-fade-up delay-300 flex flex-col items-center gap-2 opacity-50 animate-bounce mt-12 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Scroll to Explore</span>
          <ChevronDown className="text-slate-400" />
        </div>

      </section>

            
      {/* --- PROGRAMS GRID --- */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
            const isOpen = openProgramId === program._id;

            return (
              <div
                key={program._id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-up group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-yellow-100 hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
              >
                {/* Decoration Line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 to-yellow-600" />

                <div className="p-8 flex-1 flex flex-col">

                  {/* Header Info */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide">
                      <Clock size={14} />
                      {program.duration || "Self Paced"}
                    </div>
                    <div className="text-xl font-bold text-slate-900">
                      ₹{program.price?.toLocaleString() || "0"}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-yellow-600 transition-colors">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {program.description}
                  </p>

                  <div className="h-px w-full bg-slate-100 mb-6" />

                  {/* Meta Icons */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-slate-700">
                      <BookOpen className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {program.certification || "Professional Certification"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <Users className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {program.schedule || "Expert Mentorship"}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  {program.modules && program.modules.length > 0 && (
                    <button
                      onClick={() =>
                        setOpenProgramId(isOpen ? null : program._id)
                      }
                      className="text-sm font-bold text-yellow-600 hover:text-yellow-700 mb-6 transition"
                    >
                      {isOpen ? "Hide Details ▲" : "View Details ▼"}
                    </button>
                  )}

                  {/* MODULE DETAILS */}
                  {isOpen && program.modules && (
                    <div className="bg-slate-50 p-5 rounded-xl mb-6 space-y-4 animate-fade-up">
                      {program.modules.map((module, idx) => (
                        <div key={idx}>
                          <h4 className="font-bold text-slate-800 text-sm mb-2">
                            {module.title}
                          </h4>
                          <ul className="space-y-1">
                            {module.topics.map((topic, tIdx) => (
                              <li
                                key={tIdx}
                                className="flex items-start gap-2 text-xs text-slate-600"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Learning Outcomes */}
                  {program.learningOutcomes &&
                    program.learningOutcomes.length > 0 && (
                      <div className="mt-auto mb-6 bg-slate-50 p-4 rounded-xl">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-3">
                          Key Takeaways
                        </p>
                        <ul className="space-y-2">
                          {program.learningOutcomes
                            .slice(0, 3)
                            .map((outcome, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span className="text-xs text-slate-600">
                                  {outcome}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                  {/* Enroll Button */}
                  <button
                    onClick={() => handleEnrollClick(program)}
                    className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                  >
                    Enroll Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}

          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Not sure which program is right for you?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
                Our academic counselors can help assess your profile and suggest the best learning path for your career goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                    <button className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300">
                        Talk to Counselor
                    </button>
                </Link>
                <Link to="/about">
                    <button className="flex items-center gap-2 px-8 py-3 bg-transparent text-slate-900 font-bold hover:text-yellow-600 transition-colors">
                        <ShieldCheck size={20} />
                        Why Choose Us?
                    </button>
                </Link>
            </div>
        </div>
      </section>

    </div>
  );
}