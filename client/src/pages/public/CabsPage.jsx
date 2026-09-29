import React from 'react';
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
} from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useSettings } from '../../context/SettingsContext';

const CabsPage = () => {
  const { settings } = useSettings();
  const { openInquiry } = useOutletContext();

  const himachaliFleet = [
    {
      name: 'Toyota Innova Crysta',
      category: 'Luxury Mountain SUV (6+1 / 7+1 Seater)',
      tagline: 'The undisputed gold standard for family vacations, long hill journeys, and high mountain passes.',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      passengers: '6 to 7 Passengers',
      luggage: '4 Large Bags + Heavy Roof Carrier',
      transmission: 'High-Power Diesel / Mountain Tuned',
      terrain: 'Himachal Ghats, Rohtang, Kinnaur, Spiti Highway',
      features: [
        'Dual Automatic AC with individual rear roof vents',
        'Plush Captain reclining seats with armrests',
        'Top safety with 7 airbags & hill-hold assist',
        'Smooth suspension on uneven hill curves',
        'Experienced Himachali mountain chauffeur',
      ],
      idealFor: 'Family Vacations, Luxury Pilgrimage, Honeymoon Trips, Corporate Transfers',
    },
    {
      name: 'Maruti Suzuki Swift Dzire',
      category: 'Economy Hill Sedan (4+1 Seater)',
      tagline: 'Quick, agile, and economical sedan for couples and small family sightseeing.',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
      passengers: '3 to 4 Passengers',
      luggage: '2 Large Suitcases + Boot Space',
      transmission: 'Fuel Efficient Smooth Hill Engine',
      terrain: 'Shimla, Kasauli, Chandigarh Airport, Devi Temples',
      features: [
        'Chilled AC and comfortable cushioned rear seats',
        'Generous boot space for luggage',
        'Quick navigation through narrow hill station curves',
        'Punctual airport & railway station transfers',
        'Affordable direct rates without surge pricing',
      ],
      idealFor: 'Couples, Solo Travellers, Airport Pickups, Kalka Toy Train Transfers',
    },
    {
      name: 'Maruti Suzuki Ertiga Smart Hybrid',
      category: 'Spacious Family MUV (6+1 Seater)',
      tagline: 'The most popular budget-friendly family cab for smooth Himachal highway rides.',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
      passengers: '5 to 6 Passengers',
      luggage: '3 Large Bags + Heavy Roof Carrier',
      transmission: 'Smooth Petrol Hybrid',
      terrain: 'Chandigarh, Shimla, Kalka, Kangra, Dharamshala',
      features: [
        'Flexible 3-row seating with reclining backrests',
        'Dual air conditioning throughout the cabin',
        'Excellent ride economy with no compromise on comfort',
        'Clean, sanitized, non-smoking fleet guarantee',
        'Friendly Pahadi driver with local city guidance',
      ],
      idealFor: 'Small Families, Senior Citizens, Weekend Getaways, Airport Transfers',
    },
    {
      name: 'Force Cruiser & Trax Toofan 4×4',
      category: 'Rugged Himachal Mountain Cruiser (9 to 13 Seater)',
      tagline: 'High-capacity rugged mountain warrior built for tough hill terrain and large groups.',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      passengers: '9 to 13 Passengers',
      luggage: 'Heavy Rooftop Carrier + Boot Space',
      transmission: 'Heavy Duty 4x4 / Low Range Hill Gear',
      terrain: 'Spiti Valley, Sach Pass, Pangi, Sangla, Remote Temples',
      features: [
        'High ground clearance (210mm) for rocky roads',
        'Sturdy metal body with heavy roof luggage rack',
        'Powerful low-end torque for steep hill climbs',
        'Comfortable cushioned bench & front-facing options',
        'Local driver with 10+ years rough terrain experience',
      ],
      idealFor: 'Pilgrimage Groups, Village Tours, Offbeat Trekking Teams, Remote Valleys',
    },
    {
      name: 'Force Tempo Traveller (12 Seater Luxury Maharaja)',
      category: 'Maharaja Luxury Van (12 Seater + Driver)',
      tagline: 'First-class luxury travel with 2x1 Maharaja pushback seats for families and yatris.',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      passengers: '12 Passengers + 1 Driver',
      luggage: 'Dedicated Rear Luggage Boot + Roof Carrier',
      transmission: 'High Torque Common Rail Diesel',
      terrain: 'Chandigarh to Manali, Shimla, Dharamshala, 9 Devi Circuit',
      features: [
        '2x1 Luxury Maharaja Pushback Recliner Seats',
        'Individual AC blowers and LED reading lamps',
        'USB fast charging ports on every seat row',
        'HD LED TV, Bluetooth sound system for Bhajans/Music',
        'Air suspension for jerk-free mountain ride',
      ],
      idealFor: '9 Devi Darshan Yatra, Joint Families, Corporate Offsites, Group Tours',
    },
    {
      name: 'Force Tempo Traveller (17 Seater Hill Specialist)',
      category: 'Executive Group Tourist Van (17 Seater + Driver)',
      tagline: 'Spacious 17-seater designed for large group pilgrimages, corporate tours, and weddings.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      passengers: '17 Passengers + 1 Driver',
      luggage: 'Heavy Rooftop Waterproof Carrier',
      transmission: 'High Torque Mountain Diesel',
      terrain: 'Himachal Pilgrimage Circuit, Amritsar, Delhi to Manali',
      features: [
        '2x2 Reclining Pushback Seats with Wide Center Aisle',
        'Individual AC Outlets on each seat',
        'Curtains & Ambient Warm Interior Lighting',
        'Senior Citizen Friendly Low Step Entry',
        'Experienced Hill Master Chauffeur',
      ],
      idealFor: 'Large Group Pilgrimages, Wedding Guest Transfers, College Trips',
    },
    {
      name: 'Force Urbania (Ultra Luxury Executive Van 12/16S)',
      category: 'Ultra Luxury Executive Van (12 / 16 Seater)',
      tagline: 'Next-generation European luxury with independent suspension and panoramic mountain windows.',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      passengers: '12 to 16 Passengers',
      luggage: 'Integrated Rear Boot + Roof Carrier',
      transmission: 'Mercedes-Derived CRDI Engine',
      terrain: 'VIP Himachal Tours, Expressway Travel, Devi Darshan',
      features: [
        'Monocoque European Safety Body with Dual Airbags',
        'Independent Front Suspension for Ultra Smooth Ride',
        'Panoramic Tinted Glass Windows for Scenic Views',
        'Dual Climate Control AC with Individual Louvers',
        'Reclining Ergonomic Seats with Armrests',
      ],
      idealFor: 'VIP Tours, Luxury Corporate Retreats, High-End Pilgrimages',
    },
    {
      name: 'Mahindra Thar 4×4 & Scorpio 4WD',
      category: 'Mountain SUV & Snow Explorer (4 to 6 Seater)',
      tagline: 'Dominant Himalayan 4x4 SUVs engineered to conquer snow, high altitude passes, and river beds.',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
      passengers: '4 to 6 Passengers',
      luggage: '3 Large Bags + Rear Space',
      transmission: 'mHawk 4x4 Shift-on-Fly / Low Range',
      terrain: 'Atal Tunnel Snow, Sissu, Kaza, Chandratal, Kunzum Pass',
      features: [
        'High mountain torque with 4WD Shift-on-Fly',
        'High ground clearance (226mm) for snow & water crossings',
        'Extreme cold tested heating and climate control',
        'GPS live tracking with emergency SOS assistance',
        'Certified high-altitude mountain driver',
      ],
      idealFor: 'Adventure Lovers, Snow Trips, Off-road Expeditions, Spiti Safaris',
    },
  ];

  const popularRoutes = [
    { from: 'Chandigarh Airport (IXC)', to: 'Maa Baglamukhi Temple & Kangra', duration: '4.5 Hours', road: 'Smooth 4-Lane NH' },
    { from: 'Chandigarh', to: 'Manali (via Atal Tunnel & Solang)', duration: '6.5 Hours', road: 'Expressway Tunnels' },
    { from: 'Chandigarh', to: 'Shimla & Kufri', duration: '3.5 Hours', road: 'Himalayan Expressway' },
    { from: 'Chandigarh / Una', to: 'Dharamshala & McLeodganj', duration: '5.0 Hours', road: 'Scenic Kangra Valley' },
    { from: 'Kalka Railway Station', to: 'Shimla / Chail / Kasauli', duration: '2.5 Hours', road: 'Mountain Highway' },
    { from: 'Delhi IGI Airport', to: 'Chandigarh & Himachal Pradesh', duration: '4.0 Hours', road: 'Grand Trunk Road NH-44' },
    { from: 'Chandigarh', to: 'Spiti Valley (Kaza / Tabo / Chandratal)', duration: 'Multi-Day', road: '4x4 Mountain Route' },
    { from: 'Chandigarh', to: 'Amritsar Golden Temple & Wagah', duration: '4.0 Hours', road: 'Smooth 6-Lane Highway' },
  ];

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Himachal Cabs, Cruisers & Tempo Traveller Rental | Baglamukhi Tour & Travels"
        description="Hire Toyota Innova Crysta, Force Cruiser 4x4, Luxury Tempo Travellers, and Ertiga cabs in Chandigarh & Himachal with verified Pahadi drivers. Best direct rates on request."
        canonical="/cabs"
        keywords={['Innova Crysta Himachal', 'Force Cruiser 4x4 rental', 'Tempo Traveller Chandigarh to Manali', 'Baglamukhi temple taxi service']}
      />

      <Breadcrumbs items={[{ name: 'Cabs & Mountain Fleet', url: '/cabs' }]} />

      {/* Hero Banner with Gold Accents */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/80 py-16 text-white text-center px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-400/20 text-amber-400 border border-amber-400/30 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            24/7 Verified Mountain Fleet & Expert Pahadi Drivers
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Himachal Cabs, Cruisers & <span className="text-amber-400">Tempo Travellers</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Travel across Himachal Pradesh, Punjab, and North India safely. Choose from our luxury Innova Crystas, rugged 4x4 Cruisers, and Maharaja Tempo Travellers with zero hidden charges.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openInquiry('Cab Booking Inquiry')}
              className="px-6 py-3 text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 transition transform hover:-translate-y-0.5"
            >
              Inquire Best Cab Rate
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '919800000000'}?text=Hi%20Baglamukhi%20Tour%20%26%20Travels,%20I%20need%20a%20cab%20quote`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

      {/* Fleet Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Premium Mountain Fleet</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Choose Your Himachali Ride
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              All vehicles are commercially licensed with full tourist permits, state tax clearance, and expert hill chauffeurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {himachaliFleet.map((cab, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-amber-400/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Vehicle Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={cab.image}
                      alt={cab.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-[11px] font-bold text-slate-900 bg-amber-400 backdrop-blur-md rounded-full shadow-sm">
                        {cab.category.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition">
                        {cab.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{cab.category}</p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-light">{cab.tagline}</p>
                    </div>

                    {/* Quick Specs Badges */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                      <div className="flex items-center space-x-1.5 text-slate-700">
                        <Users className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-semibold truncate">{cab.passengers}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-700">
                        <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-semibold truncate">{cab.luggage}</span>
                      </div>
                      <div className="col-span-2 flex items-center space-x-1.5 text-slate-700 pt-1 border-t border-slate-200/60">
                        <Mountain className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-[11px] text-slate-600 truncate">Terrain: {cab.terrain}</span>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                        Included Features:
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
                    <span className="text-[10.5px] font-bold text-amber-600 uppercase block">Local Direct Rate</span>
                    <span className="text-xs font-black text-slate-900">Price on Request</span>
                  </div>
                  <button
                    onClick={() => openInquiry(`Cab Booking: ${cab.name}`)}
                    className="px-4 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl shadow-md shadow-amber-500/20 transition"
                  >
                    Inquire Fleet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Travel Routes */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Direct Pickups & Transfers</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                Popular Himachal & Punjab Taxi Routes
              </h3>
              <p className="text-xs text-slate-500">
                Doorstep pickup from Chandigarh Airport, Kalka Railway Station, Una (Vande Bharat), and Delhi NCR.
              </p>
            </div>
            <button
              onClick={() => openInquiry('Custom Route Cab Quote')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition self-start"
            >
              Get Custom Route Fare
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, rIdx) => (
              <div
                key={rIdx}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 hover:border-amber-400 hover:bg-amber-50/30 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-700 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{route.from}</span>
                  </div>
                  <div className="text-slate-400 text-xs pl-2">↓</div>
                  <div className="font-extrabold text-slate-900 text-sm">{route.to}</div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 text-slate-400 mr-1" />
                    {route.duration}
                  </span>
                  <button
                    onClick={() => openInquiry(`Route Taxi: ${route.from} to ${route.to}`)}
                    className="text-amber-600 font-bold hover:underline"
                  >
                    Inquire →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Baglamukhi Tour & Travels Fleet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900">Verified Pahadi Hill Chauffeurs</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Every driver holds commercial hill driving authorization and has 5+ years navigating snow, narrow ghats, and high altitude terrain safely.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900">100% Punctual Doorstep Pickup</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              We monitor incoming flights and train arrivals at Chandigarh and Delhi so your cab is waiting at the exit gate with zero delay.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900">Himachal Wide Backup Network</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              With partner stations in Kangra, Shimla, Manali, Kullu, and Chandigarh, replacement cabs are always available for seamless safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabsPage;
