const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
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
    tagline: {
      type: String,
      default: 'Scenic Hill Station of the Himalayas',
    },
    state: {
      type: String,
      required: true,
      default: 'Himachal Pradesh',
      index: true,
    },
    heroImage: {
      url: { type: String, required: true },
      alt: { type: String, required: true },
    },
    galleryImages: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    shortDescription: {
      type: String,
      required: true,
    },
    detailedOverview: {
      type: String,
      required: true,
    },
    bestTimeToVisit: {
      type: String,
      required: true,
      default: 'October to June for pleasant weather; December to February for snow.',
    },
    idealTripDuration: {
      type: String,
      default: '3 to 5 Days',
    },
    nearestAirport: {
      type: String,
      default: 'Chandigarh Airport (IXC) / Bhuntar Airport (KUU)',
    },
    nearestRailwayStation: {
      type: String,
      default: 'Chandigarh Railway Station (CDG) / Kalka Railway Station (KLK)',
    },
    howToReach: {
      byAir: String,
      byTrain: String,
      byRoad: String,
    },
    placesToVisit: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
        timing: { type: String, default: '9:00 AM - 6:00 PM' },
        entryFee: { type: String, default: 'Free / Nominal' },
      },
    ],
    thingsToDo: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: 'Compass' },
      },
    ],
    suggestedItinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    travelTips: [String],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('Destination', destinationSchema);
