import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  Compass,
  MapPin,
  BookOpen,
  MessageSquare,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Search,
  Database,
  Sparkles,
} from 'lucide-react';
import api from '../../api/axios';
import { syncDatabaseInventory } from '../../utils/seedHelper';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get('/stats/dashboard');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSeedDatabase = async () => {
    if (!window.confirm('Populate database with all authentic Himachal Tour Packages, Fleet Services, Destinations, Blogs, FAQs & Testimonials?')) {
      return;
    }
    setSeeding(true);
    try {
      const res = await syncDatabaseInventory('all');
      alert('🎉 Database successfully synced with Himachal tour packages, authentic fleet, destinations, blogs, FAQs, and testimonials!');
      await fetchStats();
    } catch (err) {
      alert('Seeding notice: ' + (err.response?.data?.message || err.message));
    } finally {
      setSeeding(false);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}`, { status: newStatus });
      fetchStats();
    } catch (err) {
      alert('Failed to update booking status');
    }
  };

  if (loading || !stats) {
    return (
      <div className="py-24 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-brand-600 animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-700">Loading dashboard analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome & Refresh */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500">Live booking status, inquiries, inventory and content stats</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="px-4 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition flex items-center shadow-sm disabled:opacity-50"
            title="Populate complete inventory if database is fresh"
          >
            <Sparkles className={`w-3.5 h-3.5 mr-1.5 text-amber-700 ${seeding ? 'animate-spin' : ''}`} />
            {seeding ? 'Populating Data...' : '⚡ Seed / Sync Inventory'}
          </button>

          <button
            onClick={fetchStats}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition flex items-center shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Refresh Stats
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Bookings */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {stats.bookings.total}
            </span>
            <span className="text-xs text-amber-600 font-semibold">{stats.bookings.pending} Pending</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-500 h-full rounded-full"
              style={{ width: `${Math.min(100, (stats.bookings.confirmed / (stats.bookings.total || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirmed Trips</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {stats.bookings.confirmed}
            </span>
            <span className="text-xs text-emerald-600 font-semibold">Active & Confirmed</span>
          </div>
          <p className="text-[11px] text-slate-400">Vouchers issued and cabs assigned</p>
        </div>

        {/* Published Tours */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tour Packages</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {stats.inventory.publishedTours}
            </span>
            <span className="text-xs text-slate-400">/ {stats.inventory.tours} total</span>
          </div>
          <p className="text-[11px] text-slate-400">{stats.inventory.destinations} Destinations live</p>
        </div>

        {/* Travel Blogs */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SEO Blog Posts</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {stats.inventory.blogs}
            </span>
            <span className="text-xs text-brand-600 font-semibold">Live Articles</span>
          </div>
          <p className="text-[11px] text-slate-400">{stats.inbox.unreadMessages} unread messages in inbox</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Recent Booking Inquiries</h3>
            <p className="text-xs text-slate-500">Real-time inquiries received from website visitors</p>
          </div>
          <Link
            to="/admin/bookings"
            className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center"
          >
            <span>View All Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3 px-3">Booking ID</th>
                <th className="py-3 px-3">Customer Name</th>
                <th className="py-3 px-3">Phone & Email</th>
                <th className="py-3 px-3">Destination / Tour</th>
                <th className="py-3 px-3">Travel Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {stats.recentBookings.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-mono font-bold text-brand-700">{b.bookingId}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{b.name}</td>
                  <td className="py-3 px-3">
                    <p>{b.phone}</p>
                    <p className="text-[10px] text-slate-400">{b.email}</p>
                  </td>
                  <td className="py-3 px-3 max-w-xs truncate">{b.tourPackage || b.destination}</td>
                  <td className="py-3 px-3">{new Date(b.travelDate).toLocaleDateString()}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'Contacted'
                          ? 'bg-sky-100 text-sky-800'
                          : b.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <select
                      value={b.status}
                      onChange={(e) => handleUpdateStatus(b._id, e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-1 font-semibold focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          to="/admin/tours"
          className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-brand-300 hover:shadow-soft transition block space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 font-display">Manage Tour Packages</h4>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Create new itineraries, adjust day plans, change pricing, and update inclusions.
          </p>
        </Link>

        <Link
          to="/admin/seo-manager"
          className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-brand-300 hover:shadow-soft transition block space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 font-display">SEO & SERP Manager</h4>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Preview Google search snippets, edit meta tags across all URLs, and check audit score.
          </p>
        </Link>

        <Link
          to="/admin/blogs"
          className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-brand-300 hover:shadow-soft transition block space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 font-display">Travel Blog CMS</h4>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Publish seasonal travel guides, snowfall forecasts, and Himachal road trip advice.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
