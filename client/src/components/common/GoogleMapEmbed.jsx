import React from 'react';
import { useSettings } from '../../context/SettingsContext';

const GoogleMapEmbed = ({ title = 'Baglamukhi Tour & Travels - Amb Andaura Railway Station & Kangra Himachal' }) => {
  const { settings } = useSettings();
  const mapSrc = settings?.googleMapEmbedUrl || "https://maps.google.com/maps?q=Amb+Andaura+Railway+Station,+Una+District,+Himachal+Pradesh+177203&t=&z=14&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-soft border border-slate-200">
      <iframe
        title={title}
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;
