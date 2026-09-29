import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useSettings } from '../../context/SettingsContext';
import { FiSave, FiSettings, FiPhone, FiMail, FiMapPin, FiGlobe, FiShare2, FiCode, FiCheckCircle } from 'react-icons/fi';

const AdminSettingsPage = () => {
  const { refreshSettings } = useSettings();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const [formData, setFormData] = useState({
    siteName: 'Baglamukhi Tour & Travels',
    tagline: 'Best Tour Packages, Cabs & Stays in Himachal & North India',
    primaryPhone: '+91 98000 00000',
    secondaryPhone: '+91 98111 11111',
    whatsappNumber: '+91 98000 00000',
    email: 'info@baglamukhitourtravels.com',
    bookingEmail: 'bookings@baglamukhitourtravels.com',
    officeAddress: 'Near Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 176049, India',
    googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109312.14856006427!2d77.09886475752945!3d31.10481454848312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390578e3e35d6e67%3A0x1f7e7ffce9f83508!2sShimla%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    facebookUrl: 'https://facebook.com/baglamukhitourtravels',
    instagramUrl: 'https://instagram.com/baglamukhitourtravels',
    youtubeUrl: 'https://youtube.com/@baglamukhitourtravels',
    tripAdvisorUrl: 'https://tripadvisor.com',
    googleAnalyticsId: 'G-XXXXXXXXXX',
    googleTagManagerId: 'GTM-XXXXXX',
    googleSiteVerification: 'google-site-verification-token-here',
    openingHours: 'Mon - Sun: 24 Hours Open',
    metaTitleTemplate: '%s | Baglamukhi Tour & Travels',
    footerCopyright: '© 2025 Baglamukhi Tour & Travels. All Rights Reserved.'
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/settings');
      if (res.data?.success && res.data.data) {
        const s = res.data.data;
        setFormData(prev => ({
          ...prev,
          siteName: s.siteName || prev.siteName,
          tagline: s.tagline || prev.tagline,
          primaryPhone: s.primaryPhone || prev.primaryPhone,
          secondaryPhone: s.secondaryPhone || prev.secondaryPhone,
          whatsappNumber: s.whatsappNumber || prev.whatsappNumber,
          email: s.email || prev.email,
          bookingEmail: s.bookingEmail || prev.bookingEmail,
          officeAddress: s.officeAddress || prev.officeAddress,
          googleMapEmbedUrl: s.googleMapEmbedUrl || prev.googleMapEmbedUrl,
          facebookUrl: s.socialLinks?.facebook || s.facebookUrl || prev.facebookUrl,
          instagramUrl: s.socialLinks?.instagram || s.instagramUrl || prev.instagramUrl,
          youtubeUrl: s.socialLinks?.youtube || s.youtubeUrl || prev.youtubeUrl,
          tripAdvisorUrl: s.socialLinks?.tripadvisor || s.tripAdvisorUrl || prev.tripAdvisorUrl,
          googleAnalyticsId: s.googleAnalyticsId || prev.googleAnalyticsId,
          googleTagManagerId: s.googleTagManagerId || prev.googleTagManagerId,
          googleSiteVerification: s.googleSiteVerification || prev.googleSiteVerification,
          openingHours: s.openingHours || prev.openingHours,
          metaTitleTemplate: s.metaTitleTemplate || prev.metaTitleTemplate,
          footerCopyright: s.footerCopyright || prev.footerCopyright
        }));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setNotice('');

    const payload = {
      ...formData,
      socialLinks: {
        facebook: formData.facebookUrl,
        instagram: formData.instagramUrl,
        youtube: formData.youtubeUrl,
        tripadvisor: formData.tripAdvisorUrl
      }
    };

    try {
      await api.put('/settings', payload);
      setNotice('Company settings & tracking tags saved successfully!');
      refreshSettings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-400">Loading settings...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Website & Business Settings</h1>
        <p className="text-sm text-slate-500">Configure NAP business information, Google Analytics & Webmaster verification tags, and social profiles</p>
      </div>

      {notice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice('')} className="text-emerald-600 hover:underline">Dismiss</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FiGlobe className="text-cyan-600" /> Business Identity & Branding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Company / Brand Name *</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Tagline / Slogan</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Operating Hours</label>
              <input
                type="text"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleChange}
                placeholder="e.g. 24x7 Open (All 7 Days)"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Footer Copyright Text</label>
              <input
                type="text"
                name="footerCopyright"
                value={formData.footerCopyright}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Local NAP & Contact Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FiPhone className="text-cyan-600" /> NAP (Name, Address, Phone) & Communication
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Primary Hotline *</label>
              <input
                type="text"
                name="primaryPhone"
                value={formData.primaryPhone}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Secondary Phone</label>
              <input
                type="text"
                name="secondaryPhone"
                value={formData.secondaryPhone}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">WhatsApp Hotline *</label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Primary Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Bookings & Dispatch Email</label>
              <input
                type="email"
                name="bookingEmail"
                value={formData.bookingEmail}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Physical Office Address *</label>
              <input
                type="text"
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Google Maps Embed URL</label>
              <input
                type="url"
                name="googleMapEmbedUrl"
                value={formData.googleMapEmbedUrl}
                onChange={handleChange}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FiShare2 className="text-cyan-600" /> Social Channels & Authority Profiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Facebook Profile URL</label>
              <input
                type="url"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Instagram Page URL</label>
              <input
                type="url"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">YouTube Channel URL</label>
              <input
                type="url"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">TripAdvisor Listing URL</label>
              <input
                type="url"
                name="tripAdvisorUrl"
                value={formData.tripAdvisorUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Analytics & Search Console */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FiCode className="text-cyan-600" /> Google Search Console & Analytics Integration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Google Analytics 4 Measurement ID</label>
              <input
                type="text"
                name="googleAnalyticsId"
                value={formData.googleAnalyticsId}
                onChange={handleChange}
                placeholder="e.g. G-ABC123XYZ"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Google Tag Manager Container ID</label>
              <input
                type="text"
                name="googleTagManagerId"
                value={formData.googleTagManagerId}
                onChange={handleChange}
                placeholder="e.g. GTM-XXXXXX"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Google Site Verification Token</label>
              <input
                type="text"
                name="googleSiteVerification"
                value={formData.googleSiteVerification}
                onChange={handleChange}
                placeholder="google-site-verification token"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-600/20 transition-all disabled:opacity-50"
          >
            <FiSave className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
