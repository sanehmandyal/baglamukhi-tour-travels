const Tour = require('../models/Tour');
const SEO = require('../models/SEO');
const { createSlug } = require('../utils/slugify');

// @desc    Get all published tours with filters & pagination
// @route   GET /api/tours
// @access  Public
exports.getTours = async (req, res, next) => {
  try {
    const { destination, category, minPrice, maxPrice, duration, sort, search, page = 1, limit = 12, featured } = req.query;

    const query = { isPublished: true };

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
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { overview: { $regex: search, $options: 'i' } },
        { highlights: { $regex: search, $options: 'i' } },
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
      totalPages: Math.ceil(total / limit),
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

// @desc    Get single tour by slug
// @route   GET /api/tours/:slug
// @access  Public
exports.getTourBySlug = async (req, res, next) => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug, isPublished: true });

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }

    // Related tours
    const relatedTours = await Tour.find({
      _id: { $ne: tour._id },
      isPublished: true,
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
        metaDescription: tour.seo?.metaDescription || tour.overview.slice(0, 160),
        canonicalUrl: `/tours/${tour.slug}`,
        focusKeyword: tour.seo?.focusKeyword || `${tour.destination} tour package`,
        ogImage: tour.featuredImage?.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new tour
// @route   POST /api/tours
// @access  Private/Admin
exports.createTour = async (req, res, next) => {
  try {
    let { slug, title } = req.body;
    if (!slug && title) {
      slug = createSlug(title);
    }

    // Check slug uniqueness
    const existingTour = await Tour.findOne({ slug });
    if (existingTour) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const tour = await Tour.create({ ...req.body, slug });

    // Automatically register SEO entry
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
    let tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Update corresponding SEO entry
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
    const tour = await Tour.findById(req.params.id);
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
