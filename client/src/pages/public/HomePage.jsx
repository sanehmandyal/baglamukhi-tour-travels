import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Calendar,
  Search,
  ShieldCheck,
  Award,
  PhoneCall,
  Car,
  Star,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Heart,
  Users,
  Navigation,
} from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import TourCard from '../../components/cards/TourCard';
import DestinationCard from '../../components/cards/DestinationCard';
import BlogCard from '../../components/cards/BlogCard';
import TestimonialCard from '../../components/cards/TestimonialCard';
import ServiceCard from '../../components/cards/ServiceCard';
import { useSettings } from '../../context/SettingsContext';
import { DEFAULT_TOURS, DEFAULT_DESTINATIONS, DEFAULT_CABS, DEFAULT_BLOGS, DEFAULT_TESTIMONIALS, DEFAULT_FAQS } from '../../data/initialData';

const HomePage = () => {
  const { settings } = useSettings();
  const { openInquiry } = useOutletContext();
  const navigate = useNavigate();

  const [featuredTours, setFeaturedTours] = useState(DEFAULT_TOURS.slice(0, 6));
  const [destinations, setDestinations] = useState(DEFAULT_DESTINATIONS.slice(0, 4));
  const [services, setServices] = useState(DEFAULT_CABS.slice(0, 6));
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS.slice(0, 3));
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [loading, setLoading] = useState(true);

  // Hero search state: "When to go", "From where", "To where", "How many members"
  const [searchPickup, setSearchPickup] = useState('Chandigarh');
  const [searchDestination, setSearchDestination] = useState('Pilgrimage');
  const [searchDate, setSearchDate] = useState(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [searchMembers, setSearchMembers] = useState('4 Members');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [toursRes, destRes, servRes, blogRes, testRes, faqRes] = await Promise.allSettled([
          api.get('/tours?limit=6&featured=true'),
          api.get('/destinations?featured=true'),
          api.get('/services'),
          api.get('/blogs?limit=3'),
          api.get('/testimonials'),
          api.get('/faqs?category=General'),
        ]);

        if (toursRes.status === 'fulfilled' && toursRes.value?.data?.success && toursRes.value.data.data?.length > 0) {
          setFeaturedTours(toursRes.value.data.data);
        } else {
          setFeaturedTours(DEFAULT_TOURS.slice(0, 6));
        }

        if (destRes.status === 'fulfilled' && destRes.value?.data?.success && destRes.value.data.data?.length > 0) {
          setDestinations(destRes.value.data.data);
        } else {
          setDestinations(DEFAULT_DESTINATIONS.slice(0, 4));
        }

        if (servRes.status === 'fulfilled' && servRes.value?.data?.success && servRes.value.data.data?.length > 0) {
          const mapped = servRes.value.data.data.map((s, idx) => {
            const img = s.image || s.featuredImage?.url || DEFAULT_CABS[idx % DEFAULT_CABS.length]?.image || '/images/cabs/force-cruiser-4x4.jpg';
            return {
              ...s,
              image: img,
              featuredImage: {
                url: img,
                alt: s.title || s.name || 'Himachal Cab',
              },
            };
          });
          setServices(mapped);
        } else {
          setServices(DEFAULT_CABS.slice(0, 6));
        }

        if (blogRes.status === 'fulfilled' && blogRes.value?.data?.success && blogRes.value.data.data?.length > 0) {
          setBlogs(blogRes.value.data.data);
        } else {
          setBlogs(DEFAULT_BLOGS.slice(0, 3));
        }

        if (testRes.status === 'fulfilled' && testRes.value?.data?.success && testRes.value.data.data?.length > 0) {
          setTestimonials(testRes.value.data.data);
        } else {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }

        if (faqRes.status === 'fulfilled' && faqRes.value?.data?.success && faqRes.value.data.data?.length > 0) {
          setFaqs(faqRes.value.data.data);
        } else {
          setFaqs(DEFAULT_FAQS);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/tours?destination=${encodeURIComponent(searchDestination)}&from=${encodeURIComponent(searchPickup)}&date=${encodeURIComponent(searchDate)}&members=${encodeURIComponent(searchMembers)}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-slate-50/40">
      <SEOHead
        title="Baglamukhi Tour & Travels | Best Himachal Tour Packages, Cabs & Devi Darshan"
        description="Book customized Himachal Pradesh holiday packages, Maa Baglamukhi Dham & 9 Devi Darshan yatra, Shimla Manali tours, Chandigarh taxi rentals with Baglamukhi Tour & Travels."
        canonical="/"
        keywords={['Baglamukhi Tour and Travels', 'Maa Baglamukhi temple taxi', 'Himachal tour packages', 'Manali tour package', 'Shimla trip', 'Chandigarh cab service']}
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] sm:min-h-[620px] flex items-center justify-center bg-slate-900 overflow-hidden pt-12 pb-24">
        {/* Background hero image with warm mountain overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=85"
            alt="Scenic Himalayas Manali snow mountains with Baglamukhi Tour and Travels"
            className="w-full h-full object-cover object-center opacity-45 scale-105 animate-fadeScale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-7 w-full">
          {/* Top Auspicious Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-amber-400/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-amber-300 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Himachal & Sacred Maa Baglamukhi Darshan Tour Operator</span>
          </div>

          {/* H1 Heading */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.15]">
              Experience Unforgettable <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100 bg-clip-text text-transparent">
                Himalayan Holidays & Devi Darshan
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
              Customized Shimla, Manali, Dharamshala, and Maa Baglamukhi 9 Devi Yatra packages with dedicated private AC cabs from Chandigarh & Delhi.
            </p>
          </div>

          {/* Quick Search Widget: From, To, When, Members */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 sm:p-5 shadow-2xl text-slate-800 border border-slate-100">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
              {/* 1. From (Pickup Location) */}
              <div className="text-left">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                  <Navigation className="w-3.5 h-3.5 text-amber-500 mr-1" />
                  From (Pickup)
                </label>
                <select
                  value={searchPickup}
                  onChange={(e) => setSearchPickup(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Chandigarh">🚗 Chandigarh (Airport / Rly)</option>
                  <option value="Delhi">🚗 Delhi NCR (Airport / Rly)</option>
                  <option value="Kalka">🚗 Kalka / Ambala</option>
                  <option value="Amritsar">🚗 Amritsar / Jalandhar</option>
                  <option value="Pathankot">🚗 Pathankot / Kangra</option>
                  <option value="Shimla">🚗 Shimla Pickup</option>
                  <option value="Manali">🚗 Manali Pickup</option>
                  <option value="Dharamshala">🚗 Dharamshala Pickup</option>
                  <option value="Other">🚗 Other North India City</option>
                </select>
              </div>

              {/* 2. To (Destination) */}
              <div className="text-left">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1" />
                  To (Destination)
                </label>
                <select
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Pilgrimage">🛕 Maa Baglamukhi & 9 Devi</option>
                  <option value="Manali">🏔️ Manali & Solang Valley</option>
                  <option value="Shimla">🌲 Shimla & Kufri</option>
                  <option value="Shimla & Manali">🏔️ Shimla + Manali Combo</option>
                  <option value="Dharamshala">🌸 Dharamshala & Dalhousie</option>
                  <option value="Spiti Valley">🚗 Spiti Valley 4x4</option>
                  <option value="Amritsar">🛕 Amritsar Golden Temple</option>
                  <option value="Kinnaur">🏔️ Kinnaur & Kalpa</option>
                </select>
              </div>

              {/* 3. When (Travel Date) */}
              <div className="text-left">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                  <Calendar className="w-3.5 h-3.5 text-amber-500 mr-1" />
                  When (Date)
                </label>
                <input
                  type="date"
                  value={searchDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* 4. How Many Members */}
              <div className="text-left">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                  <Users className="w-3.5 h-3.5 text-amber-500 mr-1" />
                  Members
                </label>
                <select
                  value={searchMembers}
                  onChange={(e) => setSearchMembers(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="2 Members">👤 1-2 Members (Couple)</option>
                  <option value="4 Members">👨‍👩‍👧 3-4 Members (Sedan)</option>
                  <option value="6 Members">👨‍👩‍👧‍👦 5-7 Members (Innova)</option>
                  <option value="12 Members">🚐 8-12 (Tempo 12S)</option>
                  <option value="17 Members">🚐 13-17 (Tempo 17S)</option>
                  <option value="25 Members">🚌 18-26+ Group / Bus</option>
                </select>
              </div>

              {/* 5. Search Submit Button */}
              <div className="pt-2 sm:pt-0 sm:col-span-2 lg:col-span-1">
                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl shadow-lg shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-1.5"
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span>Find Packages</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick trust highlights */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-1 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-400 mr-1.5" />
              100% Private Verified AC Cabs
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-400 mr-1.5" />
              Transparent Pricing & Zero Hidden Costs
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-400 mr-1.5" />
              24/7 Dedicated Tour Manager
            </span>
          </div>
        </div>
      </section>

      {/* 2. POPULAR TOUR PACKAGES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              Curated Holiday Itineraries
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Best-Selling Tour Packages
            </h2>
          </div>
          <Link
            to="/tours"
            className="mt-4 md:mt-0 text-sm font-bold text-amber-600 hover:text-amber-800 flex items-center group transition"
          >
            <span>Explore All {featuredTours.length > 0 ? `${featuredTours.length}+` : ''} Packages</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour._id} tour={tour} onBookNow={() => openInquiry(tour.title)} />
          ))}
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Explore The Himalayas & Shrines
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Top Travel Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            From the sacred Maa Baglamukhi Dham in Kangra to the snow peaks of Manali, colonial Shimla, and the Golden Temple of Amritsar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest._id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE BAGLAMUKHI TOUR & TRAVELS */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-16 text-white rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              15+ Years Travel Heritage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Why 1,500+ Travelers Choose <br />
              <span className="text-amber-400">Baglamukhi Tour & Travels</span> Every Season
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              We aren't a faceless marketplace. We are local travel specialists with our own verified fleet of cars, experienced hill drivers, and handpicked partner hotels across Himachal, Punjab, and North India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <ShieldCheck className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Verified Local Drivers</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Mountain-certified drivers with safe ghat driving records.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <Award className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Handpicked Deluxe Hotels</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Personally inspected mountain view rooms with heater & hot water.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <Car className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Dedicated Private Cab</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Clean AC cabs reserved exclusively for your family with zero sharing.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <PhoneCall className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">24/7 Road Support</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Direct manager helpline for any assistance on the road.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => openInquiry()}
                className="px-6 py-3.5 text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition shadow-md"
              >
                Plan Custom Trip With Us
              </button>
              <a
                href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919805143007'}`}
                className="px-6 py-3.5 text-sm font-bold text-white bg-white/15 hover:bg-white/20 border border-white/30 rounded-xl transition flex items-center"
              >
                <PhoneCall className="w-4 h-4 mr-2 text-amber-400" />
                <span>Call {settings.primaryPhone || '+91 98051 43007'}</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img
                src="https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80"
                alt="Happy family on Manali Solang trip with Baglamukhi Travels"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Overlay card */}
            <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-5 rounded-2xl shadow-xl border border-slate-100 hidden sm:block max-w-xs">
              <div className="flex items-center space-x-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-900">"Flawless 6-day Shimla Manali & Devi Yatra!"</p>
              <p className="text-[11px] text-slate-500 mt-1">4.9/5 Rating across 1,200+ Google Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CABS & TAXI SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              Fleet & Cab Hire
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Chandigarh & Himachal Cab Booking
            </h2>
          </div>
          <Link
            to="/cabs"
            className="mt-4 md:mt-0 text-sm font-bold text-amber-600 hover:text-amber-800 flex items-center group transition"
          >
            <span>View All Cabs & Route Rates</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((srv) => (
            <ServiceCard key={srv._id} service={srv} onBookCab={() => openInquiry(srv.title)} />
          ))}
        </div>
      </section>

      {/* 6. SACRED MAA BAGLAMUKHI & 9 DEVI DARSHAN SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200/80 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="px-3 py-1 text-xs font-bold bg-amber-500 text-white rounded-full uppercase tracking-wider">
                Special Pilgrimage Yatra
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Sacred Maa Baglamukhi Dham & 9 Devi Darshan Tour
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Seek divine blessings at Maa Baglamukhi Temple Bankhandi, Mata Mansa Devi, Naina Devi, Chintpurni, Jwala Ji, Brajeshwari Kangra Devi, and Chamunda Devi with comfortable AC cabs and pure vegetarian hotel stays.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-800 font-semibold">
                <span className="bg-white px-3 py-1.5 rounded-xl border border-amber-200">🚩 Senior Citizen Friendly</span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-amber-200">🛕 VIP Darshan Guidance</span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-amber-200">🍱 Pure Veg Stays</span>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <span className="text-xs text-amber-700 font-bold uppercase tracking-wider block">Special Yatra Offer</span>
              <span className="text-2xl font-black text-slate-900 font-display block">Price on Request</span>
              <span className="text-xs text-slate-500 block mb-4">Customized 6 Days Yatra Package</span>
              <Link
                to="/pilgrimage-tours"
                className="inline-flex items-center px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl shadow-md transition"
              >
                <span>View Devi Darshan Details</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            What Our Travelers Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
            Read genuine testimonials from families, couples, and pilgrims who toured with Baglamukhi Tour & Travels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <TestimonialCard key={test._id} testimonial={test} />
          ))}
        </div>
      </section>

      {/* 8. LATEST TRAVEL BLOGS & SEO GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              Travel Inspiration & Tips
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Himachal Travel Guides & Articles
            </h2>
          </div>
          <Link
            to="/blog"
            className="mt-4 md:mt-0 text-sm font-bold text-amber-600 hover:text-amber-800 flex items-center group transition"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-start">
                <HelpCircle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                {faq.question}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 pl-6 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/faqs" className="text-xs font-bold text-amber-600 hover:text-amber-800">
            View all questions and booking policies →
          </Link>
        </div>
      </section>

      {/* 10. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display max-w-2xl mx-auto leading-tight">
            Ready for Your Holy Pilgrimage or Dream Mountain Vacation?
          </h2>
          <p className="text-xs sm:text-base text-amber-50 max-w-xl mx-auto font-light leading-relaxed">
            Get an instant custom quote with private cab, verified deluxe hotel stays, and personal mountain coordinator assistance from Baglamukhi Tour & Travels.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => openInquiry()}
              className="px-8 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              Get Free Custom Tour Plan
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '919805143007'}?text=Hi,%20I%20want%20to%20plan%20a%20tour%20package%20with%20Baglamukhi%20Tour%20%26%20Travels`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg transition flex items-center"
            >
              <span>Instant WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
