import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TourCard from '../../components/cards/TourCard';

const WeekendTripsPage = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await api.get('/tours?category=Weekend');
      if (res.data.success) setTours(res.data.data);
    };
    fetchTours();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Weekend Trips from Chandigarh | Kasauli, Shimla, Chail Short Breaks"
        description="Quick 2 to 3 days weekend getaway tour packages from Chandigarh, Mohali, and Panchkula to Kasauli, Shimla, and Morni Hills."
        canonical="/weekend-trips"
      />
      <Breadcrumbs items={[{ name: 'Weekend Trips', url: '/weekend-trips' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-16 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            2-3 Day Short Escapes
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Weekend Trips from Chandigarh
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Recharge your soul over Saturday and Sunday. Just 2 to 3 hours drive to pine-scented hills with private door-to-door cab pickup.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekendTripsPage;
