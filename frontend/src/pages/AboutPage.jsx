import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import { 
  Scale, TrendingUp, ShieldCheck, Sparkles, ChevronDown,
  Quote, Briefcase, GraduationCap, Gavel, BookOpen, Landmark, Zap, ArrowRight
} from 'lucide-react';

// --- ADVANCED ANIMATION COMPONENTS ---
const MagneticWrapper = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{ background: useMotionValue((v) => `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(234, 179, 8, 0.08), transparent 40%)`) }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  // Parallax Backgrounds
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const scrollToNext = () => {
    document.getElementById('content-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const commitments = [
    {
      icon: <Scale className="w-8 h-8 text-yellow-600" />,
      title: 'Legal Clarity',
      description: 'Creating legally aware professionals who understand both corporate risk and statutory labor compliance.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-yellow-600" />,
      title: 'Strategic Execution',
      description: 'Aligning human capital strategy with corporate governance to drive sustainable business growth.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-yellow-600" />,
      title: 'Ethical Leadership',
      description: 'Training leaders who operate with integrity, structuring policies that protect both the workforce and the enterprise.',
    },
  ];

  return (
    <div className="bg-slate-50 font-sans selection:bg-yellow-200 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-yellow-500 origin-left z-[60] shadow-[0_0_20px_rgba(234,179,8,1)]" style={{ scaleX: scrollYProgress }} />

      {/* --- HERO SECTION (Single Screen) --- */}
      <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden bg-white px-4">
        
        {/* Animated Parallax Background Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg1 }} animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 45, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-yellow-100/60 rounded-full blur-[100px] mix-blend-multiply" />
            <motion.div style={{ y: prefersReducedMotion ? 0 : yBg2 }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, -45, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-blue-100/50 rounded-full blur-[100px] mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center mt-8">
          
          <motion.div initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6, duration: 1 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200/80 text-slate-800 text-sm font-bold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span>Law Meets Leadership</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-slate-900 pb-2 mb-6">
              About <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">
                Impact You Academy
              </span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-medium">
            Law with structure. HR with strategy. Leadership with integrity. <br className="hidden md:block"/>
            We bridge the critical gap between theoretical education and industry compliance.
          </motion.p>

          {/* POWERED BY TASKUP BADGE */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-12">
            <div className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] hover:border-yellow-300 transition-all duration-300 cursor-default">
              <div className="bg-slate-50 p-2 rounded-full border border-slate-100 group-hover:bg-yellow-500 transition-colors duration-300">
                <Zap className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-sm md:text-base font-bold text-slate-500">
                Powered by <span className="font-extrabold text-slate-900 group-hover:text-yellow-600 transition-colors duration-300 tracking-wide">TASKUP</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToNext} 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-yellow-600 transition-colors z-20 cursor-pointer"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest pl-[0.1em]">Explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </button>
      </section>

      {/* --- DIRECTOR'S IDEOLOGY SECTION (Single Screen Optimized & Widened) --- */}
      <section id="content-section" className="min-h-[100dvh] flex flex-col justify-center py-16 bg-white relative z-10 overflow-hidden border-t border-slate-200/50">
        
        {/* Floating Decorative Elements */}
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 opacity-5 hidden lg:block text-slate-900 pointer-events-none"><Landmark size={120} /></motion.div>
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 right-10 opacity-5 hidden lg:block text-slate-900 pointer-events-none"><Briefcase size={100} /></motion.div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
          <div className="text-center mb-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Director’s Ideology
            </motion.h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full origin-center"></motion.div>
          </div>
          
          {/* Wider Quote Card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.4 }} className="relative p-8 md:p-12 lg:p-14 bg-slate-50 rounded-[2rem] border border-slate-200/80 text-center shadow-md mb-10 hover:shadow-xl hover:border-yellow-200 transition-all duration-500 group max-w-5xl mx-auto">
             <div className="absolute top-6 left-6 text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors duration-500">
                <Quote size={40} />
             </div>
             <p className="relative z-10 text-xl md:text-2xl lg:text-3xl text-slate-800 leading-relaxed font-serif italic font-medium tracking-tight">
                "When I stepped into the courtroom for the first time, I realized that law is not just about arguments—it is about responsibility. It is the very foundation of justice, governance, and structured organizational systems."
             </p>
          </motion.div>

          {/* Wider Narrative Text Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="max-w-5xl mx-auto text-slate-600 space-y-4 md:space-y-6 text-justify md:text-center text-base md:text-lg leading-relaxed font-medium">
            <p>
              Throughout my journey—both as an Advocate before the Madhya Pradesh High Court and as a corporate Chief Human Resources Officer—I have operated at the vital intersection of law, compliance, and strategic workforce governance.
            </p>
            <p className="text-slate-900 font-bold text-lg md:text-xl tracking-tight leading-snug">
              During this time, I observed a critical gap: education was largely theoretical, while the industry demanded practical, compliance-driven expertise. <br className="hidden md:block"/><span className="bg-yellow-100/80 px-2 py-0.5 rounded mt-2 inline-block shadow-sm">Impact You Academy was born from this realization.</span>
            </p>
            <p>
              My ideology is rooted in the belief that true leadership requires more than just managing people; it requires building legally secure, highly ethical, and strategically sound organizations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CORE COMMITMENTS (Single Screen Optimized) --- */}
      <section className="min-h-[100dvh] flex flex-col justify-center py-16 bg-slate-50 relative border-t border-slate-200/50">
         <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Our Core Commitments
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              We do not just teach concepts. We build capability. We build confidence. We build careers.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {commitments.map((item, index) => (
              <SpotlightCard key={index} className="p-8 lg:p-10 bg-white rounded-[2rem] border border-slate-200/80 shadow-md text-center items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-16 h-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center mb-6 mx-auto border border-slate-100 shadow-sm">
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">{item.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT THE DIRECTOR SECTION (Wider Layout) --- */}
      <section className="min-h-[100dvh] flex flex-col justify-center py-16 bg-slate-950 text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none">
             <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-yellow-600 rounded-full blur-[120px]" />
             <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-700 rounded-full blur-[120px]" />
         </div>
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left: Director Image */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-2/5 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-[4/5] group">
                {/* Decorative glowing border */}
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 border-2 border-yellow-500/50 rounded-[2.5rem] translate-x-4 translate-y-4 transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-6"></motion.div>
                
                {/* Actual Image Container */}
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-slate-700 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 bg-slate-900">
                    <img src="/doorva.jpg" alt="Doorva Juaria" className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90"></div>
                    
                    {/* Name Overlay */}
                    <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                        <h3 className="text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-lg">Doorva Juaria</h3>
                        <div className="inline-block bg-yellow-500/20 border border-yellow-500/30 px-4 py-1 rounded-full backdrop-blur-md">
                            <p className="text-yellow-300 text-[10px] uppercase tracking-[0.2em] font-bold">Founder & Director</p>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Detailed Content */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full lg:w-3/5 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
                <BookOpen size={14} /> Meet The Director
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-black mb-4 text-white tracking-tight leading-none">
                Doorva <span className="text-yellow-500">Juaria</span>
              </h2>
              <h3 className="text-lg md:text-xl text-yellow-100/90 mb-6 font-medium leading-snug border-l-4 border-yellow-500 pl-4 py-1">
                BBA LL.B (Hons.), LL.M (Criminal Law) <br className="hidden md:block" />
                CHRO | Advocate, High Court of M.P.
              </h3>
              
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                <p>
                  Doorva Juaria embodies a sophisticated intersection of courtroom advocacy, corporate governance, and academic mentorship. With a foundational background in <strong className="text-white font-bold">BBA LL.B (Hons.)</strong> and an <strong className="text-white font-bold">LL.M in Criminal Law</strong>, complemented by specialized expertise in Cyber Law and Human Psychology, she offers a multi-dimensional perspective on modern organizational challenges.
                </p>
                <p>
                  As the current <strong className="text-white font-bold">Chief Human Resources Officer at Taskup Corporate Services Pvt. Ltd.</strong> and a practicing <strong className="text-white font-bold">Advocate before the Madhya Pradesh High Court</strong>, Doorva bridges the critical gap between statutory legal requirements and strategic workforce architecture. Her work is defined by a commitment to transforming compliance from a reactive necessity into a proactive competitive advantage.
                </p>
                <p>
                  Beyond the boardroom and the courtroom, Doorva is a dedicated educator. Her association with <strong className="text-white font-bold">Shri Vaishnav Vidyapeeth Vishwavidyalaya</strong> underscores her mission to shape the next generation of industry-ready leaders through rigorous, law-integrated academic programs.
                </p>
              </div>

              {/* Stats / Highlights - Horizontal Alignment */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 border-t border-slate-800/50 pt-8">
                {[
                  { icon: Briefcase, label: "Leadership", value: "Corporate CHRO" },
                  { icon: Gavel, label: "Advocacy", value: "High Court Advocate" },
                  { icon: GraduationCap, label: "Mentorship", value: "Academic Educator" }
                ].map((stat, idx) => (
                  <motion.div key={idx} whileHover={{ y: -5, backgroundColor: "rgba(30, 41, 59, 1)" }} className="flex flex-col gap-2 p-4 rounded-[1.2rem] bg-slate-900/50 border border-slate-800 transition-colors shadow-sm">
                     <div className="p-2.5 bg-yellow-500/10 w-max rounded-xl mb-1 border border-yellow-500/20"><stat.icon className="w-5 h-5 text-yellow-400" /></div>
                     <span className="text-[10px] text-slate-400 uppercase tracking-[0.1em] font-bold">{stat.label}</span>
                     <span className="text-sm font-bold text-white tracking-tight">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 bg-slate-50/50 skew-y-2 transform origin-bottom-right z-0"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.5 }} className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-yellow-500/30">
             <TrendingUp className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Join the Next Generation of Leaders
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with us to discuss how our training programs can support your professional development in law and HR compliance.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-center">
            <MagneticWrapper className="inline-block">
              <Link to="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-12 py-6 rounded-full bg-slate-900 text-white font-bold text-xl transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.3)] hover:bg-slate-800 flex items-center gap-3">
                  Get in Touch <ArrowRight size={24}/>
                </motion.button>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
