const Location = require('../models/Location');
const SEO = require('../models/SEO');
const { createSlug } = require('../utils/slugify');

// @desc    Get all published location pages
// @route   GET /api/locations
// @access  Public
exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find({ isPublished: true }).sort({ cityName: 1 });
    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single location by slug
// @route   GET /api/locations/:slug
// @access  Public
exports.getLocationBySlug = async (req, res, next) => {
  try {
    const location = await Location.findOne({ slug: req.params.slug, isPublished: true });

    if (!location) {
      return res.status(404).json({ success: false, message: 'Location page not found' });
    }

    const otherLocations = await Location.find({
      _id: { $ne: location._id },
      isPublished: true,
    }).limit(6);

    const seoData = await SEO.findOne({ slug: `/locations/${location.slug}` });

    res.status(200).json({
      success: true,
      data: location,
      otherLocations,
      seo: seoData || {
        title: location.seo?.metaTitle || `Tour & Travel Agency in ${location.cityName} | Baglamukhi Tour & Travels`,
        metaDescription: location.seo?.metaDescription || location.shortIntro.slice(0, 160),
        canonicalUrl: `/locations/${location.slug}`,
        focusKeyword: `tour and travel in ${location.cityName}`,
        ogImage: location.heroImage?.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: get all locations
// @route   GET /api/locations/admin/all
// @access  Private/Admin
exports.getAdminLocations = async (req, res, next) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create location page
// @route   POST /api/locations
// @access  Private/Admin
exports.createLocation = async (req, res, next) => {
  try {
    let { slug, cityName } = req.body;
    if (!slug && cityName) {
      slug = createSlug(cityName);
    }

    const location = await Location.create({ ...req.body, slug });

    await SEO.findOneAndUpdate(
      { slug: `/locations/${location.slug}` },
      {
        pageType: 'location',
        pageId: location._id.toString(),
        slug: `/locations/${location.slug}`,
        title: location.seo?.metaTitle || `Tour and Travel Agency in ${location.cityName} | Best Cabs & Packages`,
        metaDescription: location.seo?.metaDescription || location.shortIntro?.slice(0, 160),
        canonicalUrl: `http://localhost:5173/locations/${location.slug}`,
        focusKeyword: `travel agency in ${location.cityName}`,
        ogTitle: location.title,
        ogImage: location.heroImage?.url,
        schemaType: 'LocalBusiness',
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update location
// @route   PUT /api/locations/:id
// @access  Private/Admin
exports.updateLocation = async (req, res, next) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }

    await SEO.findOneAndUpdate(
      { slug: `/locations/${location.slug}` },
      {
        pageType: 'location',
        pageId: location._id.toString(),
        slug: `/locations/${location.slug}`,
        title: location.seo?.metaTitle || `Tour & Travel in ${location.cityName}`,
        metaDescription: location.seo?.metaDescription || location.shortIntro?.slice(0, 160),
        ogImage: location.heroImage?.url,
      },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete location
// @route   DELETE /api/locations/:id
// @access  Private/Admin
exports.deleteLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }

    await SEO.deleteOne({ slug: `/locations/${location.slug}` });
    await location.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Location deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
