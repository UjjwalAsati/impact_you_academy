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
  Gavel
} from 'lucide-react';

export default function AboutPage() {

  // --- INTERNAL ANIMATION STYLES ---
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
    .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .animate-float { animation: float 3s ease-in-out infinite; }
  `;

  // Core Commitments Data
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
    <div data-testid="about-page" className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
      <style>{animationStyles}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-white pt-32 pb-10">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" style={{ animationDelay: '1.5s' }} />
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
        <div className="relative z-10 animate-fade-up delay-300 flex flex-col items-center gap-2 opacity-50 animate-bounce mt-12 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Our Ideology</span>
          <ChevronDown className="text-slate-400" />
        </div>
      </section>

      {/* --- DIRECTOR'S IDEOLOGY SECTION --- */}
      <section className="py-24 bg-white relative z-10">
        <div className="container-custom px-4 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Director’s Ideology
            </h2>
          </div>
          
          {/* Quote Card */}
          <div className="relative p-10 md:p-14 bg-slate-50 rounded-3xl border border-slate-100 text-center shadow-lg mb-16">
             <div className="absolute top-8 left-8 text-yellow-200 opacity-50">
                <Quote size={48} />
             </div>
             
             <p className="relative z-10 text-xl md:text-2xl text-slate-700 leading-relaxed font-medium italic">
                "When I stepped into the courtroom for the first time, I realized that law is not just about arguments—it is about responsibility. It is the very foundation of justice, governance, and structured organizational systems."
             </p>
          </div>

          {/* Narrative Text */}
          <div className="prose prose-lg mx-auto text-slate-600 space-y-6 text-justify md:text-center">
            <p>
              Throughout my journey—both as an Advocate before the Madhya Pradesh High Court and as a corporate Chief Human Resources Officer—I have operated at the vital intersection of law, compliance, and strategic workforce governance.
            </p>
            <p>
              During this time, I observed a critical gap in the professional landscape: <strong className="text-slate-900">education was largely theoretical, while the corporate industry desperately demanded practical, compliance-driven expertise.</strong> Impact You Academy was born from this exact realization.
            </p>
            <p>
              My ideology is rooted in the belief that true leadership requires more than just managing people; it requires building legally secure, highly ethical, and strategically sound organizations. Our mission is to transform compliance from a corporate burden into a core organizational strength.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORE COMMITMENTS (3 PILLARS) --- */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
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
                className="group flex flex-col p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-yellow-100/50 hover:-translate-y-2 transition-all duration-300 text-center items-center"
              >
                <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT THE DIRECTOR SECTION --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         {/* Background Accents */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[120px] opacity-10 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-10 pointer-events-none" />
         
        <div className="container-custom px-4 mx-auto max-w-6xl relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left: Image Placeholder / Visual */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                {/* Decorative borders */}
                <div className="absolute inset-0 border-2 border-yellow-500/30 rounded-[2rem] translate-x-4 translate-y-4"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] border border-slate-700 overflow-hidden flex items-center justify-center shadow-2xl">
                    {/* Placeholder for Director's Image */}
                    <div className="text-center p-6">
                        <div className="w-20 h-20 bg-yellow-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Gavel className="w-8 h-8 text-yellow-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Doorva Juaria</h3>
                        <p className="text-yellow-400 text-sm mt-2">Founder & Director</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-2/3 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold mb-6">
                About The Director
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                Doorva Juaria
              </h2>
              <h3 className="text-xl text-yellow-400 mb-6 font-medium">
                High Court Advocate | Chief Human Resources Officer
              </h3>
              
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p>
                  Doorva Juaria represents a rare blend of courtroom advocacy, corporate governance, and academic mentorship. She holds a <span className="text-white font-semibold">BBA LL.B (Hons.)</span> and an <span className="text-white font-semibold">LL.M in Criminal Law</span>, alongside specialized certifications in Cyber Law and Human Psychology.
                </p>
                <p>
                  Currently serving as <span className="text-white font-semibold">CHRO at Taskup Corporate Services Pvt. Ltd.</span> and practicing before the <span className="text-white font-semibold">Madhya Pradesh High Court</span>, she leads corporate legal advisory, labor compliance, and workforce strategy.
                </p>
                <p>
                  She is also academically associated with <span className="text-white font-semibold">Shri Vaishnav Vidyapeeth Vishwavidyalaya</span>, dedicating her expertise to legal education and industry-integrated academic programs.
                </p>
              </div>

              {/* Stats / Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10 border-t border-slate-800 pt-8">
                <div className="flex flex-col gap-1">
                   <Briefcase className="w-5 h-5 text-yellow-500 mb-2" />
                   <span className="text-xs text-slate-400 uppercase tracking-wide">Role</span>
                   <span className="text-sm font-semibold text-white">Corporate CHRO</span>
                </div>
                <div className="flex flex-col gap-1">
                   <Gavel className="w-5 h-5 text-yellow-500 mb-2" />
                   <span className="text-xs text-slate-400 uppercase tracking-wide">Practice</span>
                   <span className="text-sm font-semibold text-white">High Court Advocate</span>
                </div>
                <div className="flex flex-col gap-1">
                   <GraduationCap className="w-5 h-5 text-yellow-500 mb-2" />
                   <span className="text-xs text-slate-400 uppercase tracking-wide">Focus</span>
                   <span className="text-sm font-semibold text-white">Legal Education</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container-custom px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Join the Next Generation of Leaders
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Connect with us to discuss how our training programs can support your professional development in law and HR.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="px-10 py-6 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-yellow-500/20"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
