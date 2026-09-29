const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Customer phone number is required'],
      trim: true,
      index: true,
    },
    destination: {
      type: String,
      trim: true,
    },
    tourPackage: {
      type: String,
      trim: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
    },
    serviceType: {
      type: String,
      default: 'Tour Package',
    },
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required'],
    },
    adults: {
      type: Number,
      default: 2,
      min: 1,
    },
    children: {
      type: Number,
      default: 0,
    },
    pickupLocation: {
      type: String,
      default: 'Chandigarh',
    },
    dropLocation: {
      type: String,
    },
    customMessage: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
      index: true,
    },
    adminNotes: {
      type: String,
      default: '',
    },
    estimatedBudget: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
