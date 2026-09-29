import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, MessageSquare, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TestimonialCard from '../../components/cards/TestimonialCard';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials');
        if (res.data.success) {
          setTestimonials(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Customer Reviews & Ratings | Baglamukhi Tour & Travels"
        description="Read authentic customer reviews and ratings from travelers who toured Himachal Pradesh, Shimla, Manali, and 9 Devi Darshan with Baglamukhi Tour & Travels."
        canonical="/testimonials"
      />
      <Breadcrumbs items={[{ name: 'Testimonials', url: '/testimonials' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Star className="w-3.5 h-3.5 mr-1 fill-amber-400 text-amber-400" />
            4.9 / 5.0 Average Rating
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Customer Reviews & Experiences
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Real stories, genuine feedback, and honest reviews from families and couples who holidayed with us.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <TestimonialCard key={test._id} testimonial={test} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
