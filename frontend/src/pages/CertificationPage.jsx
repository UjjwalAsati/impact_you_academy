import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  FileText, 
  Video, 
  Briefcase, 
  UserCheck, 
  TrendingUp, 
  Award,
  Sparkles,
  ChevronDown,
  ShieldAlert,
  GraduationCap,
  CheckCircle2
} from 'lucide-react';

export default function CertificationPage() {
  
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

  const certificationComponents = [
    {
      title: 'Program Completion Certificate',
      description: 'Awarded upon successful completion of all program modules, practical assignments, and assessments. Validates comprehensive training.',
      icon: <GraduationCap className="w-8 h-8 text-yellow-600" />
    },
    {
      title: 'Competency Assessment',
      description: 'Evaluation of practical skills through case studies, role plays, and work simulations. Demonstrates ability to execute independently.',
      icon: <CheckCircle2 className="w-8 h-8 text-yellow-600" />
    },
    {
      title: 'Industry Certification',
      description: 'Professional certification aligned with recruitment industry standards. Enhances credibility and career positioning.',
      icon: <Award className="w-8 h-8 text-yellow-600" />
    },
  ];

  const careerServices = [
    {
      icon: <FileText className="w-10 h-10 text-yellow-600" />,
      title: 'Profile Development',
      description: 'Structured guidance on creating effective recruitment-focused resumes and profiles.',
      components: [
        'Resume structuring for recruitment roles',
        'LinkedIn profile optimization',
        'Professional summary development',
        'Achievement and metrics presentation',
      ],
    },
    {
      icon: <Video className="w-10 h-10 text-yellow-600" />,
      title: 'Interview Preparation',
      description: 'Comprehensive preparation for recruitment interviews, including scenarios and competency questions.',
      components: [
        'Behavioral interview preparation',
        'Technical question practice',
        'Case study discussions',
        'Mock interview sessions with feedback',
      ],
    },
    {
      icon: <UserCheck className="w-10 h-10 text-yellow-600" />,
      title: 'Professional Branding',
      description: 'Strategic guidance on career positioning, networking, and brand development.',
      components: [
        'Career pathway identification',
        'Industry networking strategies',
        'Professional community engagement',
        'Continuous learning roadmap',
      ],
    },
    {
      icon: <Briefcase className="w-10 h-10 text-yellow-600" />,
      title: 'Opportunity Support',
      description: 'Connection to recruitment organizations and support in navigating the job market.',
      components: [
        'Industry network introductions',
        'Interview opportunity facilitation',
        'Internship program coordination',
        'Career guidance and counseling',
      ],
    },
  ];

  return (
    <div data-testid="certification-page" className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
      <style>{animationStyles}</style>

      {/* --- HERO SECTION (Full Screen Flex) --- */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-white pt-32 pb-10">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span>Career Enablement</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Get Certified & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Career Ready
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            Validate your expertise with industry-recognized certification and get the support you need to launch your career in Talent Acquisition.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 animate-fade-up delay-300 flex flex-col items-center gap-2 opacity-50 animate-bounce mt-12 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">See Certification Process</span>
          <ChevronDown className="text-slate-400" />
        </div>
      </section>

      {/* --- CERTIFICATION FRAMEWORK SECTION --- */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Certification Framework
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A rigorous assessment process ensuring you are ready for the professional world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificationComponents.map((component, index) => (
              <div 
                key={index}
                className="group flex flex-col p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 text-center items-center"
              >
                <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {component.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {component.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {component.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CAREER SERVICES SECTION --- */}
      <section className="py-24 bg-white relative">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Career Enablement Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We go beyond training to help you build your professional identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerServices.map((service, index) => (
              <div 
                key={index}
                className="flex flex-col p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-yellow-200 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-200">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.components.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                        <span className="text-sm text-slate-500 font-medium">{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUTCOMES STRIP --- */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="px-4 py-4">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Professional Certification</h3>
              <p className="text-slate-400 text-sm">Industry-recognized credential validating recruitment competency</p>
            </div>
            <div className="px-4 py-4">
              <TrendingUp className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Career-Ready Profile</h3>
              <p className="text-slate-400 text-sm">Optimized resume and professional positioning for recruitment roles</p>
            </div>
            <div className="px-4 py-4">
              <Briefcase className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Network Access</h3>
              <p className="text-slate-400 text-sm">Connection to recruitment organizations and professional community</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPORTANT NOTICE --- */}
      <section className="py-24 bg-white">
        <div className="container-custom px-4 mx-auto max-w-4xl">
          <div className="bg-yellow-50 border border-yellow-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 p-4 bg-yellow-100 rounded-full text-yellow-700">
              <ShieldAlert size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Important Notice Regarding Career Outcomes
              </h3>
              <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                <p>
                  Impact You Academy provides comprehensive training and career support. We facilitate connections and support preparation, but we <strong>do not guarantee</strong> employment outcomes.
                </p>
                <p>
                  Career success depends on individual performance, market conditions, and personal effort. Final hiring decisions rest solely with prospective employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container-custom px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Start Your Professional Journey
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Discuss your career objectives and learn how our programs can support your transition into the recruitment profession.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="px-10 py-6 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-yellow-500/20"
            >
              Schedule Career Consultation
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}