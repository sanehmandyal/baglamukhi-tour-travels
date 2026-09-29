import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Compass, PhoneCall } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import { useSettings } from '../../context/SettingsContext';

const ThankYouPage = () => {
  const { settings } = useSettings();

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto text-center space-y-6">
      <SEOHead title="Thank You | Baglamukhi Tour & Travels" noindex={true} />

      <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10" />
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 font-display">Thank You!</h1>
      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
        We appreciate you reaching out to Baglamukhi Tour & Travels. One of our dedicated Himachal tourism advisors will contact you shortly.
      </p>

      <div className="pt-4 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="px-6 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition flex items-center"
        >
          <Home className="w-4 h-4 mr-1.5" />
          Back to Homepage
        </Link>
        <Link
          to="/tours"
          className="px-6 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center"
        >
          <Compass className="w-4 h-4 mr-1.5" />
          Explore Tours
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
