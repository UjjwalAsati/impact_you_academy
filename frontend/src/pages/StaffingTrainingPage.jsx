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
  IndianRupee,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function StaffingTrainingPage() {
  
  // State for the active modal
  const [selectedProgram, setSelectedProgram] = useState(null);
  // State for modal accordion
  const [openModuleIndex, setOpenModuleIndex] = useState(null);

  const toggleModule = (index) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

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
    
    /* Scrollbar for modal */
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `;

  // --- 1. DETAILED SYLLABUS DATA ---

  const syllabusIndustryReady = [
    { title: "M1: HR & Staffing Fundamentals", topics: ["Introduction to HR & Staffing", "Generalist vs Recruiter vs Consultant", "Hiring Types: Perm, Contract, Payroll", "Ethical Hiring Basics"] },
    { title: "M2: Recruitment Process (End-to-End)", topics: ["Step-by-Step Hiring Flow", "Reading JDs & Checklist Creation", "Must-Have vs Good-to-Have Skills", "Offer & Joining Process"] },
    { title: "M3: Candidate Sourcing Techniques", topics: ["Job Portals & LinkedIn Sourcing", "Boolean Search Basics", "Resume Filtering (Fake vs Genuine)", "Target: Source 20 profiles/day"] },
    { title: "M4: Screening & Communication", topics: ["Telephonic Screening Format", "Salary & Notice Period Discussion", "Professional Etiquette (Call/Email)", "Mock Screening Calls"] },
    { title: "M5: Interview Coordination", topics: ["Scheduling & Calendar Management", "Client & Candidate Coordination", "Feedback Follow-up", "Daily Hiring Reports (Trackers)"] },
    { title: "M6: Offer, Joining & Ops Basics", topics: ["Offer Process & Documents Checklist", "Joining Formalities", "Attendance & Payroll Overview", "Employee Life Cycle Basics"] },
    { title: "M7: Workplace Readiness", topics: ["Professional Attitude", "Time Management", "Handling Pressure & Targets", "Career Growth Guidance"] }
  ];

  const syllabusCSRP = [
    { title: "M1: Staffing Industry Overview", topics: ["Indian & Global Staffing Landscape", "Perm vs Contract vs Executive Search", "Recruiter Roles & Ecosystem"] },
    { title: "M2: End-to-End Recruitment", topics: ["JD Understanding & Manpower Requisition", "Sourcing to Interview Coordination", "Offer Management & Follow-up"] },
    { title: "M3: Sourcing Techniques", topics: ["Job Portals & Social Platforms", "Boolean Search & LinkedIn Sourcing", "Referrals & Bulk Hiring Methods"] },
    { title: "M4: Screening & Interview Skills", topics: ["Resume Analysis & Red Flags", "Telephonic Screening Techniques", "Candidate Evaluation & Feedback"] },
    { title: "M5: Client Handling", topics: ["Requirement Gathering", "SLA & TAT Management", "Expectation & Escalation Management", "Negotiation Skills"] },
    { title: "M6: Offer & Closure", topics: ["CTC Structure & Salary Negotiation", "Counter-Offer Handling", "Offer Rollout & Position Closure"] },
    { title: "M7: Compliance Basics", topics: ["Labour Law Overview", "PF, ESIC & Minimum Wages", "Payroll & BGV Basics"] },
    { title: "M8: HR Operations", topics: ["Onboarding & Documentation", "Attendance, Leave & Exit Processes", "HR MIS & Reporting"] },
    { title: "M9: Recruiter KPIs", topics: ["Productivity Metrics & Reporting", "Source Performance Analysis", "Targets & Incentive Structures"] },
    { title: "M10: Staffing Technology", topics: ["ATS & CRM Fundamentals", "Excel Tracking & Dashboards", "Hiring Automation Basics"] },
    { title: "M11: Professional Skills", topics: ["Email & Call Etiquette", "Time & Stress Management", "Ethics & Confidentiality"] },
    { title: "M12: Practical Training", topics: ["Live Sourcing Practice", "Mock Interviews & Role Plays", "Closure & Joining Tracking"] },
    { title: "M13: Special Hiring (Optional)", topics: ["IT & Non-IT Hiring", "Bulk, Campus & Niche Hiring"] },
    { title: "M14: Certification & Readiness", topics: ["Recruiter Resume Building", "Interview Preparation", "Final Assessment & Certification"] }
  ];

  const syllabusLabourLaw = [
    { title: "M1: HR & Labour Law Foundations", topics: ["Role of HR in Legal Compliance", "Employer & Employee Rights", "HR Legal Responsibilities"] },
    { title: "M2: Industrial & Employment Laws", topics: ["Industrial Disputes Act", "Termination, Layoff & Retrenchment", "Standing Orders & Trade Unions"] },
    { title: "M3: Payroll & Wage Compliance", topics: ["Minimum Wages Act", "Payment of Wages Act", "Bonus & Gratuity Laws", "Shops & Establishment Act"] },
    { title: "M4: Social Security Laws", topics: ["Provident Fund (EPF) - Practical Calculation", "ESI - Eligibility, Claims & Returns", "Labour Welfare Fund (LWF)"] },
    { title: "M5: Women & Workplace Safety", topics: ["POSH Act (Sexual Harassment)", "Maternity Benefit Act", "Equal Remuneration Act"] },
    { title: "M6: HR Documentation", topics: ["Appointment & Offer Letters", "HR Policies & Handbooks", "Warning & Termination Letters", "Compliance Registers"] },
    { title: "M7: Practical Compliance & Audit", topics: ["Labour Law Compliance Calendar", "Inspection Handling", "HR Audit & Risk Management", "Corporate Case Studies"] }
  ];

  // --- 2. PROGRAM PRODUCTS ---
  const programs = [
    {
      id: "industry-ready",
      title: "HR & Staffing Industry Ready",
      price: "₹2,999",
      duration: "1 Month",
      mode: "Alternate Days",
      target: "Freshers & Beginners",
      desc: "A practical, job-oriented program designed to make candidates industry-ready recruiters with live exposure.",
      idealFor: "Fresh Graduates, HR Interns, and Career Switchers looking for affordable, real-world exposure.",
      syllabus: syllabusIndustryReady,
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
      desc: "Our flagship 14-module certification covering the entire staffing lifecycle from sourcing to compliance.",
      idealFor: "Those seeking a recognized certification and deep operational knowledge.",
      syllabus: syllabusCSRP,
      popular: true, 
      color: "yellow"
    },
    {
      id: "labour-law",
      title: "Adv. Cert. in Labour Laws",
      price: "₹19,999",
      duration: "60 Days",
      mode: "Alternate Days",
      target: "HR Specialists",
      desc: "Advanced specialization in Payroll, Social Security, POSH, Industrial Relations and Audits.",
      idealFor: "HR Ops professionals and those wanting to master statutory compliance.",
      syllabus: syllabusLabourLaw,
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
            <p className="text-lg text-slate-600">Click on a card below to view the detailed syllabus and fee structure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {programs.map((item) => (
              <div 
                key={item.id}
                onClick={() => { setSelectedProgram(item); setOpenModuleIndex(null); }}
                className={`group relative p-8 rounded-3xl transition-all duration-500 cursor-pointer h-full flex flex-col justify-between ${
                  item.popular 
                  ? 'bg-white border-2 border-yellow-400 shadow-2xl shadow-yellow-500/10 scale-105 z-10' 
                  : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles size={12} fill="white" /> Best Seller
                  </div>
                )}
                
                {/* Card Content */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl flex-shrink-0 ${
                        item.color === 'blue' ? 'bg-blue-100 text-blue-700' : 
                        item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="text-right pl-2">
                      <span className="block text-2xl font-bold text-slate-900 whitespace-nowrap">{item.price}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      <span className="flex items-center gap-1"><Clock size={12} /> {item.duration}</span>
                      <span>•</span>
                      <span>{item.mode}</span>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-sm mb-6">{item.desc}</p>
                </div>
                
                {/* Card Footer Action */}
                <div>
                    <div className="w-full h-px bg-slate-100 mb-4"></div>
                    <div className={`flex items-center text-sm font-bold ${
                        item.color === 'blue' ? 'text-blue-600 group-hover:text-blue-700' : 
                        item.color === 'emerald' ? 'text-emerald-600 group-hover:text-emerald-700' : 
                        'text-yellow-600 group-hover:text-yellow-700'
                    }`}>
                       View Syllabus <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAM DETAIL MODAL (DYNAMIC SYLLABUS) --- */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedProgram(null)}
          ></div>

          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-modal flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 p-8 text-white relative flex-shrink-0">
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
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedProgram.title}</h3>
              <p className="text-slate-300 text-sm md:text-base">{selectedProgram.idealFor}</p>
            </div>

            {/* Modal Body (Scrollable Syllabus) */}
            <div className="p-0 overflow-y-auto custom-scrollbar bg-slate-50 flex-grow">
              
              <div className="p-8">
                <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 sticky top-0 bg-slate-50 z-10">
                   <BookOpen size={20} className="text-yellow-600" /> Complete Curriculum
                </h4>
                
                <div className="space-y-3">
                  {selectedProgram.syllabus.map((mod, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <button 
                        onClick={() => toggleModule(idx)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-bold text-slate-800 text-sm md:text-base">{mod.title}</span>
                        {openModuleIndex === idx ? <ChevronUp size={18} className="text-yellow-600 flex-shrink-0" /> : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />}
                      </button>
                      
                      {openModuleIndex === idx && (
                        <div className="px-4 pb-4 bg-slate-50/50 border-t border-slate-100">
                          <ul className="space-y-2 mt-3">
                            {mod.topics.map((topic, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-4 justify-between items-center flex-shrink-0">
              <div className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">Note:</span> Live classes + Recording access
              </div>
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-yellow-500/20">
                  Enroll in Batch
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- CSRP PREVIEW GRID (Static Preview for SEO/Visuals) --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block p-3 rounded-2xl bg-yellow-50 mb-4">
                <Target className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Why Our CSRP Certification?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A glimpse into the 14 modules that define our flagship Certified Staffing & Recruitment Professional program.
            </p>
          </div>

          {/* Simple Grid Preview of CSRP High-Level Modules */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {syllabusCSRP.slice(0, 8).map((mod, idx) => (
               <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-center hover:bg-white hover:shadow-md transition-all">
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{mod.title.split(":")[1] || mod.title}</h4>
                  <span className="text-xs text-slate-500">Module {idx + 1}</span>
               </div>
            ))}
             <div className="col-span-2 md:col-span-4 p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-slate-500 text-sm flex items-center justify-center">
                + 6 More Advanced Modules (Click "CSRP" above to view full syllabus)
             </div>
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
