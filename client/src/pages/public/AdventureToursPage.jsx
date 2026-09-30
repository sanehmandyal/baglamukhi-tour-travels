import React, { useState, useEffect } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TourCard from '../../components/cards/TourCard';
import { DEFAULT_TOURS } from '../../data/initialData';

const AdventureToursPage = () => {
  const adventureDefaults = DEFAULT_TOURS.filter(
    (t) => t.category === 'Adventure' || t.title.toLowerCase().includes('spiti') || t.title.toLowerCase().includes('expedition')
  );
  const [tours, setTours] = useState(adventureDefaults);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get('/tours?category=Adventure');
        if (res.data?.success && res.data.data?.length > 0) {
          setTours(res.data.data);
        }
      } catch (err) {
        // use defaults
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Spiti Valley & Adventure Tour Packages | 4x4 Road Trips | Baglamukhi Tour & Travels"
        description="Epic Himalayan adventure road trips to Spiti Valley, Chandratal Lake, Parvati Valley trekking, and Solang paragliding with 4x4 SUVs."
        canonical="/adventure-tours"
      />
      <Breadcrumbs items={[{ name: 'Adventure Tours', url: '/adventure-tours' }]} />

      <section className="bg-gradient-to-br from-emerald-950 via-brand-900 to-slate-900 py-16 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest flex items-center justify-center">
            <Compass className="w-3.5 h-3.5 mr-1" />
            High Altitude Expeditions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Adventure & 4x4 Road Trips
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Conquer high-altitude mountain passes, sleep under starlit skies at Chandratal, and traverse ancient monasteries in robust 4WD vehicles.
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

export default AdventureToursPage;
