import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Car,
  ShieldCheck,
  CheckCircle,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ServiceCard from '../../components/cards/ServiceCard';
import { useSettings } from '../../context/SettingsContext';

const CabsPage = () => {
  const { settings } = useSettings();
  const { openInquiry } = useOutletContext();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching cabs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const routeRates = [
    { route: 'Chandigarh to Manali (One Way / Round Trip)', sedan: '₹4,499', ertiga: '₹5,499', innova: '₹6,999', tempo: '₹10,500' },
    { route: 'Chandigarh to Shimla (One Way / Round Trip)', sedan: '₹2,499', ertiga: '₹3,299', innova: '₹3,999', tempo: '₹6,200' },
    { route: 'Chandigarh to Dharamshala / McLeodganj', sedan: '₹4,199', ertiga: '₹5,199', innova: '₹6,499', tempo: '₹9,500' },
    { route: 'Chandigarh to Amritsar Golden Temple', sedan: '₹3,799', ertiga: '₹4,799', innova: '₹5,799', tempo: '₹8,999' },
    { route: 'Chandigarh to Dalhousie & Khajjiar', sedan: '₹4,799', ertiga: '₹5,999', innova: '₹7,499', tempo: '₹11,500' },
    { route: 'Chandigarh to Delhi IGI Airport', sedan: '₹3,299', ertiga: '₹4,299', innova: '₹4,999', tempo: '₹8,000' },
  ];

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Cab Booking & Taxi Service in Chandigarh & Himachal | Thakur Travels"
        description="Book 24/7 reliable taxi service in Chandigarh for Shimla, Manali, Dharamshala, and Delhi airport. Lowest per km rates, clean cars, mountain-certified drivers."
        canonical="/cabs"
        keywords={['cab booking Chandigarh', 'taxi service Chandigarh to Manali', 'Innova Crysta rental', 'Shimla taxi service']}
      />

      <Breadcrumbs items={[{ name: 'Cab & Taxi Services', url: '/cabs' }]} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amberGold-400" />
            24/7 Instant Dispatch Fleet
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Chandigarh & Himachal Cab Booking
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Travel across North India safely in clean, sanitized, and GPS-enabled Sedan, Ertiga, Innova Crysta, and Tempo Travellers with polite local chauffeurs.
          </p>
        </div>
      </section>

      {/* Fleet Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display mb-6">Our Verified Vehicle Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => (
              <ServiceCard key={srv._id} service={srv} onBookCab={() => openInquiry(srv.title)} />
            ))}
          </div>
        </div>

        {/* Popular Route Fare Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Popular Taxi Route Fixed Fares</h3>
              <p className="text-xs text-slate-500">Transparent pricing with zero hidden surcharges.</p>
            </div>
            <button
              onClick={() => openInquiry('Custom Taxi Route Quote')}
              className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition self-start"
            >
              Get Custom Quote
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-3 px-4">Route & Destination</th>
                  <th className="py-3 px-3">Sedan (Dzire/Etios)</th>
                  <th className="py-3 px-3">Ertiga (6-Seater)</th>
                  <th className="py-3 px-3">Innova Crysta</th>
                  <th className="py-3 px-3">Tempo Traveller</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {routeRates.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">{r.route}</td>
                    <td className="py-3 px-3 text-brand-700 font-bold">{r.sedan}</td>
                    <td className="py-3 px-3 text-brand-700 font-bold">{r.ertiga}</td>
                    <td className="py-3 px-3 text-brand-700 font-bold">{r.innova}</td>
                    <td className="py-3 px-3 text-brand-700 font-bold">{r.tempo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Book Cabs with Baglamukhi Tour & Travels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-500 mr-2" />
              Verified Mountain Drivers
            </h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Every driver in our roster holds commercial tourist permits and has 5+ years of verified hill driving experience on narrow ghat roads.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center">
              <Clock className="w-5 h-5 text-brand-600 mr-2" />
              100% Punctual Pickups
            </h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              We guarantee on-time cab arrivals at your residence, hotel, or airport terminal with flight tracking included.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center">
              <Phone className="w-5 h-5 text-rose-500 mr-2" />
              24/7 Road Assistance
            </h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              In the rare event of mechanical issues, our backup vehicle network across Himachal guarantees rapid replacement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabsPage;
