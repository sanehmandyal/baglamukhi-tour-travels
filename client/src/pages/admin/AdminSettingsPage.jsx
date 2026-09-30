import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useSettings } from '../../context/SettingsContext';
import ImageUploadInput from '../../components/common/ImageUploadInput';
import { FiSave, FiSettings, FiPhone, FiMail, FiMapPin, FiGlobe, FiShare2, FiCode, FiCheckCircle, FiLock, FiEye, FiEyeOff, FiShield, FiImage, FiRefreshCw } from 'react-icons/fi';

const AdminSettingsPage = () => {
  const { refreshSettings } = useSettings();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [passwordNotice, setPasswordNotice] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [formData, setFormData] = useState({
    siteName: 'Baglamukhi Tour & Travels',
    logoUrl: '/baglamukhi-temple-logo.jpg',
    tagline: 'Best Tour Packages, Cabs & Stays in Himachal & North India',
    primaryPhone: '+91 98051 43007',
    secondaryPhone: '+91 98051 43007',
    whatsappNumber: '+91 98051 43007',
    email: 'info@baglamukhitourtravels.com',
    bookingEmail: 'bookings@baglamukhitourtravels.com',
    officeAddress: 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India',
    googleMapEmbedUrl: 'https://maps.google.com/maps?q=Amb+Andaura+Railway+Station,+Una+District,+Himachal+Pradesh+177203&t=&z=14&ie=UTF8&iwloc=&output=embed',
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
          logoUrl: s.logoUrl || prev.logoUrl,
          tagline: s.tagline || prev.tagline,
          primaryPhone: (!s.primaryPhone || s.primaryPhone.includes('98000') || s.primaryPhone.includes('98160')) ? '+91 98051 43007' : s.primaryPhone,
          secondaryPhone: (!s.secondaryPhone || s.secondaryPhone.includes('98111') || s.secondaryPhone.includes('98050')) ? '+91 98051 43007' : s.secondaryPhone,
          whatsappNumber: (!s.whatsappNumber || s.whatsappNumber.includes('98000') || s.whatsappNumber.includes('98160')) ? '+91 98051 43007' : s.whatsappNumber,
          email: s.email || prev.email,
          bookingEmail: s.bookingEmail || prev.bookingEmail,
          officeAddress: (!s.officeAddress || s.officeAddress.includes('176049') || !s.officeAddress.includes('Amb Andaura')) ? 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India' : s.officeAddress,
          googleMapEmbedUrl: (!s.googleMapEmbedUrl || s.googleMapEmbedUrl.includes('Shimla') || !s.googleMapEmbedUrl.includes('Amb+Andaura')) ? 'https://maps.google.com/maps?q=Amb+Andaura+Railway+Station,+Una+District,+Himachal+Pradesh+177203&t=&z=14&ie=UTF8&iwloc=&output=embed' : s.googleMapEmbedUrl,
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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordNotice('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    try {
      setUpdatingPassword(true);
      const res = await api.put('/auth/updatepassword', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (res.data?.success) {
        setPasswordNotice('Admin password changed successfully! Please keep it secure.');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setUpdatingPassword(false);
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
        {/* Website Brand Logo & Visual Emblem */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FiImage className="text-amber-500" /> Website Official Logo & Brand Asset
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload a custom logo from your computer/phone or enter an image URL. It will instantly update across the website navigation, footer, admin portal, and login screen.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, logoUrl: '/baglamukhi-temple-logo.jpg' }))}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition cursor-pointer"
              title="Reset to official circular temple logo"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Default Logo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Logo Upload Field */}
            <div className="lg:col-span-7 space-y-3">
              <ImageUploadInput
                label="Brand Logo (Upload image or enter URL) *"
                value={formData.logoUrl}
                onChange={(val) => setFormData(prev => ({ ...prev, logoUrl: val }))}
              />
            </div>

            {/* Live Dual Background Preview */}
            <div className="lg:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Live Brand Preview
              </span>

              {/* Light Background Preview (Navbar) */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 shrink-0 shadow-md">
                  <img
                    src={formData.logoUrl || '/baglamukhi-temple-logo.jpg'}
                    alt="Logo Preview"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/baglamukhi-temple-logo.jpg'; }}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-black text-slate-900 block font-display">BAGLAMUKHI <span className="text-amber-600">TOUR & TRAVELS</span></span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Header / Light Preview</span>
                </div>
              </div>

              {/* Dark Background Preview (Footer & Admin) */}
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 shadow-sm flex items-center space-x-3 text-white">
                <div className="w-12 h-12 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 shrink-0 shadow-md">
                  <img
                    src={formData.logoUrl || '/baglamukhi-temple-logo.jpg'}
                    alt="Logo Dark Preview"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/baglamukhi-temple-logo.jpg'; }}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-black text-white block font-display">BAGLAMUKHI <span className="text-amber-400">TOUR & TRAVELS</span></span>
                  <span className="text-[10px] text-amber-400/90 font-bold uppercase">Footer / Dark Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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

      {/* Admin Security & Password Change */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FiLock className="text-amber-500" /> Admin Access & Security Credentials
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Change your administrator account password. Once changed, all previous and default passwords are permanently invalidated.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
            <FiShield className="text-amber-600 w-3.5 h-3.5" />
            Active Security Protection
          </span>
        </div>

        {passwordNotice && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
            <FiCheckCircle className="text-emerald-600 shrink-0 w-4 h-4" />
            <span>{passwordNotice}</span>
          </div>
        )}

        {passwordError && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Current Password *</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter current password"
                  className="w-full pl-3.5 pr-10 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">New Password *</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Min 6 chars (e.g. MySecretPass#99)"
                  className="w-full pl-3.5 pr-10 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Confirm New Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Confirm new password"
                  className="w-full pl-3.5 pr-10 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start space-x-2">
            <FiShield className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Security Rule:</strong> As soon as you click <em>Update Admin Password</em>, your new password will be hashed with bcrypt in the database. Any old or default passwords will no longer work, guaranteeing that only the password you set can access the portal.
            </span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={updatingPassword}
              className="flex items-center space-x-2 px-6 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-yellow-400 border border-yellow-400/40 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              <FiLock className="w-4 h-4" />
              <span>{updatingPassword ? 'Updating Password...' : 'Save & Enforce New Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
