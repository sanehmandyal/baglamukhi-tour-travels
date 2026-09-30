const Service = require('../models/Service');
const SEO = require('../models/SEO');
const { createSlug } = require('../utils/slugify');

// @desc    Get all published transport & taxi services / cabs
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    const { type, category } = req.query;
    const query = {
      $or: [
        { isPublished: true },
        { isPublished: { $exists: false } },
        { isActive: true },
        { isActive: { $exists: false } }
      ]
    };

    if (type) {
      query.$and = [{ $or: [{ serviceType: type }, { category: type }] }];
    } else if (category && category !== 'all') {
      query.$and = [{ $or: [{ serviceType: category }, { category: category }] }];
    }

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

// @desc    Get single service/cab by slug or ID
// @route   GET /api/services/:slug
// @access  Public
exports.getServiceBySlug = async (req, res, next) => {
  try {
    const slugOrId = req.params.slug;
    let service = await Service.findOne({ slug: slugOrId });

    if (!service && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findById(slugOrId);
    }

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service/Cab not found' });
    }

    const otherServices = await Service.find({
      _id: { $ne: service._id },
    }).limit(4);

    const seoData = await SEO.findOne({ slug: `/services/${service.slug}` });

    res.status(200).json({
      success: true,
      data: service,
      otherServices,
      seo: seoData || {
        title: service.seo?.metaTitle || `${service.title} | Baglamukhi Tour & Travels`,
        metaDescription: service.seo?.metaDescription || service.shortDescription?.slice(0, 160),
        canonicalUrl: `/services/${service.slug}`,
        focusKeyword: `${service.title} booking`,
        ogImage: service.image || service.featuredImage?.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: get all services & cabs
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

// @desc    Create service / cab
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res, next) => {
  try {
    let { slug, title, name, image, featuredImage, shortDescription, fullDescription, detailedContent, features, popularRoutes } = req.body;
    
    const finalTitle = title || name || 'Himachal Cab';
    if (!slug) {
      slug = createSlug(finalTitle);
    }

    // Check slug uniqueness
    const existing = await Service.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const imgUrl = image || (featuredImage?.url) || '/images/cabs/force-cruiser-4x4.jpg';
    const normFeatures = Array.isArray(features)
      ? features
      : typeof features === 'string'
      ? features.split(',').map((f) => f.trim()).filter(Boolean)
      : [];

    const normRoutes = Array.isArray(popularRoutes)
      ? popularRoutes
      : typeof popularRoutes === 'string'
      ? popularRoutes.split(',').map((r) => r.trim()).filter(Boolean)
      : ['Chandigarh to Manali', 'Maa Baglamukhi Temple Kangra', 'Shimla', 'Dharamshala'];

    const serviceData = {
      ...req.body,
      title: finalTitle,
      slug,
      image: imgUrl,
      featuredImage: {
        url: imgUrl,
        alt: finalTitle,
      },
      shortDescription: shortDescription || 'Comfortable tourist cab with experienced hill chauffeur.',
      detailedContent: detailedContent || fullDescription || shortDescription || 'Standard Himachali tourist taxi with commercial permit.',
      features: normFeatures,
      popularRoutes: normRoutes,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true,
    };

    const service = await Service.create(serviceData);

    try {
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
          ogImage: service.image,
          schemaType: 'Service',
        },
        { upsert: true, new: true }
      );
    } catch (e) {
      console.warn('[SEO Upsert Notice]:', e.message);
    }

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service / cab
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = async (req, res, next) => {
  try {
    const { image, featuredImage, title, name, features, popularRoutes } = req.body;
    
    const updateData = { ...req.body };
    if (name && !title) updateData.title = name;
    if (image) {
      updateData.image = image;
      updateData.featuredImage = { url: image, alt: updateData.title || 'Cab' };
    }
    if (features) {
      updateData.features = Array.isArray(features)
        ? features
        : typeof features === 'string'
        ? features.split(',').map((f) => f.trim()).filter(Boolean)
        : [];
    }
    if (popularRoutes) {
      updateData.popularRoutes = Array.isArray(popularRoutes)
        ? popularRoutes
        : typeof popularRoutes === 'string'
        ? popularRoutes.split(',').map((r) => r.trim()).filter(Boolean)
        : [];
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
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

// @desc    Delete service / cab
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
