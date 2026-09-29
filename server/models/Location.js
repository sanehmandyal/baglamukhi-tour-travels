const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      default: 'Punjab / Himachal / Haryana / Chandigarh UT',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    heroImage: {
      url: { type: String, required: true },
      alt: { type: String, required: true },
    },
    shortIntro: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    servicesOffered: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    popularRoutes: [
      {
        destination: { type: String, required: true },
        distance: { type: String, required: true },
        duration: { type: String, required: true },
        startingPrice: { type: Number, required: true },
      },
    ],
    nearbyAttractions: [
      {
        name: { type: String, required: true },
        distance: { type: String, required: true },
        highlights: { type: String, required: true },
      },
    ],
    localOfficeDetails: {
      address: { type: String, required: true },
      phone: { type: String, required: true },
      whatsapp: { type: String, required: true },
      email: { type: String, required: true },
      operatingHours: { type: String, default: '24 Hours / 7 Days a Week' },
      mapEmbedUrl: String,
    },
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

module.exports = mongoose.model('Location', locationSchema);
