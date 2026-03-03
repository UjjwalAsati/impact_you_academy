import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import { 
  FileText, Video, Briefcase, UserCheck, TrendingUp, Award,
  Sparkles, ChevronDown, ShieldAlert, GraduationCap, CheckCircle2, ArrowRight
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

export default function CertificationPage() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const certificationComponents = [
    { title: 'Program Completion Certificate', description: 'Awarded upon successful completion of all program modules, practical assignments, and assessments. Validates comprehensive training.', icon: <GraduationCap className="w-8 h-8 text-yellow-600" /> },
    { title: 'Competency Assessment', description: 'Evaluation of practical skills through case studies, role plays, and work simulations. Demonstrates ability to execute independently.', icon: <CheckCircle2 className="w-8 h-8 text-yellow-600" /> },
    { title: 'Industry Certification', description: 'Professional certification aligned with recruitment industry standards. Enhances credibility and career positioning.', icon: <Award className="w-8 h-8 text-yellow-600" /> },
  ];

  const careerServices = [
    { icon: <FileText className="w-10 h-10 text-yellow-600" />, title: 'Profile Development', description: 'Structured guidance on creating effective recruitment-focused resumes and profiles.', components: ['Resume structuring for recruitment roles', 'LinkedIn profile optimization', 'Professional summary development', 'Achievement and metrics presentation'] },
    { icon: <Video className="w-10 h-10 text-yellow-600" />, title: 'Interview Preparation', description: 'Comprehensive preparation for recruitment interviews, including scenarios and competency questions.', components: ['Behavioral interview preparation', 'Technical question practice', 'Case study discussions', 'Mock interview sessions with feedback'] },
    { icon: <UserCheck className="w-10 h-10 text-yellow-600" />, title: 'Professional Branding', description: 'Strategic guidance on career positioning, networking, and brand development.', components: ['Career pathway identification', 'Industry networking strategies', 'Professional community engagement', 'Continuous learning roadmap'] },
    { icon: <Briefcase className="w-10 h-10 text-yellow-600" />, title: 'Opportunity Support', description: 'Connection to recruitment organizations and support in navigating the job market.', components: ['Industry network introductions', 'Interview opportunity facilitation', 'Internship program coordination', 'Career guidance and counseling'] },
  ];

  return (
    <div className="bg-slate-50 font-sans selection:bg-yellow-200 overflow-x-hidden min-h-screen">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-yellow-500 origin-left z-[60] shadow-[0_0_20px_rgba(234,179,8,1)]" style={{ scaleX: scrollYProgress }} />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[100vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg1 }} animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 45, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-yellow-100/60 rounded-full blur-[100px] mix-blend-multiply" />
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg2 }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, -45, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-blue-100/50 rounded-full blur-[100px] mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6, duration: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200/80 text-slate-800 text-sm font-bold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span>Career Enablement</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 pb-2">
              Get Certified & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">
                Career Ready
              </span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl font-medium">
            Validate your expertise with industry-recognized certification and get the support you need to launch your career in Talent Acquisition.
          </motion.p>
        </div>

        {/* Scroll Button */}
        <button 
          onClick={scrollToNext} 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-yellow-600 transition-colors z-20 cursor-pointer"
        >
          <span className="text-xs font-bold uppercase tracking-widest">See Process</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </button>
      </section>

      {/* --- CERTIFICATION FRAMEWORK --- */}
      <section className="py-20 md:py-32 bg-slate-50 relative z-10 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Certification Framework</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">A rigorous assessment process ensuring you are ready for the professional world.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificationComponents.map((component, index) => (
              <SpotlightCard key={index} className="flex flex-col p-8 md:p-10 bg-white rounded-[2rem] border border-slate-200/60 shadow-sm text-center items-center h-full">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                  {component.icon}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">{component.title}</h3>
                <p className="text-slate-600 leading-relaxed text-base font-medium">{component.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- CAREER SERVICES SECTION --- */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Career Enablement Services</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">We go beyond training to help you build your professional identity.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerServices.map((service, index) => (
              <SpotlightCard key={index} className="flex flex-col p-8 md:p-10 bg-slate-50 rounded-[2rem] border border-slate-200/60 h-full">
                <div className="flex items-center gap-5 mb-6">
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="p-4 bg-white rounded-[1.2rem] border border-slate-200 shadow-md">
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{service.title}</h3>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed text-lg font-medium">{service.description}</p>
                <div className="mt-auto pt-6 border-t border-slate-200">
                  <motion.ul initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.components.map((comp, idx) => (
                      <motion.li key={idx} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        <span className="text-sm md:text-base text-slate-700 font-medium">{comp}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- IMPORTANT NOTICE --- */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.5 }} className="bg-yellow-50/80 border border-yellow-200/50 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start shadow-xl shadow-yellow-100/50">
            <div className="flex-shrink-0 p-5 bg-yellow-100 rounded-2xl text-yellow-600 shadow-inner">
              <ShieldAlert size={36} />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Important Notice Regarding Career Outcomes</h3>
              <div className="space-y-4 text-slate-700 text-lg leading-relaxed font-medium">
                <p>Impact You Academy provides comprehensive training and career support. We facilitate connections and support preparation, but we <strong className="text-slate-900 bg-yellow-200 px-1 rounded">do not guarantee</strong> employment outcomes.</p>
                <p>Career success depends on individual performance, market conditions, and personal effort. Final hiring decisions rest solely with prospective employers.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/50 flex justify-center items-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-yellow-500/30 rounded-full" initial={{ width: 100, height: 100, opacity: 1 }} animate={{ width: 800, height: 800, opacity: 0 }} transition={{ duration: 4, repeat: Infinity, delay: i * 2, ease: "easeOut" }} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Start Your Professional Journey</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">Discuss your career objectives and learn how our programs can support your transition into the recruitment profession.</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} className="flex justify-center">
             <Link to="/contact">
               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(234,179,8,0.4)] flex items-center gap-3">
                 Schedule Career Consultation <ArrowRight size={20} />
               </motion.button>
             </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
