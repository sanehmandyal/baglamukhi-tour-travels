import React from 'react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const CancellationRefundPage = () => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Cancellation & Refund Policy | Baglamukhi Tour & Travels"
        description="Clear, fair cancellation and refund policy for Himachal tour packages, hotel reservations, and taxi bookings."
        canonical="/cancellation-refund-policy"
      />
      <Breadcrumbs items={[{ name: 'Cancellation Policy', url: '/cancellation-refund-policy' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-12 text-white text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display">Cancellation & Refund Policy</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">Transparent, Fair & Customer Friendly</p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6 font-light">
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">1. Standard Cancellation Refund Slabs</h3>
          <ul className="space-y-2">
            <li>• <strong>10 or more days before departure:</strong> 100% Refund (minus nominal ₹500 administrative bank processing fee).</li>
            <li>• <strong>5 to 9 days before departure:</strong> 50% Refund of the total tour advance.</li>
            <li>• <strong>Less than 4 days before departure:</strong> No refund on token advance as hotel rooms and cabs are already blocked.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">2. Flexible Free Date-Rescheduling</h3>
          <p>
            If you need to postpone your trip due to flight cancellation, family emergency, or illness, we allow <strong>100% free date-rescheduling</strong> up to 6 months in advance with zero penalty.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">3. Processing Time</h3>
          <p>
            Approved refunds are credited back to the original source bank account or UPI handle within 3 to 5 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPage;
