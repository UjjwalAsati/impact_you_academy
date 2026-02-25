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

  // --- INTERNAL ANIMATION STYLES (Upgraded) ---
  const animationStyles = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
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
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.2); }
      50% { box-shadow: 0 0 40px rgba(234, 179, 8, 0.4); }
    }

    .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
    .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
    .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
    .animate-glow { animation: pulse-glow 3s infinite ease-in-out; }
    
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }

    /* Premium Card Hover */
    .card-hover {
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card-hover:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px -15px rgba(234, 179, 8, 0.15);
      border-color: rgba(234, 179, 8, 0.3);
    }
  `;

  // Core Commitments Data
  const commitments = [
    {
      icon: <Scale className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform duration-500" />,
      title: 'Legal Clarity',
      description: 'Creating legally aware professionals who understand both corporate risk and statutory labor compliance.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform duration-500" />,
      title: 'Strategic Execution',
      description: 'Aligning human capital strategy with corporate governance to drive sustainable business growth.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform duration-500" />,
      title: 'Ethical Leadership',
      description: 'Training leaders who operate with integrity, structuring policies that protect both the workforce and the enterprise.',
    },
  ];

  return (
    <div data-testid="about-page" className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
      <style>{animationStyles}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-white pt-32 pb-10">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-3xl mix-blend-multiply animate-float-slow" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-50/80 rounded-full blur-3xl mix-blend-multiply animate-float-fast" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span>Law Meets Leadership</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Impact You Academy
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            Law with structure. HR with strategy. Leadership with integrity. <br/>
            We bridge the critical gap between theoretical education and industry compliance.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 animate-fade-up delay-400 flex flex-col items-center gap-2 opacity-50 animate-bounce mt-12 flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Our Ideology</span>
          <ChevronDown className="text-slate-400" />
        </div>
      </section>

      {/* --- DIRECTOR'S IDEOLOGY SECTION --- */}
      <section className="py-32 bg-white relative z-10 overflow-hidden border-y border-slate-100">
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-5 animate-float-slow hidden lg:block text-slate-900"><Landmark size={120} /></div>
        <div className="absolute bottom-20 right-10 opacity-5 animate-float-fast hidden lg:block text-slate-900"><Briefcase size={100} /></div>

        <div className="container-custom px-4 mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Director’s Ideology
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Quote Card */}
          <div className="animate-fade-up delay-100 relative p-10 md:p-14 bg-slate-50 rounded-[2rem] border border-slate-100 text-center shadow-lg mb-16 hover:shadow-xl transition-shadow">
             <div className="absolute top-8 left-8 text-yellow-200 opacity-50">
                <Quote size={48} />
             </div>
             
             <p className="relative z-10 text-xl md:text-2xl text-slate-700 leading-relaxed font-medium italic">
                "When I stepped into the courtroom for the first time, I realized that law is not just about arguments—it is about responsibility. It is the very foundation of justice, governance, and structured organizational systems."
             </p>
          </div>

          {/* Narrative Text */}
          <div className="prose prose-lg mx-auto text-slate-600 space-y-6 text-justify md:text-center animate-fade-up delay-200">
            <p>
              Throughout my journey—both as an Advocate before the Madhya Pradesh High Court and as a corporate Chief Human Resources Officer—I have operated at the vital intersection of law, compliance, and strategic workforce governance.
            </p>
            <p>
              During this time, I observed a critical gap in the professional landscape: <strong className="text-slate-900 font-bold">education was largely theoretical, while the corporate industry desperately demanded practical, compliance-driven expertise.</strong> Impact You Academy was born from this exact realization.
            </p>
            <p>
              My ideology is rooted in the belief that true leadership requires more than just managing people; it requires building legally secure, highly ethical, and strategically sound organizations. Our mission is to transform compliance from a corporate burden into a core organizational strength.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORE COMMITMENTS (3 PILLARS) --- */}
      <section className="py-32 bg-slate-50 relative">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Our Core Commitments
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We do not just teach concepts. We build capability. We build confidence. We build careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitments.map((item, index) => (
              <div 
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-up card-hover group flex flex-col p-10 bg-white rounded-[2rem] border border-slate-100 shadow-sm text-center items-center relative overflow-hidden"
              >
                {/* Subtle Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/0 to-yellow-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-yellow-50 group-hover:shadow-inner transition-all duration-300 mx-auto border border-slate-100">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-yellow-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {item.description}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT THE DIRECTOR SECTION --- */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
         {/* Background Accents */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[150px] opacity-10 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-10 pointer-events-none" />
         
        <div className="container-custom px-4 mx-auto max-w-6xl relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Director Image */}
            <div className="w-full lg:w-1/3 flex justify-center animate-fade-up">
              <div className="relative w-72 h-72 md:w-80 md:h-80 group">
                {/* Decorative glowing border */}
                <div className="absolute inset-0 border border-yellow-500/30 rounded-[2.5rem] translate-x-4 translate-y-4 animate-glow transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                
                {/* Actual Image Container */}
                <div className="absolute inset-0 rounded-[2.5rem] border border-slate-700 overflow-hidden shadow-2xl z-10">
                    <img 
                      src="/doorva.jpg" 
                      alt="Doorva Juaria - Founder & Director" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle dark gradient at the bottom for a premium look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90"></div>
                    
                    {/* Name Overlay (Appears over the image) */}
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                        <h3 className="text-xl font-bold text-white tracking-tight">Doorva Juaria</h3>
                        <p className="text-yellow-400 text-xs mt-1 uppercase tracking-widest font-medium">Founder & Director</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Content */}
            <div className="w-full lg:w-2/3 text-left animate-fade-up delay-100">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-8">
                <BookOpen size={14} /> Meet The Director
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-white tracking-tight">
                Doorva Juaria
              </h2>
              <h3 className="text-lg md:text-xl text-yellow-400 mb-8 font-medium leading-relaxed">
                BBA LL.B (Hons.), LL.M (Criminal Law) | CHRO | <br className="hidden md:block"/>
                Advocate, High Court of Madhya Pradesh
              </h3>
              
              <div className="space-y-6 text-slate-300 leading-relaxed text-base md:text-lg">
                <p>
                  Doorva Juaria embodies a sophisticated intersection of courtroom advocacy, corporate governance, and academic mentorship. With a foundational background in <span className="text-white font-semibold">BBA LL.B (Hons.)</span> and an <span className="text-white font-semibold">LL.M in Criminal Law</span>, complemented by specialized expertise in Cyber Law and Human Psychology, she offers a multi-dimensional perspective on modern organizational challenges.
                </p>
                <p>
                  As the current <span className="text-white font-semibold">Chief Human Resources Officer at Taskup Corporate Services Pvt. Ltd.</span> and a practicing <span className="text-white font-semibold">Advocate before the Madhya Pradesh High Court</span>, Doorva bridges the critical gap between statutory legal requirements and strategic workforce architecture. Her work is defined by a commitment to transforming compliance from a reactive necessity into a proactive competitive advantage.
                </p>
                <p>
                  Beyond the boardroom and the courtroom, Doorva is a dedicated educator. Her association with <span className="text-white font-semibold">Shri Vaishnav Vidyapeeth Vishwavidyalaya</span> underscores her mission to shape the next generation of industry-ready leaders through rigorous, law-integrated academic programs.
                </p>
              </div>

              {/* Stats / Highlights - Styled minimally */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 border-t border-slate-800 pt-8">
                <div className="flex flex-col gap-2">
                   <div className="p-2 bg-slate-800 w-max rounded-lg"><Briefcase className="w-5 h-5 text-yellow-500" /></div>
                   <span className="text-xs text-slate-400 uppercase tracking-wide font-bold">Leadership</span>
                   <span className="text-sm font-semibold text-white">Corporate CHRO</span>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="p-2 bg-slate-800 w-max rounded-lg"><Gavel className="w-5 h-5 text-yellow-500" /></div>
                   <span className="text-xs text-slate-400 uppercase tracking-wide font-bold">Advocacy</span>
                   <span className="text-sm font-semibold text-white">High Court Advocate</span>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="p-2 bg-slate-800 w-max rounded-lg"><GraduationCap className="w-5 h-5 text-yellow-500" /></div>
                   <span className="text-xs text-slate-400 uppercase tracking-wide font-bold">Mentorship</span>
                   <span className="text-sm font-semibold text-white">Academic Educator</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="container-custom px-4 mx-auto max-w-4xl text-center animate-fade-up">
          <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
             <TrendingUp className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Join the Next Generation of Leaders
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            Connect with us to discuss how our training programs can support your professional development in law and HR compliance.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="px-12 py-7 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-yellow-500/30 hover:-translate-y-1"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
