const Tour = require('../models/Tour');
const Destination = require('../models/Destination');
const Blog = require('../models/Blog');
const Service = require('../models/Service');
const Hotel = require('../models/Hotel');

// @desc    Global site search
// @route   GET /api/search
// @access  Public
exports.globalSearch = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(200).json({
        success: true,
        query: '',
        results: {
          tours: [],
          destinations: [],
          blogs: [],
          services: [],
          hotels: [],
        },
      });
    }

    const regex = new RegExp(q.trim(), 'i');

    const [tours, destinations, blogs, services, hotels] = await Promise.all([
      Tour.find({
        isPublished: true,
        $or: [{ title: regex }, { destination: regex }, { overview: regex }, { category: regex }],
      })
        .limit(6)
        .select('title slug destination price duration featuredImage category avgRating'),

      Destination.find({
        isPublished: true,
        $or: [{ name: regex }, { state: regex }, { shortDescription: regex }],
      })
        .limit(4)
        .select('name slug state heroImage shortDescription'),

      Blog.find({
        isPublished: true,
        $or: [{ title: regex }, { excerpt: regex }, { category: regex }],
      })
        .limit(4)
        .select('title slug category featuredImage publishedAt readingTime'),

      Service.find({
        isPublished: true,
        $or: [{ title: regex }, { shortDescription: regex }, { serviceType: regex }],
      })
        .limit(4)
        .select('title slug serviceType featuredImage shortDescription'),

      Hotel.find({
        isPublished: true,
        $or: [{ name: regex }, { destination: regex }, { address: regex }],
      })
        .limit(4)
        .select('name slug destination starRating priceStartingFrom featuredImage'),
    ]);

    res.status(200).json({
      success: true,
      query: q,
      totalCount: tours.length + destinations.length + blogs.length + services.length + hotels.length,
      results: {
        tours,
        destinations,
        blogs,
        services,
        hotels,
      },
    });
  } catch (error) {
    next(error);
  }
};
