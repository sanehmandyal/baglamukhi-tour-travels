const express = require('express');
const router = express.Router();
const {
  getHotels,
  getHotelBySlug,
  getAdminHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} = require('../controllers/hotelController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getHotels);
router.get('/admin/all', protect, authorize('admin', 'manager'), getAdminHotels);
router.get('/:slug', getHotelBySlug);
router.post('/', protect, authorize('admin', 'manager'), createHotel);
router.put('/:id', protect, authorize('admin', 'manager'), updateHotel);
router.delete('/:id', protect, authorize('admin'), deleteHotel);

module.exports = router;
