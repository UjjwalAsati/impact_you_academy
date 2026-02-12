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
  Download
} from 'lucide-react';

export default function StaffingTrainingPage() {
  
  // 1. Data Structure for the 14 Modules
  const modules = [
    {
      id: 1,
      title: "Staffing Industry Overview",
      icon: <Users className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Staffing & recruitment landscape (India & Global)",
        "Types: Permanent, Contract, Payroll, Executive Search",
        "Recruiter roles & hiring ecosystem"
      ]
    },
    {
      id: 2,
      title: "End-to-End Recruitment Process",
      icon: <Layout className="w-6 h-6 text-yellow-600" />,
      topics: [
        "JD understanding & manpower requisition",
        "Sourcing, screening & interview coordination",
        "Offer management, joining & follow-up"
      ]
    },
    {
      id: 3,
      title: "Sourcing Techniques",
      icon: <BookOpen className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Job portals & social platforms",
        "Boolean search & LinkedIn sourcing",
        "Referrals & bulk hiring methods"
      ]
    },
    {
      id: 4,
      title: "Screening & Interview Skills",
      icon: <Phone className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Resume analysis & telephonic screening",
        "Interview basics & red flag identification",
        "Candidate evaluation & feedback"
      ]
    },
    {
      id: 5,
      title: "Client Handling",
      icon: <Briefcase className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Requirement gathering & SLA/TAT",
        "Client communication & negotiation",
        "Expectation and escalation management"
      ]
    },
    {
      id: 6,
      title: "Offer & Closure",
      icon: <CheckCircle2 className="w-6 h-6 text-yellow-600" />,
      topics: [
        "CTC structure & salary negotiation",
        "Counter-offer handling",
        "Offer rollout & position closure"
      ]
    },
    {
      id: 7,
      title: "Compliance Basics",
      icon: <ShieldCheck className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Labour law overview",
        "PF, ESIC, minimum wages",
        "Payroll & BGV basics"
      ]
    },
    {
      id: 8,
      title: "HR Operations",
      icon: <Layout className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Onboarding & documentation",
        "Attendance, leave & exits",
        "HR MIS & reporting"
      ]
    },
    {
      id: 9,
      title: "Recruiter KPIs",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Productivity metrics & reports",
        "Source performance analysis",
        "Targets & incentives"
      ]
    },
    {
      id: 10,
      title: "Staffing Technology",
      icon: <BookOpen className="w-6 h-6 text-yellow-600" />,
      topics: [
        "ATS & CRM basics",
        "Excel tracking & dashboards",
        "Hiring automation"
      ]
    },
    {
      id: 11,
      title: "Professional Skills",
      icon: <Users className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Email & call etiquette",
        "Time & stress management",
        "Ethics & confidentiality"
      ]
    },
    {
      id: 12,
      title: "Practical Training",
      icon: <Briefcase className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Live requirements & sourcing",
        "Mock interviews & role plays",
        "Closure & joining tracking"
      ]
    },
    {
      id: 13,
      title: "Special Hiring (Optional)",
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      topics: [
        "IT & Non-IT hiring",
        "Bulk, campus & niche hiring"
      ]
    },
    {
      id: 14,
      title: "Certification & Placement",
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      topics: [
        "Recruiter resume & interview preparation",
        "Final assessment & certification",
        "Placement / internship support"
      ]
    }
  ];

  // 2. Duration Cards Data
  const durations = [
    {
      title: "Fast-Track",
      days: "15 Days",
      target: "Experienced Professionals",
      desc: "Intensive refresher and certification focus.",
      popular: false
    },
    {
      title: "Basic Program",
      days: "30 Days",
      target: "Graduates & Beginners",
      desc: "Foundation knowledge and core recruitment skills.",
      popular: false
    },
    {
      title: "Advanced Program",
      days: "45-60 Days",
      target: "Career Seekers",
      desc: "Comprehensive mastery with internship support.",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
        {/* Background Blobs (Consistent with Home) */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-yellow-50 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            <span>ISO Certified Curriculum</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Staffing & Manpower <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Training Syllabus
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
            A structured 14-module roadmap designed to transform you into a 360-degree recruitment professional, covering everything from sourcing to labor law compliance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="px-8 py-4 bg-slate-900 text-white text-base font-bold rounded-full shadow-lg hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300">
                Enroll Now
              </button>
            </Link>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 text-base font-bold rounded-full hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 justify-center">
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* --- DURATION OPTIONS --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Pace</h2>
            <p className="text-slate-600">Flexible learning durations tailored to your experience level.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {durations.map((item, idx) => (
              <div 
                key={idx}
                className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                  item.popular 
                  ? 'bg-white border-yellow-400 shadow-xl shadow-yellow-500/10 scale-105 z-10' 
                  : 'bg-white border-slate-100 shadow-sm hover:shadow-lg'
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Recommended
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-slate-900">{item.days}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-4">{item.target}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DETAILED SYLLABUS GRID --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive 14-Module Curriculum
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From fundamentals to advanced operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {modules.map((mod) => (
              <div 
                key={mod.id}
                className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-yellow-200 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                    {/* Using simple text for number if icon isn't preferred, or icon */}
                    <span className="font-bold text-lg">{mod.id}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {mod.title}
                    </h3>
                    <ul className="space-y-2">
                      {mod.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 group-hover:bg-yellow-400" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full blur-[80px] opacity-10" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Career in Staffing?
          </h2>
          <p className="text-slate-300 mb-10 text-lg">
            Join the next cohort and get certified in as little as 15 days.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact">
              <button className="px-8 py-4 bg-yellow-500 text-slate-900 font-bold rounded-full hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                Get Course Brochure
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}