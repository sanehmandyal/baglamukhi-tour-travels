import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Plane,
  Train,
  Car,
  Clock,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Compass,
  PhoneCall,
} from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TourCard from '../../components/cards/TourCard';
import BlogCard from '../../components/cards/BlogCard';
import { FAQSchema } from '../../components/common/SchemaMarkup';
import { useSettings } from '../../context/SettingsContext';
import { DEFAULT_DESTINATIONS, DEFAULT_TOURS } from '../../data/initialData';

const DestinationDetailPage = () => {
  const { slug } = useParams();
  const { settings } = useSettings();

  const [destination, setDestination] = useState(null);
  const [tours, setTours] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [relatedDestinations, setRelatedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestination = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/destinations/${slug}`);
        if (res.data?.success && res.data.data) {
          setDestination(res.data.data);
          setTours(res.data.tours || []);
          setBlogs(res.data.blogs || []);
          setRelatedDestinations(res.data.relatedDestinations || []);
          return;
        }
      } catch (err) {
        // Fallback to defaults
      }

      const found = DEFAULT_DESTINATIONS.find((d) => d.slug === slug || d._id === slug);
      if (found) {
        setDestination(found);
        setTours(
          DEFAULT_TOURS.filter(
            (t) =>
              t.destination?.toLowerCase().includes(found.name.toLowerCase()) ||
              found.name.toLowerCase().includes(t.destination?.toLowerCase())
          ).slice(0, 3)
        );
        setRelatedDestinations(DEFAULT_DESTINATIONS.filter((d) => d.slug !== slug).slice(0, 3));
      } else {
        setError('Destination guide not found.');
      }
      setLoading(false);
    };

    fetchDestination();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-slate-700">Loading destination guide...</p>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Destination Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-600">{error || 'The requested destination does not exist.'}</p>
        <Link to="/destinations" className="inline-block px-6 py-2.5 text-xs font-bold text-white bg-brand-600 rounded-xl">
          Browse All Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title={destination.seo?.metaTitle || `${destination.name} Tour Packages & Travel Guide | Baglamukhi Tour & Travels`}
        description={destination.seo?.metaDescription || destination.shortDescription?.slice(0, 160)}
        canonical={`/destinations/${destination.slug}`}
        ogImage={destination.heroImage?.url}
        keywords={destination.seo?.focusKeyword || `things to do in ${destination.name}`}
      />

      {destination.faqs && destination.faqs.length > 0 && <FAQSchema faqs={destination.faqs} />}

      <Breadcrumbs
        items={[
          { name: 'Destinations', url: '/destinations' },
          { name: destination.name, url: `/destinations/${destination.slug}` },
        ]}
      />

      {/* Hero Header */}
      <section className="relative h-80 sm:h-[420px] bg-slate-900 overflow-hidden flex items-end">
        <img
          src={destination.heroImage?.url}
          alt={destination.heroImage?.alt || destination.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-white space-y-2 w-full">
          <span className="px-3 py-1 text-xs font-bold bg-brand-600 text-white rounded-full inline-block">
            {destination.state}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            {destination.name} Travel Guide
          </h1>
          <p className="text-sm sm:text-base text-cyan-200 font-light max-w-2xl">
            {destination.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Travel Facts Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-xs sm:text-sm">
          <div className="space-y-1 border-r border-slate-100 pr-2">
            <span className="text-slate-400 text-xs block flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-brand-600" /> Best Time to Visit
            </span>
            <span className="font-bold text-slate-900 block">{destination.bestTimeToVisit}</span>
          </div>

          <div className="space-y-1 md:border-r md:border-slate-100 pr-2">
            <span className="text-slate-400 text-xs block flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-brand-600" /> Ideal Duration
            </span>
            <span className="font-bold text-slate-900 block">{destination.idealTripDuration || '3 to 5 Days'}</span>
          </div>

          <div className="space-y-1 border-r border-slate-100 pr-2">
            <span className="text-slate-400 text-xs block flex items-center">
              <Plane className="w-3.5 h-3.5 mr-1 text-brand-600" /> Nearest Airport
            </span>
            <span className="font-bold text-slate-900 block truncate">{destination.nearestAirport}</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 text-xs block flex items-center">
              <Train className="w-3.5 h-3.5 mr-1 text-brand-600" /> Nearest Railway
            </span>
            <span className="font-bold text-slate-900 block truncate">{destination.nearestRailwayStation}</span>
          </div>
        </div>

        {/* Overview & How to Reach */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overview */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display">About {destination.name}</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line">
              {destination.detailedOverview}
            </p>

            {/* Travel Tips */}
            {destination.travelTips && destination.travelTips.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Essential Travel Tips</h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {destination.travelTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* How to Reach Card */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">How to Reach {destination.name}</h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 flex items-center">
                  <Plane className="w-3.5 h-3.5 mr-1.5 text-brand-600" /> By Air
                </span>
                <p className="font-light">{destination.howToReach?.byAir || 'Fly into nearest airport followed by our private taxi.'}</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 flex items-center">
                  <Train className="w-3.5 h-3.5 mr-1.5 text-brand-600" /> By Train
                </span>
                <p className="font-light">{destination.howToReach?.byTrain || 'Direct superfast trains connect to nearest railhead.'}</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 flex items-center">
                  <Car className="w-3.5 h-3.5 mr-1.5 text-brand-600" /> By Road (Our Cabs)
                </span>
                <p className="font-light">{destination.howToReach?.byRoad || 'Scenic highway drive with Baglamukhi Tour & Travels private taxis.'}</p>
              </div>
            </div>

            <Link
              to="/booking"
              className="w-full py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition text-center block shadow-sm"
            >
              Book Cab to {destination.name}
            </Link>
          </div>
        </div>

        {/* Top Places to Visit */}
        {destination.placesToVisit && destination.placesToVisit.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Top Places to Visit in {destination.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.placesToVisit.map((place, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-2 hover:border-brand-200 transition"
                >
                  <h3 className="text-base font-bold text-slate-900 flex items-center">
                    <MapPin className="w-4 h-4 text-brand-600 mr-1.5 flex-shrink-0" />
                    {place.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">{place.description}</p>
                  {place.timing && (
                    <span className="text-[11px] text-slate-400 block pt-2 border-t border-slate-100">
                      🕒 Timings: {place.timing}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Itinerary */}
        {destination.suggestedItinerary && destination.suggestedItinerary.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Suggested {destination.name} Trip Itinerary
            </h2>
            <div className="space-y-3">
              {destination.suggestedItinerary.map((it) => (
                <div key={it.day} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center">
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-brand-600 text-white rounded mr-2">
                      Day {it.day}
                    </span>
                    {it.title}
                  </h4>
                  <p className="text-xs text-slate-600 pl-8 leading-relaxed font-light">{it.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tour Packages for this destination */}
        {tours.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Popular Tour Packages for {destination.name}
              </h2>
              <Link to={`/tours?destination=${destination.name}`} className="text-xs font-bold text-brand-600 hover:underline">
                View All {destination.name} Tours →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          </div>
        )}

        {/* Related Blogs */}
        {blogs.length > 0 && (
          <div className="space-y-6 pt-6">
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              {destination.name} Travel Guides & Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {destination.faqs && destination.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display">{destination.name} FAQs</h2>
            <div className="space-y-3 text-xs sm:text-sm">
              {destination.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="font-bold text-slate-900 flex items-center">
                    <HelpCircle className="w-4 h-4 text-brand-600 mr-2 flex-shrink-0" />
                    {faq.question}
                  </h4>
                  <p className="text-slate-600 pl-6 leading-relaxed font-light">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetailPage;
