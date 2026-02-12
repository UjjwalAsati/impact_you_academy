import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle2, 
  Briefcase, 
  Award, 
  Layout, 
  TrendingUp, 
  ShieldCheck, 
  Phone,
  ArrowRight,
  Download,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';

export default function StaffingTrainingPage() {
  
  // --- INTERNAL ANIMATION STYLES ---
  const animationStyles = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(0.95); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulse-glow 4s infinite ease-in-out; }
    
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }

    .card-hover-effect {
      transition: all 0.4s ease;
    }
    .card-hover-effect:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px -15px rgba(234, 179, 8, 0.15);
      border-color: rgba(234, 179, 8, 0.4);
    }
  `;

  // --- DATA ---
  const modules = [
    { id: 1, title: "Staffing Industry Overview", icon: <Users />, topics: ["Staffing & recruitment landscape", "Permanent vs Contract", "Hiring ecosystem"] },
    { id: 2, title: "End-to-End Process", icon: <Layout />, topics: ["JD understanding", "Screening & Coordination", "Offer to Joining"] },
    { id: 3, title: "Sourcing Techniques", icon: <Target />, topics: ["Boolean & X-Ray Search", "LinkedIn Recruiter", "Passive Candidate Engagement"] },
    { id: 4, title: "Screening & Interviews", icon: <Phone />, topics: ["Resume Analysis", "Red Flag Identification", "Competency Mapping"] },
    { id: 5, title: "Client Handling", icon: <Briefcase />, topics: ["SLA & TAT Management", "Negotiation Skills", "Escalation Matrices"] },
    { id: 6, title: "Offer & Closure", icon: <CheckCircle2 />, topics: ["Salary Negotiation", "Counter-Offer Mgmt", "Closure Strategies"] },
    { id: 7, title: "Compliance Basics", icon: <ShieldCheck />, topics: ["Labour Laws (PF/ESIC)", "Minimum Wages Act", "BGV Protocols"] },
    { id: 8, title: "HR Operations", icon: <Layout />, topics: ["Onboarding Documentation", "Leave & Attendance", "Exit Formalities"] },
    { id: 9, title: "Recruiter KPIs", icon: <TrendingUp />, topics: ["Productivity Metrics", "Funnel Ratios", "Source Quality Analysis"] },
    { id: 10, title: "Staffing Technology", icon: <Zap />, topics: ["ATS Mastery", "CRM Workflows", "AI Tools in Hiring"] },
    { id: 11, title: "Professional Skills", icon: <Users />, topics: ["Email Etiquette", "Time Management", "Confidentiality"] },
    { id: 12, title: "Practical Training", icon: <Briefcase />, topics: ["Live Project Sourcing", "Role Plays", "Mock Interviews"] },
    { id: 13, title: "Special Hiring", icon: <Award />, topics: ["Niche Skills (IT/Non-IT)", "Campus & Bulk Hiring", "Executive Search"] },
    { id: 14, title: "Certification", icon: <Award />, topics: ["Final Assessment", "Resume Building", "Placement Support"] }
  ];

  const durations = [
    {
      title: "Fast-Track",
      days: "15 Days",
      target: "Experienced Professionals",
      desc: "Intensive refresher and certification focus for working recruiters.",
      popular: false
    },
    {
      title: "Advanced Program",
      days: "45-60 Days",
      target: "Career Seekers",
      desc: "Comprehensive mastery with internship support and placement assistance.",
      popular: true
    },
    {
      title: "Basic Program",
      days: "30 Days",
      target: "Graduates & Beginners",
      desc: "Foundation knowledge and core recruitment skills to start your journey.",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100 selection:text-slate-900">
      <style>{animationStyles}</style>
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-yellow-100 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-8 shadow-lg shadow-slate-900/10">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>ISO Certified Curriculum</span>
          </div>
          
          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Staffing & Manpower <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Training Syllabus
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
            A structured <span className="font-bold text-slate-900">14-module roadmap</span> designed to transform you into a 360-degree recruitment professional, covering everything from sourcing to labor law compliance.
          </p>

          <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <button className="group relative px-8 py-4 bg-slate-900 text-white text-base font-bold rounded-full shadow-xl hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">Enroll Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </button>
            </Link>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 text-base font-bold rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md">
              <Download size={18} className="text-yellow-600" />
              Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* --- DURATION OPTIONS --- */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Pace</h2>
            <p className="text-lg text-slate-600">Flexible learning durations tailored to your experience level.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {durations.map((item, idx) => (
              <div 
                key={idx}
                className={`group relative p-8 rounded-3xl transition-all duration-500 ${
                  item.popular 
                  ? 'bg-white border-2 border-yellow-400 shadow-2xl shadow-yellow-500/10 scale-105 z-10' 
                  : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles size={12} fill="white" /> Most Recommended
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl ${item.popular ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'}`}>
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-slate-900">{item.days}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.target}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-6">{item.desc}</p>
                
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.popular ? 'bg-yellow-500 w-3/4' : 'bg-slate-300 w-1/2'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DETAILED SYLLABUS GRID --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block p-3 rounded-2xl bg-yellow-50 mb-4">
                <BookOpen className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Comprehensive Curriculum
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We cover the entire recruitment lifecycle across 14 intensive modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {modules.map((mod, idx) => (
              <div 
                key={mod.id}
                className="card-hover-effect group p-6 bg-white rounded-2xl border border-slate-100 relative overflow-hidden"
              >
                {/* Number Watermark */}
                <div className="absolute -right-4 -top-4 text-9xl font-bold text-slate-50 opacity-50 group-hover:text-yellow-50 transition-colors duration-500 pointer-events-none select-none">
                  {mod.id}
                </div>

                <div className="relative z-10 flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300 shadow-sm">
                    <div className="text-yellow-600 group-hover:text-yellow-400 transition-colors">
                        {React.cloneElement(mod.icon, { size: 24 })}
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-yellow-600 transition-colors">
                      {mod.title}
                    </h3>
                    <div className="space-y-3">
                      {mod.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-yellow-500 transition-colors" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] opacity-10 pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-10 pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Ready to Start Your Career?
          </h2>
          <p className="text-slate-300 mb-10 text-xl max-w-2xl mx-auto">
            Join the next cohort and get certified in as little as 15 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="w-full sm:w-auto px-10 py-5 bg-yellow-500 text-slate-900 text-lg font-bold rounded-full hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                Get Course Brochure
              </button>
            </Link>
            <Link to="/contact">
                <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-slate-700 text-white text-lg font-bold rounded-full hover:bg-slate-800 transition-all duration-300">
                    Book Free Counseling
                </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
