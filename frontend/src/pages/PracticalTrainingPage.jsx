import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Search, Users, ClipboardCheck, FileCheck, TrendingUp, Award } from 'lucide-react';

export default function PracticalTrainingPage() {
  const practicalComponents = [
    {
      icon: <Search className="w-10 h-10 text-gold" />,
      title: 'Live Hiring Simulations',
      description: 'Participate in real-world hiring scenarios with actual job requirements from various industries. Work through complete recruitment cycles under mentor guidance.',
      activities: [
        'Requirement analysis with simulated hiring managers',
        'End-to-end recruitment process execution',
        'Real-time decision making and problem solving',
        'Professional documentation and reporting',
      ],
    },
    {
      icon: <Users className="w-10 h-10 text-gold" />,
      title: 'Structured Sourcing Labs',
      description: 'Hands-on sourcing sessions using live requirements. Practice advanced search techniques, platform navigation, and candidate identification strategies.',
      activities: [
        'Boolean search practice with real profiles',
        'LinkedIn Recruiter navigation and usage',
        'Job board optimization and management',
        'Passive candidate research and mapping',
      ],
    },
    {
      icon: <ClipboardCheck className="w-10 h-10 text-gold" />,
      title: 'Interview Role Plays',
      description: 'Conduct mock screening and coordination exercises. Practice professional communication, assessment techniques, and stakeholder interaction.',
      activities: [
        'Telephonic screening simulations',
        'Competency-based questioning practice',
        'Candidate evaluation and scoring',
        'Feedback documentation and presentation',
      ],
    },
    {
      icon: <FileCheck className="w-10 h-10 text-gold" />,
      title: 'Offer Negotiation Scenarios',
      description: 'Navigate complex offer discussions and negotiation situations. Learn to balance candidate expectations with organizational parameters.',
      activities: [
        'Compensation benchmarking exercises',
        'Negotiation strategy development',
        'Objection handling practice',
        'Professional closure techniques',
      ],
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-gold" />,
      title: 'Joining & Closure Tracking',
      description: 'Manage post-offer processes including documentation, verification, and joining coordination. Ensure smooth candidate transitions.',
      activities: [
        'Background verification coordination',
        'Joining formalities management',
        'New hire onboarding support',
        'Closure documentation and analytics',
      ],
    },
    {
      icon: <Award className="w-10 h-10 text-gold" />,
      title: 'Stakeholder Consulting Practice',
      description: 'Develop consulting skills through simulated hiring manager interactions. Practice needs assessment, market intelligence sharing, and professional influence.',
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

  return (
    <div data-testid="practical-training-page" className="min-h-screen">
      {/* Header Section */}
      <section data-testid="practical-header" className="bg-gradient-to-br from-slate-50 to-white py-24 lg:py-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6 heading-font">
              Practical Training & Application
            </h1>
            <p className="text-lg text-charcoal leading-relaxed">
              Experiential learning through live recruitment scenarios, ensuring participants develop practical competency and professional confidence before entering the workforce.
            </p>
          </div>
        </div>
      </section>

      {/* Practical Components Section */}
      <section data-testid="practical-components-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
              Practical Training Components
            </h2>
            <p className="text-base text-charcoal max-w-2xl mx-auto">
              Comprehensive hands-on training covering all critical aspects of recruitment operations and professional practice.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practicalComponents.map((component, index) => (
              <Card 
                key={index}
                data-testid={`practical-component-${index}`}
                className="p-6 border-2 border-gray-200 card-hover bg-white"
              >
                <div className="mb-4">{component.icon}</div>
                <h3 className="text-xl font-semibold text-navy mb-3 heading-font">
                  {component.title}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed mb-4">
                  {component.description}
                </p>
                <ul className="space-y-2">
                  {component.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span className="text-xs text-charcoal">{activity}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Approach Section */}
      <section data-testid="training-approach-section" className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
                Practical Training Approach
              </h2>
              <p className="text-base text-charcoal">
                Progressive learning methodology ensuring systematic skill development and professional competency.
              </p>
            </div>
            <div className="space-y-6">
              {practicalApproach.map((phase, index) => (
                <Card 
                  key={index}
                  data-testid={`training-phase-${index}`}
                  className="p-6 border-l-4 border-gold bg-white"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold bg-opacity-20 flex items-center justify-center">
                      <span className="text-lg font-bold text-gold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-navy mb-2 heading-font">
                        {phase.phase}
                      </h3>
                      <p className="text-sm text-charcoal leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Technology Section */}
      <section data-testid="tools-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-8 heading-font text-center">
              Tools & Technology Exposure
            </h2>
            <p className="text-base text-charcoal mb-8 leading-relaxed text-center">
              Participants gain hands-on experience with professional recruitment tools and platforms:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Sourcing Platforms',
                  tools: ['LinkedIn Recruiter', 'Job Boards & Aggregators', 'Social Media Channels', 'Professional Networks'],
                },
                {
                  category: 'Assessment Tools',
                  tools: ['Video Interviewing Platforms', 'Skill Assessment Systems', 'Background Verification', 'Candidate Evaluation Frameworks'],
                },
                {
                  category: 'Recruitment Systems',
                  tools: ['Applicant Tracking Systems (ATS)', 'Recruitment CRM', 'Documentation Systems', 'Workflow Management Tools'],
                },
                {
                  category: 'Analytics & Reporting',
                  tools: ['Recruitment Dashboards', 'Metrics Tracking', 'Performance Analytics', 'Reporting Templates'],
                },
              ].map((item, index) => (
                <Card key={index} data-testid={`tools-category-${index}`} className="p-6 border-2 border-gray-200 bg-white">
                  <h3 className="text-lg font-semibold text-navy mb-3 heading-font">
                    {item.category}
                  </h3>
                  <ul className="space-y-2">
                    {item.tools.map((tool, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                        <span className="text-sm text-charcoal">{tool}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="practical-cta-section" className="section-padding bg-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 heading-font">
              Experience Practical Training
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Learn more about our practical training methodology and how it prepares you for professional recruitment roles.
            </p>
            <Link to="/contact">
              <Button 
                data-testid="practical-contact-button"
                size="lg" 
                className="bg-gold text-navy hover:bg-gold hover:opacity-90 font-semibold px-8 py-6"
              >
                Schedule Program Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

