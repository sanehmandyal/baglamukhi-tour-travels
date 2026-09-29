import React, { useState } from 'react';
import { Plane, Clock, ShieldCheck, CheckCircle, PhoneCall, ArrowRight, MapPin } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';
import { useSettings } from '../../context/SettingsContext';

const AirportTransfersPage = () => {
  const { settings } = useSettings();

  const airportRoutes = [
    { from: 'Chandigarh Airport (IXC)', to: 'Shimla Mall Road', time: '3.5 hrs', sedan: '₹2,799', suv: '₹4,299', tempo: '₹6,999' },
    { from: 'Chandigarh Airport (IXC)', to: 'Manali / Solang', time: '6.5 hrs', sedan: '₹4,699', suv: '₹6,899', tempo: '₹11,000' },
    { from: 'Chandigarh Airport (IXC)', to: 'Dharamshala / McLeodganj', time: '5.5 hrs', sedan: '₹4,499', suv: '₹6,299', tempo: '₹9,800' },
    { from: 'Chandigarh Airport (IXC)', to: 'Amritsar Golden Temple', time: '4 hrs', sedan: '₹3,999', suv: '₹5,499', tempo: '₹8,999' },
    { from: 'Chandigarh Tricity', to: 'New Delhi IGI Airport (DEL)', time: '4 hrs', sedan: '₹3,499', suv: '₹4,999', tempo: '₹8,499' },
  ];

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Airport Transfer Taxi Service | Chandigarh (IXC) & Delhi (DEL) Airport"
        description="Book 24/7 on-time airport taxi pickups and drops at Chandigarh Airport (IXC) and Delhi IGI Airport (DEL) to Himachal hills. Live flight tracking included."
        canonical="/services/airport-transfer"
        keywords={['Chandigarh airport taxi', 'Delhi airport to Shimla cab', 'airport transfer Chandigarh', 'airport taxi booking']}
      />

      <Breadcrumbs
        items={[
          { name: 'Services', url: '/cabs' },
          { name: 'Airport Transfers', url: '/services/airport-transfer' },
        ]}
      />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Plane className="w-3.5 h-3.5 mr-1" />
            Guaranteed On-Time Airport Cabs
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Airport Taxi Transfers
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Hassle-free meet and greet service at Chandigarh International Airport (IXC) and New Delhi IGI Airport (DEL) with zero waiting charges on flight delays.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">Why Book Airport Cabs With Us?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Live Flight Tracking:</strong> Driver arrives strictly according to your actual touchdown time.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Meet & Greet:</strong> Chauffeur waiting at arrival gate with your name-placard.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Fixed Low Fares:</strong> No surge pricing during rain, late night, or rush hours.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Ample Boot Space:</strong> Specially curated vehicles accommodating large suitcases easily.</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-display">Popular Airport Transfer Rates</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                      <th className="py-2.5 px-3">Pickup Airport</th>
                      <th className="py-2.5 px-3">Destination</th>
                      <th className="py-2.5 px-3">Sedan</th>
                      <th className="py-2.5 px-3">Innova Crysta</th>
                      <th className="py-2.5 px-3">Tempo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {airportRoutes.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50/80">
                        <td className="py-2.5 px-3 font-medium text-slate-900">{r.from}</td>
                        <td className="py-2.5 px-3">{r.to}</td>
                        <td className="py-2.5 px-3 text-brand-700 font-bold">{r.sedan}</td>
                        <td className="py-2.5 px-3 text-brand-700 font-bold">{r.suv}</td>
                        <td className="py-2.5 px-3 text-brand-700 font-bold">{r.tempo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <BookingForm defaultPackage="Airport Taxi Transfer" defaultDestination="Shimla / Manali" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportTransfersPage;
