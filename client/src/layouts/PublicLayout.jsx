import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';
import QuickInquiryModal from '../components/common/QuickInquiryModal';
import { OrganizationSchema, WebSiteSchema } from '../components/common/SchemaMarkup';

const PublicLayout = () => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleOpenInquiry = (pkgName = '') => {
    setSelectedPackage(pkgName);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* Global Schema.org JSON-LD microdata */}
      <OrganizationSchema />
      <WebSiteSchema />

      {/* Main Header / Navbar */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* Main Content Viewport */}
      <main className="flex-grow">
        <Outlet context={{ openInquiry: handleOpenInquiry }} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Call & WhatsApp Buttons */}
      <WhatsAppFloat />

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialPackage={selectedPackage}
      />
    </div>
  );
};

export default PublicLayout;
