const Hotel = require('../models/Hotel');
const SEO = require('../models/SEO');
const { createSlug } = require('../utils/slugify');

// @desc    Get all published hotels
// @route   GET /api/hotels
// @access  Public
exports.getHotels = async (req, res, next) => {
  try {
    const { destination, hotelType, search } = req.query;
    const query = { isPublished: true };

    if (destination) query.destination = { $regex: destination, $options: 'i' };
    if (hotelType) query.hotelType = hotelType;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
      ];
    }

    const hotels = await Hotel.find(query).sort({ starRating: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single hotel by slug
// @route   GET /api/hotels/:slug
// @access  Public
exports.getHotelBySlug = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({ slug: req.params.slug, isPublished: true });

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    const relatedHotels = await Hotel.find({
      _id: { $ne: hotel._id },
      destination: hotel.destination,
      isPublished: true,
    }).limit(3);

    const seoData = await SEO.findOne({ slug: `/hotels/${hotel.slug}` });

    res.status(200).json({
      success: true,
      data: hotel,
      relatedHotels,
      seo: seoData || {
        title: hotel.seo?.metaTitle || `${hotel.name}, ${hotel.destination} | Best Room Rates & Booking`,
        metaDescription: hotel.seo?.metaDescription || hotel.shortOverview.slice(0, 160),
        canonicalUrl: `/hotels/${hotel.slug}`,
        focusKeyword: `hotel in ${hotel.destination}`,
        ogImage: hotel.featuredImage?.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: get all hotels
// @route   GET /api/hotels/admin/all
// @access  Private/Admin
exports.getAdminHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create hotel
// @route   POST /api/hotels
// @access  Private/Admin
exports.createHotel = async (req, res, next) => {
  try {
    let { slug, name } = req.body;
    if (!slug && name) {
      slug = createSlug(name);
    }

    const hotel = await Hotel.create({ ...req.body, slug });

    await SEO.findOneAndUpdate(
      { slug: `/hotels/${hotel.slug}` },
      {
        pageType: 'hotel',
        pageId: hotel._id.toString(),
        slug: `/hotels/${hotel.slug}`,
        title: hotel.seo?.metaTitle || `${hotel.name} - ${hotel.destination}`,
        metaDescription: hotel.seo?.metaDescription || hotel.shortOverview?.slice(0, 160),
        canonicalUrl: `http://localhost:5173/hotels/${hotel.slug}`,
        focusKeyword: `hotels in ${hotel.destination}`,
        ogTitle: hotel.name,
        ogImage: hotel.featuredImage?.url,
        schemaType: 'Hotel',
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update hotel
// @route   PUT /api/hotels/:id
// @access  Private/Admin
exports.updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete hotel
// @route   DELETE /api/hotels/:id
// @access  Private/Admin
exports.deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    await SEO.deleteOne({ slug: `/hotels/${hotel.slug}` });
    await hotel.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Hotel removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
