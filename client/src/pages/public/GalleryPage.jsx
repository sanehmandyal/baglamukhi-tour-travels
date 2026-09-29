import React, { useState, useEffect } from 'react';
import { Image, MapPin, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get('/gallery');
        if (res.data.success) {
          setGalleryItems(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ['All', 'Mountains', 'Snow', 'Temples', 'Adventure', 'Fleet & Cabs'];

  const filtered = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Travel Photo Gallery | Himachal Mountains & Tourist Attractions"
        description="Browse high resolution travel photos of Solang Valley snow, Shimla Ridge, Amritsar Golden Temple, Spiti Valley, and our sanitized taxi fleet."
        canonical="/gallery"
      />
      <Breadcrumbs items={[{ name: 'Photo Gallery', url: '/gallery' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <Image className="w-3.5 h-3.5 mr-1" />
            Visual Travel Highlights
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Travel Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Glimpses of pristine snow landscapes, Himalayan pine valleys, sacred shrines, and joyful travelers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-600 font-semibold text-sm">
            Loading travel photos...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((photo) => (
              <div
                key={photo._id}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-soft border border-slate-200"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.altText || photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-600 rounded-md inline-block mb-1">
                    {photo.locationTag || 'Himachal'}
                  </span>
                  <h3 className="text-sm font-bold truncate">{photo.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
