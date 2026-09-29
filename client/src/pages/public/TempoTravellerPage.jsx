import React from 'react';
import { Users, ShieldCheck, CheckCircle, PhoneCall, Sparkles, Tv, Wifi, Zap } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';

const TempoTravellerPage = () => {
  const models = [
    {
      name: '9-12 Seater 1x1 Maharaja Luxury Tempo',
      capacity: '9 to 12 Passengers',
      rate: '₹22 / km or ₹5,500 / day',
      features: ['1x1 Pushback Recliner Seats', 'Individual AC Vents', 'LED TV & Surround Sound', 'USB Mobile Chargers', 'Huge Rear Luggage Boot'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: '16-17 Seater Executive Tempo Traveller',
      capacity: '16 to 17 Passengers',
      rate: '₹25 / km or ₹6,500 / day',
      features: ['Spacious Aisle Walking Space', 'Individual Headrests & Armrests', 'High Roof Standing Clearance', 'Roof Carrier with Waterproof Cover'],
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: '20-26 Seater Tourist Mini Coach',
      capacity: '20 to 26 Passengers',
      rate: '₹32 / km or ₹8,500 / day',
      features: ['Air Suspension for Smooth Hill Ride', 'Dual Powerful AC Units', 'Dedicated Mic System for Tour Guides', 'Heavy Underfloor Luggage Bays'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Tempo Traveller Rental in Chandigarh & Himachal | 9, 12, 16, 26 Seater"
        description="Hire luxury Maharaja Tempo Travellers (9 to 26 seater) with 1x1 pushback seats in Chandigarh, Mohali, and Himachal for group tours and weddings."
        canonical="/services/tempo-traveller"
        keywords={['tempo traveller rental Chandigarh', '12 seater tempo traveller Manali', 'luxury maharaja tempo hire', 'tempo traveller price per km']}
      />

      <Breadcrumbs
        items={[
          { name: 'Services', url: '/cabs' },
          { name: 'Tempo Traveller Rental', url: '/services/tempo-traveller' },
        ]}
      />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Users className="w-3.5 h-3.5 mr-1" />
            Luxury Group Travel
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Tempo Traveller Rental
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Comfortable, air-conditioned 9 to 26 seater Maharaja tempo travellers with sofa seating, LED entertainment, and expert mountain chauffeurs.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              {models.map((m, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft flex flex-col md:flex-row">
                  <div className="md:w-1/3 aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900 font-display">{m.name}</h3>
                        <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
                          {m.capacity}
                        </span>
                      </div>
                      <p className="text-xs font-extrabold text-slate-700 mt-1">Rate: <span className="text-brand-600">{m.rate}</span></p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs text-slate-600">
                        {m.features.map((f, i) => (
                          <div key={i} className="flex items-center">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mr-1.5 flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <BookingForm defaultPackage="Tempo Traveller Hire" defaultDestination="Himachal Tour" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempoTravellerPage;
