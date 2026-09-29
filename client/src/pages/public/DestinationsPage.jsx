import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Compass, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import DestinationCard from '../../components/cards/DestinationCard';
import { DEFAULT_DESTINATIONS } from '../../data/initialData';

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const res = await api.get('/destinations');
        if (res.data?.success && res.data.data?.length > 0) {
          setDestinations(res.data.data);
        } else {
          setDestinations(DEFAULT_DESTINATIONS);
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setDestinations(DEFAULT_DESTINATIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filtered = destinations.filter((dest) => {
    const matchSearch =
      dest.name.toLowerCase().includes(search.toLowerCase()) ||
      dest.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchState = selectedState === 'All' || dest.state.toLowerCase().includes(selectedState.toLowerCase());
    return matchSearch && matchState;
  });

  return (
    <div>
      <SEOHead
        title="Top Travel Destinations in Himachal & Punjab | Baglamukhi Tour & Travels"
        description="Explore top tourist places in Himachal Pradesh and Punjab: Manali, Shimla, Dharamshala, Dalhousie, Spiti Valley, and Amritsar Golden Temple."
        canonical="/destinations"
        keywords={['Himachal destinations', 'places to visit in Himachal', 'Manali tourism', 'Shimla travel guide']}
      />

      <Breadcrumbs items={[{ name: 'Destinations', url: '/destinations' }]} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amberGold-400" />
            Handpicked Himalayan Escapes
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Travel Destinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Discover snow-capped peaks, colonial retreats, spiritual temples, and adventure trails across North India with comprehensive travel guides.
          </p>
        </div>
      </section>

      {/* Destinations Grid & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Search & State Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Keyword search */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search Manali, Shimla, Amritsar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 sm:top-3" />
          </div>

          {/* State Pills */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['All', 'Himachal Pradesh', 'Punjab'].map((stateName) => (
              <button
                key={stateName}
                onClick={() => setSelectedState(stateName)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                  selectedState === stateName
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {stateName}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Compass className="w-10 h-10 text-brand-600 animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-600">Loading travel destinations...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-sm text-slate-600 font-medium">No destinations match your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((destination) => (
              <DestinationCard key={destination._id} destination={destination} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DestinationsPage;
