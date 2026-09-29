const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingByCode,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', createBooking);
router.get('/code/:code', getBookingByCode);
router.get('/', protect, authorize('admin', 'manager'), getBookings);
router.put('/:id', protect, authorize('admin', 'manager'), updateBooking);
router.delete('/:id', protect, authorize('admin'), deleteBooking);

module.exports = router;
