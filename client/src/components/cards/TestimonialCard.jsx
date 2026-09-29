import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  if (!testimonial) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200 hover:border-yellow-400/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative group">
      <Quote className="w-8 h-8 text-neutral-100 absolute right-6 top-6 -z-0 group-hover:text-yellow-100 transition-colors" />

      <div className="relative z-10">
        {/* Rating Stars */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>

        {/* Trip Tag */}
        {(testimonial.tourTaken || testimonial.tripTaken) && (
          <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold bg-yellow-400/20 text-neutral-950 rounded-md border border-yellow-500/30 mb-3">
            {testimonial.tourTaken || testimonial.tripTaken}
          </span>
        )}

        {/* Review Text */}
        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
          "{testimonial.reviewText}"
        </p>
      </div>

      {/* Customer Info */}
      <div className="flex items-center space-x-3 pt-5 mt-5 border-t border-neutral-100">
        <img
          src={testimonial.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
        />
        <div>
          <h4 className="text-sm font-bold text-neutral-950 flex items-center">
            {testimonial.name}
            {testimonial.isVerified !== false && (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 ml-1.5" title="Verified Traveler" />
            )}
          </h4>
          <p className="text-[11px] text-neutral-400">{testimonial.location || 'India'} • Verified Traveler</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
