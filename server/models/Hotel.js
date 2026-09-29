const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: {
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
    destination: {
      type: String,
      required: true,
      index: true,
    },
    hotelType: {
      type: String,
      enum: ['Deluxe', 'Luxury Resort', 'Premium Cottage', 'Boutique Hotel', 'Standard'],
      default: 'Deluxe',
    },
    starRating: {
      type: Number,
      default: 3,
      min: 1,
      max: 5,
    },
    featuredImage: {
      url: { type: String, required: true },
      alt: { type: String, required: true },
    },
    galleryImages: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    shortOverview: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priceStartingFrom: {
      type: Number,
      required: true,
    },
    amenities: [String],
    roomCategories: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        features: [String],
      },
    ],
    checkInTime: { type: String, default: '12:00 PM' },
    checkOutTime: { type: String, default: '11:00 AM' },
    isPartnerHotel: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: true, index: true },
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

module.exports = mongoose.model('Hotel', hotelSchema);
