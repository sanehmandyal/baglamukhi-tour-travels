import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import ToursPage from './pages/public/ToursPage';
import TourDetailPage from './pages/public/TourDetailPage';
import DestinationsPage from './pages/public/DestinationsPage';
import DestinationDetailPage from './pages/public/DestinationDetailPage';
import CabsPage from './pages/public/CabsPage';
import AirportTransfersPage from './pages/public/AirportTransfersPage';
import TempoTravellerPage from './pages/public/TempoTravellerPage';
import HoneymoonToursPage from './pages/public/HoneymoonToursPage';
import FamilyToursPage from './pages/public/FamilyToursPage';
import AdventureToursPage from './pages/public/AdventureToursPage';
import PilgrimageToursPage from './pages/public/PilgrimageToursPage';
import WeekendTripsPage from './pages/public/WeekendTripsPage';
import CustomizedToursPage from './pages/public/CustomizedToursPage';
import GroupToursPage from './pages/public/GroupToursPage';
import CorporateTravelPage from './pages/public/CorporateTravelPage';
import BusRentalsPage from './pages/public/BusRentalsPage';
import BlogPage from './pages/public/BlogPage';
import BlogDetailPage from './pages/public/BlogDetailPage';
import FAQsPage from './pages/public/FAQsPage';
import TestimonialsPage from './pages/public/TestimonialsPage';
import GalleryPage from './pages/public/GalleryPage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import TermsConditionsPage from './pages/public/TermsConditionsPage';
import CancellationRefundPage from './pages/public/CancellationRefundPage';
import SitemapHtmlPage from './pages/public/SitemapHtmlPage';
import BookingPage from './pages/public/BookingPage';
import BookingConfirmationPage from './pages/public/BookingConfirmationPage';
import ThankYouPage from './pages/public/ThankYouPage';
import SearchPage from './pages/public/SearchPage';
import LocationDetailPage from './pages/public/LocationDetailPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminToursPage from './pages/admin/AdminToursPage';
import AdminTourEditPage from './pages/admin/AdminTourEditPage';
import AdminDestinationsPage from './pages/admin/AdminDestinationsPage';
import AdminDestinationEditPage from './pages/admin/AdminDestinationEditPage';
import AdminLocationsPage from './pages/admin/AdminLocationsPage';
import AdminLocationEditPage from './pages/admin/AdminLocationEditPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminBlogsPage from './pages/admin/AdminBlogsPage';
import AdminBlogEditPage from './pages/admin/AdminBlogEditPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';
import AdminFAQsPage from './pages/admin/AdminFAQsPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import AdminContactMessagesPage from './pages/admin/AdminContactMessagesPage';
import AdminSeoManagerPage from './pages/admin/AdminSeoManagerPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Scroll to Top Helper on Route Changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin Login Route (Independent) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin CMS Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="tours" element={<AdminToursPage />} />
          <Route path="tours/new" element={<AdminTourEditPage />} />
          <Route path="tours/edit/:id" element={<AdminTourEditPage />} />
          <Route path="destinations" element={<AdminDestinationsPage />} />
          <Route path="destinations/new" element={<AdminDestinationEditPage />} />
          <Route path="destinations/edit/:id" element={<AdminDestinationEditPage />} />
          <Route path="locations" element={<AdminLocationsPage />} />
          <Route path="locations/new" element={<AdminLocationEditPage />} />
          <Route path="locations/edit/:id" element={<AdminLocationEditPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
          <Route path="blogs/new" element={<AdminBlogEditPage />} />
          <Route path="blogs/edit/:id" element={<AdminBlogEditPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="testimonials" element={<AdminTestimonialsPage />} />
          <Route path="faqs" element={<AdminFAQsPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
          <Route path="contact" element={<AdminContactMessagesPage />} />
          <Route path="seo" element={<AdminSeoManagerPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Public Website Routes with Unified Header & Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:slug" element={<TourDetailPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="/cabs" element={<CabsPage />} />
          <Route path="/airport-transfers" element={<AirportTransfersPage />} />
          <Route path="/tempo-traveller" element={<TempoTravellerPage />} />
          <Route path="/honeymoon-tours" element={<HoneymoonToursPage />} />
          <Route path="/family-tours" element={<FamilyToursPage />} />
          <Route path="/adventure-tours" element={<AdventureToursPage />} />
          <Route path="/pilgrimage-tours" element={<PilgrimageToursPage />} />
          <Route path="/weekend-trips" element={<WeekendTripsPage />} />
          <Route path="/customized-tours" element={<CustomizedToursPage />} />
          <Route path="/group-tours" element={<GroupToursPage />} />
          <Route path="/corporate-travel" element={<CorporateTravelPage />} />
          <Route path="/bus-rentals" element={<BusRentalsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
          <Route path="/cancellation-and-refund" element={<CancellationRefundPage />} />
          <Route path="/html-sitemap" element={<SitemapHtmlPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/locations/:slug" element={<LocationDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
