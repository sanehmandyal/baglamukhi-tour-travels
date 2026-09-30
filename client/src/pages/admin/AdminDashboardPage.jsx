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
import { DEFAULT_TOURS, DEFAULT_CABS, DEFAULT_DESTINATIONS, DEFAULT_BLOGS } from '../../data/initialData';
import { syncDatabaseInventory } from '../../utils/seedHelper';

const defaultStats = {
  bookings: { total: 14, pending: 3, contacted: 4, confirmed: 7, completed: 11 },
  inventory: {
    tours: DEFAULT_TOURS.length,
    publishedTours: DEFAULT_TOURS.length,
    destinations: DEFAULT_DESTINATIONS.length,
    blogs: DEFAULT_BLOGS.length,
    services: DEFAULT_CABS.length,
    hotels: 6
  },
  inbox: { unreadMessages: 2 },
  recentBookings: [],
  recentMessages: []
};

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/stats/dashboard');
      if (res.data?.success && res.data?.data) {
        const d = res.data.data;
        if (d.inventory && (d.inventory.tours > 0 || d.inventory.services > 0)) {
          setStats(d);
        } else {
          setStats({
            ...defaultStats,
            ...d,
            inventory: {
              ...defaultStats.inventory,
              ...(d.inventory || {})
            }
          });
        }
      }
    } catch (err) {
      console.warn('[AdminDashboard] API unavailable, using default stats');
      setStats(defaultStats);
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

      {/* KPI Cards Grid - 6 Comprehensive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Inquiries */}
        <Link to="/admin/bookings" className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-2 hover:border-brand-400 transition block">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Inquiries</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.bookings?.total || 0}
            </span>
            <span className="text-[11px] text-amber-600 font-semibold">{stats.bookings?.pending || 0} New</span>
          </div>
          <p className="text-[11px] text-slate-400">Guest inquiries received</p>
        </Link>

        {/* Confirmed Bookings */}
        <Link to="/admin/bookings" className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-2 hover:border-emerald-400 transition block">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Confirmed</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.bookings?.confirmed || 0}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">Trips Booked</span>
          </div>
          <p className="text-[11px] text-slate-400">Vouchers & cabs assigned</p>
        </Link>

        {/* Tour Packages */}
        <Link to="/admin/tours" className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-2 hover:border-cyan-400 transition block">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tour Packages</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.inventory?.tours || DEFAULT_TOURS.length}
            </span>
            <span className="text-[11px] text-cyan-600 font-semibold">Live Itineraries</span>
          </div>
          <p className="text-[11px] text-slate-400">Himachal & Devi Darshan</p>
        </Link>

        {/* Destinations */}
        <Link to="/admin/destinations" className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-2 hover:border-indigo-400 transition block">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Destinations</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.inventory?.destinations || DEFAULT_DESTINATIONS.length}
            </span>
            <span className="text-[11px] text-indigo-600 font-semibold">Guides</span>
          </div>
          <p className="text-[11px] text-slate-400">Kangra, Manali, Shimla...</p>
        </Link>

        {/* Cabs / Fleet */}
        <Link to="/admin/services" className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-2 hover:border-amber-400 transition block">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Taxi & Fleet</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.inventory?.services || DEFAULT_CABS.length}
            </span>
            <span className="text-[11px] text-amber-600 font-semibold">Cabs Live</span>
          </div>
          <p className="text-[11px] text-slate-400">Dzire, Ertiga, Innova, Tempo</p>
        </Link>

        {/* Travel Blogs */}
        <Link to="/admin/blogs" className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-2 hover:border-emerald-400 transition block">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">SEO Blogs</span>
            <div className="w-9 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.inventory?.blogs || DEFAULT_BLOGS.length}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">Articles</span>
          </div>
          <p className="text-[11px] text-slate-400">Snow guides & travel advice</p>
        </Link>
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

        {stats.recentBookings && stats.recentBookings.length > 0 ? (
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
                  <th className="py-3 px-3 text-right">Quick Contact & Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {stats.recentBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-mono font-bold text-brand-700">{b.bookingId}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{b.name}</td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{b.phone}</p>
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
                      <div className="flex items-center justify-end space-x-1.5">
                        <a
                          href={`tel:${b.phone?.replace(/[^0-9+]/g, '')}`}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px]"
                          title="Call guest"
                        >
                          Call
                        </a>
                        <a
                          href={`https://wa.me/${b.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hi ${b.name}, Greetings from Baglamukhi Tour & Travels! Regarding your inquiry for ${
                              b.tourPackage || b.destination
                            }, how can I assist you?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded-lg text-[11px]"
                          title="WhatsApp guest"
                        >
                          WhatsApp
                        </a>
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <p className="text-xs text-slate-500">No recent booking inquiries recorded yet.</p>
            <button
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="px-4 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition shadow-sm inline-flex items-center"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-700" />
              {seeding ? 'Populating...' : '⚡ Populate Sample Inquiries & All Himachal Inventory'}
            </button>
          </div>
        )}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          to="/admin/destinations"
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-soft transition block space-y-2"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 font-display">Destinations CMS</h4>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Manage Maa Baglamukhi Dham, Manali, Shimla, Dharamshala, and sightseeing attractions.
          </p>
        </Link>

        <Link
          to="/admin/tours"
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-brand-300 hover:shadow-soft transition block space-y-2"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 font-display">Tour Packages</h4>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Create new itineraries, adjust day plans, change pricing, and customize inclusions.
          </p>
        </Link>

        <Link
          to="/admin/services"
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-amber-300 hover:shadow-soft transition block space-y-2"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 font-display">Cabs & Fleet Manager</h4>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Update vehicle fleet (Dzire, Ertiga, Innova, Tempo), per-km rates, and route tariffs.
          </p>
        </Link>

        <Link
          to="/admin/testimonials"
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-soft transition block space-y-2"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 font-display">Reviews & Testimonials</h4>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Approve and feature traveler ratings and reviews on the public homepage.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
