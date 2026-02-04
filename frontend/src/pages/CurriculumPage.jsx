import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { CheckCircle2, Target, Users, BookOpen } from 'lucide-react';

export default function CurriculumPage() {
  const philosophyPrinciples = [
    {
      icon: <Target className="w-8 h-8 text-gold" />,
      title: 'Workflow-Based Learning',
      description: 'Curriculum structured around actual recruitment workflows rather than theoretical concepts, ensuring practical applicability.',
    },
    {
      icon: <Users className="w-8 h-8 text-gold" />,
      title: 'Industry-Practitioner Design',
      description: 'Content developed by active recruitment professionals with current market knowledge and practical experience.',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-gold" />,
      title: 'Progressive Skill Building',
      description: 'Systematic progression from fundamental concepts to advanced applications, building competency at each stage.',
    },
  ];

  const curriculumModules = [
    {
      category: 'Foundation Modules',
      modules: [
        {
          title: 'Recruitment Fundamentals & Industry Overview',
          topics: [
            'Role of recruitment in organizational success',
            'Recruitment vs. Talent Acquisition: Understanding the difference',
            'Key stakeholders in the hiring process',
            'Recruitment lifecycle and stages',
            'Industry landscape and career pathways',
          ],
        },
        {
          title: 'Job Analysis & Requirement Understanding',
          topics: [
            'Effective Job Description analysis',
            'Understanding role requirements and qualifications',
            'Stakeholder intake meetings and briefing',
            'Identifying key selection criteria',
            'Market mapping and talent availability assessment',
          ],
        },
        {
          title: 'Sourcing Strategies & Techniques',
          topics: [
            'Overview of sourcing channels and platforms',
            'Boolean search fundamentals and advanced operators',
            'LinkedIn Recruiter and social media sourcing',
            'Job board management and optimization',
            'Passive candidate identification and engagement',
            'Referral program management',
          ],
        },
      ],
    },
    {
      category: 'Core Recruitment Modules',
      modules: [
        {
          title: 'Candidate Screening & Assessment',
          topics: [
            'Resume screening techniques and red flags',
            'Telephonic screening best practices',
            'Qualification and competency assessment',
            'Cultural fit evaluation',
            'Documentation and record keeping',
          ],
        },
        {
          title: 'Interview Coordination & Management',
          topics: [
            'Interview scheduling and logistics',
            'Candidate communication and preparation',
            'Interview panel coordination',
            'Feedback collection and management',
            'Candidate experience optimization',
          ],
        },
        {
          title: 'Candidate Engagement & Relationship Management',
          topics: [
            'Professional communication standards',
            'Candidate pipelining and nurturing',
            'Objection handling and negotiation basics',
            'Managing candidate expectations',
            'Building long-term candidate relationships',
          ],
        },
      ],
    },
    {
      category: 'Advanced & Specialized Modules',
      modules: [
        {
          title: 'Offer Management & Closure',
          topics: [
            'Compensation benchmarking and offer structuring',
            'Offer negotiation techniques',
            'Offer letter preparation and review',
            'Background verification coordination',
            'Joining formalities and onboarding support',
          ],
        },
        {
          title: 'Recruitment Metrics & Analytics',
          topics: [
            'Key recruitment metrics and KPIs',
            'Time-to-fill and cost-per-hire analysis',
            'Quality of hire measurement',
            'Reporting dashboards and stakeholder updates',
            'Data-driven process improvement',
          ],
        },
        {
          title: 'Stakeholder Management & Consulting',
          topics: [
            'Hiring manager partnership and consultation',
            'Managing expectations and timelines',
            'Presenting market intelligence',
            'Handling conflicting priorities',
            'Professional influence and persuasion',
          ],
        },
        {
          title: 'Technology & Tools in Recruitment',
          topics: [
            'Applicant Tracking Systems (ATS) overview',
            'Recruitment automation and AI tools',
            'Video interviewing platforms',
            'Assessment tools and technologies',
            'Data privacy and system security',
          ],
        },
      ],
    },
    {
      category: 'Professional Development Modules',
      modules: [
        {
          title: 'Professional Ethics & Compliance',
          topics: [
            'Ethical standards in recruitment',
            'Confidentiality and data protection',
            'Equal opportunity and non-discrimination',
            'Legal compliance in hiring',
            'Professional conduct and integrity',
          ],
        },
        {
          title: 'Career Development in Recruitment',
          topics: [
            'Career pathways in recruitment and TA',
            'Building professional networks',
            'Continuous learning and skill development',
            'Personal branding for recruiters',
            'Interview preparation for recruitment roles',
          ],
        },
      ],
    },
  ];

  return (
    <div data-testid="curriculum-page" className="min-h-screen">
      {/* Header Section */}
      <section data-testid="curriculum-header" className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6 heading-font">
              Curriculum & Methodology
            </h1>
            <p className="text-lg text-charcoal leading-relaxed">
              Our curriculum is designed around practical recruitment workflows, ensuring that every learning module directly translates to professional capability and job performance.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section data-testid="philosophy-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
              Curriculum Philosophy
            </h2>
            <p className="text-base text-charcoal max-w-2xl mx-auto">
              Our approach prioritizes practical application and professional competency development over theoretical knowledge accumulation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyPrinciples.map((principle, index) => (
              <div key={index} data-testid={`philosophy-principle-${index}`} className="text-center space-y-4">
                <div className="flex justify-center">{principle.icon}</div>
                <h3 className="text-xl font-semibold text-navy heading-font">
                  {principle.title}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes Section */}
      <section data-testid="learning-outcomes-section" className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-8 heading-font">
              Learning Outcomes
            </h2>
            <p className="text-base text-charcoal mb-8 leading-relaxed">
              Upon completion of our programs, participants will demonstrate the following professional competencies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Execute full-cycle recruitment processes independently',
                'Source and engage candidates across multiple channels',
                'Conduct effective screening and assessment',
                'Manage stakeholder relationships professionally',
                'Utilize recruitment tools and technologies effectively',
                'Apply metrics and data in recruitment decisions',
                'Navigate employment law and compliance requirements',
                'Maintain professional ethics and standards',
              ].map((outcome, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <span className="text-sm text-charcoal">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Curriculum Section */}
      <section data-testid="detailed-curriculum-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
                Detailed Curriculum Structure
              </h2>
              <p className="text-base text-charcoal">
                Comprehensive coverage of recruitment competencies organized by learning progression.
              </p>
            </div>

            {curriculumModules.map((category, catIndex) => (
              <div key={catIndex} className="mb-12">
                <h3 className="text-2xl font-bold text-navy mb-6 heading-font border-l-4 border-gold pl-4">
                  {category.category}
                </h3>
                <Accordion data-testid={`accordion-category-${catIndex}`} type="single" collapsible className="space-y-4">
                  {category.modules.map((module, modIndex) => (
                    <AccordionItem 
                      key={modIndex} 
                      value={`item-${catIndex}-${modIndex}`}
                      data-testid={`accordion-module-${catIndex}-${modIndex}`}
                      className="border-2 border-gray-200 rounded-lg px-6 bg-white"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="text-base font-semibold text-navy">
                          {module.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pt-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                              <span className="text-sm text-charcoal">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="curriculum-cta-section" className="section-padding bg-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 heading-font">
              Request Detailed Curriculum
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Download comprehensive program brochures with detailed curriculum breakdown, session schedules, and learning resources.
            </p>
            <Link to="/contact">
              <Button 
                data-testid="curriculum-download-button"
                size="lg" 
                className="bg-gold text-navy hover:bg-gold hover:opacity-90 font-semibold px-8 py-6"
              >
                Download Program Brochure
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


