import React from 'react';
import { Briefcase, ShieldCheck, CheckCircle } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';

const CorporateTravelPage = () => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Corporate Travel & Offsite Tours in Himachal | Baglamukhi Tour & Travels"
        description="Corporate retreat management, team offsites, executive cab fleets, conference logistics, and resort bookings in Chandigarh and Himachal."
        canonical="/corporate-travel"
      />
      <Breadcrumbs items={[{ name: 'Corporate Travel', url: '/corporate-travel' }]} />

      <section className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 py-16 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 mr-1" />
            Executive & Corporate Logistics
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Corporate Retreats & Travel
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Professional logistics for corporate offsites, leadership retreats, conference delegations, and employee group vacations across Himachal.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">Corporate Travel Solutions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>GST Invoices with Complete Compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Executive Innova Crysta & Volvo Fleets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Conference Resort Tie-ups with Projector Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Team Building Adventure Activities</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <BookingForm defaultPackage="Corporate Offsite Retreat" defaultDestination="Kasauli / Manali" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateTravelPage;
