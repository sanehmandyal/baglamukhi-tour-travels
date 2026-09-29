import React from 'react';
import { Users, ShieldCheck, CheckCircle } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';

const GroupToursPage = () => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Group Tour Packages | College, Family & Social Group Trips | Thakur Travels"
        description="Organize large group tour packages to Manali, Shimla, and Goa with luxury tempo travellers, deluxe group hotel stays, and bonfire music nights."
        canonical="/group-tours"
      />
      <Breadcrumbs items={[{ name: 'Group Tours', url: '/group-tours' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-16 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Users className="w-3.5 h-3.5 mr-1" />
            Special Group Discounts
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Group Tour Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Planning a trip for 10 to 50+ members? Enjoy dedicated coach transport, bulk hotel pricing, DJ bonfire nights, and full tour coordination.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">Group Holiday Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>12, 17, 26 Seater Luxury Tempo Travellers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Multi-Cuisine Buffet Dining & Snacks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Evening Bonfire & Music Arrangements</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Dedicated On-Ground Tour Manager</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <BookingForm defaultPackage="Group Tour Package" defaultDestination="Manali / Shimla" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupToursPage;
