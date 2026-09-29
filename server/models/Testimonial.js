const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: 'Chandigarh / Delhi',
    },
    tripTaken: {
      type: String,
      required: true,
      default: 'Shimla Manali 6 Days Tour',
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    reviewDate: {
      type: String,
      default: 'Recent Trip',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
