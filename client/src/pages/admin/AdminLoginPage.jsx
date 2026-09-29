import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEOHead from '../../components/common/SEOHead';

const AdminLoginPage = () => {
  const { login } = useAuth();
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
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <SEOHead title="Admin Login | Baglamukhi Tour & Travels" noindex={true} />

      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md w-full space-y-6 border-2 border-yellow-400/40">
        <div className="text-center space-y-3">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-70 blur-md animate-pulse"></div>
            <div className="relative w-20 h-20 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 shadow-xl">
              <img
                src="/baglamukhi-temple-logo.jpg"
                alt="Maa Baglamukhi Temple"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <h1 className="text-2xl font-black text-neutral-950 font-display">Baglamukhi Admin Portal</h1>
          <p className="text-xs text-neutral-500 font-medium">Sign in to manage tours, bookings, fleet, and SEO</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1.5">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-xs font-medium"
                placeholder="admin@baglamukhitourtravels.com"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-xs"
                placeholder="••••••••"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-black text-neutral-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-lg shadow-yellow-500/25 transition flex items-center justify-center space-x-2 disabled:opacity-75"
          >
            {loading ? <span>Authenticating...</span> : <span>Sign In to Dashboard</span>}
            <ArrowRight className="w-4 h-4 text-neutral-950" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
