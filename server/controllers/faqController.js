const FAQ = require('../models/FAQ');

exports.getFaqs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isPublished: true };
    if (category && category !== 'All') query.category = category;

    const faqs = await FAQ.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    next(error);
  }
};

exports.getAdminFaqs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    next(error);
  }
};

exports.createFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

exports.updateFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

exports.deleteFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.status(200).json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    next(error);
  }
};
