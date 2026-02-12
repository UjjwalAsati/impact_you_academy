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
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
  IndianRupee,
  Target
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
  
  // State for the Active Modal (Popup)
  const [selectedProgram, setSelectedProgram] = useState(null);
  // State for Accordion inside Modal
  const [openModuleIndex, setOpenModuleIndex] = useState(null);

  const toggleModule = (index) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

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
    @keyframes modal-pop {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-modal { animation: modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    
    /* Custom Scrollbar for Modal */
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
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

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-white pt-20">
        
        {/* Animated Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center justify-center h-full pb-20">
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span>Market-Ready Curriculum</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Professional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Training Programs
            </span>
          </h1>

          <p className="animate-fade-up delay-300 text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
            Choose the right path for your career. From foundational recruitment skills to advanced talent acquisition strategies designed by industry experts.
          </p>
        </div>

        {/* Scroll Indicator - Positioned at Bottom */}
        <div className="absolute inset-x-0 bottom-12 flex justify-center z-10 animate-fade-up delay-300">
          <div
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 opacity-60 animate-bounce cursor-pointer">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center">
              Scroll to Explore
            </span>
          <ChevronDown className="w-6 h-6 text-slate-400" />
          </div>
        </div>
      </section>

      {/* --- PROGRAMS GRID --- */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Available Courses</h2>
            <p className="text-slate-600">Click on any program to view the detailed syllabus and features.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {programs.map((program, index) => (
              <div
                key={program._id}
                onClick={() => { setSelectedProgram(program); setOpenModuleIndex(null); }}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-up group cursor-pointer flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-yellow-100/50 hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full"
              >
                {/* Card Top Decoration */}
                <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 to-yellow-600" />

                <div className="p-8 flex flex-col h-full">
                  
                  {/* Header: Duration & Price */}
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
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-yellow-600 transition-colors">
                    {program.title}
                  </h3>

                  {/* Short Desc */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {program.description}
                  </p>
                  
                  {/* Divider */}
                  <div className="h-px w-full bg-slate-100 mb-5" />

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-auto">
                     <span className="text-sm font-bold text-yellow-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Syllabus <ArrowRight size={16} />
                     </span>
                     <button 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleEnrollClick(program);
                        }}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                     >
                        Enroll
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAM DETAILS MODAL (ACCORDION STYLE) --- */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedProgram(null)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-modal flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 p-6 md:p-8 text-white relative flex-shrink-0">
              <button 
                onClick={() => setSelectedProgram(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex gap-3 mb-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase">
                    <Calendar size={12} /> {selectedProgram.duration}
                 </div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase">
                    <IndianRupee size={12} /> {selectedProgram.price?.toLocaleString()}
                 </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedProgram.title}</h3>
              <p className="text-slate-300 text-sm md:text-base opacity-90 line-clamp-2">{selectedProgram.description}</p>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-0 overflow-y-auto custom-scrollbar bg-slate-50 flex-grow">
              <div className="p-6 md:p-8 space-y-8">
                
                {/* Learning Outcomes */}
                {selectedProgram.learningOutcomes && selectedProgram.learningOutcomes.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                           <Target className="w-5 h-5 text-yellow-600" /> What You Will Learn
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-3">
                            {selectedProgram.learningOutcomes.map((outcome, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    {outcome}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Modules List (ACCORDION) */}
                {selectedProgram.modules && selectedProgram.modules.length > 0 && (
                    <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 sticky top-0 bg-slate-50 z-10 py-2">
                           <BookOpen className="w-5 h-5 text-yellow-600" /> Course Curriculum
                        </h4>
                        
                        <div className="space-y-3">
                            {selectedProgram.modules.map((module, idx) => (
                                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                    
                                    {/* Accordion Trigger */}
                                    <button 
                                        onClick={() => toggleModule(idx)}
                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold border border-slate-200">
                                                {idx + 1}
                                            </span>
                                            <span className="font-bold text-slate-800 text-base">{module.title}</span>
                                        </div>
                                        {openModuleIndex === idx ? (
                                            <ChevronUp size={18} className="text-yellow-600 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />
                                        )}
                                    </button>
                                    
                                    {/* Accordion Content */}
                                    {openModuleIndex === idx && (
                                        <div className="px-4 pb-4 pl-[4.5rem] bg-slate-50/50 border-t border-slate-100">
                                            {module.topics && module.topics.length > 0 ? (
                                                <ul className="space-y-2 mt-3">
                                                    {module.topics.map((topic, tIdx) => (
                                                        <li key={tIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                                                            {topic}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-slate-400 italic mt-2">No detailed topics listed.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 bg-white flex flex-col sm:flex-row gap-4 justify-between items-center flex-shrink-0">
              <div className="text-sm text-slate-500 hidden sm:block">
                 <span className="font-bold text-slate-900">Next Batch:</span> Filling Fast
              </div>
              <button 
                onClick={() => handleEnrollClick(selectedProgram)}
                className="w-full sm:w-auto px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
              >
                Enroll Now <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>
      )}

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

