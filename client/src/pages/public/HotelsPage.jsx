import React, { useState, useEffect } from 'react';
import { Hotel, Search, Star, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import HotelCard from '../../components/cards/HotelCard';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destinationFilter, setDestinationFilter] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const query = destinationFilter ? `?destination=${destinationFilter}` : '';
        const res = await api.get(`/hotels${query}`);
        if (res.data.success) {
          setHotels(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [destinationFilter]);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Hotels & Mountain Resorts in Kangra, Manali & Shimla | Baglamukhi Tour & Travels"
        description="Book handpicked deluxe hotels and luxury resorts in Manali, Shimla, Dharamshala, and Amritsar with mountain views, heaters, and breakfast."
        canonical="/hotels"
      />
      <Breadcrumbs items={[{ name: 'Hotels & Resorts', url: '/hotels' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Hotel className="w-3.5 h-3.5 mr-1" />
            Verified Mountain View Stays
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Hotels & Luxury Resorts
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Handpicked 3-star, 4-star, and luxury boutique resorts with guaranteed mountain views, hot water, room heaters, and authentic local cuisine.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Destination filter buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['All Destinations', 'Manali', 'Shimla', 'Dharamshala', 'Amritsar'].map((dest) => {
            const isSelected = (dest === 'All Destinations' && !destinationFilter) || (destinationFilter === dest);
            return (
              <button
                key={dest}
                onClick={() => setDestinationFilter(dest === 'All Destinations' ? '' : dest)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                  isSelected ? 'bg-brand-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {dest}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-600 font-semibold text-sm">
            Loading hotels...
          </div>
        ) : hotels.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-sm text-slate-600">No hotels found for the selected destination.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
