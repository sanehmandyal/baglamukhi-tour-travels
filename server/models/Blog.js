const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      index: true,
    },
    tags: [String],
    author: {
      name: { type: String, default: 'Thakur Travel Experts' },
      role: { type: String, default: 'Himachal & North India Travel Specialist' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    },
    featuredImage: {
      url: { type: String, required: true },
      alt: { type: String, required: true },
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
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
