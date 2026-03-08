import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import { 
  Target, Users, BookOpen, Download, 
  ChevronRight, Sparkles, GraduationCap, ChevronDown
} from 'lucide-react';

const SpotlightCard = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <motion.div
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{ background: useMotionValue((v) => `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(234, 179, 8, 0.08), transparent 40%)`) }}
      />
      {children}
    </motion.div>
  );
};

export default function CurriculumPage() {
  const [activeCategory, setActiveCategory] = useState('Foundation Modules');
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const scrollToNext = () => {
    document.getElementById('content-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const philosophyPrinciples = [
    { icon: <Target className="w-8 h-8 text-yellow-600" />, title: 'Workflow-Based Learning', description: 'Curriculum structured around actual recruitment workflows rather than theoretical concepts, ensuring practical applicability.' },
    { icon: <Users className="w-8 h-8 text-yellow-600" />, title: 'Industry-Practitioner Design', description: 'Content developed by active recruitment professionals with current market knowledge and practical experience.' },
    { icon: <BookOpen className="w-8 h-8 text-yellow-600" />, title: 'Progressive Skill Building', description: 'Systematic progression from fundamental concepts to advanced applications, building competency at each stage.' },
  ];

  const curriculumModules = [
    {
      category: 'Foundation Modules',
      description: 'Build the bedrock of your recruitment career with essential industry knowledge.',
      modules: [
        { title: 'Recruitment Fundamentals', topics: ['Role of recruitment in organizational success', 'Recruitment vs. Talent Acquisition', 'Key stakeholders in the hiring process', 'Recruitment lifecycle and stages'] },
        { title: 'Job Analysis & Requirements', topics: ['Effective Job Description analysis', 'Understanding role requirements', 'Stakeholder intake meetings', 'Market mapping & availability'] },
        { title: 'Sourcing Strategies', topics: ['Sourcing channels and platforms', 'Boolean search fundamentals', 'LinkedIn Recruiter strategies', 'Passive candidate engagement'] },
      ],
    },
    {
      category: 'Core Recruitment Modules',
      description: 'Master the day-to-day operations of managing candidates and interviews.',
      modules: [
        { title: 'Candidate Screening', topics: ['Resume screening techniques', 'Telephonic screening best practices', 'Competency assessment', 'Cultural fit evaluation'] },
        { title: 'Interview Management', topics: ['Scheduling and logistics', 'Candidate preparation', 'Panel coordination', 'Feedback collection'] },
        { title: 'Relationship Management', topics: ['Professional communication standards', 'Candidate pipelining', 'Objection handling', 'Managing expectations'] },
      ],
    },
    {
      category: 'Advanced & Specialized',
      description: 'Elevate your expertise with high-level negotiation and analytics skills.',
      modules: [
        { title: 'Offer Management', topics: ['Compensation benchmarking', 'Offer negotiation techniques', 'Offer letter preparation', 'Onboarding support'] },
        { title: 'Metrics & Analytics', topics: ['Key recruitment KPIs', 'Time-to-fill & Cost-per-hire', 'Quality of hire measurement', 'Reporting dashboards'] },
        { title: 'Stakeholder Consulting', topics: ['Hiring manager partnership', 'Managing expectations', 'Presenting market intelligence', 'Influence and persuasion'] },
        { title: 'Technology & Tools', topics: ['ATS overview', 'Automation and AI tools', 'Video interviewing platforms', 'Data privacy & security'] },
      ],
    },
    {
      category: 'Professional Development',
      description: 'Prepare yourself for long-term success and ethical practice.',
      modules: [
        { title: 'Ethics & Compliance', topics: ['Ethical standards', 'Confidentiality & data protection', 'Equal opportunity', 'Legal compliance'] },
        { title: 'Career Development', topics: ['Career pathways in TA', 'Building professional networks', 'Continuous learning', 'Personal branding'] },
      ],
    },
  ];

  const currentCategoryData = curriculumModules.find(c => c.category === activeCategory);

  return (
    <div className="bg-slate-50 font-sans selection:bg-yellow-200 overflow-x-hidden min-h-screen">
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-yellow-500 origin-left z-[60] shadow-[0_0_20px_rgba(234,179,8,1)]" style={{ scaleX: scrollYProgress }} />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-white px-4">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg1 }} animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 45, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-yellow-100/60 rounded-full blur-[100px] mix-blend-multiply" />
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg2 }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, -45, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[10%] left-[-5%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-blue-100/50 rounded-full blur-[100px] mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6, duration: 1 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200/80 text-slate-800 text-sm font-bold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span>Industry-Standard Syllabus</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-slate-900 pb-2 mb-6">
              Curriculum & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">
                Methodology
              </span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
            We don't just teach theory. Our curriculum is engineered around <span className="font-extrabold text-slate-900">real-world workflows</span>, transforming you from a student into a practitioner.
          </motion.p>
        </div>

        <button 
          onClick={scrollToNext} 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-yellow-600 transition-colors z-20 cursor-pointer"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Explore Modules</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </button>
      </section>

      {/* --- PHILOSOPHY CARDS --- */}
      <section id="content-section" className="py-20 md:py-32 bg-slate-50 relative z-20 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophyPrinciples.map((principle, index) => (
              <SpotlightCard key={index} className="flex flex-col p-8 bg-white border border-slate-200/80 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-5 border border-slate-100">
                  {principle.icon}
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 tracking-tight">{principle.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">{principle.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE CURRICULUM (GRID LAYOUT) --- */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Explore the Syllabus</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-600 text-lg font-medium">Select a category below to view detailed modules.</motion.p>
          </div>

          {/* WIDE SINGLE LINE TAB NAVIGATION */}
          <div className="mb-12 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-2 bg-slate-50 rounded-[1.5rem] md:rounded-full shadow-inner border border-slate-200/60 w-full max-w-5xl mx-auto">
              {curriculumModules.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`
                    relative px-4 py-3 rounded-xl md:rounded-full text-sm font-bold transition-all duration-300 w-full text-center
                    ${activeCategory === cat.category ? 'text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-white'}
                  `}
                >
                  {activeCategory === cat.category && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-slate-900 rounded-xl md:rounded-full" transition={{ type: "spring", stiffness: 300, damping: 25 }} />
                  )}
                  <span className="relative z-10">{cat.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Area (HORIZONTAL GRID OF CARDS) */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-3 tracking-tight">
                    <GraduationCap className="text-yellow-500 w-8 h-8" />
                    {activeCategory}
                  </h3>
                  <p className="text-slate-500 mt-3 text-base max-w-2xl mx-auto font-medium">{currentCategoryData?.description}</p>
                </div>

                {/* HORIZONTAL GRID FOR MODULE CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {currentCategoryData?.modules.map((module, modIndex) => (
                    <motion.div 
                      key={modIndex} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: modIndex * 0.1, duration: 0.4 }}
                      className="bg-white rounded-[1.5rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-yellow-300 transition-all duration-300 flex flex-col overflow-hidden"
                    >
                      <div className="bg-slate-50 px-6 py-5 border-b border-slate-100/80 flex items-center gap-3">
                         <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold text-sm">
                            {modIndex + 1}
                         </span>
                         <h4 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                           {module.title}
                         </h4>
                      </div>
                      <div className="px-6 py-6 flex-grow">
                        <ul className="space-y-3">
                          {module.topics.map((topic, tIndex) => (
                            <li key={tIndex} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" />
                              <span className="text-slate-600 text-sm font-medium leading-relaxed">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-slate-900 border-t border-slate-800 flex justify-center items-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-yellow-500/20 rounded-full" initial={{ width: 100, height: 100, opacity: 1 }} animate={{ width: 1200, height: 1200, opacity: 0 }} transition={{ duration: 5, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to dive deeper?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
            Download the comprehensive program brochure with detailed session schedules, learning resources, and pricing.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} className="flex justify-center">
             <Link to="/contact">
               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 text-slate-900 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_60px_rgba(234,179,8,0.6)] transition-all overflow-hidden">
                 <Download className="w-5 h-5" />
                 <span className="relative z-10 flex items-center gap-2">
                   Download Full Brochure
                   <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </span>
               </motion.button>
             </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
