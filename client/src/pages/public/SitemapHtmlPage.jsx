import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Compass, MapPin, Car, Hotel, BookOpen, Shield, ExternalLink } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const SitemapHtmlPage = () => {
  const sections = [
    {
      title: 'Main Website Pages',
      icon: Compass,
      links: [
        { name: 'Home Page', url: '/' },
        { name: 'About Us', url: '/about-us' },
        { name: 'Contact Us', url: '/contact-us' },
        { name: 'Frequently Asked Questions (FAQs)', url: '/faqs' },
        { name: 'Customer Testimonials & Reviews', url: '/testimonials' },
        { name: 'Travel Photo Gallery', url: '/gallery' },
        { name: 'Book a Trip Online', url: '/booking' },
      ],
    },
    {
      title: 'Tour Packages',
      icon: Compass,
      links: [
        { name: 'All Tour Packages', url: '/tours' },
        { name: 'Manali Deluxe 5 Days Package', url: '/tours/manali-deluxe-5-days-tour-package' },
        { name: 'Shimla Manali 6 Days Complete Tour', url: '/tours/shimla-manali-combined-6-days-package' },
        { name: 'Romantic Manali Honeymoon Special', url: '/tours/manali-honeymoon-special-5-days-package' },
        { name: '9 Devi Darshan Pilgrimage Tour', url: '/tours/9-devi-darshan-himachal-pilgrimage-package' },
        { name: 'Spiti Valley High Altitude Road Trip', url: '/tours/spiti-valley-7-days-road-trip' },
        { name: 'Weekend Shimla Kasauli Getaway', url: '/tours/shimla-kasauli-weekend-trip-from-chandigarh' },
        { name: 'Honeymoon Tours', url: '/honeymoon-tours' },
        { name: 'Family Tours', url: '/family-tours' },
        { name: 'Adventure Tours', url: '/adventure-tours' },
        { name: 'Pilgrimage Tours', url: '/pilgrimage-tours' },
        { name: 'Weekend Trips', url: '/weekend-trips' },
        { name: 'Customized Tours', url: '/customized-tours' },
        { name: 'Group Tours', url: '/group-tours' },
        { name: 'Corporate Travel', url: '/corporate-travel' },
      ],
    },
    {
      title: 'Destinations',
      icon: MapPin,
      links: [
        { name: 'All Destinations', url: '/destinations' },
        { name: 'Manali Travel Guide', url: '/destinations/manali' },
        { name: 'Shimla Travel Guide', url: '/destinations/shimla' },
        { name: 'Dharamshala & McLeodganj', url: '/destinations/dharamshala-mcleodganj' },
        { name: 'Amritsar Golden Temple', url: '/destinations/amritsar' },
        { name: 'Dalhousie & Khajjiar', url: '/destinations/dalhousie-khajjiar' },
      ],
    },
    {
      title: 'Cab & Transportation Services',
      icon: Car,
      links: [
        { name: 'Cab & Taxi Booking', url: '/cabs' },
        { name: 'Chandigarh to Manali Taxi', url: '/services/cab-booking' },
        { name: 'Airport Taxi Transfers (IXC / DEL)', url: '/services/airport-transfer' },
        { name: 'Tempo Traveller Rental (9 to 26 Seater)', url: '/services/tempo-traveller' },
        { name: 'Bus & Volvo Coach Rentals', url: '/services/car-rental' },
      ],
    },
    {
      title: 'Local City SEO Pages',
      icon: Map,
      links: [
        { name: 'Tour & Travel Agency Chandigarh', url: '/locations/chandigarh' },
        { name: 'Taxi Service Mohali', url: '/locations/mohali' },
        { name: 'Travel Agency Zirakpur', url: '/locations/zirakpur' },
        { name: 'Tour Operator Panchkula', url: '/locations/panchkula' },
        { name: 'Una Himachal Station Taxi', url: '/locations/una' },
      ],
    },
    {
      title: 'Travel Blogs & CMS Guides',
      icon: BookOpen,
      links: [
        { name: 'Travel Blog Home', url: '/blog' },
        { name: 'Best Time to Visit Manali', url: '/blog/best-time-to-visit-manali' },
        { name: 'Shimla vs Manali Comparison', url: '/blog/shimla-vs-manali-travel-guide' },
        { name: 'How to Plan Himachal Trip from Chandigarh', url: '/blog/how-to-plan-himachal-trip-from-chandigarh' },
      ],
    },
    {
      title: 'Legal & Policies',
      icon: Shield,
      links: [
        { name: 'Privacy Policy', url: '/privacy-policy' },
        { name: 'Terms & Conditions', url: '/terms-and-conditions' },
        { name: 'Cancellation & Refund Policy', url: '/cancellation-refund-policy' },
      ],
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="HTML Sitemap | Baglamukhi Tour & Travels Site Index"
        description="Comprehensive HTML sitemap of Baglamukhi Tour & Travels. Explore all tour packages, destination guides, taxi services, and travel blogs."
        canonical="/sitemap"
      />
      <Breadcrumbs items={[{ name: 'Sitemap', url: '/sitemap' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-12 text-white text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display">Website Sitemap & Navigation</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">Complete crawlable directory of all pages</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center font-display pb-2 border-b border-slate-100">
                  <Icon className="w-4 h-4 text-brand-600 mr-2" />
                  {sec.title}
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {sec.links.map((link, i) => (
                    <li key={i}>
                      <Link to={link.url} className="hover:text-brand-600 transition flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mr-2"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Looking for machine-readable XML format? View our{' '}
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-brand-600 font-bold hover:underline inline-flex items-center">
            XML Sitemap <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SitemapHtmlPage;
