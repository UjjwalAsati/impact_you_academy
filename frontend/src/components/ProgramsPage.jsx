import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle2, Clock, Users, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProgramsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isAdmin) {
      alert('Admins cannot enroll in programs.');
    } else {
      navigate('/contact');
    }
  };

  const programs = [
    {
      title: 'Recruiter Foundation Program',
      duration: '30 Days',
      format: 'Live Online Sessions + Self-paced Modules',
      audience: 'Graduates, Career Starters, Career Switchers',
      overview:
        'A comprehensive foundation program designed for individuals entering the recruitment profession. Covers complete recruitment lifecycle, sourcing methodologies, candidate assessment, and stakeholder management.',
      learningOutcomes: [
        'Understanding of full-cycle recruitment processes',
        'Proficiency in candidate sourcing across platforms',
        'Interview coordination and candidate engagement',
        'Basic understanding of recruitment metrics and reporting',
        'Professional communication in recruitment contexts',
      ],
      modules: [
        'Introduction to Recruitment & Talent Acquisition',
        'Job Analysis & Requirement Understanding',
        'Sourcing Strategies & Boolean Search',
        'Candidate Screening & Assessment',
        'Interview Coordination & Management',
        'Offer Management & Joining Process',
      ],
    },
    {
      title: 'Advanced Staffing & Talent Acquisition Program',
      duration: '45-60 Days',
      format: 'Live Online + Practical Assignments + Mentorship',
      audience: 'HR Professionals, Recruitment Consultants, TA Specialists',
      overview:
        'Advanced program for professionals seeking to enhance strategic talent acquisition capabilities. Focuses on stakeholder management, recruitment operations, vendor coordination, and data-driven decision making.',
      learningOutcomes: [
        'Strategic workforce planning and TA strategy development',
        'Advanced sourcing techniques and employer branding',
        'Stakeholder management and consulting skills',
        'Recruitment analytics and metrics interpretation',
        'Vendor management and agency coordination',
        'Compliance and legal aspects of hiring',
      ],
      modules: [
        'Strategic Talent Acquisition Framework',
        'Advanced Sourcing & Direct Search',
        'Stakeholder Consulting & Management',
        'Recruitment Process Optimization',
        'Data Analytics in Recruitment',
        'Vendor & Agency Management',
        'Employment Law & Compliance',
        'Employer Branding & Candidate Experience',
      ],
    },
    {
      title: 'Fast-Track Recruiter Certification',
      duration: '15 Days',
      format: 'Intensive Live Sessions + Assessment',
      audience: 'Experienced Professionals Seeking Certification',
      overview:
        'Intensive certification program for professionals with recruitment experience. Validates expertise through structured assessment and provides professional certification for career advancement.',
      learningOutcomes: [
        'Formalization of existing recruitment knowledge',
        'Exposure to industry best practices and standards',
        'Professional certification for career positioning',
        'Network access to recruitment community',
      ],
      modules: [
        'Recruitment Best Practices Review',
        'Industry Standards & Benchmarking',
        'Professional Ethics in Recruitment',
        'Assessment & Certification Process',
      ],
    },
    {
      title: 'Specialized Hiring Modules',
      duration: 'Flexible (5-10 Days per module)',
      format: 'Standalone Modules',
      audience: 'All Professionals',
      overview:
        'Optional specialized modules focusing on specific recruitment domains and advanced techniques. Can be taken independently or as add-ons to core programs.',
      learningOutcomes: [
        'Domain-specific recruitment expertise',
        'Specialized sourcing and assessment techniques',
        'Industry-specific hiring knowledge',
      ],
      modules: [
        'IT & Technology Recruitment',
        'Executive Search & Leadership Hiring',
        'Campus Recruitment Management',
        'Volume Hiring & RPO Operations',
        'International Recruitment',
        'Diversity & Inclusion Hiring',
      ],
    },
  ];

  return (
    <div data-testid="programs-page" className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6 heading-font">
              Professional Training Programs
            </h1>
            <p className="text-lg text-charcoal leading-relaxed">
              Structured learning pathways designed to develop recruitment professionals at various career stages.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-white">
        <div className="container-custom space-y-16">
          {programs.map((program, index) => (
            <Card key={index} className="border-2 border-gray-200 overflow-hidden">
              <div className="bg-light-grey p-8 border-b-2 border-gray-200">
                <h2 className="text-3xl font-bold text-navy mb-4 heading-font">
                  {program.title}
                </h2>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gold" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-gold" />
                    <span>{program.format}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gold" />
                    <span>{program.audience}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <p>{program.overview}</p>

                <ul className="grid md:grid-cols-2 gap-3">
                  {program.learningOutcomes.map((o, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="text-gold mt-1" size={18} />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Button className="btn-primary" onClick={handleEnrollClick}>
                    Enroll Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
