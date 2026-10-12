const mongoose = require('mongoose');

const itineraryDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  meals: { type: String, default: 'Breakfast, Dinner' },
  hotel: { type: String, default: 'Deluxe / Premium Hotel' },
  activities: [String],
});

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Himachal Tour Package',
      trim: true,
    },
    slug: {
      type: String,
      default: () => 'tour-' + Date.now(),
      lowercase: true,
      trim: true,
      index: true,
    },
    destination: {
      type: String,
      default: 'Himachal Pradesh',
      trim: true,
      index: true,
    },
    destinationRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
    category: {
      type: String,
      default: 'Family',
      index: true,
    },
    duration: {
      days: { type: Number, default: 5 },
      nights: { type: Number, default: 4 },
      label: { type: String, default: '5 Days / 4 Nights' },
    },
    price: {
      startingPrice: { type: Number, default: 9999 },
      discountedPrice: { type: Number, default: 12999 },
      perPerson: { type: Boolean, default: true },
      currency: { type: String, default: 'INR' },
    },
    pickupDrop: {
      pickupLocation: { type: String, default: 'Chandigarh / Delhi / Kalka' },
      dropLocation: { type: String, default: 'Chandigarh / Delhi / Kalka' },
    },
    featuredImage: {
      url: { type: String, default: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80' },
      alt: { type: String, default: 'Himachal Tour' },
    },
    galleryImages: [
      {
        url: { type: String, default: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80' },
        alt: { type: String, default: 'Tour Gallery' },
      },
    ],
    overview: {
      type: String,
      default: 'Comfortable tour package with dedicated private cab and mountain stays.',
    },
    highlights: [String],
    itinerary: [itineraryDaySchema],
    inclusions: [String],
    exclusions: [String],
    hotelDetails: {
      hotelType: { type: String, default: '3 Star / 4 Star Premium' },
      stayDetails: { type: String, default: 'Comfortable hotel stays with mountain view' },
    },
    transportation: {
      type: String,
      default: 'Private AC / Non-AC Cab (Sedan / SUV / Tempo Traveller) with experienced mountain driver',
    },
    cancellationPolicy: {
      type: String,
      default: 'Free cancellation up to 10 days before departure. 50% refund between 9-3 days.',
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    reviewsCount: { type: Number, default: 0 },
    avgRating: { type: Number, default: 4.9 },
    isFeatured: { type: Boolean, default: false, index: true },
    isPopular: { type: Boolean, default: false },
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

module.exports = mongoose.model('Tour', tourSchema);
