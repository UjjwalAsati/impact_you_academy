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

  // --- INTERNAL ANIMATION STYLES (Vastly Expanded) ---
  const animationStyles = `
    /* Base Fade Up */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    /* New: Fade In From Left */
    @keyframes fadeLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    /* New: Fade In From Right */
    @keyframes fadeRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    /* New: Slow Zoom In */
    @keyframes zoomIn {
        from { opacity: 0; transform: scale(0.92); }
        to { opacity: 1; transform: scale(1); }
    }

    /* Floating Animations */
    @keyframes float-slow {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(3deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    @keyframes float-fast {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-25px) rotate(-4deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    /* New: Slow Rotation for Backgrounds */
    @keyframes rotate-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    /* Glowing Pulse */
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 25px rgba(234, 179, 8, 0.3); border-color: rgba(234, 179, 8, 0.4); }
      50% { box-shadow: 0 0 50px rgba(234, 179, 8, 0.6); border-color: rgba(234, 179, 8, 0.7); }
    }

    /* Animation Utility Classes */
    .animate-fade-up { animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
    .animate-fade-left { animation: fadeLeft 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
    .animate-fade-right { animation: fadeRight 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
    .animate-zoom-in { animation: zoomIn 1.2s ease-out forwards; opacity: 0; }
    
    .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
    .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
    .animate-rotate-slow { animation: rotate-slow 120s linear infinite; }
    .animate-glow { animation: pulse-glow 4s infinite ease-in-out; }
    
    /* Stagger Delays */
    .delay-100 { animation-delay: 0.15s; }
    .delay-200 { animation-delay: 0.3s; }
    .delay-300 { animation-delay: 0.45s; }
    .delay-400 { animation-delay: 0.6s; }
    .delay-500 { animation-delay: 0.75s; }

    /* Premium Card Hover States */
    .card-hover {
      transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .card-hover:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 50px -12px rgba(234, 179, 8, 0.25);
      border-color: rgba(234, 179, 8, 0.4);
    }
    
    /* Stat Block Hover */
    .stat-hover { transition: all 0.3s ease; }
    .stat-hover:hover { transform: translateY(-5px); background-color: rgba(30, 41, 59, 0.8); /* slate-800/80 */ }
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
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-white pt-20 pb-10">
        
        {/* Background Gradients (Now Rotating Slowly) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none animate-rotate-slow origin-center opacity-70">
            <div className="absolute top-[0%] left-[-20%] w-[800px] h-[800px] bg-blue-50/60 rounded-full blur-3xl mix-blend-multiply animate-float-slow" />
            <div className="absolute bottom-[0%] right-[-20%] w-[800px] h-[800px] bg-yellow-50/60 rounded-full blur-3xl mix-blend-multiply animate-float-fast" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
          
          <div className="animate-zoom-in delay-100 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-bold mb-10 shadow-md hover:shadow-lg transition-shadow">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span className="tracking-wide">Law Meets Leadership</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-6xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tighter mb-10 leading-none">
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 drop-shadow-sm">
              Impact You Academy
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-3xl mx-auto text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
            Law with structure. HR with strategy. Leadership with integrity. <br className="hidden md:block"/>
            We bridge the critical gap between theoretical education and industry compliance.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 animate-fade-up delay-500 flex flex-col items-center gap-3 opacity-60 animate-bounce mb-8 flex-shrink-0 cursor-pointer group" onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}>
          <span className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] group-hover:text-yellow-600 transition-colors">Explore Our Ideology</span>
          <ChevronDown className="text-slate-400 w-6 h-6 group-hover:text-yellow-600 transition-colors" />
        </div>
      </section>

      {/* --- DIRECTOR'S IDEOLOGY SECTION --- */}
      <section className="py-32 bg-white relative z-10 overflow-hidden border-y border-slate-100">
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-5 animate-float-slow hidden lg:block text-slate-900"><Landmark size={140} /></div>
        <div className="absolute bottom-20 right-10 opacity-5 animate-float-fast hidden lg:block text-slate-900"><Briefcase size={120} /></div>

        <div className="container-custom px-4 mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Director’s Ideology
            </h2>
            <div className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full opacity-80"></div>
          </div>
          
          {/* Quote Card (New Zoom Animation) */}
          <div className="animate-zoom-in delay-100 relative p-12 md:p-16 bg-slate-50 rounded-[3rem] border border-slate-200 text-center shadow-xl mb-20 hover:shadow-2xl transition-all duration-500 group">
             <div className="absolute top-10 left-10 text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors duration-500">
                <Quote size={64} />
             </div>
             
             <p className="relative z-10 text-2xl md:text-3xl text-slate-800 leading-relaxed font-serif italic font-medium">
                "When I stepped into the courtroom for the first time, I realized that law is not just about arguments—it is about responsibility. It is the very foundation of justice, governance, and structured organizational systems."
             </p>
          </div>

          {/* Narrative Text */}
          <div className="prose prose-xl mx-auto text-slate-600 space-y-8 text-justify md:text-center animate-fade-up delay-200 font-sans leading-loose">
            <p>
              Throughout my journey—both as an Advocate before the Madhya Pradesh High Court and as a corporate Chief Human Resources Officer—I have operated at the vital intersection of law, compliance, and strategic workforce governance.
            </p>
            <p className="text-slate-900 font-medium text-2xl">
              During this time, I observed a critical gap: education was largely theoretical, while the industry demanded practical, compliance-driven expertise. <span className="bg-yellow-100 px-2">Impact You Academy was born from this realization.</span>
            </p>
            <p>
              My ideology is rooted in the belief that true leadership requires more than just managing people; it requires building legally secure, highly ethical, and strategically sound organizations. Our mission is to transform compliance from a corporate burden into a core organizational strength.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORE COMMITMENTS (3 PILLARS) --- */}
      <section className="py-32 bg-slate-100 relative relative">
         {/* Subtle Pattern */}
         <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="container-custom px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Our Core Commitments
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              We do not just teach concepts. We build capability. We build confidence. We build careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {commitments.map((item, index) => (
              <div 
                key={index}
                style={{ animationDelay: `${index * 0.15}s` }}
                className="animate-fade-up card-hover group flex flex-col p-12 bg-white rounded-[2.5rem] border border-white shadow-md text-center items-center relative overflow-hidden"
              >
                {/* Subtle Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 via-yellow-50/30 to-yellow-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                    <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-yellow-100 transition-all duration-500 mx-auto border-2 border-slate-100 group-hover:border-yellow-200">
                      {item.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-yellow-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {item.description}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT THE DIRECTOR SECTION (UPDATED IMAGE BOX) --- */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
         {/* Background Accents (Rotating) */}
         <div className="absolute inset-0 animate-rotate-slow opacity-20 mix-blend-soft-light pointer-events-none">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-600 rounded-full blur-[150px]" />
             <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-700 rounded-full blur-[150px]" />
         </div>
         
        <div className="container-custom px-4 mx-auto max-w-7xl relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            
            {/* Left: Director Image (TALLER & ANIMATED) */}
            <div className="w-full lg:w-5/12 flex justify-center animate-fade-right">
              {/* Aspect Ratio Container for Portrait Look */}
              <div className="relative w-full max-w-md aspect-[4/5] group">
                
                {/* Decorative glowing border that moves on hover */}
                <div className="absolute inset-0 border-2 border-yellow-500/40 rounded-[3rem] translate-x-5 translate-y-5 animate-glow transition-transform duration-700 ease-out group-hover:translate-x-8 group-hover:translate-y-8"></div>
                
                {/* Actual Image Container */}
                <div className="absolute inset-0 rounded-[3rem] border-2 border-slate-700 overflow-hidden shadow-2xl z-10 bg-slate-900">
                    <img 
                      src="/doorva.jpg" 
                      alt="Doorva Juaria - Founder & Director" 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    {/* Subtle dark gradient at the bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80"></div>
                    
                    {/* Name Overlay */}
                    <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                        <h3 className="text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-lg">Doorva Juaria</h3>
                        <div className="inline-block bg-yellow-500/20 border border-yellow-500/30 px-4 py-1 rounded-full backdrop-blur-md">
                            <p className="text-yellow-300 text-xs uppercase tracking-[0.2em] font-bold">Founder & Director</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Content (Fades in from Left) */}
            <div className="w-full lg:w-7/12 text-left animate-fade-left delay-200">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-yellow-400 text-sm font-bold uppercase tracking-wider mb-10 backdrop-blur-md shadow-lg">
                <BookOpen size={16} /> Meet The Director
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-black mb-6 text-white tracking-tighter leading-none">
                Doorva <span className="text-yellow-500">Juaria</span>
              </h2>
              <h3 className="text-xl md:text-2xl text-yellow-100/90 mb-10 font-medium leading-relaxed border-l-4 border-yellow-500 pl-6">
                BBA LL.B (Hons.), LL.M (Criminal Law) <br />
                CHRO | Advocate, High Court of M.P.
              </h3>
              
              <div className="space-y-8 text-slate-300 leading-loose text-lg md:text-xl font-light">
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

              {/* Stats / Highlights - Interactive */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 border-t border-slate-800/50 pt-10">
                <div className="flex flex-col gap-3 p-4 rounded-2xl stat-hover">
                   <div className="p-3 bg-yellow-500/20 w-max rounded-xl mb-2"><Briefcase className="w-6 h-6 text-yellow-400" /></div>
                   <span className="text-xs text-slate-400 uppercase tracking-[0.15em] font-bold">Leadership</span>
                   <span className="text-lg font-bold text-white">Corporate CHRO</span>
                </div>
                <div className="flex flex-col gap-3 p-4 rounded-2xl stat-hover">
                   <div className="p-3 bg-yellow-500/20 w-max rounded-xl mb-2"><Gavel className="w-6 h-6 text-yellow-400" /></div>
                   <span className="text-xs text-slate-400 uppercase tracking-[0.15em] font-bold">Advocacy</span>
                   <span className="text-lg font-bold text-white">High Court Advocate</span>
                </div>
                <div className="flex flex-col gap-3 p-4 rounded-2xl stat-hover">
                   <div className="p-3 bg-yellow-500/20 w-max rounded-xl mb-2"><GraduationCap className="w-6 h-6 text-yellow-400" /></div>
                   <span className="text-xs text-slate-400 uppercase tracking-[0.15em] font-bold">Mentorship</span>
                   <span className="text-lg font-bold text-white">Academic Educator</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50/50 skew-y-3 transform origin-bottom-right z-0"></div>
        <div className="container-custom px-4 mx-auto max-w-4xl text-center animate-fade-up relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-lg shadow-yellow-500/30">
             <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
            Join the Next Generation of Leaders
          </h2>
          <p className="text-xl text-slate-600 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with us to discuss how our training programs can support your professional development in law and HR compliance.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="px-14 py-8 rounded-full bg-slate-900 text-white font-bold text-xl hover:bg-yellow-500 hover:text-slate-900 transition-all duration-500 shadow-2xl shadow-slate-900/20 hover:shadow-yellow-500/40 hover:-translate-y-2"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
