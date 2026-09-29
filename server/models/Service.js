const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
      enum: ['Cab & Taxi', 'Airport Transfer', 'Tempo Traveller', 'Bus Rental', 'Custom Tour Transport'],
      required: true,
      index: true,
    },
    icon: {
      type: String,
      default: 'Car',
    },
    featuredImage: {
      url: { type: String, required: true },
      alt: { type: String, required: true },
    },
    shortDescription: {
      type: String,
      required: true,
    },
    detailedContent: {
      type: String,
      required: true,
    },
    fleetOptions: [
      {
        vehicleName: { type: String, required: true },
        seatingCapacity: { type: String, required: true },
        luggageCapacity: { type: String, required: true },
        ratePerKm: { type: Number, required: true },
        fullDayRate: { type: Number, required: true },
        features: [String],
        image: String,
      },
    ],
    popularRoutes: [
      {
        route: { type: String, required: true },
        distance: { type: String, required: true },
        sedanPrice: { type: Number, required: true },
        suvPrice: { type: Number, required: true },
        tempoPrice: { type: Number, required: true },
      },
    ],
    features: [String],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
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
