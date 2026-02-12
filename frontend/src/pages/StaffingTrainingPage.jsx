import React, { useState } from 'react';
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
  Target,
  X,
  Calendar,
  IndianRupee
} from 'lucide-react';

export default function StaffingTrainingPage() {
  
  // State for the active modal
  const [selectedProgram, setSelectedProgram] = useState(null);

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
    @keyframes modal-pop {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    
    .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-modal { animation: modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
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

  // --- 1. REAL CURRICULUM DATA (Based on CSRP PDF) ---
  const modules = [
    { id: 1, title: "Staffing Industry Overview", icon: <Users />, topics: ["Indian & Global Landscape", "Perm vs Contract vs Payroll", "Recruiter Ecosystem"] },
    { id: 2, title: "End-to-End Recruitment", icon: <Layout />, topics: ["JD & Manpower Requisition", "Sourcing to Joining", "Post-Joining Follow-up"] },
    { id: 3, title: "Sourcing Techniques", icon: <Target />, topics: ["Boolean & LinkedIn Sourcing", "Job Portals Mastery", "Bulk Hiring Methods"] },
    { id: 4, title: "Screening & Interview Skills", icon: <Phone />, topics: ["Resume Analysis & Red Flags", "Telephonic Screening", "Candidate Evaluation"] },
    { id: 5, title: "Client Handling", icon: <Briefcase />, topics: ["SLA & TAT Management", "Negotiation & Escalation", "Requirement Gathering"] },
    { id: 6, title: "Offer & Closure", icon: <CheckCircle2 />, topics: ["CTC Structure & Negotiation", "Counter-Offer Handling", "Offer Rollout"] },
    { id: 7, title: "Compliance Basics", icon: <ShieldCheck />, topics: ["Labour Laws (PF/ESIC)", "Minimum Wages", "Payroll Basics"] },
    { id: 8, title: "HR Operations", icon: <Layout />, topics: ["Onboarding Documentation", "Leave & Attendance", "HR MIS & Reporting"] },
    { id: 9, title: "Recruiter KPIs", icon: <TrendingUp />, topics: ["Productivity Metrics", "Source Performance", "Incentive Structures"] },
    { id: 10, title: "Staffing Technology", icon: <Zap />, topics: ["ATS & CRM Fundamentals", "Excel Dashboards", "Hiring Automation"] },
    { id: 11, title: "Professional Skills", icon: <Users />, topics: ["Email & Call Etiquette", "Time & Stress Mgmt", "Ethics & Confidentiality"] },
    { id: 12, title: "Practical Training", icon: <Briefcase />, topics: ["Live Sourcing Practice", "Mock Interviews", "Role Plays"] },
    { id: 13, title: "Special Hiring", icon: <Award />, topics: ["IT & Non-IT Hiring", "Campus & Niche Hiring", "Executive Search"] },
    { id: 14, title: "Certification & Readiness", icon: <Award />, topics: ["Resume Building", "Final Assessment", "Placement Support"] }
  ];

  // --- 2. REAL PROGRAM PRODUCTS (Based on PDFs) ---
  const programs = [
    {
      id: "industry-ready",
      title: "HR & Staffing Industry Ready",
      price: "₹2,999",
      duration: "1 Month",
      mode: "Alternate Days",
      target: "Freshers & Beginners",
      desc: "A practical, job-oriented program designed to make candidates industry-ready Recruiters.",
      features: [
        "Real Recruitment Processes",
        "Live Sourcing Assignments",
        "Telephonic Screening Practice",
        "Interview Coordination"
      ],
      idealFor: "Fresh Graduates, HR Interns, and Career Switchers looking for affordable, real-world exposure.",
      popular: false,
      color: "blue"
    },
    {
      id: "csrp",
      title: "Certified Staffing Professional (CSRP)",
      price: "₹7,999",
      duration: "30 Days",
      mode: "Alternate Batch",
      target: "Aspiring Professionals",
      desc: "Comprehensive 14-module certification covering the entire staffing lifecycle from sourcing to compliance.",
      features: [
        "Full 14-Module Curriculum",
        "Client Handling & KPIs",
        "Staffing Technology (ATS/CRM)",
        "Placement Support"
      ],
      idealFor: "Those seeking a recognized certification and deep operational knowledge.",
      popular: true, // This is the core offering
      color: "yellow"
    },
    {
      id: "labour-law",
      title: "Adv. Cert. in Labour Laws",
      price: "₹19,999",
      duration: "60 Days",
      mode: "Alternate Days",
      target: "HR Specialists",
      desc: "Advanced specialization in Payroll, Social Security, POSH, and Industrial Relations.",
      features: [
        "PF, ESI, Gratuity Calculations",
        "Legal Drafting & Policies",
        "HR Audit & Risk Mgmt",
        "Workplace Safety Laws"
      ],
      idealFor: "HR Ops professionals and those wanting to master statutory compliance.",
      popular: false,
      color: "emerald"
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
            <span>Job-Oriented Certification</span>
          </div>
          
          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Staffing & HR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Training Programs
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
             From foundational recruitment skills to advanced labour law compliance. Choose the path that fits your career goals.
          </p>

          <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <button className="group relative px-8 py-4 bg-slate-900 text-white text-base font-bold rounded-full shadow-xl hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">Explore Batches <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
              </button>
            </Link>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 text-base font-bold rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md">
              <Download size={18} className="text-yellow-600" />
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* --- PROGRAM OPTIONS (INTERACTIVE) --- */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Select Your Program</h2>
            <p className="text-lg text-slate-600">Click on a card to view detailed deliverables, fees, and schedule.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {programs.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedProgram(item)}
                className={`group relative p-8 rounded-3xl transition-all duration-500 cursor-pointer h-full flex flex-col ${
                  item.popular 
                  ? 'bg-white border-2 border-yellow-400 shadow-2xl shadow-yellow-500/10 scale-105 z-10' 
                  : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles size={12} fill="white" /> Most Popular
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl ${
                      item.color === 'blue' ? 'bg-blue-100 text-blue-700' : 
                      item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-slate-900">{item.price}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    <Clock size={12} /> {item.duration} • {item.mode}
                </div>
                
                <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-grow">{item.desc}</p>
                
                <div className="w-full h-px bg-slate-100 mb-4"></div>

                <div className={`flex items-center text-sm font-bold ${
                    item.color === 'blue' ? 'text-blue-600 group-hover:text-blue-700' : 
                    item.color === 'emerald' ? 'text-emerald-600 group-hover:text-emerald-700' : 
                    'text-yellow-600 group-hover:text-yellow-700'
                }`}>
                   View Syllabus <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAM DETAIL MODAL --- */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedProgram(null)}
          ></div>

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-modal flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 p-8 text-white relative">
              <button 
                onClick={() => setSelectedProgram(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex gap-3 mb-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase">
                    <Calendar size={12} /> {selectedProgram.duration}
                 </div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase">
                    <IndianRupee size={12} /> {selectedProgram.price}
                 </div>
              </div>
              <h3 className="text-3xl font-bold mb-2">{selectedProgram.title}</h3>
              <p className="text-slate-300">{selectedProgram.mode}</p>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto">
              <div className="mb-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <Target size={20} className="text-yellow-600" /> Who is this for?
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedProgram.idealFor}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <CheckCircle2 size={20} className="text-yellow-600" /> Key Features
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {selectedProgram.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-slate-500">
                Next batch filling fast
              </div>
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-yellow-500/20">
                  Enroll in this Program
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- DETAILED SYLLABUS GRID (CSRP Focus) --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block p-3 rounded-2xl bg-yellow-50 mb-4">
                <BookOpen className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              CSRP Curriculum Breakdown
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our flagship 14-module syllabus that covers the entire recruitment lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {modules.map((mod) => (
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-10 pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Ready to Start Your Career?
          </h2>
          <p className="text-slate-300 mb-10 text-xl max-w-2xl mx-auto">
            Join the next cohort and get certified.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="w-full sm:w-auto px-10 py-5 bg-yellow-500 text-slate-900 text-lg font-bold rounded-full hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                Get Brochure
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
