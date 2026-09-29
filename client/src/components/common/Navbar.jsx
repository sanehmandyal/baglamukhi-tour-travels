import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Compass,
  Search,
  Sparkles,
  ShieldCheck,
  Calendar,
  Lock,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import Logo from './Logo';

const Navbar = ({ onOpenInquiry }) => {
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tourDropdownOpen, setTourDropdownOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-[13.5px] font-medium transition-all duration-200 flex items-center whitespace-nowrap rounded-lg ${
      isActive
        ? 'text-amber-600 font-bold bg-amber-50/80'
        : 'text-slate-700 hover:text-amber-600 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* Top Notification Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-amber-400" />
              Verified Himachal Government Approved Agency
            </span>
            <span className="hidden lg:inline text-slate-600">•</span>
            <span className="hidden lg:flex items-center text-slate-300">
              <Sparkles className="w-3 h-3 mr-1 text-amber-400" />
              Maa Baglamukhi Darshan, Taxi Fleet & Tour Packages
            </span>
          </div>

          <div className="flex items-center space-x-4 ml-auto font-medium">
            <a
              href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919800000000'}`}
              className="flex items-center text-slate-200 hover:text-amber-400 transition"
            >
              <Phone className="w-3 h-3 mr-1 text-amber-400" />
              {settings.primaryPhone || '+91 98000 00000'}
            </a>

            <a
              href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '919800000000'}?text=Hi%20Baglamukhi%20Tour%20%26%20Travels,%20I%20want%20to%20inquire%20about%20a%20tour%20package`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-emerald-400 hover:text-emerald-300 transition"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              WhatsApp
            </a>

            <Link
              to="/admin/login"
              className="flex items-center text-amber-300 hover:text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded text-[11px] font-semibold transition border border-amber-500/40"
            >
              <Lock className="w-3 h-3 mr-1 text-amber-400" />
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <Logo variant="dark" size="md" />
          </Link>

          {/* Desktop Nav Links (Clean & Spacious) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            {/* Tour Packages Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTourDropdownOpen(true)}
              onMouseLeave={() => setTourDropdownOpen(false)}
            >
              <NavLink to="/tours" className={navLinkClass}>
                <span>Tour Packages</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" />
              </NavLink>

              {tourDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 animate-fadeIn z-50">
                  <Link
                    to="/tours"
                    className="block px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50/70 hover:bg-amber-100/70 transition"
                    onClick={() => setTourDropdownOpen(false)}
                  >
                    View All Packages →
                  </Link>
                  <div className="h-px bg-slate-100 my-1.5"></div>
                  <Link
                    to="/pilgrimage-tours"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setTourDropdownOpen(false)}
                  >
                    🛕 Maa Baglamukhi & 9 Devi Yatra
                  </Link>
                  <Link
                    to="/honeymoon-tours"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setTourDropdownOpen(false)}
                  >
                    ❤️ Honeymoon Special Packages
                  </Link>
                  <Link
                    to="/family-tours"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setTourDropdownOpen(false)}
                  >
                    👨‍👩‍👧 Family Holiday Packages
                  </Link>
                  <Link
                    to="/adventure-tours"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setTourDropdownOpen(false)}
                  >
                    🏔️ Spiti Valley 4x4 Expedition
                  </Link>
                  <Link
                    to="/weekend-trips"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setTourDropdownOpen(false)}
                  >
                    🚗 Weekend Trips from Chandigarh
                  </Link>
                  <Link
                    to="/customized-tours"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setTourDropdownOpen(false)}
                  >
                    ✨ Custom Tour Planner
                  </Link>
                </div>
              )}
            </div>

            {/* Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDestDropdownOpen(true)}
              onMouseLeave={() => setDestDropdownOpen(false)}
            >
              <NavLink to="/destinations" className={navLinkClass}>
                <span>Destinations</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" />
              </NavLink>

              {destDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 animate-fadeIn z-50">
                  <Link
                    to="/destinations"
                    className="block px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50/70 hover:bg-amber-100/70 transition"
                    onClick={() => setDestDropdownOpen(false)}
                  >
                    All Destinations →
                  </Link>
                  <div className="h-px bg-slate-100 my-1.5"></div>
                  <Link
                    to="/destinations/manali"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setDestDropdownOpen(false)}
                  >
                    Manali (Solang & Atal Tunnel)
                  </Link>
                  <Link
                    to="/destinations/shimla"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setDestDropdownOpen(false)}
                  >
                    Shimla & Kufri
                  </Link>
                  <Link
                    to="/destinations/dharamshala-mcleodganj"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setDestDropdownOpen(false)}
                  >
                    Dharamshala & Kangra Devi
                  </Link>
                  <Link
                    to="/destinations/amritsar"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setDestDropdownOpen(false)}
                  >
                    Amritsar (Golden Temple)
                  </Link>
                  <Link
                    to="/destinations/dalhousie-khajjiar"
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                    onClick={() => setDestDropdownOpen(false)}
                  >
                    Dalhousie & Khajjiar
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/cabs" className={navLinkClass}>
              Cab & Taxi
            </NavLink>

            <NavLink to="/blog" className={navLinkClass}>
              Blog
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-2.5">
            {/* Search Toggle Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-slate-600 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition"
              title="Search packages & destinations"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Call Desk (Desktop) */}
            <a
              href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919800000000'}`}
              className="hidden xl:flex items-center space-x-2 px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 border border-slate-200 rounded-xl transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{settings.primaryPhone || '+91 98000 00000'}</span>
            </a>

            {/* Radiant CTA Button */}
            <button
              onClick={() => (onOpenInquiry ? onOpenInquiry() : navigate('/booking'))}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl shadow-md shadow-amber-500/20 transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              Book Trip
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Slide Down Search Input (When Opened) */}
        {searchOpen && (
          <div className="py-3 border-t border-slate-100 animate-fadeIn">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative flex items-center">
              <input
                type="text"
                autoFocus
                placeholder="Search destination (e.g. Manali, Shimla, Devi Darshan, cabs)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
          <form onSubmit={handleSearch} className="relative my-2">
            <input
              type="text"
              placeholder="Search destination, tour package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="space-y-1 font-medium text-slate-700">
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 font-semibold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/tours"
              className="block px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 font-semibold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Tour Packages
            </Link>
            <div className="pl-4 space-y-1.5 text-xs text-slate-500">
              <Link
                to="/pilgrimage-tours"
                className="block py-1 hover:text-amber-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                • 🛕 Maa Baglamukhi & 9 Devi Yatra
              </Link>
              <Link
                to="/honeymoon-tours"
                className="block py-1 hover:text-amber-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                • ❤️ Honeymoon Special Packages
              </Link>
              <Link
                to="/family-tours"
                className="block py-1 hover:text-amber-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                • 👨‍👩‍👧 Family Holiday Packages
              </Link>
              <Link
                to="/adventure-tours"
                className="block py-1 hover:text-amber-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                • 🏔️ Spiti Valley Adventure
              </Link>
            </div>

            <Link
              to="/destinations"
              className="block px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 font-semibold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Destinations (Manali, Shimla, Kangra, etc.)
            </Link>
            <Link
              to="/cabs"
              className="block px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 font-semibold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cab & Taxi Services
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 font-semibold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Travel Guides & Blog
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 font-semibold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 font-semibold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/booking');
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-md transition"
            >
              Book Your Trip Now
            </button>

            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Admin Portal Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
