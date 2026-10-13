import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Briefcase, MapPin, Navigation } from 'lucide-react';
import { resolveVehicleImage } from '../../utils/vehicleImageHelper';

const formatCategoryLabel = (cat, serviceType) => {
  const c = (cat || '').toLowerCase();
  if (c === 'tempo-traveller' || c.includes('tempo')) return 'Tempo Traveller';
  if (c === 'airport-transfer' || c.includes('airport')) return 'Station / Airport Transfer';
  if (c === 'luxury-cars' || c.includes('luxury') || c.includes('4x4')) return '4x4 & Mountain SUV';
  if (c === 'bus-rental' || c.includes('bus')) return 'Bus & Coach Rental';
  if (c === 'cab-rental') return 'Himachal Cab & Taxi';
  return serviceType || 'Verified Hill Fleet';
};

const extractRoutesList = (popularRoutes) => {
  if (!popularRoutes) return [];
  if (typeof popularRoutes === 'string') {
    return popularRoutes.split(',').map((r) => r.trim()).filter(Boolean);
  }
  if (Array.isArray(popularRoutes)) {
    return popularRoutes
      .map((r) => (typeof r === 'object' && r !== null ? r.route || r.name || '' : String(r)))
      .map((r) => r.trim())
      .filter(Boolean);
  }
  return [];
};

const extractFeaturesList = (features) => {
  if (!features) return [];
  if (typeof features === 'string') {
    return features.split(',').map((f) => f.trim()).filter(Boolean);
  }
  if (Array.isArray(features)) {
    return features.map((f) => String(f).trim()).filter(Boolean);
  }
  return [];
};

const ServiceCard = ({ service, onBookCab }) => {
  const navigate = useNavigate();
  if (!service) return null;

  const title = service.title || service.name || 'Himachal Tourist Cab';
  const vehicleType = service.vehicleType || 'Commercial Mountain Cab';
  const categoryLabel = formatCategoryLabel(service.category, service.serviceType);
  const capacity = service.capacity || service.passengers || '4+1 Passengers';
  const luggage = service.luggageCapacity || service.luggage || '3 Large Bags + Carrier';
  const pricePerKm = Number(service.pricePerKm || service.ratePerKm || 14);
  const baseFare = Number(service.baseFare || service.fullDayRate || 2500);
  const shortDesc =
    service.shortDescription ||
    service.tagline ||
    'Commercially licensed tourist vehicle with experienced Himachali hill chauffeur.';
  const features = extractFeaturesList(service.features);
  const routes = extractRoutesList(service.popularRoutes);

  return (
    <div className="h-full bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-yellow-400/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div className="flex-1 flex flex-col">
        {/* Uniform 16:10 Image Header */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 shrink-0">
          <img
            src={resolveVehicleImage(service)}
            alt={service.featuredImage?.alt || title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = resolveVehicleImage(title);
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-[11px] font-black text-neutral-950 bg-yellow-400 backdrop-blur-md rounded-full shadow-sm">
              {categoryLabel}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 bg-neutral-950/85 backdrop-blur-md px-3 py-1 rounded-xl text-right border border-white/10">
            <span className="text-[10px] text-amber-400 font-bold block">Rate Per Km</span>
            <span className="text-xs font-black text-white">₹{pricePerKm}/km</span>
          </div>
        </div>

        {/* Uniform Card Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-neutral-950 line-clamp-1" title={title}>
              <Link to="/cabs" className="hover:text-yellow-600 transition">
                {title}
              </Link>
            </h3>
            <p className="text-xs font-bold text-amber-600 line-clamp-1 mt-0.5" title={vehicleType}>
              {vehicleType}
            </p>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {shortDesc}
            </p>
          </div>

          {/* Admin Vehicle Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
              <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-semibold truncate" title={capacity}>{capacity}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
              <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-semibold truncate" title={luggage}>{luggage}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 pt-1.5 border-t border-slate-200/60 min-w-0">
              <Navigation className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-bold text-emerald-700 truncate">₹{pricePerKm}/km Rate</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 pt-1.5 border-t border-slate-200/60 min-w-0">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-bold text-slate-800 truncate">₹{baseFare.toLocaleString('en-IN')} Base</span>
            </div>
          </div>

          {/* Admin Features Check List (strictly 3 rows for uniform height) */}
          <div className="space-y-1.5 text-xs text-slate-600 min-h-[3.75rem]">
            {(features.length > 0
              ? features.slice(0, 3)
              : ['High Ground Clearance', 'Experienced Pahadi Driver', 'Clean Sanitized AC Cabin']
            ).map((feat, idx) => (
              <div key={idx} className="flex items-center text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500 mr-1.5 shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>

          {/* Admin Popular Routes Preview */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate font-medium">
              {routes.length > 0 ? routes.slice(0, 2).join(' • ') : 'All Himachal & Punjab Routes'}
            </span>
          </div>
        </div>
      </div>

      {/* Aligned Footer Action Buttons */}
      <div className="p-5 sm:p-6 pt-0 border-t border-neutral-100 mt-auto flex items-center justify-between gap-3">
        <Link
          to="/cabs"
          className="flex-1 py-2.5 text-center text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
        >
          View Fleet
        </Link>
        <button
          onClick={() => (onBookCab ? onBookCab(service) : navigate(`/booking?service=${encodeURIComponent(title)}`))}
          className="flex-1 py-2.5 text-center text-xs font-black text-neutral-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-md shadow-yellow-500/20 transition"
        >
          Book Fleet
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
