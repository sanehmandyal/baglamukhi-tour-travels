const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      default: 'General Inquiry',
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Unread', 'Read', 'Replied'],
      default: 'Unread',
    },
    replyNote: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
