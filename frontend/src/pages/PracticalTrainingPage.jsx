import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import { 
  Search, Users, ClipboardCheck, FileCheck, TrendingUp, Award,
  Sparkles, ChevronDown, Monitor, Database, BarChart, MessageSquare, ArrowRight
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{ background: useMotionValue((v) => `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(234, 179, 8, 0.08), transparent 40%)`) }}
      />
      {children}
    </motion.div>
  );
};

export default function PracticalTrainingPage() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const scrollToNext = () => {
    document.getElementById('content-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const practicalComponents = [
    {
      icon: <Search className="w-6 h-6 text-yellow-600" />,
      title: 'Live Hiring Simulations',
      description: 'Participate in real-world scenarios with actual job requirements.',
      activities: ['Requirement analysis', 'End-to-end execution', 'Real-time problem solving'],
    },
    {
      icon: <Users className="w-6 h-6 text-yellow-600" />,
      title: 'Structured Sourcing Labs',
      description: 'Hands-on sourcing sessions practicing advanced search techniques.',
      activities: ['Boolean search practice', 'LinkedIn Recruiter usage', 'Job board optimization'],
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-yellow-600" />,
      title: 'Interview Role Plays',
      description: 'Conduct mock screening and practice professional communication.',
      activities: ['Telephonic screening', 'Competency questioning', 'Candidate evaluation'],
    },
    {
      icon: <FileCheck className="w-6 h-6 text-yellow-600" />,
      title: 'Offer Negotiation',
      description: 'Navigate complex offer discussions and balance expectations.',
      activities: ['Compensation benchmarking', 'Negotiation strategy', 'Objection handling'],
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />,
      title: 'Joining & Closure',
      description: 'Manage post-offer processes, verification, and coordination.',
      activities: ['Background verification', 'Joining formalities', 'Onboarding support'],
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      title: 'Stakeholder Consulting',
      description: 'Develop consulting skills through simulated manager interactions.',
      activities: ['Intake meetings', 'Market mapping', 'Expectation management'],
    },
  ];

  const practicalApproach = [
    { phase: 'Demonstration', description: 'Expert demonstration of techniques and professional standards.' },
    { phase: 'Guided Practice', description: 'Supervised execution of tasks with real-time mentorship.' },
    { phase: 'Independent Application', description: 'Autonomous completion of assignments for skill consolidation.' },
    { phase: 'Assessment & Feedback', description: 'Performance evaluation with constructive feedback.' },
  ];

  const tools = [
    { icon: <Monitor className="w-6 h-6 text-yellow-600" />, category: 'Sourcing Platforms', tools: ['LinkedIn Recruiter', 'Job Boards & Aggregators', 'Social Media Channels'] },
    { icon: <MessageSquare className="w-6 h-6 text-yellow-600" />, category: 'Assessment Tools', tools: ['Video Interviewing', 'Skill Assessment Systems', 'Background Verification'] },
    { icon: <Database className="w-6 h-6 text-yellow-600" />, category: 'Recruitment Systems', tools: ['Applicant Tracking Systems', 'Recruitment CRM', 'Documentation Systems'] },
    { icon: <BarChart className="w-6 h-6 text-yellow-600" />, category: 'Analytics & Reporting', tools: ['Recruitment Dashboards', 'Metrics Tracking', 'Performance Analytics'] },
  ];

  return (
    <div className="bg-slate-50 font-sans selection:bg-yellow-200 overflow-x-hidden">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-yellow-500 origin-left z-[60] shadow-[0_0_20px_rgba(234,179,8,1)]" style={{ scaleX: scrollYProgress }} />

      {/* --- HERO SECTION (Single Screen) --- */}
      <section className="relative w-full h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-white px-4">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg1 }} animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 45, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[0%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-blue-100/60 rounded-full blur-[100px] mix-blend-multiply" />
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg2 }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, -45, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[10%] right-[0%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-yellow-100/50 rounded-full blur-[100px] mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6, duration: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200/80 text-slate-800 text-xs font-bold mb-6 shadow-sm">
            <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />
            <span>Experiential Learning</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 pb-2 mb-4">
              Practical Training & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">
                Real Application
              </span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Bridge the gap between theory and practice. Experience live recruitment scenarios, structured labs, and professional simulations.
          </motion.p>
        </div>

        <button 
          onClick={scrollToNext} 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-yellow-600 transition-colors z-20 cursor-pointer"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">See How We Train</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </button>
      </section>

      {/* --- PRACTICAL COMPONENTS SECTION (Single Screen Optimized) --- */}
      <section id="content-section" className="min-h-[100dvh] flex flex-col justify-center py-12 bg-slate-50 relative z-10 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Training Components</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base text-slate-600 max-w-2xl mx-auto font-medium">Comprehensive hands-on training covering critical aspects of operations.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicalComponents.map((component, index) => (
              <SpotlightCard key={index} className="flex flex-col p-6 bg-white rounded-[1.5rem] border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    {component.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">{component.title}</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm font-medium leading-relaxed">{component.description}</p>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <motion.ul initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-2">
                    {component.activities.map((activity, idx) => (
                      <motion.li key={idx} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                        <span className="text-xs font-medium text-slate-600 leading-snug">{activity}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRAINING APPROACH SECTION --- */}
      <section className="min-h-[100dvh] flex flex-col justify-center py-12 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Our Methodology</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base text-slate-600 max-w-2xl mx-auto font-medium">A progressive approach designed to build confidence and competence.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicalApproach.map((phase, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-5 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-200/60 hover:shadow-md hover:border-yellow-300 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-yellow-100 flex items-center justify-center text-xl font-black text-yellow-600 shadow-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">{phase.phase}</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TOOLS & TECHNOLOGY SECTION --- */}
      <section className="min-h-[100dvh] flex flex-col justify-center py-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[150px] opacity-10 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Tools & Technology Exposure</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base text-slate-300 max-w-2xl mx-auto font-medium">Train on the actual tools used by top recruitment teams globally.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{item.category}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.tools.map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-black/20 border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-xs font-medium text-slate-200">{tool}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white flex justify-center items-center relative overflow-hidden border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Experience it yourself</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto font-medium">Schedule a demo session to see our practical training methodology in action.</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} className="flex justify-center">
             <Link to="/contact">
               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.3)] hover:bg-slate-800 flex items-center gap-2">
                 Schedule Program Demo <ArrowRight size={20} />
               </motion.button>
             </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
