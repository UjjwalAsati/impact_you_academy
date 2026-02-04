import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle2, Users, Target, Award, Briefcase } from 'lucide-react';

export default function HomePage() {
  const valuePillars = [
    {
      icon: <CheckCircle2 className="w-10 h-10 text-gold" />,
      title: 'Structured Curriculum',
      description: 'Systematic learning pathways designed by industry practitioners, covering end-to-end recruitment workflows and methodologies.',
    },
    {
      icon: <Target className="w-10 h-10 text-gold" />,
      title: 'Practical Exposure',
      description: 'Live hiring simulations, real-world sourcing assignments, and hands-on experience with recruitment tools and technologies.',
    },
    {
      icon: <Users className="w-10 h-10 text-gold" />,
      title: 'Professional Mentorship',
      description: 'Guidance from experienced recruitment professionals with expertise across diverse industries and hiring functions.',
    },
    {
      icon: <Award className="w-10 h-10 text-gold" />,
      title: 'Career Enablement',
      description: 'Professional profile development, interview preparation, and facilitation of opportunities with recruitment organizations.',
    },
  ];

  const programs = [
    {
      title: 'Recruiter Foundation Program',
      duration: '30 Days',
      audience: 'Graduates & Career Starters',
      description: 'Comprehensive introduction to recruitment fundamentals, sourcing strategies, candidate engagement, and hiring process management.',
      features: ['Full-cycle recruitment training', 'Sourcing lab sessions', 'Interview coordination', 'Candidate management'],
    },
    {
      title: 'Advanced Staffing & TA Program',
      duration: '45-60 Days',
      audience: 'HR Professionals & Recruiters',
      description: 'Advanced program covering strategic talent acquisition, staffing operations, vendor management, and recruitment analytics.',
      features: ['Strategic TA planning', 'Stakeholder management', 'Recruitment metrics', 'Process optimization'],
    },
    {
      title: 'Fast-Track Recruiter Certification',
      duration: '15 Days',
      audience: 'Experienced Professionals',
      description: 'Intensive certification program for professionals seeking to formalize recruitment expertise and enhance career positioning.',
      features: ['Accelerated curriculum', 'Industry best practices', 'Professional certification', 'Career counseling'],
    },
  ];

  return (
    <div data-testid="home-page" className="min-h-screen">
      {/* Hero Section */}
      <section data-testid="hero-section" className="bg-gradient-to-br from-slate-50 to-white py-24 lg:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy mb-6 heading-font leading-tight">
              Staffing & Talent Acquisition Professional Training
            </h1>
            <p className="text-lg sm:text-xl text-charcoal mb-12 leading-relaxed max-w-3xl mx-auto">
              Industry-aligned programs designed to develop job-ready recruitment professionals through structured learning, live hiring exposure, and professional mentoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <Button 
                  data-testid="cta-brochure-button"
                  size="lg" 
                  className="btn-primary text-base px-8 py-6"
                >
                  Request Program Brochure
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  data-testid="cta-advisor-button"
                  size="lg" 
                  variant="outline" 
                  className="btn-secondary text-base px-8 py-6"
                >
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section data-testid="value-proposition-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
              Our Professional Development Framework
            </h2>
            <p className="text-base text-charcoal max-w-2xl mx-auto">
              A comprehensive approach to building recruitment expertise through systematic training and practical application.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePillars.map((pillar, index) => (
              <Card 
                key={index} 
                data-testid={`value-pillar-${index}`}
                className="p-8 border-2 border-gray-100 card-hover bg-white"
              >
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-semibold text-navy mb-3 heading-font">
                  {pillar.title}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {pillar.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section data-testid="programs-overview-section" className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
              Professional Training Programs
            </h2>
            <p className="text-base text-charcoal max-w-2xl mx-auto">
              Structured pathways designed for different career stages and professional objectives in recruitment and talent acquisition.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card 
                key={index}
                data-testid={`program-card-${index}`}
                className="p-8 border-2 border-gray-200 card-hover bg-white"
              >
                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gold bg-opacity-10 text-gold font-semibold text-sm rounded mb-4">
                    {program.duration}
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-2 heading-font">
                    {program.title}
                  </h3>
                  <p className="text-sm text-steel-grey font-medium mb-4">
                    {program.audience}
                  </p>
                  <p className="text-sm text-charcoal leading-relaxed mb-6">
                    {program.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 size={18} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-charcoal">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/programs">
                  <Button 
                    data-testid={`view-program-button-${index}`}
                    variant="outline" 
                    className="w-full btn-secondary"
                  >
                    View Program Details
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section data-testid="cta-section" className="section-padding bg-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 heading-font">
              Begin Your Professional Journey
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Connect with our program advisors to discuss your career objectives and identify the most suitable training pathway.
            </p>
            <Link to="/contact">
              <Button 
                data-testid="cta-consultation-button"
                size="lg" 
                className="bg-gold text-navy hover:bg-gold hover:opacity-90 font-semibold px-8 py-6 text-base"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
