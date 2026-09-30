import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Star, Gift, PhoneCall } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TourCard from '../../components/cards/TourCard';
import { DEFAULT_TOURS } from '../../data/initialData';

const HoneymoonToursPage = () => {
  const honeymoonDefaults = DEFAULT_TOURS.filter(
    (t) => t.category === 'Honeymoon' || t.title.toLowerCase().includes('honeymoon')
  );
  const [tours, setTours] = useState(honeymoonDefaults);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHoneymoon = async () => {
      try {
        const res = await api.get('/tours?category=Honeymoon');
        if (res.data?.success && res.data.data?.length > 0) {
          setTours(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHoneymoon();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Manali & Himachal Honeymoon Packages with Candlelight Dinner | Baglamukhi Tour & Travels"
        description="Book romantic Himachal & Manali honeymoon packages with luxury mountain suites, flower bed decoration, candlelight dinner, and private car."
        canonical="/honeymoon-tours"
        keywords={['Manali honeymoon package', 'Himachal honeymoon tour', 'Shimla couple trip', 'romantic holiday package']}
      />

      <Breadcrumbs items={[{ name: 'Honeymoon Packages', url: '/honeymoon-tours' }]} />

      <section className="bg-gradient-to-br from-rose-950 via-brand-900 to-slate-900 py-16 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 mr-1 fill-rose-300" />
            Romantic Himalayan Getaways
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Honeymoon Special Tour Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Cherish romantic moments amidst snow-capped peaks. Complimentary flower bed decoration, candlelight dinner, private sedan car, and scenic mountain resort suites.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Inclusions ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-rose-50/70 p-6 rounded-3xl border border-rose-200/80 text-xs sm:text-sm text-rose-950 font-semibold">
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <span>Floral Bed Decoration</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <span>Romantic Candlelight Dinner</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <span>Honeymoon Celebration Cake</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <span>100% Private Sedan Car</span>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoneymoonToursPage;
