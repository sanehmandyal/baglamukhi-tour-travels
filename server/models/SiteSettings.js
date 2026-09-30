const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'BAGLAMUKHI TOUR & TRAVELS',
    },
    siteName: {
      type: String,
      default: 'Baglamukhi Tour & Travels',
    },
    tagline: {
      type: String,
      default: 'Your Trusted Travel Partner for Himachal Pradesh & North India Tours',
    },
    primaryPhone: {
      type: String,
      default: '+91 98051 43007',
    },
    secondaryPhone: {
      type: String,
      default: '+91 98051 43007',
    },
    whatsappNumber: {
      type: String,
      default: '+91 98051 43007',
    },
    email: {
      type: String,
      default: 'info@baglamukhitourtravels.com',
    },
    supportEmail: {
      type: String,
      default: 'bookings@baglamukhitourtravels.com',
    },
    bookingEmail: {
      type: String,
      default: 'bookings@baglamukhitourtravels.com',
    },
    address: {
      type: String,
      default: 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India',
    },
    officeAddress: {
      type: String,
      default: 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India',
    },
    googleMapEmbedUrl: {
      type: String,
      default: 'https://maps.google.com/maps?q=Amb+Andaura+Railway+Station,+Una+District,+Himachal+Pradesh+177203&t=&z=14&ie=UTF8&iwloc=&output=embed',
    },
    city: {
      type: String,
      default: 'Amb Andaura, Kangra & Chandigarh',
    },
    state: {
      type: String,
      default: 'Himachal Pradesh',
    },
    pincode: {
      type: String,
      default: '177203',
    },
    operatingHours: {
      type: String,
      default: '24/7 Helpline & Cab Dispatch Available',
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/baglamukhitourtravels' },
      instagram: { type: String, default: 'https://instagram.com/baglamukhitourtravels' },
      youtube: { type: String, default: 'https://youtube.com/@baglamukhitourtravels' },
      twitter: { type: String, default: 'https://twitter.com/baglamukhitravels' },
      tripadvisor: { type: String, default: 'https://tripadvisor.com' },
    },
    analytics: {
      googleAnalyticsId: { type: String, default: 'G-XXXXXXXXXX' },
      googleTagManagerId: { type: String, default: '' },
      googleSiteVerification: { type: String, default: '' },
    },
    seoDefaults: {
      defaultTitle: { type: String, default: 'Baglamukhi Tour & Travels | Best Tour Packages & Cab Services' },
      defaultMetaDescription: {
        type: String,
        default:
          'Experience unforgettable holidays with Baglamukhi Tour & Travels. Offering customized Himachal tour packages, Shimla Manali trips, Chandigarh airport cabs, and pilgrimage tours.',
      },
      defaultOgImage: {
        type: String,
        default: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
