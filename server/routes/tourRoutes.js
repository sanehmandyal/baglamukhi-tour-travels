const express = require('express');
const router = express.Router();
const {
  getTours,
  getTourBySlug,
  getAdminTours,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getTours);
router.get('/admin/all', protect, authorize('admin', 'manager'), getAdminTours);
router.get('/:slug', getTourBySlug);
router.post('/', protect, authorize('admin', 'manager'), createTour);
router.put('/:id', protect, authorize('admin', 'manager'), updateTour);
router.delete('/:id', protect, authorize('admin'), deleteTour);

module.exports = router;
