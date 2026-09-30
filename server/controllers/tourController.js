const Tour = require('../models/Tour');
const SEO = require('../models/SEO');
const { createSlug } = require('../utils/slugify');

// @desc    Get all published tours with filters & pagination
// @route   GET /api/tours
// @access  Public
exports.getTours = async (req, res, next) => {
  try {
    const { destination, category, minPrice, maxPrice, duration, sort, search, page = 1, limit = 12, featured } = req.query;

    const query = {
      $or: [
        { isPublished: true },
        { isPublished: { $exists: false } }
      ]
    };

    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      query['price.startingPrice'] = {};
      if (minPrice) query['price.startingPrice'].$gte = Number(minPrice);
      if (maxPrice) query['price.startingPrice'].$lte = Number(maxPrice);
    }

    if (duration) {
      query['duration.days'] = Number(duration);
    }

    if (search) {
      query.$and = [
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { destination: { $regex: search, $options: 'i' } },
            { overview: { $regex: search, $options: 'i' } },
            { highlights: { $regex: search, $options: 'i' } },
          ]
        }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { 'price.startingPrice': 1 };
    if (sort === 'price_desc') sortOption = { 'price.startingPrice': -1 };
    if (sort === 'duration_asc') sortOption = { 'duration.days': 1 };
    if (sort === 'duration_desc') sortOption = { 'duration.days': -1 };
    if (sort === 'popular') sortOption = { isPopular: -1, avgRating: -1 };

    const total = await Tour.countDocuments(query);
    const tours = await Tour.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: tours.length,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: Number(page),
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tours for Admin (including unpublished)
// @route   GET /api/tours/admin/all
// @access  Private/Admin
exports.getAdminTours = async (req, res, next) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single tour by slug or ID
// @route   GET /api/tours/:slug
// @access  Public
exports.getTourBySlug = async (req, res, next) => {
  try {
    const slugOrId = req.params.slug;
    let tour = null;

    if (slugOrId && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      tour = await Tour.findById(slugOrId);
    }
    if (!tour) {
      tour = await Tour.findOne({ slug: slugOrId });
    }

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }

    // Related tours
    const relatedTours = await Tour.find({
      _id: { $ne: tour._id },
      $or: [{ destination: tour.destination }, { category: tour.category }],
    })
      .limit(3)
      .select('title slug destination duration price featuredImage avgRating reviewsCount');

    // Dynamic SEO data fallback
    const seoData = await SEO.findOne({ slug: `/tours/${tour.slug}` });

    res.status(200).json({
      success: true,
      data: tour,
      relatedTours,
      seo: seoData || {
        title: tour.seo?.metaTitle || `${tour.title} | Baglamukhi Tour & Travels`,
        metaDescription: tour.seo?.metaDescription || tour.overview?.slice(0, 160),
        canonicalUrl: `/tours/${tour.slug}`,
        focusKeyword: tour.seo?.focusKeyword || `${tour.destination} tour package`,
        ogImage: tour.featuredImage?.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new tour (or upsert by slug)
// @route   POST /api/tours
// @access  Private/Admin
exports.createTour = async (req, res, next) => {
  try {
    let { slug, title, featuredImage, duration, price, itinerary } = req.body;
    if (!slug && title) {
      slug = createSlug(title);
    }

    const payload = {
      ...req.body,
      slug,
      isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true,
    };

    // Remove invalid non-ObjectId _id if present (e.g. tour_8)
    if (payload._id && !payload._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
      delete payload._id;
    }

    // Sanitize featuredImage
    if (typeof payload.featuredImage === 'string') {
      payload.featuredImage = { url: payload.featuredImage, alt: title || 'Tour Package' };
    } else if (payload.featuredImage && !payload.featuredImage.alt) {
      payload.featuredImage.alt = title || 'Tour Package';
    }

    // Sanitize duration
    if (duration && !duration.label) {
      payload.duration = {
        days: Number(duration.days) || 5,
        nights: Number(duration.nights) || 4,
        label: `${duration.days || 5} Days / ${duration.nights || 4} Nights`,
      };
    }

    // Sanitize itinerary
    if (Array.isArray(itinerary)) {
      payload.itinerary = itinerary.filter((item) => item && (item.title || item.description)).map((item, idx) => ({
        day: Number(item.day) || idx + 1,
        title: item.title || `Day ${idx + 1}`,
        description: item.description || 'Sightseeing and travel.',
        meals: item.meals || 'Breakfast, Dinner',
        hotel: item.hotel || 'Deluxe Hotel',
        activities: Array.isArray(item.activities) ? item.activities : [],
      }));
    }

    // Upsert if tour with same slug exists, or create new
    let tour = await Tour.findOne({ slug });
    if (tour) {
      tour = await Tour.findByIdAndUpdate(tour._id, payload, { new: true, runValidators: true });
    } else {
      tour = await Tour.create(payload);
    }

    // Automatically register SEO entry
    try {
      await SEO.findOneAndUpdate(
        { slug: `/tours/${tour.slug}` },
        {
          pageType: 'tour',
          pageId: tour._id.toString(),
          slug: `/tours/${tour.slug}`,
          title: tour.seo?.metaTitle || `${tour.title} - Best Price Guaranteed`,
          metaDescription: tour.seo?.metaDescription || tour.overview?.slice(0, 160) || 'Book this tour package with Baglamukhi Tour & Travels.',
          canonicalUrl: `http://localhost:5173/tours/${tour.slug}`,
          focusKeyword: `${tour.destination} Tour`,
          ogTitle: tour.title,
          ogDescription: tour.overview?.slice(0, 150),
          ogImage: tour.featuredImage?.url,
          schemaType: 'TouristTrip',
        },
        { upsert: true, new: true }
      );
    } catch (e) {
      console.warn('[SEO Upsert Notice]:', e.message);
    }

    res.status(201).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
exports.updateTour = async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    let tour = null;

    if (idOrSlug && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      tour = await Tour.findById(idOrSlug);
    }
    if (!tour) {
      tour = await Tour.findOne({ slug: req.body.slug || idOrSlug });
    }

    const payload = { ...req.body };
    if (payload._id && !payload._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
      delete payload._id;
    }

    if (typeof payload.featuredImage === 'string') {
      payload.featuredImage = { url: payload.featuredImage, alt: payload.title || tour?.title || 'Tour' };
    }

    if (Array.isArray(payload.itinerary)) {
      payload.itinerary = payload.itinerary.filter((item) => item && (item.title || item.description)).map((item, idx) => ({
        day: Number(item.day) || idx + 1,
        title: item.title || `Day ${idx + 1}`,
        description: item.description || 'Sightseeing and travel.',
        meals: item.meals || 'Breakfast, Dinner',
        hotel: item.hotel || 'Deluxe Hotel',
        activities: Array.isArray(item.activities) ? item.activities : [],
      }));
    }

    if (tour) {
      tour = await Tour.findByIdAndUpdate(tour._id, payload, {
        new: true,
        runValidators: true,
      });
    } else {
      tour = await Tour.create({ ...payload, slug: payload.slug || createSlug(payload.title || 'Tour') });
    }

    // Update corresponding SEO entry
    try {
      await SEO.findOneAndUpdate(
        { slug: `/tours/${tour.slug}` },
        {
          pageType: 'tour',
          pageId: tour._id.toString(),
          slug: `/tours/${tour.slug}`,
          title: tour.seo?.metaTitle || `${tour.title} | Baglamukhi Tour & Travels`,
          metaDescription: tour.seo?.metaDescription || tour.overview?.slice(0, 160),
          ogImage: tour.featuredImage?.url,
        },
        { upsert: true }
      );
    } catch (e) {
      console.warn('[SEO Upsert Notice]:', e.message);
    }

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
exports.deleteTour = async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    let tour = null;
    if (idOrSlug && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      tour = await Tour.findById(idOrSlug);
    }
    if (!tour) {
      tour = await Tour.findOne({ slug: idOrSlug });
    }

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    await SEO.deleteOne({ slug: `/tours/${tour.slug}` });
    await tour.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Tour package removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
