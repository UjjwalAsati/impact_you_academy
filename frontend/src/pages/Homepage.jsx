import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { 
  CheckCircle2, Users, Target, Award, ArrowRight, ChevronRight, 
  Star, TrendingUp, Zap, ShieldCheck, Globe, Sparkles, Building
} from 'lucide-react';

// --- ADVANCED ANIMATION COMPONENTS ---

// 1. Custom Smooth Cursor (Hidden on touch devices)
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-yellow-500 pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-difference"
      style={{ x: cursorXSpring, y: cursorYSpring }}
      animate={{ 
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(234, 179, 8, 0.2)' : 'transparent'
      }}
    >
      <motion.div 
        className="w-1.5 h-1.5 bg-yellow-500 rounded-full"
        animate={{ scale: isHovering ? 0 : 1 }}
      />
    </motion.div>
  );
};

// 2. Magnetic Hover Wrapper
const MagneticWrapper = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 3. Spotlight Card
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
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{ background: useMotionValue((v) => `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(234, 179, 8, 0.08), transparent 40%)`) }}
      />
      {children}
    </motion.div>
  );
};

// 4. 3D Tilt Card
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

// 5. Infinite Marquee
const InfiniteMarquee = ({ items }) => (
  <div className="relative flex overflow-hidden w-full group py-4">
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
    <motion.div 
      className="flex whitespace-nowrap gap-16 pr-16"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: 25, repeat: Infinity }}
    >
      {[...items, ...items, ...items].map((item, i) => (
        <div key={i} className="flex items-center gap-3 text-slate-400 hover:text-yellow-500 transition-colors cursor-pointer">
          <item.icon size={28} />
          <span className="font-bold text-2xl tracking-tight">{item.label}</span>
        </div>
      ))}
    </motion.div>
  </div>
);

// --- MAIN COMPONENT ---
export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  // Parallax Values for Background
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Data
  const trustBrands = [
    { icon: Target, label: "RecruitX" }, 
    { icon: Award, label: "StaffCertified" }, 
    { icon: Users, label: "TalentPro" },
    { icon: Building, label: "HireCorp" }
  ];

  const programs = [
    {
      title: 'Recruiter Foundation Program',
      duration: '30 Days',
      audience: 'Graduates & Starters',
      description: 'Comprehensive introduction to recruitment fundamentals, sourcing strategies, and hiring process management.',
      features: ['Full-cycle training', 'Sourcing lab sessions', 'Candidate management'],
      popular: false
    },
    {
      title: 'Advanced Staffing & TA Program',
      duration: '45-60 Days',
      audience: 'HR Professionals',
      description: 'Advanced program covering strategic talent acquisition, staffing operations, and recruitment analytics.',
      features: ['Strategic TA planning', 'Stakeholder management', 'Recruitment metrics'],
      popular: true
    },
    {
      title: 'Fast-Track Certification',
      duration: '15 Days',
      audience: 'Experienced Pros',
      description: 'Intensive certification program for professionals seeking to formalize recruitment expertise.',
      features: ['Accelerated curriculum', 'Professional certification', 'Career counseling'],
      popular: false
    },
  ];

  return (
    <div className="bg-slate-50 font-sans text-slate-900 selection:bg-yellow-200 selection:text-slate-900 overflow-x-hidden md:cursor-none">
      
      <CustomCursor />

      {/* Top Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-yellow-500 origin-left z-[60] shadow-[0_0_20px_rgba(234,179,8,1)]" 
        style={{ scaleX: scrollYProgress }} 
      />
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 flex flex-col justify-center overflow-hidden">
        
        {/* Animated Parallax Background Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div 
              style={{ y: prefersReducedMotion ? 0 : yBg1 }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 45, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-blue-200/50 rounded-full blur-[100px] mix-blend-multiply" 
            />
            <motion.div 
              style={{ y: prefersReducedMotion ? 0 : yBg2 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, -45, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-yellow-200/40 rounded-full blur-[100px] mix-blend-multiply" 
            />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-slate-800 text-sm font-bold mb-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
          >
            <Sparkles size={16} className="text-yellow-500 animate-pulse" />
            New Cohort Starting Soon
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-2" 
            >
              Impact You Academy
            </motion.h1>
          </div>

         <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 mb-8"
          >
            HR & Recruitment Training Institute
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium"
          >
            Industry-aligned programs designed to develop job-ready recruitment professionals through structured learning and live hiring exposure.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <MagneticWrapper>
              <Link to="/contact" className="block w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full sm:w-auto px-8 py-4 bg-slate-900 text-white text-base font-bold rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(234,179,8,0.3)] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request Brochure <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Continuous Shimmer */}
                  <motion.div 
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 w-1/2" 
                  />
                </motion.button>
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link to="/contact" className="block w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-sm text-slate-700 border border-slate-200 text-base font-bold rounded-full shadow-sm hover:bg-white hover:shadow-lg transition-all"
                >
                  Speak to Advisor
                </motion.button>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

      {/* --- TRUST & BENTO GRID VALUE PROPOSITION --- */}
      <section className="py-16 md:py-20 bg-white relative z-10 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.02)] border-t border-slate-100">
        
        {/* Infinite Marquee Strip */}
        <div className="mb-16 md:mb-24 pb-12 border-b border-slate-100">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">Trusted methodology based on industry standards</p>
           <InfiniteMarquee items={trustBrands} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
            >
              Why Impact You Academy?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              We've dismantled the traditional training model and rebuilt it for the modern recruitment landscape.
            </motion.p>
          </div>

          {/* STABLE FLEX/GRID LAYOUT FIX FOR BENTO BOXES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Spans 2/3 on Desktop) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Wide Top Card */}
              <SpotlightCard className="flex-1 bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-200/60 hover:shadow-xl transition-shadow duration-500">
                  <div className="relative z-10 h-full flex flex-col justify-center">
                      <motion.div 
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md"
                      >
                          <Zap size={24} />
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Workflow-Based Learning</h3>
                      <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                          Forget dry theory. We simulate the exact chaos, pressure, and triumph of a real recruiter's desk. You learn by doing.
                      </p>
                  </div>
              </SpotlightCard>

              {/* Bottom Row inside Left Column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SpotlightCard className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200/60">
                     <motion.div 
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-5"
                     >
                        <ShieldCheck size={24} />
                     </motion.div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Elite Mentorship</h3>
                     <p className="text-slate-600 text-sm md:text-base leading-relaxed">Direct access to veterans who review your calls & strategies.</p>
                </SpotlightCard>

                <SpotlightCard className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200/60">
                     <motion.div 
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-5"
                     >
                        <Globe size={24} />
                     </motion.div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Global Standards</h3>
                     <p className="text-slate-600 text-sm md:text-base leading-relaxed">Curriculum updated to match global recruitment trends.</p>
                </SpotlightCard>
              </div>

            </div>

            {/* Right Column (Tall Card) */}
            <div className="lg:col-span-1 flex flex-col">
              <SpotlightCard className="flex-1 bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col justify-between border border-slate-800 shadow-xl">
                  <div className="relative z-10">
                      <motion.div 
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-slate-900 mb-6 shadow-[0_0_30px_rgba(234,179,8,0.3)]"
                      >
                          <TrendingUp size={24} />
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Career Acceleration</h3>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed">Our graduates don't just get jobs; they get promoted faster. We teach strategy, not just tasks.</p>
                  </div>
                  
                  {/* Interactive Animated Graph */}
                  <div className="relative z-10 mt-10 h-32 md:h-40 flex items-end justify-between gap-2 group/graph">
                      {[40, 60, 50, 100].map((height, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: "10%" }}
                          whileInView={{ height: `${height}%` }}
                          whileHover={{ height: `${height + 5}%`, backgroundColor: i === 3 ? "#facc15" : "#94a3b8" }}
                          transition={{ duration: 1, delay: i * 0.1, type: "spring", bounce: 0.4 }}
                          viewport={{ once: true }}
                          className={`w-full rounded-t-lg transition-colors ${i === 3 ? 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'bg-slate-700'}`}
                        />
                      ))}
                  </div>
              </SpotlightCard>
            </div>

          </div>
        </div>
      </section>

      {/* --- PROGRAMS SECTION --- */}
      <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
            >
              Professional Pathways
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {programs.map((program, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full z-10"
              >
                <TiltCard className="h-full">
                  <div className={`relative p-8 rounded-[2rem] h-full flex flex-col transform-gpu ${
                      program.popular 
                        ? 'bg-white shadow-[0_20px_50px_rgba(234,179,8,0.15)] ring-2 ring-yellow-400 z-20' 
                        : 'bg-white ring-1 ring-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow'
                    }`}
                  >
                    {program.popular && (
                      <motion.div 
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md"
                      >
                        <Star size={12} fill="currentColor" /> Popular
                      </motion.div>
                    )}

                    <div className="mb-6 flex-grow">
                      <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-full mb-5">
                        {program.duration}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-tight tracking-tight">
                        {program.title}
                      </h3>
                      <p className="text-xs text-yellow-600 font-bold mb-4 uppercase tracking-wider">
                        Target: {program.audience}
                      </p>
                      <p className="text-slate-600 leading-relaxed text-sm">{program.description}</p>
                    </div>

                    <div className="h-px w-full bg-slate-100 mb-6" />

                    <motion.ul 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
                      className="space-y-3 mb-8"
                    >
                      {program.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                          className="flex items-start space-x-3"
                        >
                          <motion.div variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { type: "spring" } } }}>
                            <CheckCircle2 size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                          </motion.div>
                          <span className="text-sm text-slate-700 font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    <Link to="/programs" className="block mt-auto pointer-events-auto">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group ${
                          program.popular
                            ? 'bg-yellow-500 text-slate-900 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                            : 'bg-slate-50 text-slate-900 hover:bg-slate-100 ring-1 ring-inset ring-slate-200'
                        }`}
                      >
                        View Details
                        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (SONAR PULSE) --- */}
      <section className="py-20 md:py-24 bg-slate-900 relative overflow-hidden flex justify-center items-center">
        
        {/* Continuous Animated Gradients */}
        <motion.div 
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#eab308_0%,#3b82f6_50%,#eab308_100%)] bg-[length:200%_200%] z-0"
        />

        {/* Sonar Pulse Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-yellow-500/20 rounded-full"
              initial={{ width: 100, height: 100, opacity: 1 }}
              animate={{ width: 800, height: 800, opacity: 0 }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 2, ease: "easeOut" }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Ready to Accelerate?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 mb-10 leading-relaxed font-medium"
          >
            Connect with our program advisors to discuss your career objectives and identify the exact pathway to hit your goals.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            className="flex justify-center"
          >
            <MagneticWrapper>
              <Link to="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-yellow-500 text-slate-900 text-base font-bold rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transition-all flex items-center gap-3"
                >
                  Schedule Consultation <ArrowRight size={18} />
                </motion.button>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
