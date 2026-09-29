import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle,
  Car,
  Compass,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BookingForm from '../../components/forms/BookingForm';
import GoogleMapEmbed from '../../components/common/GoogleMapEmbed';
import { useSettings } from '../../context/SettingsContext';

const LocationDetailPage = () => {
  const { slug } = useParams();
  const { settings } = useSettings();

  const [location, setLocation] = useState(null);
  const [otherLocations, setOtherLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/locations/${slug}`);
        if (res.data.success) {
          setLocation(res.data.data);
          setOtherLocations(res.data.otherLocations || []);
        }
      } catch (err) {
        setError('Location page not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-600 font-semibold text-sm">
        Loading local branch information...
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Location Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-600">{error || 'The requested city branch does not exist.'}</p>
        <Link to="/" className="inline-block px-6 py-2.5 text-xs font-bold text-white bg-brand-600 rounded-xl">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title={location.seo?.metaTitle || `Tour and Travel Agency in ${location.cityName} | Thakur Travels`}
        description={location.seo?.metaDescription || location.shortIntro?.slice(0, 160)}
        canonical={`/locations/${location.slug}`}
        ogImage={location.heroImage?.url}
        keywords={location.seo?.focusKeyword || `travel agency in ${location.cityName}`}
      />

      <Breadcrumbs
        items={[
          { name: 'Locations', url: '/' },
          { name: location.cityName, url: `/locations/${location.slug}` },
        ]}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            Local Branch & Tour Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Tour & Travel Agency in {location.cityName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {location.shortIntro}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Local Overview, Services, Routes */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                About Our {location.cityName} Travel Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line">
                {location.fullDescription}
              </p>
            </div>

            {/* Local Services Offered */}
            {location.servicesOffered && location.servicesOffered.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Services Available in {location.cityName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {location.servicesOffered.map((srv, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 text-brand-600 mr-2 flex-shrink-0" />
                        {srv.title}
                      </h4>
                      <p className="text-xs text-slate-600 font-light leading-relaxed">{srv.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Routes Distance and Price Table */}
            {location.popularRoutes && location.popularRoutes.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Popular Taxi Routes from {location.cityName}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                        <th className="py-2.5 px-3">Destination Route</th>
                        <th className="py-2.5 px-3">Distance</th>
                        <th className="py-2.5 px-3">Driving Time</th>
                        <th className="py-2.5 px-3">Starting Taxi Fare</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {location.popularRoutes.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{r.destination}</td>
                          <td className="py-2.5 px-3">{r.distance}</td>
                          <td className="py-2.5 px-3">{r.duration}</td>
                          <td className="py-2.5 px-3 text-brand-700 font-bold">₹{r.startingPrice?.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Local Office NAP Card */}
            {location.localOfficeDetails && (
              <div className="bg-brand-50/70 rounded-3xl p-6 sm:p-8 border border-brand-200 space-y-3 text-xs sm:text-sm text-brand-950">
                <h3 className="text-lg font-bold font-display text-brand-900 flex items-center">
                  <MapPin className="w-5 h-5 text-brand-600 mr-2" />
                  {location.cityName} Office & Dispatch Hub
                </h3>
                <p>
                  <strong>Address:</strong> {location.localOfficeDetails.address}
                </p>
                <p>
                  <strong>Direct Booking Helpline:</strong>{' '}
                  <a href={`tel:${location.localOfficeDetails.phone?.replace(/\s+/g, '')}`} className="font-bold text-brand-700 hover:underline">
                    {location.localOfficeDetails.phone}
                  </a>
                </p>
                <p>
                  <strong>Operating Hours:</strong> {location.localOfficeDetails.operatingHours || '24 Hours / 7 Days a Week'}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-1 space-y-6">
            <BookingForm
              defaultPackage={`Trip from ${location.cityName}`}
              defaultDestination="Shimla / Manali"
            />
          </div>
        </div>

        {/* Other Local Hubs */}
        {otherLocations.length > 0 && (
          <div className="pt-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-display">Other Branch Locations</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {otherLocations.map((loc) => (
                <Link
                  key={loc._id}
                  to={`/locations/${loc.slug}`}
                  className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-soft transition text-xs font-semibold text-slate-800 flex items-center justify-between"
                >
                  <span>{loc.cityName} Travel Desk</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Map */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900 font-display">{location.cityName} Location Map</h3>
          <GoogleMapEmbed title={`${location.cityName} Travel Desk Location`} />
        </div>
      </div>
    </div>
  );
};

export default LocationDetailPage;
