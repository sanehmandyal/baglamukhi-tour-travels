const Blog = require('../models/Blog');
const SEO = require('../models/SEO');
const { createSlug } = require('../utils/slugify');

// @desc    Get all published travel blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    const { category, tag, search, page = 1, limit = 9 } = req.query;
    const query = { isPublished: true };

    if (category) query.category = { $regex: category, $options: 'i' };
    if (tag) query.tags = { $in: [tag] };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by slug or ID
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlogBySlug = async (req, res, next) => {
  try {
    const slugOrId = req.params.slug;
    let blog = null;

    if (slugOrId && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slugOrId);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: slugOrId });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    const recentBlogs = await Blog.find({
      _id: { $ne: blog._id },
      isPublished: true,
    })
      .sort({ publishedAt: -1 })
      .limit(4)
      .select('title slug featuredImage publishedAt category readingTime');

    const seoData = await SEO.findOne({ slug: `/blog/${blog.slug}` });

    res.status(200).json({
      success: true,
      data: blog,
      recentBlogs,
      seo: seoData || {
        title: blog.seo?.metaTitle || `${blog.title} | Baglamukhi Tour & Travels Blog`,
        metaDescription: blog.seo?.metaDescription || blog.excerpt?.slice(0, 160),
        canonicalUrl: `/blog/${blog.slug}`,
        focusKeyword: blog.seo?.focusKeyword || blog.title,
        ogImage: blog.featuredImage?.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: get all blogs
// @route   GET /api/blogs/admin/all
// @access  Private/Admin
exports.getAdminBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog (or upsert by slug)
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res, next) => {
  try {
    let { slug, title } = req.body;
    if (!slug && title) {
      slug = createSlug(title);
    }

    const payload = { ...req.body, slug };
    if (payload._id && !payload._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
      delete payload._id;
    }

    let blog = await Blog.findOne({ slug });
    if (blog) {
      blog = await Blog.findByIdAndUpdate(blog._id, payload, { new: true, runValidators: true });
    } else {
      blog = await Blog.create(payload);
    }

    try {
      await SEO.findOneAndUpdate(
        { slug: `/blog/${blog.slug}` },
        {
          pageType: 'blog',
          pageId: blog._id.toString(),
          slug: `/blog/${blog.slug}`,
          title: blog.seo?.metaTitle || `${blog.title}`,
          metaDescription: blog.seo?.metaDescription || blog.excerpt?.slice(0, 160),
          canonicalUrl: `http://localhost:5173/blog/${blog.slug}`,
          focusKeyword: blog.title,
          ogTitle: blog.title,
          ogImage: blog.featuredImage?.url,
          schemaType: 'Article',
        },
        { upsert: true, new: true }
      );
    } catch (e) {
      console.warn('[SEO Upsert Notice]:', e.message);
    }

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    let blog = null;
    if (idOrSlug && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(idOrSlug);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: req.body.slug || idOrSlug });
    }

    const payload = { ...req.body };
    if (payload._id && !payload._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
      delete payload._id;
    }

    if (blog) {
      blog = await Blog.findByIdAndUpdate(blog._id, payload, {
        new: true,
        runValidators: true,
      });
    } else {
      blog = await Blog.create({ ...payload, slug: payload.slug || createSlug(payload.title || 'Blog') });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    let blog = null;
    if (idOrSlug && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(idOrSlug);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: idOrSlug });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    await SEO.deleteOne({ slug: `/blog/${blog.slug}` });
    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
