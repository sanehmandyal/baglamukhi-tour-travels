const ContactMessage = require('../models/ContactMessage');

exports.submitContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting Baglamukhi Tour & Travels. We will get back to you shortly.',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

exports.getContactMessages = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'All') query.status = status;

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status, replyNote } = req.body;
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { status, replyNote }, { new: true });
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

exports.deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};
