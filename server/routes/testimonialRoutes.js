const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getTestimonials);
router.post('/', protect, authorize('admin', 'manager'), createTestimonial);
router.put('/:id', protect, authorize('admin', 'manager'), updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

module.exports = router;
