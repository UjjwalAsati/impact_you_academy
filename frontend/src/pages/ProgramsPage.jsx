import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle2, Clock, Users, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchPrograms } from '../services/programService';
import { useCart } from "../context/CartContext";

export default function ProgramsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const { addToCart } = useCart();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await fetchPrograms();
        setPrograms(data);
      } catch (err) {
        setError(err.message || 'Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  const handleEnrollClick = (program) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isAdmin) {
      alert('Admins cannot enroll in programs.');
      return;
    }

    addToCart({
  _id: program._id,
  title: program.title,
  price: program.price,
  duration: program.duration,
});

    navigate('/payment');
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading programs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div data-testid="programs-page" className="min-h-screen">
      {/* Header Section */}
      <section
        data-testid="programs-header"
        className="bg-gradient-to-br from-slate-50 to-white py-24 lg:py-32"
      >
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

      {/* Programs Detail Section */}
      <section
        data-testid="programs-detail-section"
        className="section-padding bg-white"
      >
        <div className="container-custom space-y-16">
          {programs.map((program) => (
            <Card
              key={program._id}
              className="border-2 border-gray-200 overflow-hidden"
            >
              {/* Program Header */}
              <div className="bg-light-grey p-8 border-b-2 border-gray-200">
                <h2 className="text-3xl font-bold text-navy mb-4 heading-font">
                  {program.title}
                </h2>

                <div className="flex flex-wrap gap-6 text-sm">
                  {program.duration && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gold" />
                      <span className="text-charcoal font-medium">
                        {program.duration}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-gold" />
                    <span className="text-charcoal font-medium">
                      Professional Training
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gold" />
                    <span className="text-charcoal font-medium">
                      Working Professionals
                    </span>
                  </div>
                </div>
              </div>

              {/* Program Content */}
              <div className="p-8 space-y-8">
                {/* Overview */}
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-3 heading-font">
                    Program Overview
                  </h3>
                  <p className="text-base text-charcoal leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {/* Learning Outcomes (optional, future-ready) */}
                {program.learningOutcomes?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-4 heading-font">
                      Learning Outcomes
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {program.learningOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2
                            size={18}
                            className="text-gold mt-1 flex-shrink-0"
                          />
                          <span className="text-sm text-charcoal">
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-navy">
                    ₹{program.price?.toLocaleString()}
                  </span>

                  <Button
                    className="btn-primary"
                    onClick={() => handleEnrollClick(program)}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-testid="programs-cta-section"
        className="section-padding bg-light-grey"
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-6 heading-font">
              Need Guidance Selecting a Program?
            </h2>
            <p className="text-base text-charcoal mb-8 leading-relaxed">
              Our program advisors can help you identify the most suitable training pathway.
            </p>

            <Button
              size="lg"
              className="btn-primary px-8 py-6"
              onClick={() => navigate('/contact')}
            >
              Schedule Advisory Session
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
