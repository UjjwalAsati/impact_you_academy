import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Users, 
  Target, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export default function HomePage() {
  
  // --- ANIMATION STYLES ---
  const animationStyles = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .animate-float { animation: float 3s ease-in-out infinite; }
  `;

  const programs = [
    {
      title: 'Recruiter Foundation Program',
      duration: '30 Days',
      audience: 'Graduates & Career Starters',
      description: 'Comprehensive introduction to recruitment fundamentals, sourcing strategies, and hiring process management.',
      features: ['Full-cycle recruitment training', 'Sourcing lab sessions', 'Interview coordination', 'Candidate management'],
      popular: false
    },
    {
      title: 'Advanced Staffing & TA Program',
      duration: '45-60 Days',
      audience: 'HR Professionals & Recruiters',
      description: 'Advanced program covering strategic talent acquisition, staffing operations, and recruitment analytics.',
      features: ['Strategic TA planning', 'Stakeholder management', 'Recruitment metrics', 'Process optimization'],
      popular: true // Highlight this card
    },
    {
      title: 'Fast-Track Recruiter Certification',
      duration: '15 Days',
      audience: 'Experienced Professionals',
      description: 'Intensive certification program for professionals seeking to formalize recruitment expertise.',
      features: ['Accelerated curriculum', 'Industry best practices', 'Professional certification', 'Career counseling'],
      popular: false
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-yellow-100">
      <style>{animationStyles}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Gradients/Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" />
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-yellow-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New Cohort Starting Soon
          </div>

          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Staffing & Talent Acquisition <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Professional Training
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-3xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Industry-aligned programs designed to develop job-ready recruitment professionals through structured learning, live hiring exposure, and professional mentoring.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <button className="px-8 py-4 bg-slate-900 text-white text-base font-bold rounded-full shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                Request Brochure
                <ChevronRight size={18} />
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 text-base font-bold rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                Speak to Advisor
              </button>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="animate-fade-up delay-300 mt-16 pt-8 border-t border-slate-100">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
              Trusted methodology based on industry standards
            </p>
            <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex items-center gap-2"><Target size={20} /><span className="font-bold text-lg">RecruitX</span></div>
               <div className="flex items-center gap-2"><Award size={20} /><span className="font-bold text-lg">StaffCertified</span></div>
               <div className="flex items-center gap-2"><Users size={20} /><span className="font-bold text-lg">TalentPro</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID VALUE PROPOSITION (UPDATED SECTION) --- */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Impact You Academy?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We've dismantled the traditional training model and rebuilt it for the modern recruitment landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Card Left */}
            <div className="md:col-span-2 row-span-1 group relative bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-10 -mt-10" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6">
                        <Zap size={28} />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Workflow-Based Learning</h3>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                            Forget dry theory. We simulate the exact chaos, pressure, and triumph of a real recruiter's desk. You learn by doing.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tall Card Right (WITH THE BAR CHART) */}
            <div className="md:col-span-1 row-span-2 group relative bg-slate-900 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden text-white flex flex-col justify-between">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 mb-6">
                        <TrendingUp size={28} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Career Acceleration</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Our graduates don't just get jobs; they get promoted faster. We teach the strategy behind the sourcing.
                    </p>
                </div>
                
                {/* Visual Graph Animation */}
                <div className="relative z-10 mt-8 h-32 flex items-end justify-between gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="w-full bg-slate-700 rounded-t-lg h-[40%] group-hover:h-[50%] transition-all duration-500"></div>
                    <div className="w-full bg-slate-600 rounded-t-lg h-[60%] group-hover:h-[70%] transition-all duration-700"></div>
                    <div className="w-full bg-slate-500 rounded-t-lg h-[50%] group-hover:h-[80%] transition-all duration-500"></div>
                    <div className="w-full bg-yellow-500 rounded-t-lg h-[70%] group-hover:h-[100%] transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
                </div>
            </div>

            {/* Small Card 1 */}
            <div className="md:col-span-1 row-span-1 group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-center">
                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Mentorship</h3>
                 <p className="text-slate-600 text-sm">Direct access to industry veterans who review your calls and emails.</p>
            </div>

            {/* Small Card 2 */}
            <div className="md:col-span-1 row-span-1 group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-center">
                 <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Global Standards</h3>
                 <p className="text-slate-600 text-sm">Curriculum updated quarterly to match global recruitment trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROGRAMS SECTION --- */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Professional Training Programs
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Structured pathways designed for different career stages and professional objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {programs.map((program, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-3xl transition-all duration-300 ${
                  program.popular 
                    ? 'bg-white shadow-2xl shadow-yellow-500/10 border-2 border-yellow-400 transform lg:-translate-y-4 z-10' 
                    : 'bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {program.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Star size={12} fill="currentColor" /> Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-yellow-50 text-yellow-700 font-semibold text-xs rounded-full mb-4 border border-yellow-100">
                    {program.duration}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mb-4 uppercase tracking-wide">
                    {program.audience}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                    {program.description}
                  </p>
                </div>

                <div className="h-px w-full bg-slate-100 mb-6" />

                <ul className="space-y-4 mb-8">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/programs" className="block">
                  <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    program.popular
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md hover:shadow-lg'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}>
                    View Details
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Begin Your Professional Journey
          </h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Connect with our program advisors to discuss your career objectives and identify the most suitable training pathway for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="px-8 py-4 bg-yellow-500 text-slate-900 text-base font-bold rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300">
                Schedule Consultation
              </button>
            </Link>
            <Link to="/programs">
                <button className="px-8 py-4 bg-transparent border border-slate-700 text-white text-base font-bold rounded-full hover:bg-slate-800 transition-all duration-300">
                  Explore Curriculum
                </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}