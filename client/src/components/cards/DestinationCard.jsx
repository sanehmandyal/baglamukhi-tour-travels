import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const DestinationCard = ({ destination }) => {
  if (!destination) return null;

  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-2xl border border-neutral-800 transition-all duration-300 block transform hover:-translate-y-1 bg-neutral-950"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={destination.heroImage?.url || 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=600&q=80'}
          alt={destination.heroImage?.alt || `${destination.name} Himachal destination`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>

      {/* State Badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 text-xs font-bold text-yellow-300 bg-neutral-950/80 backdrop-blur-md rounded-full border border-yellow-500/30 flex items-center shadow-md">
          <MapPin className="w-3 h-3 text-yellow-400 mr-1" />
          {destination.state || 'Himachal Pradesh'}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
        <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider block mb-1">
          {destination.tagline || 'Scenic Mountain Retreat'}
        </span>
        <h3 className="text-xl font-extrabold font-display text-white group-hover:text-yellow-400 transition-colors">
          {destination.name}
        </h3>
        <p className="text-xs text-neutral-300 line-clamp-2 mt-1.5 leading-relaxed font-normal">
          {destination.shortDescription}
        </p>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-800 text-xs text-yellow-400 font-bold">
          <span>{destination.placesToVisit?.length || 4}+ Top Attractions</span>
          <span className="flex items-center group-hover:translate-x-1 transition-transform">
            Explore Guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
