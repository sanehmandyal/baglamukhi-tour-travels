import React, { useState, useEffect } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { Compass, Sparkles, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TourCard from '../../components/cards/TourCard';
import TourFilterForm from '../../components/forms/TourFilterForm';
import { DEFAULT_TOURS } from '../../data/initialData';

const ToursPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openInquiry } = useOutletContext();

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters state initialized from search params
  const [filters, setFilters] = useState({
    destination: searchParams.get('destination') || '',
    category: searchParams.get('category') || '',
    duration: searchParams.get('duration') || '',
    sort: searchParams.get('sort') || '',
    search: searchParams.get('search') || '',
  });

  const getFilteredDefaults = () => {
    let result = [...DEFAULT_TOURS];
    if (filters.destination) {
      result = result.filter(
        (t) =>
          t.destination?.toLowerCase().includes(filters.destination.toLowerCase()) ||
          t.title?.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }
    if (filters.category) {
      result = result.filter(
        (t) => t.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }
    if (filters.duration) {
      const days = parseInt(filters.duration, 10);
      if (!isNaN(days)) {
        result = result.filter((t) => t.duration?.days === days);
      }
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title?.toLowerCase().includes(q) ||
          t.destination?.toLowerCase().includes(q) ||
          t.overview?.toLowerCase().includes(q)
      );
    }
    return result;
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.destination) params.append('destination', filters.destination);
      if (filters.category) params.append('category', filters.category);
      if (filters.duration) params.append('duration', filters.duration);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.search) params.append('search', filters.search);
      params.append('page', currentPage);
      params.append('limit', 9);

      const res = await api.get(`/tours?${params.toString()}`);
      if (res.data?.success && Array.isArray(res.data.data)) {
        const dbItems = res.data.data;
        const defaults = getFilteredDefaults();
        const dbSlugs = new Set(dbItems.map((t) => (t.slug || t.title || '').toLowerCase()));
        const remainingDefaults = defaults.filter(
          (t) => !dbSlugs.has((t.slug || t.title || '').toLowerCase())
        );
        const merged = [...dbItems, ...remainingDefaults];
        setTours(merged);
        setTotalCount(merged.length);
        setTotalPages(Math.ceil(merged.length / 9) || 1);
      } else {
        const defaults = getFilteredDefaults();
        setTours(defaults);
        setTotalCount(defaults.length);
        setTotalPages(Math.ceil(defaults.length / 9) || 1);
      }
    } catch (error) {
      console.error('Error loading tours:', error);
      const defaults = getFilteredDefaults();
      setTours(defaults);
      setTotalCount(defaults.length);
      setTotalPages(Math.ceil(defaults.length / 9) || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [filters, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      return next;
    });
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      destination: '',
      category: '',
      duration: '',
      sort: '',
      search: '',
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <SEOHead
        title="Himachal Tour Packages | Manali, Shimla, Maa Baglamukhi & 9 Devi Darshan"
        description="Explore best-selling Himachal tour packages with Baglamukhi Tour & Travels. Private sanitized AC cabs, 3-Star/4-Star deluxe mountain resorts, and complete 9 Devi Shaktipeeth darshan. Call +91 98051 43007."
        canonical="/tours"
        keywords={['Himachal tour packages', 'Manali holiday package', 'Maa Baglamukhi yatra package', '9 Devi Darshan yatra', 'Shimla Manali 6 days tour', 'Dharamshala Dalhousie package', 'Spiti Valley tour']}
      />

      <Breadcrumbs items={[{ name: 'Tour Packages', url: '/tours' }]} />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amberGold-400" />
            Verified Himachal Packages
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Holiday Tour Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            All-inclusive private holiday packages featuring dedicated car, verified mountain-view hotel stays, daily breakfast & dinner, and 24/7 road coordinator support.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <TourFilterForm
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Tours Grid */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
              <p>
                Showing <strong className="text-slate-800">{tours.length}</strong> of{' '}
                <strong className="text-slate-800">{totalCount}</strong> packages
              </p>
              {filters.destination && (
                <span className="px-2.5 py-1 bg-brand-50 text-brand-700 font-semibold rounded-lg">
                  Destination: {filters.destination}
                </span>
              )}
            </div>

            {loading ? (
              <div className="py-20 text-center space-y-3">
                <Compass className="w-10 h-10 text-brand-600 animate-spin mx-auto" />
                <p className="text-sm font-medium text-slate-600">Loading tour packages...</p>
              </div>
            ) : tours.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <Compass className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800 font-display">No Tour Packages Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn't find any packages matching your active filters. Try resetting the filters or request a custom itinerary.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <TourCard
                    key={tour._id}
                    tour={tour}
                    onBookNow={() => openInquiry(tour.title)}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 text-xs font-bold rounded-xl transition ${
                      currentPage === i + 1
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToursPage;
