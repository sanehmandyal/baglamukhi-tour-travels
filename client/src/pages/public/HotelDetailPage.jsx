import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Hotel, MapPin, Star, CheckCircle, Clock, PhoneCall } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';

const HotelDetailPage = () => {
  const { slug } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await api.get(`/hotels/${slug}`);
        if (res.data.success) {
          setHotel(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading || !hotel) {
    return (
      <div className="py-32 text-center text-slate-600 font-semibold text-sm">
        Loading hotel details...
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title={hotel.seo?.metaTitle || `${hotel.name}, ${hotel.destination} | Baglamukhi Tour & Travels`}
        description={hotel.seo?.metaDescription || hotel.shortOverview?.slice(0, 160)}
        canonical={`/hotels/${hotel.slug}`}
        ogImage={hotel.featuredImage?.url}
      />

      <Breadcrumbs
        items={[
          { name: 'Hotels', url: '/hotels' },
          { name: hotel.name, url: `/hotels/${hotel.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 pb-6 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-xs font-bold bg-brand-50 text-brand-700 rounded-md">
              {hotel.hotelType}
            </span>
            <span className="flex items-center text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
              {hotel.starRating} Star
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            {hotel.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 flex items-center">
            <MapPin className="w-4 h-4 text-brand-600 mr-1 flex-shrink-0" />
            {hotel.address} ({hotel.destination})
          </p>
        </div>

        {/* Gallery Image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-slate-100 shadow-soft">
          <img src={hotel.featuredImage?.url} alt={hotel.name} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">About Property</h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line">
                {hotel.description}
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Hotel Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
                  {hotel.amenities?.map((a, i) => (
                    <div key={i} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-1.5 flex-shrink-0" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Categories */}
            {hotel.roomCategories && hotel.roomCategories.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
                <h2 className="text-xl font-bold text-slate-900 font-display">Available Room Categories</h2>
                <div className="space-y-3">
                  {hotel.roomCategories.map((room, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{room.name}</h4>
                        <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 mt-1">
                          {room.features?.map((f, i) => (
                            <span key={i}>• {f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-brand-700 block">₹{room.price?.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-400">/ night with breakfast</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <BookingForm defaultPackage={`Hotel Stay: ${hotel.name}`} defaultDestination={hotel.destination} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;
