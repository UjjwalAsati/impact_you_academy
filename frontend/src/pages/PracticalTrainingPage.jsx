import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Search, 
  Users, 
  ClipboardCheck, 
  FileCheck, 
  TrendingUp, 
  Award,
  Sparkles,
  ChevronDown,
  Monitor,
  Database,
  BarChart,
  MessageSquare
} from 'lucide-react';

export default function PracticalTrainingPage() {
  
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

  const practicalComponents = [
    {
      icon: <Search className="w-8 h-8 text-yellow-600" />,
      title: 'Live Hiring Simulations',
      description: 'Participate in real-world hiring scenarios with actual job requirements from various industries.',
      activities: [
        'Requirement analysis with simulated hiring managers',
        'End-to-end recruitment process execution',
        'Real-time decision making and problem solving',
        'Professional documentation and reporting',
      ],
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      title: 'Structured Sourcing Labs',
      description: 'Hands-on sourcing sessions using live requirements. Practice advanced search techniques.',
      activities: [
        'Boolean search practice with real profiles',
        'LinkedIn Recruiter navigation and usage',
        'Job board optimization and management',
        'Passive candidate research and mapping',
      ],
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-yellow-600" />,
      title: 'Interview Role Plays',
      description: 'Conduct mock screening and coordination exercises. Practice professional communication.',
      activities: [
        'Telephonic screening simulations',
        'Competency-based questioning practice',
        'Candidate evaluation and scoring',
        'Feedback documentation and presentation',
      ],
    },
    {
      icon: <FileCheck className="w-8 h-8 text-yellow-600" />,
      title: 'Offer Negotiation Scenarios',
      description: 'Navigate complex offer discussions and negotiation situations. Learn to balance expectations.',
      activities: [
        'Compensation benchmarking exercises',
        'Negotiation strategy development',
        'Objection handling practice',
        'Professional closure techniques',
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-yellow-600" />,
      title: 'Joining & Closure Tracking',
      description: 'Manage post-offer processes including documentation, verification, and joining coordination.',
      activities: [
        'Background verification coordination',
        'Joining formalities management',
        'New hire onboarding support',
        'Closure documentation and analytics',
      ],
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: 'Stakeholder Consulting',
      description: 'Develop consulting skills through simulated hiring manager interactions and influence.',
      activities: [
        'Intake meeting simulations',
        'Market mapping presentations',
        'Expectation management discussions',
        'Strategic hiring recommendations',
      ],
    },
  ];

  const practicalApproach = [
    {
      phase: 'Demonstration',
      description: 'Expert demonstration of techniques and workflows with detailed explanation of professional standards and best practices.',
    },
    {
      phase: 'Guided Practice',
      description: 'Supervised execution of tasks with real-time mentorship, feedback, and course correction to build accuracy and confidence.',
    },
    {
      phase: 'Independent Application',
      description: 'Autonomous completion of assignments with periodic review, allowing for skill consolidation and professional judgment development.',
    },
    {
      phase: 'Assessment & Feedback',
      description: 'Performance evaluation against professional standards with constructive feedback for continuous improvement.',
    },
  ];

  const tools = [
    {
      icon: <Monitor className="w-6 h-6 text-yellow-600" />,
      category: 'Sourcing Platforms',
      tools: ['LinkedIn Recruiter', 'Job Boards & Aggregators', 'Social Media Channels', 'Professional Networks'],
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-yellow-600" />,
      category: 'Assessment Tools',
      tools: ['Video Interviewing Platforms', 'Skill Assessment Systems', 'Background Verification', 'Candidate Evaluation Frameworks'],
    },
    {
      icon: <Database className="w-6 h-6 text-yellow-600" />,
      category: 'Recruitment Systems',
      tools: ['Applicant Tracking Systems (ATS)', 'Recruitment CRM', 'Documentation Systems', 'Workflow Management Tools'],
    },
    {
      icon: <BarChart className="w-6 h-6 text-yellow-600" />,
      category: 'Analytics & Reporting',
      tools: ['Recruitment Dashboards', 'Metrics Tracking', 'Performance Analytics', 'Reporting Templates'],
    },
  ];

  return (
    <div data-testid="practical-training-page" className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
      <style>{animationStyles}</style>

      {/* --- HERO SECTION (Full Screen Flex) --- */}
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
            <span>Experiential Learning</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Practical Training & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Real Application
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            Bridge the gap between theory and practice. Experience live recruitment scenarios, structured labs, and professional simulations.
          </p>

        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 animate-fade-up delay-300 flex flex-col items-center gap-2 opacity-50 animate-bounce mt-12 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">See How We Train</span>
          <ChevronDown className="text-slate-400" />
        </div>

      </section>

      {/* --- PRACTICAL COMPONENTS SECTION --- */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Training Components
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive hands-on training covering all critical aspects of recruitment operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practicalComponents.map((component, index) => (
              <div 
                key={index}
                className="group flex flex-col p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-100 transition-colors">
                  {component.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {component.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {component.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <ul className="space-y-3">
                    {component.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                        <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRAINING APPROACH SECTION --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container-custom px-4 mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Our Methodology
            </h2>
            <p className="text-lg text-slate-600">
              A progressive approach designed to build confidence and competence step-by-step.
            </p>
          </div>

          <div className="space-y-8">
            {practicalApproach.map((phase, index) => (
              <div 
                key={index}
                className="flex flex-col md:flex-row items-start gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-yellow-200 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white border-2 border-yellow-100 flex items-center justify-center text-xl font-bold text-yellow-600 shadow-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {phase.phase}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TOOLS & TECHNOLOGY SECTION --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[120px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-10 pointer-events-none" />

        <div className="container-custom px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Tools & Technology Exposure
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              We ensure you are day-one ready by training you on the actual tools used by top recruitment teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((item, index) => (
              <div key={index} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {item.category}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.tools.map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-black/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container-custom px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Experience it yourself
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Schedule a demo session to see our practical training methodology in action.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="px-10 py-6 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-yellow-500/20"
            >
              Schedule Program Demo
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}