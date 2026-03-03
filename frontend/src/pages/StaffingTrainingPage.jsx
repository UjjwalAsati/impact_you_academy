import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { 
  BookOpen, Users, Clock, Briefcase, Award, TrendingUp, ShieldCheck, 
  ArrowRight, Download, Sparkles, Target, X, Calendar, IndianRupee, ChevronDown
} from 'lucide-react';

// --- ADVANCED ANIMATION COMPONENTS ---
const MagneticWrapper = ({ children, className }) => {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({ x: (clientX - (left + width / 2)) * 0.15, y: (clientY - (top + height / 2)) * 0.15 });
  };
  const reset = () => setPosition({ x: 0, y: 0 });
  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }} className={className}>
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, className, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left) / width - 0.5);
    y.set((e.clientY - rect.top) / height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={`relative will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
};

export default function StaffingTrainingPage() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [openModuleIndex, setOpenModuleIndex] = useState(null);

  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const toggleModule = (index) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  const scrollToNext = () => {
    document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- 1. DETAILED SYLLABUS DATA ---
  const syllabusIndustryReady = [
    { title: "M1: HR & Staffing Fundamentals", topics: ["Introduction to HR & Staffing", "Generalist vs Recruiter", "Hiring Types: Perm, Contract", "Ethical Hiring Basics"] },
    { title: "M2: Recruitment Process", topics: ["Step-by-Step Hiring Flow", "Reading JDs & Checklists", "Must-Have vs Good-to-Have", "Offer & Joining Process"] },
    { title: "M3: Candidate Sourcing", topics: ["Job Portals & LinkedIn", "Boolean Search Basics", "Resume Filtering", "Target: Source 20 profiles/day"] },
    { title: "M4: Screening & Comm", topics: ["Telephonic Screening", "Salary & Notice Period", "Professional Etiquette", "Mock Screening Calls"] },
    { title: "M5: Interview Coordination", topics: ["Scheduling & Calendars", "Client Coordination", "Feedback Follow-up", "Daily Hiring Reports"] },
    { title: "M6: Offer & Ops Basics", topics: ["Offer Process & Documents", "Joining Formalities", "Attendance & Payroll", "Employee Life Cycle"] }
  ];

  const syllabusCSRP = [
    { title: "M1: Staffing Industry", topics: ["Indian & Global Landscape", "Perm vs Contract", "Recruiter Ecosystem"] },
    { title: "M2: End-to-End Recruitment", topics: ["JD Understanding", "Sourcing to Interviews", "Offer Management"] },
    { title: "M3: Sourcing Techniques", topics: ["Job Portals & Social", "Boolean & LinkedIn", "Referrals & Bulk Hiring"] },
    { title: "M4: Screening Skills", topics: ["Resume Analysis", "Telephonic Techniques", "Candidate Evaluation"] },
    { title: "M5: Client Handling", topics: ["Requirement Gathering", "SLA & TAT Management", "Expectation Management"] },
    { title: "M6: Offer & Closure", topics: ["CTC & Negotiation", "Counter-Offer Handling", "Position Closure"] },
    { title: "M7: Compliance Basics", topics: ["Labour Law Overview", "PF, ESIC & Minimum Wages", "Payroll & BGV Basics"] },
    { title: "M8: HR Operations", topics: ["Onboarding & Docs", "Attendance & Leaves", "HR MIS & Reporting"] },
    { title: "M9: Recruiter KPIs", topics: ["Productivity Metrics", "Source Performance", "Targets & Incentives"] },
    { title: "M10: Staffing Tech", topics: ["ATS & CRM Fundamentals", "Excel Dashboards", "Hiring Automation"] }
  ];

  const syllabusLabourLaw = [
    { title: "M1: Labour Law Foundations", topics: ["Role of HR in Compliance", "Employer Rights", "HR Legal Responsibilities"] },
    { title: "M2: Industrial Laws", topics: ["Industrial Disputes Act", "Termination & Layoffs", "Standing Orders"] },
    { title: "M3: Payroll Compliance", topics: ["Minimum Wages Act", "Payment of Wages", "Bonus & Gratuity"] },
    { title: "M4: Social Security", topics: ["Provident Fund (EPF)", "ESI Eligibility & Claims", "Labour Welfare Fund"] },
    { title: "M5: Workplace Safety", topics: ["POSH Act", "Maternity Benefit Act", "Equal Remuneration"] },
    { title: "M6: HR Documentation", topics: ["Appointment Letters", "HR Handbooks", "Warning Letters"] }
  ];

  // --- 2. PROGRAM PRODUCTS ---
  const programs = [
    {
      id: "industry-ready",
      title: "HR & Staffing Industry Ready",
      price: "₹2,999",
      duration: "1 Month",
      mode: "Alternate Days",
      desc: "A practical, job-oriented program designed to make candidates industry-ready recruiters.",
      idealFor: "Fresh Graduates, HR Interns, and Career Switchers looking for affordable exposure.",
      syllabus: syllabusIndustryReady,
      popular: false,
      color: "blue"
    },
    {
      id: "csrp",
      title: "Certified Staffing Professional",
      price: "₹7,999",
      duration: "30 Days",
      mode: "Alternate Batch",
      desc: "Our flagship certification covering the entire staffing lifecycle from sourcing to compliance.",
      idealFor: "Those seeking a recognized certification and deep operational knowledge.",
      syllabus: syllabusCSRP,
      popular: true, 
      color: "yellow"
    },
    {
      id: "labour-law",
      title: "Adv. Cert. in Labour Laws",
      price: "₹19,999",
      duration: "60 Days",
      mode: "Alternate Days",
      desc: "Advanced specialization in Payroll, Social Security, POSH, Industrial Relations and Audits.",
      idealFor: "HR Ops professionals and those wanting to master statutory compliance.",
      syllabus: syllabusLabourLaw,
      popular: false,
      color: "emerald"
    }
  ];

  return (
    <div className="bg-slate-50 font-sans selection:bg-yellow-200 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-yellow-500 origin-left z-[60] shadow-[0_0_20px_rgba(234,179,8,1)]" style={{ scaleX: scrollYProgress }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-white px-4">
        
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg1 }} animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 45, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-yellow-100/60 rounded-full blur-[100px] mix-blend-multiply" />
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg2 }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, -45, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-blue-100/50 rounded-full blur-[100px] mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center mt-8">
          
          <motion.div initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6, duration: 1 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-yellow-400 text-sm font-bold uppercase tracking-wider mb-8 shadow-xl">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Job-Oriented Certification</span>
          </motion.div>
          
          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-slate-900 pb-2 mb-6">
              Staffing & HR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">
                Training Programs
              </span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl font-medium mb-12">
             From foundational recruitment skills to advanced labour law compliance. Choose the path that fits your career goals.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, type: "spring" }} className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full">
            <MagneticWrapper>
              <Link to="/contact" className="block w-full sm:w-auto">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative w-full sm:w-auto px-8 py-4 bg-slate-900 text-white text-base font-bold rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(234,179,8,0.3)] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Batches <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-4 bg-white/60 backdrop-blur-md border border-slate-200 text-slate-900 font-bold rounded-full hover:border-yellow-400 hover:bg-white transition-colors shadow-sm">
                  <Download size={20} className="text-yellow-600" />
                  Download Brochure
              </motion.button>
            </MagneticWrapper>
          </motion.div>
        </div>

        <button 
          onClick={scrollToNext} 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-yellow-600 transition-colors z-20 cursor-pointer"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Select Program</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </button>
      </section>

      {/* --- PROGRAM OPTIONS (INTERACTIVE) --- */}
      <section id="programs-section" className="py-24 md:py-32 bg-slate-50 relative z-10 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Select Your Program</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-slate-600 font-medium">Click on a card below to view the detailed syllabus and fee structure.</motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {programs.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full z-10"
              >
                <TiltCard onClick={() => { setSelectedProgram(item); setOpenModuleIndex(null); }} className="cursor-pointer h-full">
                  <div className={`relative p-8 md:p-10 rounded-[2.5rem] h-full flex flex-col transform-gpu ${
                      item.popular 
                        ? 'bg-white shadow-[0_30px_60px_rgba(234,179,8,0.2)] ring-2 ring-yellow-400 z-20' 
                        : 'bg-white ring-1 ring-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow'
                    }`}
                  >
                    {item.popular && (
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                        <Sparkles size={14} fill="currentColor" /> Best Seller
                      </motion.div>
                    )}

                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-4 rounded-[1.2rem] flex-shrink-0 shadow-inner ${
                          item.color === 'blue' ? 'bg-blue-100 text-blue-700' : 
                          item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="text-right pl-2">
                        <span className="block text-3xl font-extrabold text-slate-900 whitespace-nowrap">{item.price}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight tracking-tight">{item.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 bg-slate-50 px-4 py-2 rounded-xl w-max">
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {item.duration}</span>
                        <span className="text-slate-300">•</span>
                        <span>{item.mode}</span>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed text-base mb-8 flex-grow font-medium">{item.desc}</p>
                    
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <div className={`flex items-center text-base font-bold ${
                          item.color === 'blue' ? 'text-blue-600' : 
                          item.color === 'emerald' ? 'text-emerald-600' : 
                          'text-yellow-600'
                      }`}>
                         View Full Syllabus <ArrowRight size={18} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAM DETAIL MODAL (ORIGINAL ACCORDION SYLLABUS) --- */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
              onClick={() => setSelectedProgram(null)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }} 
              className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              
              {/* Modal Header */}
              <div className="bg-slate-900 p-8 text-white relative flex-shrink-0">
                <button 
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-yellow-500 hover:text-slate-900 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex gap-3 mb-4">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                      <Calendar size={12} /> {selectedProgram.duration}
                   </div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
                      <IndianRupee size={12} /> {selectedProgram.price}
                   </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">{selectedProgram.title}</h3>
                <p className="text-slate-300 text-sm md:text-base opacity-90">{selectedProgram.idealFor}</p>
              </div>

              {/* Modal Body (Scrollable Accordion Syllabus) */}
              <div className="p-0 overflow-y-auto bg-slate-50 flex-grow" style={{ scrollbarWidth: 'thin' }}>
                <div className="p-8">
                  <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 sticky top-0 bg-slate-50 z-10 py-2">
                     <BookOpen size={20} className="text-yellow-600" /> Complete Curriculum
                  </h4>
                  
                  <div className="space-y-3">
                    {selectedProgram.syllabus.map((mod, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-yellow-400 transition-colors">
                        <button 
                          onClick={() => toggleModule(idx)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-bold text-slate-800 text-sm md:text-base tracking-tight">{mod.title}</span>
                          <motion.div animate={{ rotate: openModuleIndex === idx ? 180 : 0 }}>
                            <ChevronDown size={18} className={openModuleIndex === idx ? "text-yellow-600" : "text-slate-400"} />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {openModuleIndex === idx && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: "auto", opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 bg-slate-50/50 border-t border-slate-100">
                                <ul className="space-y-2 mt-3">
                                  {mod.topics.map((topic, tIdx) => (
                                    <li key={tIdx} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-4 justify-between items-center flex-shrink-0">
                <div className="text-sm text-slate-500 font-medium">
                  <span className="font-bold text-slate-900 bg-yellow-100 px-2 py-1 rounded">Note:</span> Live classes + Recording access
                </div>
                <Link to="/contact" className="w-full sm:w-auto">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2">
                    Enroll in Batch <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CSRP PREVIEW GRID --- */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block p-4 rounded-[1.5rem] bg-yellow-100 mb-6 shadow-inner">
                <Target className="w-10 h-10 text-yellow-600" />
            </div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Why Our CSRP Certification?
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              A glimpse into the advanced modules that define our flagship Certified Staffing & Recruitment Professional program.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.05 } } }} 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {syllabusCSRP.slice(0, 8).map((mod, idx) => (
               <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-6 rounded-[1.5rem] border border-slate-200/80 bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 hover:border-yellow-300 transition-all duration-300 text-center flex flex-col items-center justify-center">
                  <h4 className="font-bold text-slate-900 text-base md:text-lg leading-tight mb-2 tracking-tight">{mod.title.split(":")[1] || mod.title}</h4>
                  <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest bg-yellow-100/50 px-3 py-1 rounded-full">Module {idx + 1}</span>
               </motion.div>
            ))}
             <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="col-span-2 md:col-span-4 p-6 rounded-[1.5rem] border-2 border-dashed border-slate-300 bg-slate-50/50 text-center text-slate-500 font-bold text-lg flex items-center justify-center">
                + 6 More Advanced Modules (Click "CSRP" above to view full syllabus)
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-slate-900 flex justify-center items-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-yellow-500/20 rounded-full" initial={{ width: 100, height: 100, opacity: 1 }} animate={{ width: 1000, height: 1000, opacity: 0 }} transition={{ duration: 5, repeat: Infinity, delay: i * 2, ease: "easeOut" }} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Ready to Start Your Career?</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium">Join the next cohort and get certified.</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} className="flex justify-center">
             <MagneticWrapper>
               <Link to="/contact">
                 <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-5 rounded-full bg-yellow-500 text-slate-900 font-bold text-xl transition-all shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_60px_rgba(234,179,8,0.6)] flex items-center gap-3">
                   Get Full Brochure <Download size={24} />
                 </motion.button>
               </Link>
             </MagneticWrapper>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
