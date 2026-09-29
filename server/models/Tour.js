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
      required: [true, 'Tour title is required'],
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
      required: [true, 'Primary destination is required'],
      trim: true,
      index: true,
    },
    destinationRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
    category: {
      type: String,
      enum: [
        'Honeymoon',
        'Family',
        'Adventure',
        'Pilgrimage',
        'Weekend',
        'Group',
        'Customized',
        'Corporate',
        'Hill Station',
      ],
      default: 'Family',
      index: true,
    },
    duration: {
      days: { type: Number, required: true, default: 5 },
      nights: { type: Number, required: true, default: 4 },
      label: { type: String, default: '5 Days / 4 Nights' },
    },
    price: {
      startingPrice: { type: Number, required: true },
      discountedPrice: { type: Number },
      perPerson: { type: Boolean, default: true },
      currency: { type: String, default: 'INR' },
    },
    pickupDrop: {
      pickupLocation: { type: String, default: 'Chandigarh / Delhi / Kalka' },
      dropLocation: { type: String, default: 'Chandigarh / Delhi / Kalka' },
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
    overview: {
      type: String,
      required: [true, 'Tour overview is required'],
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
