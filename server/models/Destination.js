const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Scenic Himachal Destination',
      trim: true,
    },
    slug: {
      type: String,
      default: () => 'dest-' + Date.now(),
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
      default: 'Himachal Pradesh',
      index: true,
    },
    heroImage: {
      url: { type: String, default: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80' },
      alt: { type: String, default: 'Himachal Destination' },
    },
    galleryImages: [
      {
        url: { type: String, default: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=80' },
        alt: { type: String, default: 'Destination View' },
      },
    ],
    shortDescription: {
      type: String,
      default: 'Explore this beautiful mountain destination with Baglamukhi Tour & Travels.',
    },
    detailedOverview: {
      type: String,
      default: 'Experience majestic pine hills, fresh snowfall, and local culture.',
    },
    bestTimeToVisit: {
      type: String,
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
