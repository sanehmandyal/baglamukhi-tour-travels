import React from 'react';
import { Calendar, ShieldCheck, CheckCircle, PhoneCall } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';
import { useSettings } from '../../context/SettingsContext';

const BookingPage = () => {
  const { settings } = useSettings();

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Book Tour Package & Taxi Online | Baglamukhi Tour & Travels"
        description="Book Himachal tour packages, Shimla Manali trips, and taxi service with instant confirmation. Zero advance payment required to inquire."
        canonical="/booking"
      />
      <Breadcrumbs items={[{ name: 'Booking', url: '/booking' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            Easy 2-Minute Booking
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Book Your Holiday Package
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Reserve verified hotel stays and dedicated private cabs with Baglamukhi Tour & Travels. No credit card required to submit your booking inquiry.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm />
      </div>
    </div>
  );
};

export default BookingPage;
