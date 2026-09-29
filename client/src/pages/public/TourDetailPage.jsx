import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  Car,
  Hotel,
  Calendar,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Share2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';
import TourCard from '../../components/cards/TourCard';
import { TourPackageSchema, FAQSchema } from '../../components/common/SchemaMarkup';
import { useSettings } from '../../context/SettingsContext';
import { DEFAULT_TOURS } from '../../data/initialData';

const TourDetailPage = () => {
  const { slug } = useParams();
  const { settings } = useSettings();

  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openItineraryDay, setOpenItineraryDay] = useState(1);

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/tours/${slug}`);
        if (res.data?.success && res.data.data) {
          setTour(res.data.data);
          setRelatedTours(res.data.relatedTours || []);
          return;
        }
      } catch (err) {
        // Fallback to default
      }

      // Check in DEFAULT_TOURS
      const found = DEFAULT_TOURS.find((t) => t.slug === slug || t._id === slug);
      if (found) {
        setTour(found);
        setRelatedTours(DEFAULT_TOURS.filter((t) => t.slug !== slug).slice(0, 3));
      } else {
        setError('Tour package not found or currently unavailable.');
      }
      setLoading(false);
    };

    fetchTour();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-slate-700">Loading tour package details...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Tour Package Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-600">{error || 'The requested package does not exist.'}</p>
        <Link to="/tours" className="inline-block px-6 py-2.5 text-xs font-bold text-white bg-brand-600 rounded-xl">
          Browse All Tour Packages
        </Link>
      </div>
    );
  }

  const startingPrice = tour.price?.startingPrice || 9999;
  const rating = tour.avgRating || 4.9;
  const reviews = tour.reviewsCount || 120;

  return (
    <div className="space-y-10 pb-16">
      <SEOHead
        title={tour.seo?.metaTitle || `${tour.title} | Baglamukhi Tour & Travels`}
        description={tour.seo?.metaDescription || tour.overview?.slice(0, 160)}
        canonical={`/tours/${tour.slug}`}
        ogImage={tour.featuredImage?.url}
        keywords={tour.seo?.focusKeyword || `${tour.destination} tour package`}
      />

      <TourPackageSchema tour={tour} />
      {tour.faqs && tour.faqs.length > 0 && <FAQSchema faqs={tour.faqs} />}

      <Breadcrumbs
        items={[
          { name: 'Tour Packages', url: '/tours' },
          { name: tour.title, url: `/tours/${tour.slug}` },
        ]}
      />

      {/* Main Tour Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 rounded-full">
              {tour.category || 'Family Tour'}
            </span>
            <span className="px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 rounded-full flex items-center">
              <MapPin className="w-3.5 h-3.5 text-brand-600 mr-1" />
              {tour.destination}
            </span>
            <div className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
              <span>{rating.toFixed(1)} / 5.0 ({reviews} Reviews)</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display leading-tight">
            {tour.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center space-x-6 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="flex items-center">
                <Clock className="w-4 h-4 text-cyan-600 mr-1.5" />
                {tour.duration?.label || `${tour.duration?.days} Days / ${tour.duration?.nights} Nights`}
              </span>
              <span className="flex items-center">
                <Car className="w-4 h-4 text-cyan-600 mr-1.5" />
                Private Dedicated Cab
              </span>
              <span className="flex items-center">
                <Hotel className="w-4 h-4 text-cyan-600 mr-1.5" />
                Deluxe Hotel & Meals
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919800000000'}`}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 rounded-xl transition flex items-center"
              >
                <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                Call Agent
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '919800000000'}?text=Hi%20Baglamukhi%20Tour%20%26%20Travels,%20I%20am%20interested%20in%20${encodeURIComponent(tour.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition flex items-center shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 rounded-3xl overflow-hidden shadow-soft">
          <div className="md:col-span-2 aspect-[16/10] overflow-hidden bg-slate-100">
            <img
              src={tour.featuredImage?.url}
              alt={tour.featuredImage?.alt || tour.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4">
            {tour.galleryImages && tour.galleryImages[0] ? (
              <div className="overflow-hidden aspect-[16/9] bg-slate-100">
                <img
                  src={tour.galleryImages[0].url}
                  alt={tour.galleryImages[0].alt || 'Tour gallery 1'}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="overflow-hidden aspect-[16/9] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=600&q=80"
                  alt="Solang view"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {tour.galleryImages && tour.galleryImages[1] ? (
              <div className="overflow-hidden aspect-[16/9] bg-slate-100">
                <img
                  src={tour.galleryImages[1].url}
                  alt={tour.galleryImages[1].alt || 'Tour gallery 2'}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="overflow-hidden aspect-[16/9] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=600&q=80"
                  alt="Hadimba view"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Content Layout: Left details, Right Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Itinerary, Inclusions, Highlights */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">Tour Overview</h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line">
                {tour.overview}
              </p>

              {/* Highlights */}
              {tour.highlights && tour.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">Key Tour Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                    {tour.highlights.map((h, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Day by Day Itinerary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 font-display">Day-by-Day Itinerary</h2>
                <span className="text-xs text-slate-500 font-medium">
                  {tour.itinerary?.length || 0} Days Plan
                </span>
              </div>

              <div className="space-y-4">
                {tour.itinerary?.map((dayPlan) => {
                  const isOpen = openItineraryDay === dayPlan.day;
                  return (
                    <div
                      key={dayPlan.day}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition"
                    >
                      <button
                        onClick={() => setOpenItineraryDay(isOpen ? null : dayPlan.day)}
                        className={`w-full p-4 text-left flex items-center justify-between transition ${
                          isOpen ? 'bg-brand-50/80 text-brand-900' : 'bg-slate-50/60 hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 rounded-xl bg-brand-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                            Day {dayPlan.day}
                          </span>
                          <span className="text-sm font-bold truncate max-w-xs sm:max-w-md">
                            {dayPlan.title}
                          </span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-brand-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      {isOpen && (
                        <div className="p-5 text-xs sm:text-sm text-slate-700 bg-white space-y-3 border-t border-slate-100 animate-fadeIn">
                          <p className="leading-relaxed font-light">{dayPlan.description}</p>
                          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
                            {dayPlan.meals && (
                              <span className="bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                                🍽️ <strong>Meals:</strong> {dayPlan.meals}
                              </span>
                            )}
                            {dayPlan.hotel && (
                              <span className="bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                                🏨 <strong>Stay:</strong> {dayPlan.hotel}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-200/80 space-y-4">
                <h3 className="text-base font-bold text-emerald-950 flex items-center font-display">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                  What is Included
                </h3>
                <ul className="space-y-2.5 text-xs text-emerald-900">
                  {tour.inclusions?.map((inc, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-rose-50/60 rounded-3xl p-6 border border-rose-200/80 space-y-4">
                <h3 className="text-base font-bold text-rose-950 flex items-center font-display">
                  <XCircle className="w-5 h-5 text-rose-600 mr-2" />
                  What is Excluded
                </h3>
                <ul className="space-y-2.5 text-xs text-rose-900">
                  {tour.exclusions?.map((exc, idx) => (
                    <li key={idx} className="flex items-start">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hotel & Transportation Policy */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-display">Hotel & Vehicle Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
                <div className="space-y-2">
                  <span className="font-bold text-slate-900 flex items-center">
                    <Hotel className="w-4 h-4 text-brand-600 mr-1.5" />
                    Hotel Accommodation
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {tour.hotelDetails?.stayDetails || 'Clean 3-star / 4-star mountain view rooms with private washrooms, hot water, and heater facilities.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="font-bold text-slate-900 flex items-center">
                    <Car className="w-4 h-4 text-brand-600 mr-1.5" />
                    Transportation & Chauffeur
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {tour.transportation || 'Dedicated private Sedan / SUV cab with experienced mountain driver. All fuel, parking, and toll fees included.'}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            {tour.faqs && tour.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
                <h2 className="text-xl font-bold text-slate-900 font-display">Tour FAQs</h2>
                <div className="space-y-3 text-xs sm:text-sm">
                  {tour.faqs.map((faq, idx) => (
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

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-6">
            <BookingForm
              defaultPackage={tour.title}
              defaultDestination={tour.destination}
              tourId={tour._id}
              startingPrice={startingPrice}
            />

            {/* Quick Assistance Box */}
            <div className="bg-gradient-to-br from-slate-900 to-amber-950 text-white p-6 rounded-3xl space-y-3 text-center border border-slate-800 shadow-lg">
              <h4 className="text-sm font-bold font-display text-amber-400">Need Customization or Group Rate?</h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Talk directly with our Himachal tour expert to customize hotels, add nights, or request Force Cruiser / Tempo Travellers.
              </p>
              <a
                href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919800000000'}`}
                className="block py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition"
              >
                Call {settings.primaryPhone || '+91 98000 00000'}
              </a>
            </div>
          </div>
        </div>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <div className="pt-16 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 font-display">Similar Tour Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.map((rTour) => (
                <TourCard key={rTour._id} tour={rTour} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDetailPage;
