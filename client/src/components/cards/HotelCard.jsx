import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const HotelCard = ({ hotel }) => {
  if (!hotel) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-yellow-400/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
          <img
            src={hotel.featuredImage?.url || hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'}
            alt={hotel.featuredImage?.alt || hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-1">
            <span className="px-2.5 py-1 text-[11px] font-black text-neutral-950 bg-yellow-400 backdrop-blur-md rounded-full shadow-sm">
              {hotel.hotelType || 'Deluxe Stay'}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center bg-neutral-950/80 backdrop-blur-sm px-2 py-0.5 rounded text-white text-xs font-bold border border-neutral-800">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
            <span>{hotel.starRating} Star Stay</span>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs text-yellow-600 font-bold flex items-center mb-1">
            <MapPin className="w-3 h-3 mr-1 text-yellow-500" />
            {hotel.city || hotel.destination}
          </p>
          <h3 className="text-base font-bold text-neutral-950 mb-1">
            <Link to={`/hotels`} className="hover:text-yellow-600 transition">
              {hotel.name}
            </Link>
          </h3>
          <p className="text-xs text-neutral-500 mb-3 line-clamp-2 leading-relaxed">{hotel.description || hotel.shortOverview}</p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {hotel.amenities && (Array.isArray(hotel.amenities) ? hotel.amenities : [hotel.amenities]).slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[10px] bg-neutral-100 text-neutral-700 rounded-md font-medium">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-neutral-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-neutral-400 block font-medium">Rooms from</span>
          <span className="text-base font-black text-neutral-950">₹{(hotel.discountPrice || hotel.pricePerNight || hotel.priceStartingFrom || 2800)?.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-neutral-500"> / night</span>
        </div>

        <Link
          to={`/hotels`}
          className="px-4 py-2 text-xs font-black text-neutral-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-md shadow-yellow-500/20 transition"
        >
          View Stays
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
