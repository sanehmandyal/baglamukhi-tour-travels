const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const Blog = require('../models/Blog');
const Destination = require('../models/Destination');
const ContactMessage = require('../models/ContactMessage');
const Service = require('../models/Service');
const Hotel = require('../models/Hotel');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');

// @desc    Get dashboard overview statistics
// @route   GET /api/stats/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const contactedBookings = await Booking.countDocuments({ status: 'Contacted' });
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });
    const completedBookings = await Booking.countDocuments({ status: 'Completed' });

    const totalTours = await Tour.countDocuments();
    const publishedTours = await Tour.countDocuments({ isPublished: true });
    const totalDestinations = await Destination.countDocuments({ isPublished: true });
    const totalBlogs = await Blog.countDocuments({ isPublished: true });
    const totalServices = await Service.countDocuments({ isPublished: true });
    const totalHotels = await Hotel.countDocuments({ isPublished: true });
    const totalTestimonials = await Testimonial.countDocuments({ isApproved: true });
    const totalFaqs = await FAQ.countDocuments({ isActive: true });
    const unreadMessages = await ContactMessage.countDocuments({ status: 'Unread' });

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('tourId', 'title slug');

    const recentMessages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          contacted: contactedBookings,
          confirmed: confirmedBookings,
          completed: completedBookings,
        },
        inventory: {
          tours: totalTours,
          publishedTours: publishedTours || totalTours,
          destinations: totalDestinations,
          blogs: totalBlogs,
          services: totalServices,
          hotels: totalHotels,
          testimonials: totalTestimonials,
          faqs: totalFaqs,
        },
        inbox: {
          unreadMessages,
        },
        recentBookings,
        recentMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};
