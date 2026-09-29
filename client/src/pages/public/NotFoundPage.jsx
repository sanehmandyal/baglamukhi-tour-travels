import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, MapPin, BookOpen, PhoneCall } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';

const NotFoundPage = () => {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto text-center space-y-6">
      <SEOHead title="404 - Page Not Found | Baglamukhi Tour & Travels" noindex={true} />

      <div className="text-7xl sm:text-8xl font-black text-brand-600 font-display">404</div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Oops! Looks like you took a scenic detour.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
          The page or package you are looking for doesn't exist or has been relocated. Let's get you back on track!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 text-xs font-bold text-slate-700">
        <Link
          to="/"
          className="p-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center space-x-2 transition"
        >
          <Home className="w-4 h-4 text-brand-600" />
          <span>Home Page</span>
        </Link>
        <Link
          to="/tours"
          className="p-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center space-x-2 transition"
        >
          <Compass className="w-4 h-4 text-brand-600" />
          <span>Tour Packages</span>
        </Link>
        <Link
          to="/destinations"
          className="p-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center space-x-2 transition"
        >
          <MapPin className="w-4 h-4 text-brand-600" />
          <span>Destinations</span>
        </Link>
        <Link
          to="/blog"
          className="p-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center space-x-2 transition"
        >
          <BookOpen className="w-4 h-4 text-brand-600" />
          <span>Travel Blogs</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
