const Gallery = require('../models/Gallery');

exports.getGallery = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const items = await Gallery.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

exports.createGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

exports.deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.status(200).json({ success: true, message: 'Gallery item removed' });
  } catch (error) {
    next(error);
  }
};
