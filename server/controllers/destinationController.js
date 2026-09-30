const Destination = require('../models/Destination');
const Tour = require('../models/Tour');
const Blog = require('../models/Blog');
const SEO = require('../models/SEO');
const { createSlug } = require('../utils/slugify');

// @desc    Get all published destinations
// @route   GET /api/destinations
// @access  Public
exports.getDestinations = async (req, res, next) => {
  try {
    const { state, featured, search } = req.query;
    const query = {
      $or: [
        { isPublished: true },
        { isPublished: { $exists: false } }
      ]
    };

    if (state && state !== 'All') {
      query.state = { $regex: state, $options: 'i' };
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }
    if (search) {
      query.$and = [
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { state: { $regex: search, $options: 'i' } },
            { shortDescription: { $regex: search, $options: 'i' } },
          ]
        }
      ];
    }

    const destinations = await Destination.find(query).sort({ isFeatured: -1, createdAt: -1, name: 1 });

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single destination by slug or ID with its tours and blogs
// @route   GET /api/destinations/:slug
// @access  Public
exports.getDestinationBySlug = async (req, res, next) => {
  try {
    const slugOrId = req.params.slug;
    let destination = null;

    if (slugOrId && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      destination = await Destination.findById(slugOrId);
    }
    if (!destination) {
      destination = await Destination.findOne({ slug: slugOrId });
    }

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    // Find tours matching this destination
    const tours = await Tour.find({
      destination: { $regex: destination.name, $options: 'i' },
      isPublished: true,
    }).limit(6);

    // Find related blogs
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: destination.name, $options: 'i' } },
        { content: { $regex: destination.name, $options: 'i' } },
      ],
      isPublished: true,
    }).limit(4);

    // Related other destinations
    const relatedDestinations = await Destination.find({
      _id: { $ne: destination._id },
      isPublished: true,
    }).limit(4);

    // SEO Data fallback
    const seoData = await SEO.findOne({ slug: `/destinations/${destination.slug}` });

    res.status(200).json({
      success: true,
      data: destination,
      tours,
      blogs,
      relatedDestinations,
      seo: seoData || {
        title: destination.seo?.metaTitle || `${destination.name} Tour Guide & Packages | Baglamukhi Tour & Travels`,
        metaDescription: destination.seo?.metaDescription || destination.shortDescription?.slice(0, 160),
        canonicalUrl: `/destinations/${destination.slug}`,
        focusKeyword: destination.seo?.focusKeyword || `things to do in ${destination.name}`,
        ogImage: destination.heroImage?.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all destinations for admin
// @route   GET /api/destinations/admin/all
// @access  Private/Admin
exports.getAdminDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create destination (or upsert by slug)
// @route   POST /api/destinations
// @access  Private/Admin
exports.createDestination = async (req, res, next) => {
  try {
    let { slug, name, heroImage, placesToVisit, shortDescription, detailedOverview } = req.body;
    if (!slug && name) {
      slug = createSlug(name);
    }

    const payload = {
      ...req.body,
      slug,
      shortDescription: shortDescription || `${name} travel destination in Himachal Pradesh.`,
      detailedOverview: detailedOverview || shortDescription || `Explore beautiful sights and attractions in ${name}.`,
      isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true,
    };

    if (payload._id && !payload._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
      delete payload._id;
    }

    if (typeof heroImage === 'string') {
      payload.heroImage = { url: heroImage, alt: name || 'Destination' };
    } else if (payload.heroImage && !payload.heroImage.alt) {
      payload.heroImage.alt = name || 'Destination';
    }

    if (Array.isArray(placesToVisit)) {
      payload.placesToVisit = placesToVisit.filter((p) => p && (p.name || p.description)).map((p) => ({
        name: p.name || 'Sightseeing Point',
        description: p.description || 'Scenic location and viewpoints.',
        timing: p.timing || '9:00 AM - 6:00 PM',
        entryFee: p.entryFee || 'Free / Nominal',
      }));
    }

    let destination = await Destination.findOne({ slug });
    if (destination) {
      destination = await Destination.findByIdAndUpdate(destination._id, payload, { new: true, runValidators: true });
    } else {
      destination = await Destination.create(payload);
    }

    try {
      await SEO.findOneAndUpdate(
        { slug: `/destinations/${destination.slug}` },
        {
          pageType: 'destination',
          pageId: destination._id.toString(),
          slug: `/destinations/${destination.slug}`,
          title: destination.seo?.metaTitle || `${destination.name} Travel Guide | Baglamukhi Tour & Travels`,
          metaDescription: destination.seo?.metaDescription || destination.shortDescription?.slice(0, 160),
          canonicalUrl: `http://localhost:5173/destinations/${destination.slug}`,
          focusKeyword: `${destination.name} travel guide`,
          ogTitle: destination.name,
          ogImage: destination.heroImage?.url,
          schemaType: 'TouristDestination',
        },
        { upsert: true, new: true }
      );
    } catch (e) {
      console.warn('[SEO Upsert Notice]:', e.message);
    }

    res.status(201).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
exports.updateDestination = async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    let destination = null;

    if (idOrSlug && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      destination = await Destination.findById(idOrSlug);
    }
    if (!destination) {
      destination = await Destination.findOne({ slug: req.body.slug || idOrSlug });
    }

    const payload = { ...req.body };
    if (payload._id && !payload._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
      delete payload._id;
    }

    if (typeof payload.heroImage === 'string') {
      payload.heroImage = { url: payload.heroImage, alt: payload.name || destination?.name || 'Destination' };
    }

    if (Array.isArray(payload.placesToVisit)) {
      payload.placesToVisit = payload.placesToVisit.filter((p) => p && (p.name || p.description)).map((p) => ({
        name: p.name || 'Sightseeing Point',
        description: p.description || 'Scenic location and viewpoints.',
        timing: p.timing || '9:00 AM - 6:00 PM',
        entryFee: p.entryFee || 'Free / Nominal',
      }));
    }

    if (destination) {
      destination = await Destination.findByIdAndUpdate(destination._id, payload, {
        new: true,
        runValidators: true,
      });
    } else {
      destination = await Destination.create({ ...payload, slug: payload.slug || createSlug(payload.name || 'Destination') });
    }

    try {
      await SEO.findOneAndUpdate(
        { slug: `/destinations/${destination.slug}` },
        {
          pageType: 'destination',
          pageId: destination._id.toString(),
          slug: `/destinations/${destination.slug}`,
          title: destination.seo?.metaTitle || `${destination.name} Travel Guide`,
          metaDescription: destination.seo?.metaDescription || destination.shortDescription?.slice(0, 160),
          ogImage: destination.heroImage?.url,
        },
        { upsert: true }
      );
    } catch (e) {
      console.warn('[SEO Upsert Notice]:', e.message);
    }

    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
exports.deleteDestination = async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    let destination = null;
    if (idOrSlug && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      destination = await Destination.findById(idOrSlug);
    }
    if (!destination) {
      destination = await Destination.findOne({ slug: idOrSlug });
    }

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    await SEO.deleteOne({ slug: `/destinations/${destination.slug}` });
    await destination.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Destination deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
