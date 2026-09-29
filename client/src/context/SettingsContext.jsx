import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: import.meta.env.VITE_COMPANY_NAME || 'BAGLAMUKHI TOUR & TRAVELS',
    tagline: 'Your Trusted Travel Partner for Himachal Pradesh & North India Tours',
    primaryPhone: import.meta.env.VITE_PRIMARY_PHONE || '+91 98000 00000',
    secondaryPhone: import.meta.env.VITE_SECONDARY_PHONE || '+91 98111 11111',
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '+91 98000 00000',
    email: import.meta.env.VITE_EMAIL || 'info@baglamukhitourtravels.com',
    supportEmail: 'bookings@baglamukhitourtravels.com',
    address: import.meta.env.VITE_ADDRESS || 'Near Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 176049, India',
    city: 'Kangra & Chandigarh',
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
        setSettings(res.data.data);
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
