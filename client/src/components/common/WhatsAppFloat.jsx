import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const WhatsAppFloat = () => {
  const { settings } = useSettings();
  const phone = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '919800000000';
  const callPhone = settings.primaryPhone?.replace(/[^0-9+]/g, '') || '+919800000000';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* Quick Direct Call Button (Black & Gold) */}
      <a
        href={`tel:${callPhone}`}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-950 hover:bg-neutral-900 text-yellow-400 border-2 border-yellow-400/80 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 duration-200"
        title="Call Baglamukhi Travel Desk"
        aria-label="Call Baglamukhi Tour & Travels"
      >
        <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-yellow-400" />
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${phone}?text=Hi%20Baglamukhi%20Tour%20%26%20Travels,%20I%20am%20interested%20in%20booking%20a%20tour%20package%20/%20taxi.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 duration-200 border-2 border-white/40"
        title="Instant WhatsApp Inquiry"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
