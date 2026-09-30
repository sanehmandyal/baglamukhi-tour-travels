import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { OrganizationSchema } from '../../components/common/SchemaMarkup';
import ContactForm from '../../components/forms/ContactForm';
import GoogleMapEmbed from '../../components/common/GoogleMapEmbed';
import { useSettings } from '../../context/SettingsContext';

const ContactPage = () => {
  const { settings } = useSettings();

  return (
    <div>
      <SEOHead
        title="Contact Us | Baglamukhi Tour & Travels - 24/7 Helpline & Office Address"
        description="Get in touch with Baglamukhi Tour & Travels. Call +91 98051 43007 or WhatsApp us 24/7. Office near Amb Andaura Railway Station (AADR) & Kangra for instant holiday and cab bookings."
        canonical="/contact-us"
        keywords={['Contact Baglamukhi Tour and Travels', 'Amb Andaura taxi contact number', 'Maa Baglamukhi temple cab phone number', 'Himachal holiday booking desk', 'Tempo Traveller contact Himachal']}
      />

      <OrganizationSchema />
      <Breadcrumbs items={[{ name: 'Contact Us', url: '/contact-us' }]} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
            24/7 Traveler Assistance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Contact Our Travel Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Have questions about tour itineraries, taxi rates, or custom packages? Our travel advisors are available round-the-clock.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Contact Cards & NAP */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-display">Contact Information</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect with our booking executives via phone, email, or WhatsApp.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Phone Numbers</span>
                    <a href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919805143007'}`} className="text-brand-600 hover:underline block font-bold">
                      {settings.primaryPhone || '+91 98051 43007'} (Primary Helpline)
                    </a>
                    <a href={`tel:${settings.secondaryPhone?.replace(/\s+/g, '') || '+919805143007'}`} className="text-slate-600 hover:underline block">
                      {settings.secondaryPhone || '+91 98051 43007'} (Booking Desk)
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Instant WhatsApp</span>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '919805143007'}?text=Hi%20Baglamukhi%20Tour%20%26%20Travels,%20I%20want%20to%20inquire%20about%20a%20tour`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 font-medium hover:underline block"
                    >
                      Chat with us on WhatsApp (+91 98051 43007)
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Email Address</span>
                    <a href={`mailto:${settings.email || 'info@baglamukhitourtravels.com'}`} className="text-slate-600 hover:underline block">
                      {settings.email || 'info@baglamukhitourtravels.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Head Office Address</span>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {settings.address || 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Working Hours</span>
                    <p className="text-slate-600 text-xs">{settings.operatingHours || '24 Hours / 7 Days a Week (Round-the-Clock Dispatch)'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Trust box */}
            <div className="bg-brand-50 border border-brand-200 rounded-3xl p-6 text-xs text-brand-900 space-y-2">
              <h4 className="font-bold flex items-center text-brand-800">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-brand-600" />
                Himachal Govt. Approved Agency
              </h4>
              <p className="text-brand-700 leading-relaxed">
                Registered commercial transport and holiday operator. All bookings protected with verified invoices and voucher receipts.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 font-display">Find Our Office on Google Maps (Amb Andaura Railway Station)</h3>
          <GoogleMapEmbed title="Baglamukhi Tour and Travels Amb Andaura Station Kangra Office" />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
