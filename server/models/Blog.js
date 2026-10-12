const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Himachal Travel Guide',
      trim: true,
    },
    slug: {
      type: String,
      default: () => 'blog-' + Date.now(),
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      default: 'Travel Tips',
      index: true,
    },
    tags: [String],
    author: {
      name: { type: String, default: 'Baglamukhi Travel Team' },
      role: { type: String, default: 'Himachal & North India Travel Specialist' },
      avatar: { type: String, default: '/baglamukhi-temple-logo.jpg' },
    },
    featuredImage: {
      url: { type: String, default: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' },
      alt: { type: String, default: 'Himachal Travel Guide' },
    },
    excerpt: {
      type: String,
      default: 'Helpful travel tips, best routes, and itineraries for your Himachal vacation.',
    },
    content: {
      type: String,
      default: 'Explore scenic destinations, snow adventures, and temple yatras with Baglamukhi Tour & Travels.',
    },
    readingTime: {
      type: String,
      default: '5 min read',
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    relatedTours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
      },
    ],
    relatedDestinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
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

module.exports = mongoose.model('Blog', blogSchema);
