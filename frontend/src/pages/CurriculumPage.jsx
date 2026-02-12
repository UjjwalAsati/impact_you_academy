import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { 
  CheckCircle2, 
  Target, 
  Users, 
  BookOpen, 
  Download, 
  ChevronRight,
  Sparkles,
  GraduationCap,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export default function CurriculumPage() {
  const [activeCategory, setActiveCategory] = useState('Foundation Modules');

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

  const philosophyPrinciples = [
    {
      icon: <Target className="w-10 h-10 text-yellow-600" />,
      title: 'Workflow-Based Learning',
      description: 'Curriculum structured around actual recruitment workflows rather than theoretical concepts, ensuring practical applicability.',
    },
    {
      icon: <Users className="w-10 h-10 text-yellow-600" />,
      title: 'Industry-Practitioner Design',
      description: 'Content developed by active recruitment professionals with current market knowledge and practical experience.',
    },
    {
      icon: <BookOpen className="w-10 h-10 text-yellow-600" />,
      title: 'Progressive Skill Building',
      description: 'Systematic progression from fundamental concepts to advanced applications, building competency at each stage.',
    },
  ];

  const curriculumModules = [
    {
      category: 'Foundation Modules',
      description: 'Build the bedrock of your recruitment career with essential industry knowledge.',
      modules: [
        {
          title: 'Recruitment Fundamentals & Overview',
          topics: [
            'Role of recruitment in organizational success',
            'Recruitment vs. Talent Acquisition',
            'Key stakeholders in the hiring process',
            'Recruitment lifecycle and stages',
            'Industry landscape and career pathways',
          ],
        },
        {
          title: 'Job Analysis & Requirements',
          topics: [
            'Effective Job Description analysis',
            'Understanding role requirements',
            'Stakeholder intake meetings',
            'Identifying key selection criteria',
            'Market mapping & talent availability',
          ],
        },
        {
          title: 'Sourcing Strategies',
          topics: [
            'Sourcing channels and platforms',
            'Boolean search fundamentals',
            'LinkedIn Recruiter strategies',
            'Job board optimization',
            'Passive candidate engagement',
            'Referral program management',
          ],
        },
      ],
    },
    {
      category: 'Core Recruitment Modules',
      description: 'Master the day-to-day operations of managing candidates and interviews.',
      modules: [
        {
          title: 'Candidate Screening & Assessment',
          topics: [
            'Resume screening techniques',
            'Telephonic screening best practices',
            'Competency assessment',
            'Cultural fit evaluation',
            'Documentation and record keeping',
          ],
        },
        {
          title: 'Interview Management',
          topics: [
            'Scheduling and logistics',
            'Candidate preparation',
            'Panel coordination',
            'Feedback collection',
            'Candidate experience optimization',
          ],
        },
        {
          title: 'Relationship Management',
          topics: [
            'Professional communication standards',
            'Candidate pipelining',
            'Objection handling',
            'Managing expectations',
            'Long-term relationship building',
          ],
        },
      ],
    },
    {
      category: 'Advanced & Specialized',
      description: 'Elevate your expertise with high-level negotiation and analytics skills.',
      modules: [
        {
          title: 'Offer Management & Closure',
          topics: [
            'Compensation benchmarking',
            'Offer negotiation techniques',
            'Offer letter preparation',
            'Background verification',
            'Onboarding support',
          ],
        },
        {
          title: 'Recruitment Metrics & Analytics',
          topics: [
            'Key recruitment KPIs',
            'Time-to-fill & Cost-per-hire',
            'Quality of hire measurement',
            'Reporting dashboards',
            'Data-driven improvement',
          ],
        },
        {
          title: 'Stakeholder Consulting',
          topics: [
            'Hiring manager partnership',
            'Managing expectations',
            'Presenting market intelligence',
            'Handling conflicting priorities',
            'Influence and persuasion',
          ],
        },
        {
          title: 'Technology & Tools',
          topics: [
            'ATS overview',
            'Automation and AI tools',
            'Video interviewing platforms',
            'Assessment technologies',
            'Data privacy & security',
          ],
        },
      ],
    },
    {
      category: 'Professional Development',
      description: 'Prepare yourself for long-term success and ethical practice.',
      modules: [
        {
          title: 'Ethics & Compliance',
          topics: [
            'Ethical standards',
            'Confidentiality & data protection',
            'Equal opportunity',
            'Legal compliance',
            'Professional integrity',
          ],
        },
        {
          title: 'Career Development',
          topics: [
            'Career pathways in TA',
            'Building professional networks',
            'Continuous learning',
            'Personal branding',
            'Interview preparation',
          ],
        },
      ],
    },
  ];

  // Helper to get active module data
  const currentCategoryData = curriculumModules.find(c => c.category === activeCategory);

  return (
    <div data-testid="curriculum-page" className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
      <style>{animationStyles}</style>
      
      {/* --- HERO SECTION (Full Screen Flex) --- */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-white pt-32 pb-10">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-yellow-50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-float" />
            <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Main Content Centered */}
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span>Industry-Standard Syllabus</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Curriculum & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Methodology
            </span>
          </h1>

          <p className="animate-fade-up delay-300 text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We don't just teach theory. Our curriculum is engineered around <span className="font-semibold text-slate-900">real-world workflows</span>, transforming you from a student into a practitioner.
          </p>

        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 animate-fade-up delay-300 flex flex-col items-center gap-2 opacity-50 animate-bounce mt-12 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Explore Modules</span>
          <ChevronDown className="text-slate-400" />
        </div>
      </section>

      {/* --- PHILOSOPHY CARDS --- */}
      <section className="py-24 bg-white relative z-20 border-t border-slate-100">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyPrinciples.map((principle, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white border border-slate-100 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-100 transition-colors">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {principle.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE CURRICULUM --- */}
      <section className="py-24 bg-slate-50 relative" id="curriculum-content">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Explore the Syllabus
            </h2>
            <p className="text-slate-600 text-lg">Select a category below to view detailed modules.</p>
          </div>

          {/* 1. Tab Navigation */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {curriculumModules.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`
                    px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2
                    ${activeCategory === cat.category 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-yellow-400 hover:text-slate-900'}
                  `}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dynamic Content Area */}
          <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500 key={activeCategory}">
            
            {/* Category Description */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-3">
                <GraduationCap className="text-yellow-600" />
                {activeCategory}
              </h3>
              <p className="text-slate-500 mt-2 text-lg max-w-2xl mx-auto">{currentCategoryData?.description}</p>
            </div>

            {/* Grid Layout for Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentCategoryData?.modules.map((module, modIndex) => (
                <Accordion 
                  key={modIndex} 
                  type="single" 
                  collapsible 
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all duration-300 overflow-hidden"
                >
                  <AccordionItem value={`item-${modIndex}`} className="border-none">
                    <AccordionTrigger className="px-8 py-6 hover:bg-slate-50 hover:no-underline group">
                      <span className="text-left font-bold text-slate-800 text-lg group-hover:text-yellow-700 transition-colors">
                        {module.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="bg-slate-50/50 px-8 pb-8 pt-2">
                      <div className="space-y-4">
                        {module.topics.map((topic, tIndex) => (
                          <div key={tIndex} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" />
                            <span className="text-slate-600 text-sm leading-relaxed">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- LEARNING OUTCOMES --- */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />
        
        <div className="container-custom px-4 mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                The Result
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                What you will <br/>
                <span className="text-yellow-400">Master</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                By the end of this program, you won't just know about recruitment; you will have the confidence to execute the entire lifecycle independently.
              </p>
              
              <Link to="/contact">
                <button className="group relative px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-900 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.6)] transition-all duration-300 flex items-center gap-3 transform hover:-translate-y-1">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Full-cycle recruitment execution',
                'Advanced Sourcing (Boolean/X-Ray)',
                'Screening & Behavioral Profiling',
                'Stakeholder Management',
                'ATS & AI Tool Proficiency',
                'Data-Driven Decision Making',
                'Employment Law Compliance',
                'Professional Ethics Standards',
              ].map((outcome, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-200">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-gradient-to-br from-yellow-50 to-white">
        <div className="container-custom px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Ready to dive deeper?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Download the comprehensive program brochure with detailed session schedules, learning resources, and pricing.
          </p>
          <Link to="/contact">
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300">
              <Download className="w-5 h-5" />
              Download Full Brochure
              <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}