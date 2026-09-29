import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Compass, MapPin, BookOpen, Car, Hotel, ArrowRight } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TourCard from '../../components/cards/TourCard';
import DestinationCard from '../../components/cards/DestinationCard';
import BlogCard from '../../components/cards/BlogCard';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [inputQuery, setInputQuery] = useState(query);
  const [results, setResults] = useState({
    tours: [],
    destinations: [],
    blogs: [],
    services: [],
    hotels: [],
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const performSearch = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query)}`);
        if (res.data.success) {
          setResults(res.data.results);
          setTotalCount(res.data.totalCount || 0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      setSearchParams({ q: inputQuery.trim() });
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Search pages set to noindex per SEO best practices */}
      <SEOHead title={`Search Results for "${query}" | Thakur Travels`} noindex={true} />

      <Breadcrumbs items={[{ name: 'Search', url: '/search' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-12 text-white text-center px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Site Search
          </h1>
          <form onSubmit={handleSearchSubmit} className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search tours, places, taxis, blogs..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-3 text-xs sm:text-sm text-slate-900 bg-white rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:outline-none shadow-lg"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <button
              type="submit"
              className="absolute right-2 top-2 px-4 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-xs text-slate-500 pb-2 border-b border-slate-200">
          Found <strong className="text-slate-800">{totalCount}</strong> results for "
          <strong className="text-brand-600">{query}</strong>"
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-600 font-semibold text-sm">
            Searching across tours, destinations, blogs and cabs...
          </div>
        ) : totalCount === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <Search className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 font-display">No Results Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find matches for "{query}". Try checking your spelling or search terms like "Manali", "Shimla", "Cab", "Honeymoon".
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Tours Matches */}
            {results.tours && results.tours.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center font-display">
                  <Compass className="w-5 h-5 text-brand-600 mr-2" />
                  Matching Tour Packages ({results.tours.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {results.tours.map((tour) => (
                    <TourCard key={tour._id} tour={tour} />
                  ))}
                </div>
              </div>
            )}

            {/* Destinations Matches */}
            {results.destinations && results.destinations.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center font-display">
                  <MapPin className="w-5 h-5 text-brand-600 mr-2" />
                  Matching Destinations ({results.destinations.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {results.destinations.map((dest) => (
                    <DestinationCard key={dest._id} destination={dest} />
                  ))}
                </div>
              </div>
            )}

            {/* Blogs Matches */}
            {results.blogs && results.blogs.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center font-display">
                  <BookOpen className="w-5 h-5 text-brand-600 mr-2" />
                  Matching Travel Guides ({results.blogs.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {results.blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
