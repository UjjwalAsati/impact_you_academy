import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Scale, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown,
  Quote,
  Briefcase,
  GraduationCap,
  Gavel,
  BookOpen,
  Landmark
} from 'lucide-react';

export default function AboutPage() {

  // --- INTERNAL ANIMATION STYLES ---
  const animationStyles = `
    /* Base Fade Up */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    /* Fade In From Left */
    @keyframes fadeLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    /* Fade In From Right */
    @keyframes fadeRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    /* Slow Zoom In */
    @keyframes zoomIn {
        from { opacity: 0; transform: scale(0.92); }
        to { opacity: 1; transform: scale(1); }
    }

    /* Floating Animations */
    @keyframes float-slow {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(2deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    @keyframes float-fast {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(-3deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    /* Slow Rotation for Backgrounds */
    @keyframes rotate-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    /* Glowing Pulse */
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.3); border-color: rgba(234, 179, 8, 0.4); }
      50% { box-shadow: 0 0 40px rgba(234, 179, 8, 0.6); border-color: rgba(234, 179, 8, 0.7); }
    }

    /* Animation Utility Classes */
    .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
    .animate-fade-left { animation: fadeLeft 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
    .animate-fade-right { animation: fadeRight 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
    .animate-zoom-in { animation: zoomIn 1s ease-out forwards; opacity: 0; }
    
    .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
    .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
    .animate-rotate-slow { animation: rotate-slow 120s linear infinite; }
    .animate-glow { animation: pulse-glow 4s infinite ease-in-out; }
    
    /* Stagger Delays */
    .delay-100 { animation-delay: 0.15s; }
    .delay-200 { animation-delay: 0.3s; }
    .delay-300 { animation-delay: 0.45s; }

    /* Premium Card Hover States */
    .card-hover {
      transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .card-hover:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px -12px rgba(234, 179, 8, 0.2);
      border-color: rgba(234, 179, 8, 0.4);
    }
    
    /* Stat Block Hover */
    .stat-hover { transition: all 0.3s ease; }
    .stat-hover:hover { transform: translateY(-3px); background-color: rgba(30, 41, 59, 0.8); }
  `;

  // Core Commitments Data
  const commitments = [
    {
      icon: <Scale className="w-10 h-10 text-yellow-600 group-hover:scale-110 transition-transform duration-500" />,
      title: 'Legal Clarity',
      description: 'Creating legally aware professionals who understand both corporate risk and statutory labor compliance.',
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-yellow-600 group-hover:scale-110 transition-transform duration-500" />,
      title: 'Strategic Execution',
      description: 'Aligning human capital strategy with corporate governance to drive sustainable business growth.',
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-yellow-600 group-hover:scale-110 transition-transform duration-500" />,
      title: 'Ethical Leadership',
      description: 'Training leaders who operate with integrity, structuring policies that protect both the workforce and the enterprise.',
    },
  ];

  return (
    <div data-testid="about-page" className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100 overflow-hidden">
      <style>{animationStyles}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex flex-col justify-center bg-white pt-24 pb-12">
        
        {/* Background Gradients (Rotating Slowly) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none animate-rotate-slow origin-center opacity-70">
            <div className="absolute top-[0%] left-[-20%] w-[800px] h-[800px] bg-blue-50/60 rounded-full blur-3xl mix-blend-multiply animate-float-slow" />
            <div className="absolute bottom-[0%] right-[-20%] w-[800px] h-[800px] bg-yellow-50/60 rounded-full blur-3xl mix-blend-multiply animate-float-fast" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
          
          <div className="animate-zoom-in delay-100 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-bold mb-8 shadow-sm hover:shadow-md transition-shadow">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span className="tracking-wide">Law Meets Leadership</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-6xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tighter mb-8 leading-none">
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 drop-shadow-sm">
              Impact You Academy
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            Law with structure. HR with strategy. Leadership with integrity. <br className="hidden md:block"/>
            We bridge the critical gap between theoretical education and industry compliance.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 animate-fade-up delay-300 flex flex-col items-center gap-2 opacity-60 animate-bounce mb-4 flex-shrink-0 cursor-pointer group" onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] group-hover:text-yellow-600 transition-colors">Explore</span>
          <ChevronDown className="text-slate-400 w-5 h-5 group-hover:text-yellow-600 transition-colors" />
        </div>
      </section>

      {/* --- DIRECTOR'S IDEOLOGY SECTION (COMPRESSED) --- */}
      <section className="py-16 lg:py-20 bg-white relative z-10 overflow-hidden border-y border-slate-100">
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-10 left-5 opacity-5 animate-float-slow hidden lg:block text-slate-900"><Landmark size={100} /></div>
        <div className="absolute bottom-10 right-5 opacity-5 animate-float-fast hidden lg:block text-slate-900"><Briefcase size={80} /></div>

        <div className="container-custom px-4 mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-10 animate-fade-up">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Director’s Ideology
            </h2>
            <div className="w-20 h-1.5 bg-yellow-500 mx-auto rounded-full opacity-80"></div>
          </div>
          
          {/* Quote Card */}
          <div className="animate-zoom-in delay-100 relative p-8 md:p-12 bg-slate-50 rounded-[2.5rem] border border-slate-200 text-center shadow-lg mb-10 hover:shadow-xl transition-all duration-500 group">
             <div className="absolute top-6 left-6 text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors duration-500">
                <Quote size={48} />
             </div>
             
             <p className="relative z-10 text-xl md:text-2xl text-slate-800 leading-relaxed font-serif italic font-medium">
                "When I stepped into the courtroom for the first time, I realized that law is not just about arguments—it is about responsibility. It is the very foundation of justice, governance, and structured organizational systems."
             </p>
          </div>

          {/* Narrative Text */}
          <div className="prose prose-lg mx-auto text-slate-600 space-y-5 text-justify md:text-center animate-fade-up delay-200 font-sans leading-relaxed">
            <p>
              Throughout my journey—both as an Advocate before the Madhya Pradesh High Court and as a corporate Chief Human Resources Officer—I have operated at the vital intersection of law, compliance, and strategic workforce governance.
            </p>
            <p className="text-slate-900 font-medium text-xl">
              During this time, I observed a critical gap: education was largely theoretical, while the industry demanded practical, compliance-driven expertise. <span className="bg-yellow-100 px-2 rounded">Impact You Academy was born from this realization.</span>
            </p>
            <p>
              My ideology is rooted in the belief that true leadership requires more than just managing people; it requires building legally secure, highly ethical, and strategically sound organizations.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORE COMMITMENTS (3 PILLARS) --- */}
      <section className="py-20 lg:py-24 bg-slate-100 relative">
         {/* Subtle Pattern */}
         <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="container-custom px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Our Core Commitments
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              We do not just teach concepts. We build capability. We build confidence. We build careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitments.map((item, index) => (
              <div 
                key={index}
                style={{ animationDelay: `${index * 0.15}s` }}
                className="animate-fade-up card-hover group flex flex-col p-10 bg-white rounded-[2rem] border border-white shadow-md text-center items-center relative overflow-hidden"
              >
                {/* Subtle Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 via-yellow-50/30 to-yellow-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-md group-hover:shadow-yellow-100 transition-all duration-500 mx-auto border border-slate-100 group-hover:border-yellow-200">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-yellow-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-base">
                      {item.description}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT THE DIRECTOR SECTION (COMPRESSED & FIXED IMAGE) --- */}
      <section className="py-20 lg:py-24 bg-slate-950 text-white relative overflow-hidden">
         {/* Background Accents */}
         <div className="absolute inset-0 animate-rotate-slow opacity-20 mix-blend-soft-light pointer-events-none">
             <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-yellow-600 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-700 rounded-full blur-[120px]" />
         </div>
         
        <div className="container-custom px-4 mx-auto max-w-6xl relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
            
            {/* Left: Director Image (FIXED: object-top & optimized width) */}
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-end animate-fade-right">
              {/* Aspect Ratio Container */}
              <div className="relative w-full max-w-[300px] md:max-w-[340px] aspect-[4/5] group">
                
                {/* Decorative glowing border */}
                <div className="absolute inset-0 border-2 border-yellow-500/40 rounded-[2.5rem] translate-x-4 translate-y-4 animate-glow transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-6"></div>
                
                {/* Actual Image Container */}
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-slate-700 overflow-hidden shadow-2xl z-10 bg-slate-900">
                    <img 
                      src="/doorva.jpg" 
                      alt="Doorva Juaria - Founder & Director" 
                      // FIX: Added object-top so the head doesn't get cut off!
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90"></div>
                    
                    {/* Name Overlay */}
                    <div className="absolute bottom-6 left-0 right-0 text-center z-20">
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-1 drop-shadow-lg">Doorva Juaria</h3>
                        <div className="inline-block bg-yellow-500/20 border border-yellow-500/30 px-3 py-0.5 rounded-full backdrop-blur-md">
                            <p className="text-yellow-300 text-[10px] uppercase tracking-[0.15em] font-bold">Founder & Director</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Content (Compressed Spacing) */}
            <div className="w-full lg:w-7/12 text-left animate-fade-left delay-200">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md shadow-lg">
                <BookOpen size={14} /> Meet The Director
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-white tracking-tighter leading-none">
                Doorva <span className="text-yellow-500">Juaria</span>
              </h2>
              <h3 className="text-lg md:text-xl text-yellow-100/90 mb-6 font-medium leading-snug border-l-4 border-yellow-500 pl-4">
                BBA LL.B (Hons.), LL.M (Criminal Law) <br className="hidden md:block" />
                CHRO | Advocate, High Court of M.P.
              </h3>
              
              {/* Tighter line heights and reduced margins */}
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base font-light">
                <p>
                  Doorva Juaria embodies a sophisticated intersection of courtroom advocacy, corporate governance, and academic mentorship. With a foundational background in <strong className="text-white font-semibold">BBA LL.B (Hons.)</strong> and an <strong className="text-white font-semibold">LL.M in Criminal Law</strong>, complemented by specialized expertise in Cyber Law and Human Psychology, she offers a multi-dimensional perspective on modern organizational challenges.
                </p>
                <p>
                  As the current <strong className="text-white font-semibold">Chief Human Resources Officer at Taskup Corporate Services Pvt. Ltd.</strong> and a practicing <strong className="text-white font-semibold">Advocate before the Madhya Pradesh High Court</strong>, Doorva bridges the critical gap between statutory legal requirements and strategic workforce architecture. Her work is defined by a commitment to transforming compliance from a reactive necessity into a proactive competitive advantage.
                </p>
                <p>
                  Beyond the boardroom and the courtroom, Doorva is a dedicated educator. Her association with <strong className="text-white font-semibold">Shri Vaishnav Vidyapeeth Vishwavidyalaya</strong> underscores her mission to shape the next generation of industry-ready leaders through rigorous, law-integrated academic programs.
                </p>
              </div>

              {/* Stats / Highlights - Compact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 border-t border-slate-800/50 pt-6">
                <div className="flex flex-col gap-2 p-3 rounded-xl stat-hover">
                   <div className="p-2 bg-yellow-500/20 w-max rounded-lg mb-1"><Briefcase className="w-5 h-5 text-yellow-400" /></div>
                   <span className="text-[10px] text-slate-400 uppercase tracking-[0.1em] font-bold">Leadership</span>
                   <span className="text-sm font-bold text-white">Corporate CHRO</span>
                </div>
                <div className="flex flex-col gap-2 p-3 rounded-xl stat-hover">
                   <div className="p-2 bg-yellow-500/20 w-max rounded-lg mb-1"><Gavel className="w-5 h-5 text-yellow-400" /></div>
                   <span className="text-[10px] text-slate-400 uppercase tracking-[0.1em] font-bold">Advocacy</span>
                   <span className="text-sm font-bold text-white">High Court Advocate</span>
                </div>
                <div className="flex flex-col gap-2 p-3 rounded-xl stat-hover">
                   <div className="p-2 bg-yellow-500/20 w-max rounded-lg mb-1"><GraduationCap className="w-5 h-5 text-yellow-400" /></div>
                   <span className="text-[10px] text-slate-400 uppercase tracking-[0.1em] font-bold">Mentorship</span>
                   <span className="text-sm font-bold text-white">Academic Educator</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50/50 skew-y-2 transform origin-bottom-right z-0"></div>
        <div className="container-custom px-4 mx-auto max-w-4xl text-center animate-fade-up relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-yellow-500/30">
             <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Join the Next Generation of Leaders
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with us to discuss how our training programs can support your professional development in law and HR compliance.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="px-12 py-7 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-yellow-500 hover:text-slate-900 transition-all duration-400 shadow-xl shadow-slate-900/20 hover:shadow-yellow-500/40 hover:-translate-y-1"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
