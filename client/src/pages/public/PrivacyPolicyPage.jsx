import React from 'react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const PrivacyPolicyPage = () => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Privacy Policy | Baglamukhi Tour & Travels"
        description="Privacy policy of Baglamukhi Tour & Travels. Learn how we safeguard your personal data, booking details, and contact information."
        canonical="/privacy-policy"
      />
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy-policy' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-12 text-white text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display">Privacy Policy</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">Last Updated: January 2025</p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6 font-light">
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">1. Information We Collect</h3>
          <p>
            When you make an inquiry or book a holiday package / taxi with <strong>Baglamukhi Tour & Travels</strong>, we collect basic details including your name, email address, mobile phone number, pickup city, and travel dates.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">2. How We Use Your Information</h3>
          <p>
            Your information is used exclusively to prepare customized tour quotes, issue hotel booking vouchers, coordinate with assigned chauffeurs, and send SMS/WhatsApp itinerary updates. We do not sell or lease your personal information to third-party advertisers.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">3. Data Security</h3>
          <p>
            We implement modern encryption and access control protocols to protect your personal information against unauthorized access, alteration, or disclosure.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 font-display">4. Contacting Us</h3>
          <p>
            If you have questions regarding our privacy practices, you can contact us at <strong>info@baglamukhitourtravels.com</strong> or call <strong>+91 98000 00000</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
