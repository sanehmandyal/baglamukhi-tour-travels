import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Heart,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import Logo from './Logo';

const Footer = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-slate-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-12 border-b border-neutral-800 text-slate-300">
          <div className="flex items-center space-x-3.5 bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 hover:border-yellow-500/40 transition">
            <div className="p-2.5 rounded-xl bg-yellow-400/10 text-yellow-400">
              <ShieldCheck className="w-6 h-6 flex-shrink-0" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Government Approved</p>
              <p className="text-xs text-neutral-400">Registered Tour Agency</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 hover:border-yellow-500/40 transition">
            <div className="p-2.5 rounded-xl bg-yellow-400/10 text-yellow-400">
              <Award className="w-6 h-6 flex-shrink-0" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">4.9/5 Star Rating</p>
              <p className="text-xs text-neutral-400">1,500+ Happy Families</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 hover:border-yellow-500/40 transition">
            <div className="p-2.5 rounded-xl bg-yellow-400/10 text-yellow-400">
              <Clock className="w-6 h-6 flex-shrink-0" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">24/7 Cab Dispatch</p>
              <p className="text-xs text-neutral-400">Dedicated Hill Drivers</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 hover:border-yellow-500/40 transition">
            <div className="p-2.5 rounded-xl bg-yellow-400/10 text-yellow-400">
              <Heart className="w-6 h-6 flex-shrink-0" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Best Price Guarantee</p>
              <p className="text-xs text-neutral-400">Direct Local Rates</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <Logo variant="light" size="lg" />
            </Link>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Premier Himachal and North India pilgrimage and holiday tour operator. We specialize in Maa Baglamukhi Darshan, 9 Devi Yatra, Manali holidays, Shimla packages, Chandigarh airport cabs, and luxury tempo traveller rentals.
            </p>

            {/* NAP Info */}
            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <p className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>{settings.address || 'Near Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 176049, India'}</span>
              </p>
              <p className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <a href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919800000000'}`} className="hover:text-yellow-400 transition font-medium">
                  {settings.primaryPhone || '+91 98000 00000'} / {settings.secondaryPhone || '+91 98111 11111'}
                </a>
              </p>
              <p className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <a href={`mailto:${settings.email || 'info@baglamukhitourtravels.com'}`} className="hover:text-yellow-400 transition">
                  {settings.email || 'info@baglamukhitourtravels.com'}
                </a>
              </p>
            </div>
          </div>

          {/* Popular Tour Packages */}
          <div>
            <h4 className="text-xs font-bold text-yellow-400 tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Top Packages
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link to="/pilgrimage-tours" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Maa Baglamukhi & 9 Devi
                </Link>
              </li>
              <li>
                <Link to="/tours/manali-deluxe-5-days-tour-package" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Manali 5 Days Deluxe
                </Link>
              </li>
              <li>
                <Link to="/tours/shimla-manali-combined-6-days-tour-package" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Shimla Manali 6 Days Combo
                </Link>
              </li>
              <li>
                <Link to="/honeymoon-tours" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Himachal Honeymoon Special
                </Link>
              </li>
              <li>
                <Link to="/adventure-tours" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Spiti Valley 4x4 Expedition
                </Link>
              </li>
              <li>
                <Link to="/weekend-trips" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Weekend Shimla Kasauli
                </Link>
              </li>
            </ul>
          </div>

          {/* Transport & City Hubs */}
          <div>
            <h4 className="text-xs font-bold text-yellow-400 tracking-wider uppercase mb-4">Cabs & Local SEO</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link to="/cabs" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Chandigarh to Manali Taxi
                </Link>
              </li>
              <li>
                <Link to="/airport-transfers" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Chandigarh Airport Transfer
                </Link>
              </li>
              <li>
                <Link to="/tempo-traveller" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  12/17/26 Seater Tempo
                </Link>
              </li>
              <li>
                <Link to="/locations/chandigarh" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Chandigarh Taxi Service
                </Link>
              </li>
              <li>
                <Link to="/locations/delhi" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Delhi to Himachal Cabs
                </Link>
              </li>
              <li>
                <Link to="/locations/kalka" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Kalka Railway Station Taxi
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h4 className="text-xs font-bold text-yellow-400 tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link to="/about" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  About Our Company
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Himachal Travel Blog
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cancellation-and-refund" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link to="/html-sitemap" className="hover:text-yellow-400 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-neutral-600" />
                  HTML Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 text-xs text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Baglamukhi Tour & Travels. All Rights Reserved. Built with SEO-First Architecture.</p>
          <div className="flex items-center space-x-4">
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-yellow-400 transition">
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
