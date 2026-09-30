const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Vehicle or Service title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    serviceType: {
      type: String,
      default: 'Cab & Taxi',
      index: true,
    },
    category: {
      type: String,
      default: 'cab-rental',
      index: true,
    },
    vehicleType: {
      type: String,
      default: 'Sedan / SUV / Mountain 4x4',
    },
    capacity: {
      type: String,
      default: '4+1 Passengers',
    },
    passengers: {
      type: String,
      default: '4 to 6 Passengers',
    },
    luggageCapacity: {
      type: String,
      default: '3 Large Bags + Boot',
    },
    luggage: {
      type: String,
      default: '3 Large Bags + Heavy Roof Carrier',
    },
    pricePerKm: {
      type: Number,
      default: 14,
    },
    baseFare: {
      type: Number,
      default: 2500,
    },
    ratePerKm: {
      type: Number,
      default: 14,
    },
    fullDayRate: {
      type: Number,
      default: 2500,
    },
    icon: {
      type: String,
      default: 'Car',
    },
    image: {
      type: String,
      default: '/images/cabs/force-cruiser-4x4.jpg',
    },
    featuredImage: {
      url: { type: String, default: '/images/cabs/force-cruiser-4x4.jpg' },
      alt: { type: String, default: 'Himachal Tourist Cab & Vehicle' },
    },
    badge: {
      type: String,
      default: 'Verified Hill Fleet',
    },
    colorName: {
      type: String,
      default: 'Alpine White / Mountain Silver',
    },
    colorTheme: {
      type: String,
      default: 'Alpine White',
    },
    colorDot: {
      type: String,
      default: 'bg-amber-500',
    },
    tagline: {
      type: String,
      default: 'Reliable tourist taxi with experienced native Himachali mountain driver for temple darshan and holiday tours.',
    },
    transmission: {
      type: String,
      default: 'High Torque Mountain Hill Engine',
    },
    climateControl: {
      type: String,
      default: 'Dual AC & Mountain Heater',
    },
    terrain: {
      type: String,
      default: 'Maa Baglamukhi Kangra, Shimla, Manali, Dharamshala, All Weather',
    },
    idealFor: {
      type: String,
      default: 'Pilgrimage Darshan, Family Holidays, Airport Transfers',
    },
    shortDescription: {
      type: String,
      default: 'Comfortable and fully sanitized tourist cab with experienced hill driver.',
    },
    detailedContent: {
      type: String,
      default: 'Fully licensed commercial taxi with All India Tourist Permit, yellow plates, fastag, and mountain safety features.',
    },
    fullDescription: {
      type: String,
      default: '',
    },
    fleetOptions: [
      {
        vehicleName: String,
        seatingCapacity: String,
        luggageCapacity: String,
        ratePerKm: Number,
        fullDayRate: Number,
        features: [String],
        image: String,
      },
    ],
    popularRoutes: {
      type: mongoose.Schema.Types.Mixed,
      default: ['Chandigarh to Manali', 'Maa Baglamukhi Temple Kangra', 'Shimla & Kufri', 'Dharamshala McLeodganj'],
    },
    features: {
      type: [String],
      default: ['All India Tourist Permit (Yellow Plate)', 'Expert Pahadi Hill Chauffeur', 'Heater & Dual AC', 'Clean Sanitized Cabin', 'Fastag & GPS Tracking'],
    },
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      canonicalUrl: String,
      focusKeyword: String,
      secondaryKeywords: [String],
      ogImage: String,
      robots: { type: String, default: 'index, follow' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
