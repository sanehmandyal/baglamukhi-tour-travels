const express = require('express');
const router = express.Router();
const {
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getGallery);
router.post('/', protect, authorize('admin', 'manager'), createGalleryItem);
router.delete('/:id', protect, authorize('admin'), deleteGalleryItem);

module.exports = router;
