const Service = require('../models/Service');
const SEO = require('../models/SEO');
const { createSlug } = require('../utils/slugify');

// @desc    Get all published transport & taxi services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    const { type } = req.query;
    const query = { isPublished: true };

    if (type) query.serviceType = type;

    const services = await Service.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
// @access  Public
exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isPublished: true });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const otherServices = await Service.find({
      _id: { $ne: service._id },
      isPublished: true,
    }).limit(3);

    const seoData = await SEO.findOne({ slug: `/services/${service.slug}` });

    res.status(200).json({
      success: true,
      data: service,
      otherServices,
      seo: seoData || {
        title: service.seo?.metaTitle || `${service.title} | Baglamukhi Tour & Travels`,
        metaDescription: service.seo?.metaDescription || service.shortDescription.slice(0, 160),
        canonicalUrl: `/services/${service.slug}`,
        focusKeyword: `${service.title} booking`,
        ogImage: service.featuredImage?.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: get all services
// @route   GET /api/services/admin/all
// @access  Private/Admin
exports.getAdminServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res, next) => {
  try {
    let { slug, title } = req.body;
    if (!slug && title) {
      slug = createSlug(title);
    }

    const service = await Service.create({ ...req.body, slug });

    await SEO.findOneAndUpdate(
      { slug: `/services/${service.slug}` },
      {
        pageType: 'service',
        pageId: service._id.toString(),
        slug: `/services/${service.slug}`,
        title: service.seo?.metaTitle || `${service.title} - Car & Taxi Service`,
        metaDescription: service.seo?.metaDescription || service.shortDescription?.slice(0, 160),
        canonicalUrl: `http://localhost:5173/services/${service.slug}`,
        focusKeyword: service.title,
        ogTitle: service.title,
        ogImage: service.featuredImage?.url,
        schemaType: 'Service',
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    await SEO.deleteOne({ slug: `/services/${service.slug}` });
    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
