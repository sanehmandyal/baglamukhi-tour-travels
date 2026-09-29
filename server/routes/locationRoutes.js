const express = require('express');
const router = express.Router();
const {
  getLocations,
  getLocationBySlug,
  getAdminLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getLocations);
router.get('/admin/all', protect, authorize('admin', 'manager'), getAdminLocations);
router.get('/:slug', getLocationBySlug);
router.post('/', protect, authorize('admin', 'manager'), createLocation);
router.put('/:id', protect, authorize('admin', 'manager'), updateLocation);
router.delete('/:id', protect, authorize('admin'), deleteLocation);

module.exports = router;
