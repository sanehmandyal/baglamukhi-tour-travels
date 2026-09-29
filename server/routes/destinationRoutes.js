const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationBySlug,
  getAdminDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getDestinations);
router.get('/admin/all', protect, authorize('admin', 'manager'), getAdminDestinations);
router.get('/:slug', getDestinationBySlug);
router.post('/', protect, authorize('admin', 'manager'), createDestination);
router.put('/:id', protect, authorize('admin', 'manager'), updateDestination);
router.delete('/:id', protect, authorize('admin'), deleteDestination);

module.exports = router;
