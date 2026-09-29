import React from 'react';
import { Sparkles, CheckCircle, PhoneCall, ShieldCheck, HeartHandshake } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';
import { useSettings } from '../../context/SettingsContext';

const CustomizedToursPage = () => {
  const { settings } = useSettings();

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Customized Himachal Tour Packages | Plan Your Custom Itinerary"
        description="Design your custom dream holiday to Himachal Pradesh with Baglamukhi Tour & Travels. Choose your dates, favorite destinations, hotel category, and vehicle."
        canonical="/customized-tours"
      />
      <Breadcrumbs items={[{ name: 'Customized Tours', url: '/customized-tours' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-16 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            100% Tailor-Made Plans
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Customized Tour Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Your holiday, your rhythm. Customize every day, choose boutique cottages or 5-star resorts, and travel in your vehicle of choice.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">How Custom Tour Planning Works</h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Share Your Dream Wishlist</h4>
                    <p className="text-xs text-slate-600">Tell us your preferred travel dates, destination wishlist, budget range, and special preferences.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Personalized Day-by-Day Blueprint</h4>
                    <p className="text-xs text-slate-600">Our senior local travel coordinator drafts a custom itinerary with verified travel times and scenic photo stops.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Zero-Stress Transparent Booking</h4>
                    <p className="text-xs text-slate-600">Review hotel photos, vehicle models, and transparent inclusions before finalizing with a nominal advance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <BookingForm defaultPackage="Custom Tailored Tour" defaultDestination="Himachal Customized" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizedToursPage;
