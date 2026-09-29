import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  MapPin,
  Map,
  Hotel,
  Car,
  CalendarCheck,
  BookOpen,
  MessageSquare,
  Star,
  HelpCircle,
  Image,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/common/SEOHead';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
    { label: 'Tour Packages', icon: Compass, to: '/admin/tours' },
    { label: 'Destinations', icon: MapPin, to: '/admin/destinations' },
    { label: 'Local City SEO', icon: Map, to: '/admin/locations' },
    { label: 'Cabs & Services', icon: Car, to: '/admin/services' },
    { label: 'Hotels & Resorts', icon: Hotel, to: '/admin/hotels' },
    { label: 'Bookings / Inquiries', icon: CalendarCheck, to: '/admin/bookings' },
    { label: 'Travel Blogs CMS', icon: BookOpen, to: '/admin/blogs' },
    { label: 'SEO Master Engine', icon: Search, to: '/admin/seo' },
    { label: 'Customer Reviews', icon: Star, to: '/admin/testimonials' },
    { label: 'FAQs Manager', icon: HelpCircle, to: '/admin/faqs' },
    { label: 'Gallery Photos', icon: Image, to: '/admin/gallery' },
    { label: 'Contact Messages', icon: MessageSquare, to: '/admin/contact' },
    { label: 'Site Settings & NAP', icon: Settings, to: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <SEOHead title="Admin Dashboard | Baglamukhi Tour & Travels" noindex={true} />

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation (Black & Gold) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-950 text-slate-300 border-r border-neutral-800 flex flex-col justify-between transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div>
          {/* Logo & Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400 text-neutral-950 flex items-center justify-center font-bold shadow-md shadow-yellow-500/20">
                <Shield className="w-5 h-5 text-neutral-950" />
              </div>
              <div>
                <span className="text-sm font-black text-white block leading-none font-display">BAGLAMUKHI</span>
                <span className="text-[10px] text-yellow-400 font-bold tracking-wider uppercase mt-1 block">
                  Admin CMS Panel
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={idx}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 text-xs font-bold rounded-xl transition ${
                      isActive
                        ? 'bg-yellow-400 text-neutral-950 shadow-md shadow-yellow-500/20'
                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-yellow-400'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-neutral-800 space-y-2 bg-neutral-950">
          <div className="flex items-center space-x-3 px-2 py-1 text-xs">
            <div className="w-8 h-8 rounded-full bg-yellow-400 text-neutral-950 font-black flex items-center justify-center">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-neutral-400 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center text-xs font-bold text-neutral-300 hover:text-yellow-400 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-800 transition flex items-center justify-center"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3 ml-1 text-yellow-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 text-rose-400 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 rounded-xl transition border border-rose-900/40"
              title="Logout from CMS"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between lg:justify-end shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-4 text-xs">
            <span className="hidden sm:inline text-neutral-500 font-medium">
              Signed in as: <strong className="text-neutral-900 font-bold">{user?.role?.toUpperCase()}</strong>
            </span>
            <Link
              to="/"
              target="_blank"
              className="px-3.5 py-1.5 font-black text-neutral-950 bg-yellow-400 hover:bg-yellow-500 rounded-xl flex items-center transition shadow-sm"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </header>

        {/* Viewport page body */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
