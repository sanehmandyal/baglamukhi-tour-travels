import React from 'react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const TermsConditionsPage = () => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Terms & Conditions | Baglamukhi Tour & Travels"
        description="Terms and conditions for booking tour packages and taxi services with Baglamukhi Tour & Travels."
        canonical="/terms-and-conditions"
      />
      <Breadcrumbs items={[{ name: 'Terms & Conditions', url: '/terms-and-conditions' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-12 text-white text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display">Terms & Conditions</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">Operational Guidelines & Booking Agreement</p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6 font-light">
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">1. Booking Confirmation</h3>
          <p>
            A tour package or cab booking is formally confirmed upon receipt of the mutually agreed token advance amount (usually 20-25%). Upon confirmation, an official booking receipt is issued.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">2. Vehicle AC Policy in Hill Sections</h3>
          <p>
            Air conditioning in vehicles operates continuously across plain highway stretches. In steep uphill hill sections (e.g. climbing towards Shimla, Manali, Rohtang), AC is switched off for vehicle engine safety and smooth ascent, which is standard mountain practice.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">3. Unforeseen Weather & Natural Roadblocks</h3>
          <p>
            In the event of heavy snowfall, landslides, or administrative pass closures (e.g. Rohtang Pass or Kunzum Pass), Baglamukhi Tour & Travels will arrange alternative sightseeing routes or adjust timings at no additional management charge.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">4. Payment Balance</h3>
          <p>
            The remaining balance of the tour package cost is payable upon arrival in Chandigarh or at the check-in hotel in Himachal Pradesh.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
