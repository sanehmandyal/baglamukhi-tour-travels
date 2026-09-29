import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const ServiceCard = ({ service, onBookCab }) => {
  const navigate = useNavigate();
  if (!service) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-yellow-400/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
          <img
            src={service.featuredImage?.url || service.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'}
            alt={service.featuredImage?.alt || service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-xs font-black text-neutral-950 bg-yellow-400 backdrop-blur-md rounded-full shadow-sm">
              {service.serviceType || 'Cab / Fleet'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-neutral-950 mb-2">
            <Link to={`/cabs`} className="hover:text-yellow-600 transition">
              {service.title}
            </Link>
          </h3>
          <p className="text-xs text-neutral-600 mb-4 leading-relaxed line-clamp-2">{service.shortDescription}</p>

          {/* Fleet models preview */}
          {service.fleetOptions && service.fleetOptions.length > 0 && (
            <div className="space-y-2 mb-4">
              {service.fleetOptions.slice(0, 3).map((fleet, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 block">{fleet.vehicleName}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{fleet.seatingCapacity} • Hill Certified</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-600 block">Best Fare</span>
                    <span className="text-[10px] text-slate-400">On Request</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features check list */}
          <div className="space-y-1.5 text-xs text-slate-600">
            {service.features && service.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500 mr-1.5 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 border-t border-neutral-100 mt-2 flex items-center justify-between gap-3">
        <Link
          to={`/cabs`}
          className="flex-1 py-2.5 text-center text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
        >
          View Fleet
        </Link>
        <button
          onClick={() => (onBookCab ? onBookCab(service) : navigate(`/booking?service=${encodeURIComponent(service.title)}`))}
          className="flex-1 py-2.5 text-center text-xs font-black text-neutral-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-md shadow-yellow-500/20 transition"
        >
          Book Fleet
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
