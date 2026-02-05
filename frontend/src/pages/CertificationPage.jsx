import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { FileText, Video, Briefcase, UserCheck, TrendingUp, Award } from 'lucide-react';

export default function CertificationPage() {
  const careerServices = [
    {
      icon: <FileText className="w-10 h-10 text-gold" />,
      title: 'Professional Profile Development',
      description: 'Structured guidance on creating effective recruitment-focused resumes and professional profiles that align with industry standards.',
      components: [
        'Resume structuring for recruitment roles',
        'LinkedIn profile optimization',
        'Professional summary development',
        'Achievement and metrics presentation',
      ],
    },
    {
      icon: <Video className="w-10 h-10 text-gold" />,
      title: 'Interview Preparation',
      description: 'Comprehensive preparation for recruitment role interviews, including common scenarios, competency questions, and professional presentation.',
      components: [
        'Behavioral interview preparation',
        'Technical question practice',
        'Case study and scenario discussions',
        'Mock interview sessions with feedback',
      ],
    },
    {
      icon: <UserCheck className="w-10 h-10 text-gold" />,
      title: 'Professional Positioning',
      description: 'Strategic guidance on career positioning, industry networking, and professional brand development in the recruitment sector.',
      components: [
        'Career pathway identification',
        'Industry networking strategies',
        'Professional community engagement',
        'Continuous learning roadmap',
      ],
    },
    {
      icon: <Briefcase className="w-10 h-10 text-gold" />,
      title: 'Opportunity Facilitation',
      description: 'Connection to recruitment organizations seeking trained professionals. Support in navigating the job market and interview processes.',
      components: [
        'Industry network introductions',
        'Interview opportunity facilitation',
        'Internship program coordination',
        'Career guidance and counseling',
      ],
    },
  ];

  const certificationComponents = [
    {
      title: 'Program Completion Certificate',
      description: 'Awarded upon successful completion of all program modules, practical assignments, and assessments. Validates comprehensive training in recruitment fundamentals.',
    },
    {
      title: 'Professional Competency Assessment',
      description: 'Evaluation of practical skills through case studies, role plays, and work simulations. Demonstrates ability to execute recruitment functions independently.',
    },
    {
      title: 'Industry-Recognized Certification',
      description: 'Professional certification aligned with recruitment industry standards. Enhances credibility and career positioning in the talent acquisition field.',
    },
  ];

  const outcomes = [
    {
      icon: <Award className="w-8 h-8 text-gold" />,
      title: 'Professional Certification',
      description: 'Industry-recognized credential validating recruitment competency',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-gold" />,
      title: 'Career-Ready Profile',
      description: 'Optimized resume and professional positioning for recruitment roles',
    },
    {
      icon: <Briefcase className="w-8 h-8 text-gold" />,
      title: 'Network Access',
      description: 'Connection to recruitment organizations and professional community',
    },
  ];

  return (
    <div data-testid="certification-page" className="min-h-screen">
      {/* Header Section */}
      <section data-testid="certification-header" className="bg-gradient-to-br from-slate-50 to-white py-24 lg:py-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6 heading-font">
              Certification & Career Enablement
            </h1>
            <p className="text-lg text-charcoal leading-relaxed">
              Comprehensive support for professional certification and career transition into recruitment roles. Our career enablement framework prepares participants for successful entry into the talent acquisition profession.
            </p>
          </div>
        </div>
      </section>

      {/* Certification Components Section */}
      <section data-testid="certification-components-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
              Certification Framework
            </h2>
            <p className="text-base text-charcoal max-w-2xl mx-auto">
              Multi-dimensional assessment and certification process validating both knowledge and practical competency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificationComponents.map((component, index) => (
              <Card 
                key={index}
                data-testid={`certification-component-${index}`}
                className="p-8 border-2 border-gray-200 card-hover bg-white"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold bg-opacity-20 mb-4">
                  <Award className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3 heading-font">
                  {component.title}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {component.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Services Section */}
      <section data-testid="career-services-section" className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
              Career Enablement Services
            </h2>
            <p className="text-base text-charcoal max-w-2xl mx-auto">
              Structured support for professional transition and career establishment in the recruitment industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerServices.map((service, index) => (
              <Card 
                key={index}
                data-testid={`career-service-${index}`}
                className="p-8 border-2 border-gray-200 card-hover bg-white"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-navy mb-3 heading-font">
                  {service.title}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.components.map((component, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span className="text-xs text-charcoal">{component}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice Section */}
      <section data-testid="notice-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 border-l-4 border-gold bg-slate-50">
              <h3 className="text-xl font-semibold text-navy mb-4 heading-font">
                Important Notice Regarding Career Outcomes
              </h3>
              <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                <p>
                  Impact You Academy provides comprehensive training, professional certification, and career support services. We facilitate connections with recruitment organizations and support interview preparation.
                </p>
                <p>
                  However, we do not guarantee employment outcomes or placement in specific organizations. Career success depends on multiple factors including individual performance, market conditions, organizational requirements, and professional effort.
                </p>
                <p>
                  Our commitment is to provide high-quality training, professional development support, and facilitation of opportunities. Final hiring decisions rest with prospective employers based on their evaluation criteria and organizational needs.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section data-testid="outcomes-section" className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
              Program Outcomes
            </h2>
            <p className="text-base text-charcoal max-w-2xl mx-auto">
              What participants achieve through our certification and career enablement process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outcomes.map((outcome, index) => (
              <div key={index} data-testid={`outcome-${index}`} className="text-center space-y-4">
                <div className="flex justify-center">{outcome.icon}</div>
                <h3 className="text-xl font-semibold text-navy heading-font">
                  {outcome.title}
                </h3>
                <p className="text-sm text-charcoal">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="certification-cta-section" className="section-padding bg-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 heading-font">
              Start Your Professional Journey
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Discuss your career objectives and learn how our programs can support your transition into the recruitment profession.
            </p>
            <Link to="/contact">
              <Button 
                data-testid="certification-contact-button"
                size="lg" 
                className="bg-gold text-navy hover:bg-gold hover:opacity-90 font-semibold px-8 py-6"
              >
                Schedule Career Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


