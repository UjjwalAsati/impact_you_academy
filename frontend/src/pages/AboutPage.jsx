import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Target, 
  Shield, 
  Users, 
  Award, 
  Sparkles, 
  ChevronDown,
  BookOpen,
  UserCheck,
  Briefcase,
  Compass
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

  const values = [
    {
      icon: <Target className="w-8 h-8 text-yellow-600" />,
      title: 'Professional Excellence',
      description: 'Commitment to delivering industry-standard training that prepares professionals for real-world recruitment challenges.',
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-600" />,
      title: 'Ethics & Integrity',
      description: 'Emphasis on professional ethics, compliance standards, and responsible recruitment practices in all operations.',
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      title: 'Practical Learning',
      description: 'Focus on experiential training and hands-on application, ensuring participants develop job-ready competencies.',
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: 'Continuous Development',
      description: 'Support for ongoing professional growth and adaptation to evolving recruitment practices and technologies.',
    },
  ];

  const approach = [
    {
      icon: <BookOpen className="w-6 h-6 text-yellow-600" />,
      title: 'Industry-Aligned Curriculum',
      description: 'Programs designed in consultation with recruitment professionals and aligned with current industry practices.',
    },
    {
      icon: <UserCheck className="w-6 h-6 text-yellow-600" />,
      title: 'Practitioner-Led Training',
      description: 'Instruction and mentorship from experienced recruitment professionals with active industry engagement.',
    },
    {
      icon: <Briefcase className="w-6 h-6 text-yellow-600" />,
      title: 'Competency-Based Assessment',
      description: 'Evaluation focused on practical ability to execute recruitment functions rather than theoretical knowledge.',
    },
    {
      icon: <Compass className="w-6 h-6 text-yellow-600" />,
      title: 'Career Support Framework',
      description: 'Structured career enablement services supporting professional transition and establishment in the industry.',
    },
  ];

  return (
    <div data-testid="about-page" className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-100">
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
            <span>Our Story & Mission</span>
          </div>

          <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Impact You Academy
            </span>
          </h1>

          <p className="animate-fade-up delay-300 max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            A professional training institution dedicated to developing competent recruitment professionals through structured learning, practical application, and industry-aligned certification.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 animate-fade-up delay-300 flex flex-col items-center gap-2 opacity-50 animate-bounce mt-12 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Discover Our Values</span>
          <ChevronDown className="text-slate-400" />
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="py-24 bg-white relative z-10">
        <div className="container-custom px-4 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>
          </div>
          <div className="relative p-10 md:p-14 bg-slate-50 rounded-3xl border border-slate-100 text-center shadow-lg">
             {/* Decorative Quotes */}
             <div className="absolute top-8 left-8 text-6xl text-yellow-200 font-serif opacity-50">“</div>
             <div className="absolute bottom-8 right-8 text-6xl text-yellow-200 font-serif opacity-50 rotate-180">“</div>
             
             <p className="relative z-10 text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                To develop job-ready recruitment professionals through systematic training, practical exposure, and professional mentorship. We aim to bridge the gap between academic education and industry requirements.
             </p>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide our training methodology and professional standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group flex flex-col p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 text-center items-center"
              >
                <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-100 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- APPROACH SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Our Training Approach
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Distinctive methodology that ensures practical competency development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approach.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-yellow-200 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GOVERNANCE SECTION --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         {/* Background Accents */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[120px] opacity-10 pointer-events-none" />
         
        <div className="container-custom px-4 mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Professional Standards & Governance
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              We adhere to strict quality and ethical guidelines to ensure the highest standard of training.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Training Quality Standards</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    All programs are designed and reviewed by experienced recruitment professionals. Curriculum is regularly updated to reflect current industry practices.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Professional Ethics</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Training emphasizes ethical recruitment practices, candidate dignity, and compliance with employment laws.
                  </p>
                </div>
            </div>
            <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Data Protection</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Strict protocols for handling candidate information and organizational data. All training incorporates data protection requirements.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Continuous Improvement</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Regular program evaluation, participant feedback integration, and industry consultation to ensure ongoing relevance.
                  </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container-custom px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Ready to Learn More?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Connect with our team to discuss how our training programs can support your professional development.
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