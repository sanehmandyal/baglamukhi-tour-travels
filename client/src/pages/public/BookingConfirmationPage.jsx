import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Phone, MessageCircle, Calendar, User, MapPin, Printer } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import { useSettings } from '../../context/SettingsContext';

const BookingConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const { settings } = useSettings();
  const code = searchParams.get('code');

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!code) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/bookings/code/${code}`);
        if (res.data.success) {
          setBooking(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching booking by code:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [code]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <SEOHead title="Booking Inquiry Confirmed | Baglamukhi Tour & Travels" noindex={true} />

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-premium text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Inquiry Successfully Submitted
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Thank You for Choosing Baglamukhi Tour & Travels!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-light leading-relaxed">
            Your travel inquiry has been registered with our Himachal booking desk. Our travel coordinator will contact you shortly with your customized quote and voucher.
          </p>
        </div>

        {/* Booking Reference Box */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-4 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs text-slate-400 block">Booking Reference ID</span>
              <strong className="text-base sm:text-lg text-brand-700 font-mono">
                {booking?.bookingId || code || 'TT-PENDING-REF'}
              </strong>
            </div>
            <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-lg">
              Status: {booking?.status || 'Pending Verification'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
            <div>
              <span className="text-slate-400 text-xs block">Guest Name</span>
              <span className="font-semibold text-slate-900">{booking?.name || 'Valued Guest'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">Contact Phone</span>
              <span className="font-semibold text-slate-900">{booking?.phone || 'On Record'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">Destination / Tour</span>
              <span className="font-semibold text-slate-900">{booking?.destination || 'Himachal Tour'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">Travel Date</span>
              <span className="font-semibold text-slate-900">
                {booking?.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'Scheduled'}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">What Happens Next?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 text-left">
            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100">
              <strong className="text-brand-900 block mb-1">1. Review & Call</strong>
              <span>Our manager reviews your dates and hotel availability.</span>
            </div>
            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100">
              <strong className="text-brand-900 block mb-1">2. WhatsApp Quote</strong>
              <span>We send a complete day-by-day itinerary & driver details.</span>
            </div>
            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100">
              <strong className="text-brand-900 block mb-1">3. Voucher Issue</strong>
              <span>Your confirmed hotel & car vouchers are sent directly.</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '919816012345'}?text=Hi%20Thakur%20Travels,%20I%20just%20submitted%20booking%20reference%20${code || 'online'}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition flex items-center shadow"
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            Notify us on WhatsApp
          </a>

          <button
            onClick={handlePrint}
            className="px-5 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center"
          >
            <Printer className="w-4 h-4 mr-1.5" />
            Print Receipt
          </button>

          <Link
            to="/"
            className="px-5 py-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
