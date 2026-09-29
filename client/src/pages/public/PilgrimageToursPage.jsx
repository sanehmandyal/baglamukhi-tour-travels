import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, CheckCircle } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TourCard from '../../components/cards/TourCard';

const PilgrimageToursPage = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await api.get('/tours?category=Pilgrimage');
      if (res.data.success) setTours(res.data.data);
    };
    fetchTours();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="9 Devi Darshan & Himachal Pilgrimage Packages | Baglamukhi Tour & Travels"
        description="Book sacred Himachal Devi Darshan pilgrimage packages covering Naina Devi, Chintpurni, Jwala Ji, Brajeshwari, Chamunda, Baglamukhi, and Golden Temple."
        canonical="/pilgrimage-tours"
        keywords={['9 Devi Darshan tour package', 'Himachal pilgrimage package', 'Baglamukhi temple trip', 'Chintpurni Jwala Ji taxi']}
      />
      <Breadcrumbs items={[{ name: 'Pilgrimage Tours', url: '/pilgrimage-tours' }]} />

      <section className="bg-gradient-to-br from-amber-950 via-brand-900 to-slate-900 py-16 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center">
            🚩 Sacred Shaktipeeth Yatra
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Pilgrimage & 9 Devi Darshan Tours
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Spiritual blessings with devotional chauffeurs, senior citizen assistance, pure vegetarian hotel accommodation, and direct station pickups from Una, Chandigarh, and Kalka.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Shrines Covered */}
        <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200/80">
          <h3 className="text-base font-bold text-amber-950 mb-3 font-display">Holy Shrines Covered in our Yatra:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-amber-900 font-semibold">
            <span>✨ Mata Mansa Devi (Panchkula)</span>
            <span>✨ Maa Naina Devi (Bilaspur)</span>
            <span>✨ Maa Chintpurni Devi (Una)</span>
            <span>✨ Maa Jwala Ji (Eternal Flame)</span>
            <span>✨ Mata Brajeshwari (Kangra)</span>
            <span>✨ Chamunda Nandikeshwar Dham</span>
            <span>✨ Maa Baglamukhi Dham (Bankhandi)</span>
            <span>✨ Sri Harmandir Sahib (Amritsar)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PilgrimageToursPage;
