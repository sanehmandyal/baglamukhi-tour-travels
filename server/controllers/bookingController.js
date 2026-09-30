const Booking = require('../models/Booking');

// Utility to generate unique booking reference
function generateBookingCode() {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TT-${timestamp}-${random}`;
}

// @desc    Submit a new booking or travel inquiry
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res, next) => {
  try {
    const bookingId = generateBookingCode();
    const bookingData = {
      ...req.body,
      bookingId,
    };

    if (bookingData.tourId && !bookingData.tourId.toString().match(/^[0-9a-fA-F]{24}$/)) {
      delete bookingData.tourId;
    }

    if (!bookingData.email) {
      bookingData.email = `${(bookingData.phone || 'guest').replace(/[^0-9]/g, '') || 'inquiry'}@customer.inquiry`;
    }

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      message: 'Booking inquiry submitted successfully! Our travel executive will contact you shortly.',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking details by booking ID code
// @route   GET /api/bookings/code/:code
// @access  Public
exports.getBookingByCode = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.code }).populate('tourId', 'title slug featuredImage price');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking reference not found' });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: get all bookings with filters & pagination
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { bookingId: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('tourId', 'title slug startingPrice')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: update booking status & notes
// @route   PUT /api/bookings/:id
// @access  Private/Admin
exports.updateBooking = async (req, res, next) => {
  try {
    const { status, adminNotes, estimatedBudget } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, estimatedBudget },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
