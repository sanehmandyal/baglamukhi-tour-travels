import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ArrowLeft, Shield, Sparkles, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import SEOHead from '../../components/common/SEOHead';

const AdminLoginPage = () => {
  const { login } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-neutral-950 flex flex-col justify-between p-4 sm:p-6 select-none">
      <SEOHead title="Admin Portal Login | Baglamukhi Tour & Travels" noindex={true} />

      {/* Ambient Glassmorphism Luminous Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar with "Back to Site" Navigation */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex items-center justify-between pt-2">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-yellow-300 hover:text-white border border-white/15 backdrop-blur-xl shadow-lg transition-all duration-300 text-xs sm:text-sm font-semibold group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Main Site</span>
        </Link>

        <Link
          to="/"
          className="flex items-center space-x-2 text-slate-400 hover:text-yellow-400 transition text-xs font-medium"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Baglamukhi Tour & Travels</span>
        </Link>
      </div>

      {/* Main Glassmorphic Card Container */}
      <div className="relative z-10 my-auto flex items-center justify-center py-8">
        <div className="w-full max-w-md backdrop-blur-2xl bg-neutral-900/60 border border-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-8 sm:p-10 space-y-7 relative overflow-hidden ring-1 ring-white/10">
          {/* Subtle Top Glass Accent Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent"></div>

          {/* Header Brand */}
          <div className="text-center space-y-3">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-75 blur-md animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 shadow-2xl">
                <img
                  src={settings?.logoUrl || '/baglamukhi-temple-logo.jpg'}
                  alt="Maa Baglamukhi Temple Logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/baglamukhi-temple-logo.jpg';
                  }}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                Administrative Access
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                Baglamukhi Admin
              </h1>
              <p className="text-xs text-slate-300/80 font-normal">
                Sign in to manage destinations, tours, fleet, bookings, and SEO.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold backdrop-blur-md animate-fadeIn">
              {error}
            </div>
          )}

          {/* Glass Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/[0.12] focus:bg-white/[0.15] border border-white/20 focus:border-yellow-400 text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-yellow-400/40 focus:outline-none backdrop-blur-md text-xs sm:text-sm font-medium transition duration-200"
                  placeholder="admin@baglamukhitourtravels.com"
                />
                <Mail className="w-4 h-4 text-yellow-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/[0.12] focus:bg-white/[0.15] border border-white/20 focus:border-yellow-400 text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-yellow-400/40 focus:outline-none backdrop-blur-md text-xs sm:text-sm font-medium transition duration-200"
                  placeholder="••••••••••••"
                />
                <Lock className="w-4 h-4 text-yellow-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-sm font-black text-neutral-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-2xl shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-neutral-950" />
                </>
              )}
            </button>
          </form>

          {/* Secondary Footer Links inside Card */}
          <div className="pt-2 border-t border-white/10 text-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-yellow-400 transition font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="relative z-20 text-center pb-2 text-xs text-slate-400 font-light">
        © {new Date().getFullYear()} Baglamukhi Tour & Travels • Secure Administrative Portal
      </div>
    </div>
  );
};

export default AdminLoginPage;
