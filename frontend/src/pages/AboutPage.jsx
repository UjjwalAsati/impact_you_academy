import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Target, Shield, Users, Award } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-10 h-10 text-gold" />,
      title: 'Professional Excellence',
      description: 'Commitment to delivering industry-standard training that prepares professionals for real-world recruitment challenges and responsibilities.',
    },
    {
      icon: <Shield className="w-10 h-10 text-gold" />,
      title: 'Ethics & Integrity',
      description: 'Emphasis on professional ethics, compliance standards, and responsible recruitment practices in all training and operations.',
    },
    {
      icon: <Users className="w-10 h-10 text-gold" />,
      title: 'Practical Learning',
      description: 'Focus on experiential training and hands-on application, ensuring participants develop job-ready competencies and professional confidence.',
    },
    {
      icon: <Award className="w-10 h-10 text-gold" />,
      title: 'Continuous Development',
      description: 'Support for ongoing professional growth and adaptation to evolving recruitment practices, technologies, and market dynamics.',
    },
  ];

  const approach = [
    {
      title: 'Industry-Aligned Curriculum',
      description: 'Programs designed in consultation with recruitment professionals and aligned with current industry practices, tools, and methodologies.',
    },
    {
      title: 'Practitioner-Led Training',
      description: 'Instruction and mentorship from experienced recruitment professionals with active industry engagement and practical knowledge.',
    },
    {
      title: 'Competency-Based Assessment',
      description: 'Evaluation focused on practical ability to execute recruitment functions rather than theoretical knowledge accumulation.',
    },
    {
      title: 'Career Support Framework',
      description: 'Structured career enablement services supporting professional transition and establishment in the recruitment industry.',
    },
  ];

  return (
    <div data-testid="about-page" className="min-h-screen">
      {/* Header Section */}
      <section data-testid="about-header" className="bg-gradient-to-br from-slate-50 to-white py-24 lg:py-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6 heading-font">
              About Impact You Academy
            </h1>
            <p className="text-lg text-charcoal leading-relaxed">
              A professional training institution dedicated to developing competent recruitment professionals through structured learning, practical application, and industry-aligned certification.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section data-testid="mission-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-6 heading-font">
                Our Mission
              </h2>
            </div>
            <Card className="p-12 border-2 border-gray-200 bg-light-grey">
              <p className="text-lg text-charcoal leading-relaxed text-center">
                To develop job-ready recruitment professionals through systematic training, practical exposure, and professional mentorship. We aim to bridge the gap between academic education and industry requirements by providing structured pathways for career entry and advancement in staffing and talent acquisition.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section data-testid="values-section" className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
              Our Core Values
            </h2>
            <p className="text-base text-charcoal max-w-2xl mx-auto">
              The principles that guide our training methodology, professional standards, and organizational operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index}
                data-testid={`value-${index}`}
                className="p-8 border-2 border-gray-200 card-hover bg-white text-center"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-navy mb-3 heading-font">
                  {value.title}
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section data-testid="approach-section" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
                Our Training Approach
              </h2>
              <p className="text-base text-charcoal max-w-2xl mx-auto">
                Distinctive methodology that ensures practical competency development and professional readiness.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {approach.map((item, index) => (
                <Card 
                  key={index}
                  data-testid={`approach-${index}`}
                  className="p-8 border-l-4 border-gold bg-white"
                >
                  <h3 className="text-xl font-semibold text-navy mb-3 heading-font">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section data-testid="governance-section" className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4 heading-font">
                Professional Standards & Governance
              </h2>
            </div>
            <Card className="p-8 border-2 border-gray-200 bg-white">
              <div className="space-y-6 text-sm text-charcoal leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-2 heading-font">
                    Training Quality Standards
                  </h3>
                  <p>
                    All programs are designed and reviewed by experienced recruitment professionals. Curriculum is regularly updated to reflect current industry practices, technologies, and regulatory requirements.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-2 heading-font">
                    Professional Ethics
                  </h3>
                  <p>
                    Training emphasizes ethical recruitment practices, candidate dignity, confidentiality standards, and compliance with employment laws. Participants are expected to maintain professional integrity throughout their careers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-2 heading-font">
                    Data Protection & Confidentiality
                  </h3>
                  <p>
                    Strict protocols for handling candidate information, organizational data, and participant records. All training incorporates data protection requirements and professional confidentiality standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-2 heading-font">
                    Continuous Improvement
                  </h3>
                  <p>
                    Regular program evaluation, participant feedback integration, and industry consultation to ensure ongoing relevance and effectiveness of training delivery.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="about-cta-section" className="section-padding bg-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 heading-font">
              Learn More About Our Programs
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Connect with our team to discuss how our training programs can support your professional development in recruitment and talent acquisition.
            </p>
            <Link to="/contact">
              <Button 
                data-testid="about-contact-button"
                size="lg" 
                className="bg-gold text-navy hover:bg-gold hover:opacity-90 font-semibold px-8 py-6"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

