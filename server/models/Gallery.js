const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      required: true,
    },
    locationTag: {
      type: String,
      default: 'Himachal Pradesh',
      index: true,
    },
    category: {
      type: String,
      enum: ['Mountains', 'Temples', 'Adventure', 'Snow', 'Fleet & Cabs', 'Hotels & Resorts'],
      default: 'Mountains',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
