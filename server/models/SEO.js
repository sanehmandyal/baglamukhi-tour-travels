const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema(
  {
    pageType: {
      type: String,
      required: true,
      enum: ['page', 'tour', 'destination', 'location', 'blog', 'service', 'hotel'],
      index: true,
    },
    pageId: {
      type: String, // can store slug or reference identifier
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 70,
    },
    metaDescription: {
      type: String,
      required: true,
      maxlength: 170,
    },
    canonicalUrl: {
      type: String,
    },
    focusKeyword: {
      type: String,
    },
    secondaryKeywords: [String],
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    twitterTitle: String,
    twitterDescription: String,
    twitterImage: String,
    robots: {
      type: String,
      default: 'index, follow',
    },
    schemaType: {
      type: String,
      enum: ['WebSite', 'TouristTrip', 'TouristDestination', 'LocalBusiness', 'Article', 'FAQPage', 'Service', 'Hotel'],
      default: 'WebSite',
    },
    structuredDataJson: {
      type: String, // optional custom JSON-LD override
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SEO', seoSchema);
