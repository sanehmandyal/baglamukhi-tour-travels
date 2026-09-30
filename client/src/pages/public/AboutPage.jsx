import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ShieldCheck,
  Award,
  Users,
  Car,
  MapPin,
  Phone,
  CheckCircle,
  HeartHandshake,
} from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { OrganizationSchema } from '../../components/common/SchemaMarkup';
import { useSettings } from '../../context/SettingsContext';

const AboutPage = () => {
  const { settings } = useSettings();

  return (
    <div>
      <SEOHead
        title="About Us | Baglamukhi Tour & Travels - 15+ Years Travel Heritage"
        description="Learn about Baglamukhi Tour & Travels, Himachal Pradesh's trusted tour operator and taxi provider. Dedicated fleet, verified drivers, and 1,500+ happy travelers."
        canonical="/about-us"
        keywords={['About Baglamukhi Tour and Travels', 'Himachal tour operator', 'Amb Andaura taxi company', 'Maa Baglamukhi travel agency', 'Himachal driver verified']}
      />

      <OrganizationSchema />
      <Breadcrumbs items={[{ name: 'About Us', url: '/about-us' }]} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-16 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
            Local Experience • Honest Hospitality
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            About Baglamukhi Tour & Travels
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Crafting seamless, joyful, and safe Himalayan journeys across Himachal Pradesh, Punjab, Kashmir, and Uttarakhand for over 15 years.
          </p>
        </div>
      </section>

      {/* Main Story & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block">Our Story</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Born in the Foothills of the Himalayas
            </h2>
            <p>
              Founded by local Himachali travel enthusiasts, <strong>Baglamukhi Tour & Travels</strong> began with a simple mission: to provide transparent, safe, and truly authentic travel experiences without the inflated middlemen costs common in the tourism industry.
            </p>
            <p>
              Headquartered with operational hubs in Kangra and Chandigarh, we manage our own comprehensive fleet of commercial tourist vehicles—from executive Sedans and luxury Innova Crystas to 26-seater Maharaja Tempo Travellers and Volvo coaches.
            </p>
            <p>
              Over the past 15+ years, we have hosted more than 1,500 families, newlyweds on romantic honeymoons, devotional pilgrims for 9 Devi Darshan, and thrill-seekers on high-altitude Spiti expeditions.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-premium border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80"
              alt="Baglamukhi Tour and Travels mountain trip"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-display">Safety First</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every vehicle undergoes strict periodic fitness checks. Our drivers are trained specifically in mountain hairpin curves and snowfall handling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-display">100% Transparency</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No hidden driver charges, unexpected toll surprises, or mandatory commissions at tourist shops. You pay exactly what was quoted.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-display">Genuine Local Care</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Experience the warm traditional Himachali hospitality. We assist with itinerary changes, local food suggestions, and emergency care 24/7.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-display">1,500+ Happy Guests</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Maintaining an average 4.9 out of 5-star customer rating across Google and TripAdvisor reviews.
            </p>
          </div>
        </div>

        {/* NAP Office Information */}
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200 text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 font-display">Visit or Contact Our Head Office</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {settings.address || 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India'}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919805143007'}`}
              className="px-6 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition flex items-center"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              Call {settings.primaryPhone || '+91 98051 43007'}
            </a>
            <Link
              to="/contact-us"
              className="px-6 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition"
            >
              Get in Touch Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
