import React from 'react';
import { Bus, ShieldCheck, CheckCircle } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';

const BusRentalsPage = () => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Bus Rental & Volvo Coach Hire in Chandigarh | 35 to 52 Seater"
        description="Rent luxury tourist buses, 35 seater mini coaches, and 45-52 seater AC Volvo buses in Chandigarh and Punjab for weddings and school/college tours."
        canonical="/services/car-rental"
      />
      <Breadcrumbs items={[{ name: 'Bus & Coach Rentals', url: '/services/car-rental' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-16 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Bus className="w-3.5 h-3.5 mr-1" />
            Large Vehicle Logistics
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Luxury Bus & Coach Rentals
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            35 to 52 seater luxury AC buses and Volvo multi-axle coaches for marriage functions, school educational tours, and corporate excursions.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">Available Coach Fleet</h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">35 Seater Luxury Tourist Bus</h4>
                  <p className="text-xs text-slate-600 mt-1">Air suspension, pushback recliner seats, PA system, and wide luggage compartment.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">45-52 Seater AC Volvo Coach</h4>
                  <p className="text-xs text-slate-600 mt-1">Ultra luxury air suspension, individual charging sockets, automatic climate control, and certified dual night drivers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <BookingForm defaultPackage="Bus / Coach Rental" defaultDestination="Punjab / Himachal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusRentalsPage;
