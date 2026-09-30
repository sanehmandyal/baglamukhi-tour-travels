import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Car,
  ShieldCheck,
  CheckCircle,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  Users,
  Briefcase,
  Mountain,
  Zap,
  MessageCircle,
  Compass,
  ChevronDown,
  Award,
  Fuel,
  Gauge,
  Navigation,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useSettings } from '../../context/SettingsContext';

const CabsPage = () => {
  const { settings } = useSettings();
  const { openInquiry } = useOutletContext();
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const himachaliFleet = [
    {
      id: 'force-cruiser',
      name: 'Force Cruiser & Trax Toofan 4×4',
      type: '4x4',
      category: 'Rugged Mountain Cruiser (9 to 13 Seater)',
      badge: 'Himachal Top Hill Taxi',
      colorName: 'Forest Olive Green / Mountain White',
      colorDot: 'bg-emerald-700',
      tagline: 'The #1 preferred mountain workhorse for group pilgrimages to Maa Baglamukhi Dham, Kinnaur, and tough Himachal valleys.',
      image: '/images/cabs/force-cruiser-4x4.jpg',
      passengers: '9 to 13 Passengers',
      luggage: 'Heavy Rooftop Carrier + Boot',
      transmission: 'High Torque 4x4 / Low Range Hill Gear',
      climateControl: 'High-Power Mountain Heater & AC',
      terrain: 'Maa Baglamukhi Shrines, Spiti Valley, Sach Pass, Pangi, Sangla, Remote Temples',
      features: [
        'High ground clearance (210mm) for rocky roads & streams',
        'Sturdy metal body with heavy-duty roof luggage rack',
        'High low-end torque for steep hill hairpin bends',
        'Comfortable cushioned bench & front-facing seating',
        'Local Pahadi driver with 10+ years rough terrain experience',
      ],
      idealFor: 'Pilgrimage Groups, Village Tours, Offbeat Spiti Treks, Remote Valleys',
    },
    {
      id: 'tempo-12s',
      name: 'Force Tempo Traveller (12 Seater Luxury Maharaja)',
      type: 'tempo',
      category: 'Maharaja Luxury Van (12 Seater + Driver)',
      badge: 'Top Pick for 9 Devi Yatra',
      colorName: 'Pearl White & Royal Navy Striping',
      colorDot: 'bg-blue-600',
      tagline: 'First-class luxury group travel with 2x1 Maharaja pushback recliner seats for joint families and devotional yatris.',
      image: '/images/cabs/force-tempo-traveller-12.jpg',
      passengers: '12 Passengers + 1 Driver',
      luggage: 'Dedicated Rear Boot + Heavy Roof Carrier',
      transmission: 'High Torque Common Rail Diesel',
      climateControl: 'Individual AC Blowers on Every Seat',
      terrain: 'Chandigarh to Manali, Shimla, Dharamshala, 9 Devi Circuit',
      features: [
        '2x1 Luxury Maharaja Pushback Recliner Seats with armrests',
        'Individual AC blowers and LED reading lamps per seat',
        'USB fast charging ports on every seat row',
        'HD LED TV, Bluetooth sound system for Bhajans/Music',
        'Air suspension tuned for jerk-free mountain journeys',
      ],
      idealFor: '9 Devi Darshan Yatra, Joint Families, Corporate Offsites, Group Tours',
    },
    {
      id: 'tempo-17s',
      name: 'Force Tempo Traveller (17 Seater Hill Specialist)',
      type: 'tempo',
      category: 'Executive Group Tourist Van (17 Seater + Driver)',
      badge: 'Large Group Champion',
      colorName: 'Touring Yellow & Metallic Silver',
      colorDot: 'bg-amber-500',
      tagline: 'Spacious 17-seater designed for large group pilgrimages, extended family tours, and corporate Himalayan getaways.',
      image: '/images/cabs/force-tempo-traveller-17.jpg',
      passengers: '17 Passengers + 1 Driver',
      luggage: 'Extra Heavy Rooftop Waterproof Carrier',
      transmission: 'High Torque Mountain Diesel',
      climateControl: 'Individual AC Outlets',
      terrain: 'Himachal Pilgrimage Circuit, Amritsar, Delhi to Manali Highway',
      features: [
        '2x2 Reclining Pushback Seats with Wide Center Aisle',
        'Individual AC Outlets on each passenger seat',
        'Curtains & Warm Ambient Interior Lighting',
        'Senior Citizen Friendly Low Step Entry',
        'Experienced Hill Master Chauffeur with mountain safety badge',
      ],
      idealFor: 'Large Group Pilgrimages, Wedding Guest Transfers, College Trips',
    },
    {
      id: 'tata-sumo',
      name: 'Tata Sumo Gold & Spacio 4×4',
      type: '4x4',
      category: 'Rugged Mountain Taxi (7+1 / 9 Seater)',
      badge: 'Pahadi Route Legend',
      colorName: 'Arctic Silver / Alpine White',
      colorDot: 'bg-zinc-700',
      tagline: 'The iconic high-clearance mountain taxi trusted for decades across Himachal ghats, Kangra temples, and Chamba routes.',
      image: '/images/cabs/tata-sumo-gold.jpg',
      passengers: '7 to 9 Passengers',
      luggage: 'Rooftop Carrier & Rear Boot Space',
      transmission: 'CR4 High Torque Hill Engine',
      climateControl: 'Cabin AC & Mountain Heating',
      terrain: 'Kangra Shaktipeeths, Chamba Ghats, Shimla, Kinnaur, Rural Valley Roads',
      features: [
        'Heavy-duty leaf spring rear suspension for rugged terrain',
        'High road clearance with steel bumper and metal body',
        'Reliable hill climbing capability under full passenger load',
        'Clean spacious seating with heavy-duty roof rack',
        'Native Pahadi driver familiar with all mountain shortcuts',
      ],
      idealFor: 'Family Temple Yatras, Remote Valley Travel, Budget Group Tours',
    },
    {
      id: 'innova-crysta',
      name: 'Toyota Innova Crysta',
      type: 'suv',
      category: 'Luxury Mountain SUV (6+1 / 7+1 Seater)',
      badge: '#1 Rated Family Hill SUV',
      colorName: 'Pearl White & Bronze Metallic',
      colorDot: 'bg-amber-600',
      tagline: 'The undisputed gold standard for family holidays, long hill journeys, smooth highway cruising, and steep mountain passes in Himachal Pradesh.',
      image: '/images/cabs/toyota-innova-crysta.jpg',
      passengers: '6 to 7 Passengers',
      luggage: '4 Large Bags + Heavy Roof Carrier',
      transmission: 'High-Power 2.4L Diesel / Hill Tuned',
      climateControl: 'Dual AC with Individual Rear Roof Vents',
      terrain: 'Himachal Ghats, Rohtang, Kinnaur, Spiti Highway, All Weather',
      features: [
        'Dual Automatic Climate AC with individual rear roof louvers',
        'Plush Captain reclining seats with armrests & ample legroom',
        'Top safety rating with multiple airbags & hill-hold assist',
        'Whisper quiet cabin with smooth mountain suspension',
        'Experienced Himachali mountain chauffeur with polite hospitality',
      ],
      idealFor: 'Family Vacations, Luxury Pilgrimage, Honeymoon Trips, Corporate Transfers',
    },
    {
      id: 'ertiga',
      name: 'Maruti Suzuki Ertiga Smart Hybrid',
      type: 'suv',
      category: 'Spacious Family MUV (6+1 Seater)',
      badge: 'Best Value for Families',
      colorName: 'Pearl Magma Grey Metallic',
      colorDot: 'bg-zinc-600',
      tagline: 'The most popular budget-friendly 6-seater family cab for smooth Himachal highway rides and economical family holidays.',
      image: '/images/cabs/maruti-ertiga.jpg',
      passengers: '5 to 6 Passengers',
      luggage: '3 Large Bags + Heavy Roof Carrier',
      transmission: 'Smooth 1.5L Smart Hybrid',
      climateControl: 'Dual AC with Roof Mounted Blower',
      terrain: 'Chandigarh, Shimla, Kalka, Kangra, Dharamshala, Dalhousie',
      features: [
        'Flexible 3-row seating with reclining backrests',
        'Dual air conditioning system with roof-mounted rear blower',
        'Excellent fuel economy with zero compromise on passenger comfort',
        'Clean, sanitized, non-smoking fleet guarantee',
        'Friendly Pahadi driver with deep local guidance & sightseeing tips',
      ],
      idealFor: 'Small Families, Senior Citizens, Weekend Getaways, Airport Transfers',
    },
    {
      id: 'dzire',
      name: 'Maruti Suzuki Swift Dzire ZXI+',
      type: 'sedan',
      category: 'Economy Hill Sedan (4+1 Seater)',
      badge: 'Couple & Solo Favorite',
      colorName: 'Deep Oxford Blue / Arctic White',
      colorDot: 'bg-blue-900',
      tagline: 'Quick, agile, and economical sedan for couples and small family sightseeing across Himachal Pradesh, Chandigarh, and Punjab.',
      image: '/images/cabs/swift-dzire.jpg',
      passengers: '3 to 4 Passengers',
      luggage: '2 Large Suitcases + Boot Space',
      transmission: 'Agile Hill Engine with Hill Assist',
      climateControl: 'Chilling AC & Heater',
      terrain: 'Shimla, Kasauli, Chandigarh Airport, Devi Temples, Delhi Transfers',
      features: [
        'Chilled AC and comfortable cushioned ergonomic rear seats',
        'Generous boot space for suitcases and travel bags',
        'Quick navigation through narrow hill station curves and market roads',
        'Punctual airport & railway station transfers with flight tracking',
        'Affordable direct rates with zero surge pricing',
      ],
      idealFor: 'Couples, Solo Travellers, Airport Pickups, Kalka Toy Train Transfers',
    },
    {
      id: 'thar-4x4',
      name: 'Mahindra Thar 4×4 Hard Top',
      type: '4x4',
      category: 'Mountain SUV & Snow Explorer (4 Seater 4WD)',
      badge: 'Snow & Offroad Beast',
      colorName: 'Red Rage 4WD / Napoli Black',
      colorDot: 'bg-red-600',
      tagline: 'Dominant Himalayan 4x4 SUV engineered to conquer live snow, high altitude passes, river crossings, and rugged Spiti circuits.',
      image: '/images/cabs/mahindra-thar-4x4.jpg',
      passengers: '4 Passengers',
      luggage: '3 Large Bags + Rear Space',
      transmission: 'mHawk 4x4 Shift-on-Fly / Low Range',
      climateControl: 'Extreme Cold Tested Climate Control',
      terrain: 'Atal Tunnel Snow, Sissu, Kaza, Chandratal, Kunzum Pass, Sach Pass',
      features: [
        'High mountain torque with 4WD Shift-on-Fly & mechanical locking diff',
        'High ground clearance (226mm) with 650mm water wading capacity',
        'Extreme cold tested heating and climate control system',
        'GPS live tracking with emergency SOS assistance',
        'Certified high-altitude mountain driver with snow driving skills',
      ],
      idealFor: 'Adventure Lovers, Snow Trips, Off-road Expeditions, Spiti Safaris',
    },
    {
      id: 'scorpio-4wd',
      name: 'Mahindra Scorpio 4WD Hill SUV',
      type: 'suv',
      category: 'Heavy Mountain SUV (6 to 7 Seater)',
      badge: 'Power & Durability',
      colorName: 'Diamond Arctic White',
      colorDot: 'bg-slate-200 border border-slate-400',
      tagline: 'Legendary Indian mountain SUV with superior hill-climbing power, high ground clearance, and rugged suspension for family expeditions.',
      image: '/images/cabs/mahindra-scorpio.jpg',
      passengers: '6 to 7 Passengers',
      luggage: '3 Large Bags + Heavy Roof Carrier',
      transmission: 'mHawk High-Torque Diesel Engine',
      climateControl: 'Powerful Dual AC & Cabin Heating',
      terrain: 'Chandigarh to Shimla Kinnaur, Dharamshala to Dalhousie, Manali Ghats',
      features: [
        'High seating command position with superior mountain road visibility',
        'Heavy-duty multi-link coil spring rear suspension',
        'High-torque mHawk diesel engineered for uphill climbing with full load',
        'Powerful dual cooling and heating for extreme weather',
        'Experienced Himachali driver who knows all hill shortcuts & viewpoints',
      ],
      idealFor: 'Family Hill Trips, Kinnaur Valley Circuit, Dharamshala & Dalhousie',
    },
  ];

  const popularRoutes = [
    { from: 'Chandigarh Airport (IXC)', to: 'Maa Baglamukhi Temple & Kangra', duration: '4.5 Hours', distance: '190 km', fleets: 'Sedan • SUV • Tempo Traveller' },
    { from: 'Chandigarh', to: 'Manali (via Atal Tunnel & Solang)', duration: '6.5 Hours', distance: '270 km', fleets: 'Innova Crysta • Ertiga • Tempo' },
    { from: 'Chandigarh', to: 'Shimla & Kufri', duration: '3.5 Hours', distance: '115 km', fleets: 'Dzire • Ertiga • Innova' },
    { from: 'Chandigarh / Una', to: 'Dharamshala & McLeodganj', duration: '5.0 Hours', distance: '245 km', fleets: 'Sedan • SUV • Cruiser 4x4' },
    { from: 'Kalka Railway Station', to: 'Shimla / Chail / Kasauli', duration: '2.5 Hours', distance: '85 km', fleets: 'Dzire • Innova Crysta' },
    { from: 'Delhi IGI Airport', to: 'Chandigarh & Himachal Pradesh', duration: '4.0 Hours', distance: '250 km', fleets: 'Dzire • Innova • Tempo 12S/17S' },
    { from: 'Chandigarh', to: 'Spiti Valley (Kaza / Chandratal)', duration: 'Multi-Day Circuit', distance: '1,200 km circuit', fleets: 'Thar 4x4 • Cruiser 4x4 • Innova' },
    { from: 'Chandigarh', to: 'Amritsar Golden Temple & Wagah', duration: '4.0 Hours', distance: '225 km', fleets: 'Dzire • Innova Crysta • Tempo' },
  ];

  const cabFaqs = [
    {
      q: 'Which cab is best for a family trip to Shimla and Manali?',
      a: 'For a family of 4 to 6 members, the Toyota Innova Crysta or Maruti Suzuki Ertiga is the most recommended vehicle due to high ground clearance, dual AC, plush captain seats, and ample luggage space for winter clothing. For couples, the Swift Dzire is economical and agile on hill curves.',
    },
    {
      q: 'Are toll taxes, parking fees, and driver allowances included in the quote?',
      a: 'Yes, when you book an all-inclusive tour package or roundtrip cab with Baglamukhi Tour & Travels, all state passenger taxes, toll plaza fees, parking charges, and driver night allowances are fully covered with 100% transparent pricing and zero hidden surcharges.',
    },
    {
      q: 'What is the luggage capacity on your Tempo Travellers and Cruisers?',
      a: 'All our Force Tempo Travellers (12S and 17S) and Force Cruisers are equipped with heavy-duty waterproof metal rooftop luggage carriers capable of holding large suitcases, plus spacious interior rear boot storage for fragile bags.',
    },
    {
      q: 'Do your cabs and drivers have permits for Rohtang Pass and Atal Tunnel?',
      a: 'Yes, our entire commercial tourist fleet is licensed with valid All-India Tourist Permits (AITP) and Himachal Pradesh transport clearance. Our local Pahadi drivers are experienced in acquiring necessary green permits and navigating snow routes safely.',
    },
    {
      q: 'How do I book a cab from Chandigarh Airport or Railway Station?',
      a: 'You can book instantly by clicking "Inquire Fleet" or contacting us via WhatsApp/Phone. Provide your flight or train arrival details, and your driver will be waiting at the arrival exit terminal with a personalized name-board and sanitized car.',
    },
  ];

  const filteredFleet = activeCategory === 'all'
    ? himachaliFleet
    : himachaliFleet.filter((cab) => cab.type === activeCategory);

  const categories = [
    { id: 'all', label: 'All Fleet Models', count: himachaliFleet.length },
    { id: 'suv', label: 'Family SUVs & MUVs (Innova / Ertiga)', count: himachaliFleet.filter(c => c.type === 'suv').length },
    { id: 'tempo', label: 'Tempo Travellers (12S / 17S)', count: himachaliFleet.filter(c => c.type === 'tempo').length },
    { id: '4x4', label: '4x4 & Mountain Cruisers (Thar / Trax)', count: himachaliFleet.filter(c => c.type === '4x4').length },
    { id: 'sedan', label: 'Economy Sedans (Dzire)', count: himachaliFleet.filter(c => c.type === 'sedan').length },
  ];

  return (
    <div className="space-y-14 pb-20 bg-slate-50/50">
      <SEOHead
        title="Himachal Cabs, Cruisers & Tempo Traveller Rental | Amb Andaura Taxi"
        description="Book verified commercial Himachal cabs: Force Cruiser 4x4, Toyota Innova Crysta, Maharaja Tempo Travellers (12S/17S/20S), and Ertiga. Station pickup at Amb Andaura (AADR), Una, and Chandigarh. Call +91 98051 43007."
        canonical="/cabs"
        keywords={[
          'Amb Andaura railway station taxi',
          'Maa Baglamukhi temple taxi service',
          'Himachal cab booking',
          'Force Cruiser 4x4 rental Himachal',
          'Tempo Traveller rental Chandigarh',
          'Innova Crysta taxi Amb Andaura to Kangra',
          'Una Himachal station cab service',
          'Chandigarh to Manali taxi service',
        ]}
      />

      {/* JSON-LD Structured Data for Local Taxi Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TaxiService',
            name: 'Baglamukhi Tour & Travels - Himachal Cabs & Fleet',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Baglamukhi Tour & Travels',
              telephone: settings.primaryPhone || '+91 98051 43007',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Amb Andaura / Kangra / Chandigarh',
                addressRegion: 'Himachal Pradesh',
                addressCountry: 'IN',
              },
            },
            areaServed: ['Amb Andaura', 'Kangra', 'Chandigarh', 'Himachal Pradesh', 'Shimla', 'Manali', 'Dharamshala', 'Amritsar', 'Delhi NCR'],
            description: 'Top-rated commercial tourist cab and tempo traveller booking service for Himachal Pradesh with expert hill chauffeurs.',
          }),
        }}
      />

      <Breadcrumbs items={[{ name: 'Cabs & Mountain Fleet', url: '/cabs' }]} />

      {/* Hero Banner with Gold Accents */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/90 py-16 text-white text-center px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.2),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto space-y-5 relative z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-amber-400" />
            100% Verified Commercial Mountain Fleet • Expert Pahadi Chauffeurs
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
            Himachal Cabs, Cruisers & <span className="text-amber-400">Tempo Travellers</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Travel across Himachal Pradesh, Punjab, and North India safely. Choose from our luxury Innova Crystas, rugged 4x4 Cruisers, and Maharaja Tempo Travellers with guaranteed transparent direct pricing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <button
              onClick={() => openInquiry('Cab Booking Inquiry')}
              className="px-7 py-3.5 text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 transition transform hover:-translate-y-0.5"
            >
              Get Instant Cab Fare Quote
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '919805143007'}?text=Hi%20Baglamukhi%20Tour%20%26%20Travels,%20I%20need%20a%20cab%20quote%20for%20Himachal`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-md flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct Booking</span>
            </a>
          </div>

          {/* Quick trust metrics */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs text-slate-300 font-medium">
            <span className="flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5" />
              Mountain-Certified Drivers
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-amber-400 mr-1.5" />
              Zero Hidden Charges
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 text-sky-400 mr-1.5" />
              24/7 Doorstep Pickup
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Category Filter Tabs */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Himachal Tourist Fleet</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Explore Our Verified Hill Cabs
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              All vehicles are commercially registered (Yellow Plate) with comprehensive tourist permits, all-weather AC/heater, and hill luggage carriers.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Fleet Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFleet.map((cab) => (
              <div
                key={cab.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-400 shadow-soft hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Vehicle Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={cab.image}
                      alt={cab.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge Top Left */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-[11px] font-black text-slate-950 bg-amber-400 backdrop-blur-md rounded-full shadow-sm">
                        {cab.badge}
                      </span>
                    </div>

                    {/* Color Theme Pill Top Right */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-md rounded-full flex items-center space-x-1.5 border border-white/20">
                        <span className={`w-2 h-2 rounded-full ${cab.colorDot}`}></span>
                        <span className="truncate max-w-[120px]">{cab.colorName}</span>
                      </span>
                    </div>

                    {/* Quality pill bottom right */}
                    <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl text-right border border-white/10">
                      <span className="text-[10px] text-amber-400 font-bold block">Chauffeur</span>
                      <span className="text-xs font-black text-white">Hill Certified</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition">
                        {cab.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{cab.category}</p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">{cab.tagline}</p>
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                      <div className="flex items-center space-x-1.5 text-slate-700">
                        <Users className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-semibold truncate">{cab.passengers}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-700">
                        <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-semibold truncate">{cab.luggage}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-700 pt-1 border-t border-slate-200/60">
                        <Fuel className="w-4 h-4 text-sky-600 shrink-0" />
                        <span className="text-[11px] text-slate-600 truncate">{cab.climateControl}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-700 pt-1 border-t border-slate-200/60">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-[11px] text-slate-600 truncate">GPS Tracked</span>
                      </div>
                      <div className="col-span-2 flex items-center space-x-1.5 text-slate-700 pt-1 border-t border-slate-200/60">
                        <Mountain className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-[11px] text-slate-600 truncate">Terrain: {cab.terrain}</span>
                      </div>
                    </div>

                    {/* Key Features Bullet List */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                        Included Hill Features:
                      </span>
                      {cab.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start text-xs text-slate-600">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Card */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10.5px] font-bold text-amber-600 uppercase block">Fare Estimate</span>
                    <span className="text-xs font-black text-slate-900">Price on Request</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '919805143007'}?text=Hi,%20I%20want%20to%20inquire%20about%20booking%20the%20${encodeURIComponent(cab.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition flex items-center justify-center border border-emerald-200"
                      title="WhatsApp Direct"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => openInquiry(`Cab Booking: ${cab.name}`)}
                      className="py-2.5 px-4 text-xs font-extrabold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl shadow-md shadow-amber-500/20 transition text-center"
                    >
                      Inquire Fleet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Travel Routes & Doorstep Transfers */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Direct Pickups & Transfers</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                Popular Himachal & Punjab Taxi Routes & Doorstep Transfers
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct door-to-door private cab service from Chandigarh Airport, Kalka Railway Station, Una (Vande Bharat), and Delhi NCR with verified Pahadi drivers.
              </p>
            </div>
            <button
              onClick={() => openInquiry('Custom Route Cab Quote')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition self-start shrink-0"
            >
              Get Custom Route Quote
            </button>
          </div>

          {/* Responsive Route Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, rIdx) => (
              <div
                key={rIdx}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-700 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{route.from}</span>
                  </div>
                  <div className="text-slate-400 text-xs pl-2">↓</div>
                  <div className="font-extrabold text-slate-900 text-sm">{route.to}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{route.distance} • {route.duration}</div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex flex-col space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">Available Fleets:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[150px]">{route.fleets}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">Fare Type:</span>
                    <span className="font-bold text-emerald-600">Custom Quote on Call</span>
                  </div>
                </div>

                <button
                  onClick={() => openInquiry(`Route Taxi: ${route.from} to ${route.to}`)}
                  className="w-full py-2 text-center text-xs font-bold text-amber-700 bg-amber-100/70 hover:bg-amber-200 rounded-xl transition"
                >
                  Inquire Route Fare →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Baglamukhi Tour & Travels Fleet (SEO Trust Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-base">Verified Pahadi Hill Chauffeurs</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Every driver holds mandatory commercial hill driving authorization with 5+ to 12+ years of experience navigating snow, hairpin bends, fog, and river crossings safely without motion sickness.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-base">100% Punctual Doorstep Pickup</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We monitor live flight statuses at Chandigarh (IXC) and Delhi (IGI) airports as well as Kalka/Una train schedules so your cab and chauffeur are waiting at the terminal exit gate on time.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-base">Statewide Himachal Backup Network</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              With dispatch hubs in Kangra, Dharamshala, Shimla, Manali, Kullu, and Chandigarh, prompt replacement vehicles are always on standby across all Himalayan highways.
            </p>
          </div>
        </div>

        {/* SEO FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Got Questions?</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Frequently Asked Questions About Himachal Cabs
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers to help you choose the best vehicle for your mountain holiday or temple pilgrimage.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto pt-4">
            {cabFaqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between text-xs sm:text-sm transition"
                >
                  <span className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaqIndex === fIdx ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === fIdx && (
                  <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black font-display">
              Ready to Book Your Mountain Cab with Experienced Driver?
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Get direct customized quotes for multi-day Himachal tour packages, 9 Devi Darshan yatra, or one-way airport taxi transfers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => openInquiry('Himachal Cab Booking Call Request')}
              className="px-6 py-3.5 text-xs sm:text-sm font-black text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition shadow-md"
            >
              Request Call Back
            </button>
            <a
              href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919805143007'}`}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition shadow-md flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CabsPage;
