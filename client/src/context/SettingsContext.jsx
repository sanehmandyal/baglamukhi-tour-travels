import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: import.meta.env.VITE_COMPANY_NAME || 'BAGLAMUKHI TOUR & TRAVELS',
    logoUrl: import.meta.env.VITE_LOGO_URL || '/baglamukhi-temple-logo.jpg',
    tagline: 'Your Trusted Travel Partner for Himachal Pradesh & North India Tours',
    primaryPhone: import.meta.env.VITE_PRIMARY_PHONE || '+91 98051 43007',
    secondaryPhone: import.meta.env.VITE_SECONDARY_PHONE || '+91 98051 43007',
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '+91 98051 43007',
    email: import.meta.env.VITE_EMAIL || 'info@baglamukhitourtravels.com',
    supportEmail: 'bookings@baglamukhitourtravels.com',
    address: import.meta.env.VITE_ADDRESS || 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India',
    officeAddress: 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India',
    googleMapEmbedUrl: 'https://maps.google.com/maps?q=Amb+Andaura+Railway+Station,+Una+District,+Himachal+Pradesh+177203&t=&z=14&ie=UTF8&iwloc=&output=embed',
    city: 'Amb Andaura, Kangra & Chandigarh',
    state: 'Himachal Pradesh',
    operatingHours: '24/7 Helpline & Cab Dispatch Available',
    socialLinks: {
      facebook: 'https://facebook.com/baglamukhitourtravels',
      instagram: 'https://instagram.com/baglamukhitourtravels',
      youtube: 'https://youtube.com/@baglamukhitourtravels',
      twitter: 'https://twitter.com/baglamukhitravels',
      tripadvisor: 'https://tripadvisor.com',
    },
  });

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      if (res.data.success && res.data.data) {
        const raw = res.data.data;
        // Sanitize any legacy database numbers or addresses
        const clean = {
          ...raw,
          logoUrl: raw.logoUrl || '/baglamukhi-temple-logo.jpg',
          primaryPhone:
            !raw.primaryPhone || raw.primaryPhone.includes('98000') || raw.primaryPhone.includes('98160')
              ? '+91 98051 43007'
              : raw.primaryPhone,
          secondaryPhone:
            !raw.secondaryPhone || raw.secondaryPhone.includes('98111') || raw.secondaryPhone.includes('98050')
              ? '+91 98051 43007'
              : raw.secondaryPhone,
          whatsappNumber:
            !raw.whatsappNumber || raw.whatsappNumber.includes('98000') || raw.whatsappNumber.includes('98160')
              ? '+91 98051 43007'
              : raw.whatsappNumber,
          address:
            !raw.address || raw.address.includes('176049') || !raw.address.includes('Amb Andaura')
              ? 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India'
              : raw.address,
          officeAddress:
            !raw.officeAddress || raw.officeAddress.includes('176049') || !raw.officeAddress.includes('Amb Andaura')
              ? 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India'
              : raw.officeAddress,
          googleMapEmbedUrl:
            !raw.googleMapEmbedUrl || raw.googleMapEmbedUrl.includes('Shimla') || !raw.googleMapEmbedUrl.includes('Amb+Andaura')
              ? 'https://maps.google.com/maps?q=Amb+Andaura+Railway+Station,+Una+District,+Himachal+Pradesh+177203&t=&z=14&ie=UTF8&iwloc=&output=embed'
              : raw.googleMapEmbedUrl,
        };
        setSettings(clean);
      }
    } catch (error) {
      console.warn('Using default settings fallback');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, refetchSettings: fetchSettings, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
