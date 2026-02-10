import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Target, Award, ArrowRight, ChevronRight, Star } from 'lucide-react';

export default function HomePage() {
  const valuePillars = [
    {
      icon: <CheckCircle2 className="w-8 h-8 text-yellow-600" />,
      title: 'Structured Curriculum',
      description: 'Systematic learning pathways designed by industry practitioners, covering end-to-end recruitment workflows.',
    },
    {
      icon: <Target className="w-8 h-8 text-yellow-600" />,
      title: 'Practical Exposure',
      description: 'Live hiring simulations, real-world sourcing assignments, and hands-on experience with recruitment tools.',
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      title: 'Professional Mentorship',
      description: 'Guidance from experienced recruitment professionals with expertise across diverse industries and hiring functions.',
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: 'Career Enablement',
      description: 'Professional profile development, interview preparation, and facilitation of opportunities.',
    },
  ];

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
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Gradients/Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-yellow-50 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-semibold mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New Cohort Starting Soon
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Staffing & Talent Acquisition <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Professional Training
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Industry-aligned programs designed to develop job-ready recruitment professionals through structured learning, live hiring exposure, and professional mentoring.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          <div className="mt-16 pt-8 border-t border-slate-100">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
              Trusted methodology based on industry standards
            </p>
            <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholders for logos if you have them, otherwise just icons */}
               <div className="flex items-center gap-2"><Target size={20} /><span className="font-bold text-lg">RecruitX</span></div>
               <div className="flex items-center gap-2"><Award size={20} /><span className="font-bold text-lg">StaffCertified</span></div>
               <div className="flex items-center gap-2"><Users size={20} /><span className="font-bold text-lg">TalentPro</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION --- */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Professional Development Framework
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A comprehensive approach to building recruitment expertise through systematic training and practical application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePillars.map((pillar, index) => (
              <div 
                key={index}
                className="group p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAMS SECTION --- */}
      <section className="py-24 bg-slate-50 relative">
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