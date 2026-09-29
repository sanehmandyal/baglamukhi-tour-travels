import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Star, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const TourCard = ({ tour, onBookNow }) => {
  const navigate = useNavigate();
  if (!tour) return null;

  const startingPrice = tour.price?.startingPrice || 9999;
  const originalPrice = tour.price?.discountedPrice;
  const rating = tour.avgRating || 4.9;
  const reviews = tour.reviewsCount || 85;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-amber-400/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Thumbnail & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={tour.featuredImage?.url || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80'}
          alt={tour.featuredImage?.alt || `${tour.title} package`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
          <span className="px-3 py-1 text-[11px] font-bold text-white bg-slate-900/85 backdrop-blur-md rounded-full shadow-sm">
            {tour.category || 'Pilgrimage & Holiday'}
          </span>
          {tour.isFeatured && (
            <span className="px-3 py-1 text-[11px] font-bold text-amber-900 bg-amber-400 backdrop-blur-md rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-900" /> Featured
            </span>
          )}
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center bg-slate-900/75 backdrop-blur-sm px-2.5 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" />
          {tour.duration?.label || `${tour.duration?.days || 5} Days / ${tour.duration?.nights || 4} Nights`}
        </div>

        {/* Destination Location */}
        <div className="absolute bottom-3 right-3 text-white text-xs font-semibold flex items-center bg-slate-900/75 backdrop-blur-sm px-2.5 py-1 rounded-lg">
          <MapPin className="w-3.5 h-3.5 mr-1 text-rose-400" />
          {tour.destination}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1.5 mb-2">
            <div className="flex items-center text-amber-900 text-xs font-bold bg-amber-100 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">({reviews} verified reviews)</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-200 line-clamp-2 leading-snug">
            <Link to={`/tours/${tour.slug}`}>{tour.title}</Link>
          </h3>

          {/* Highlights / Inclusions preview */}
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
            {tour.highlights && tour.highlights.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mr-1.5 flex-shrink-0 mt-0.5" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-amber-600 block uppercase tracking-wider">Direct Local Rates</span>
            <div className="flex items-center space-x-1">
              <span className="text-sm sm:text-base font-extrabold text-slate-900">Price on Request</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Customizable Itinerary</span>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to={`/tours/${tour.slug}`}
              className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              title="View Itinerary"
            >
              Details
            </Link>
            <button
              onClick={() => (onBookNow ? onBookNow(tour) : navigate(`/booking?package=${encodeURIComponent(tour.title)}`))}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl shadow-md shadow-amber-500/20 transition flex items-center"
            >
              <span>Inquire</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
