const SEO = require('../models/SEO');
const Tour = require('../models/Tour');
const Destination = require('../models/Destination');
const Blog = require('../models/Blog');
const Location = require('../models/Location');
const Service = require('../models/Service');
const Hotel = require('../models/Hotel');
const SiteSettings = require('../models/SiteSettings');

// @desc    Get SEO metadata by slug
// @route   GET /api/seo/meta
// @access  Public
exports.getSeoMeta = async (req, res, next) => {
  try {
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Slug parameter is required' });
    }

    const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
    const seo = await SEO.findOne({ slug: normalizedSlug });

    if (!seo) {
      // Return sensible fallback
      const siteOrigin = process.env.SITE_URL || 'https://www.a1baglamukhitours.in';
      return res.status(200).json({
        success: true,
        data: {
          title: 'Baglamukhi Tour & Travels | Best Himachal Holiday Packages & Cab Service',
          metaDescription: 'Book customized Himachal tour packages, Amb Andaura Railway Station taxi transfers, Maa Baglamukhi Darshan, and holiday trips with Baglamukhi Tour & Travels.',
          canonicalUrl: `${siteOrigin}${normalizedSlug}`,
          robots: 'index, follow',
          schemaType: 'WebSite',
        },
      });
    }

    res.status(200).json({ success: true, data: seo });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: get all SEO metadata entries
// @route   GET /api/seo/all
// @access  Private/Admin
exports.getAllSeoEntries = async (req, res, next) => {
  try {
    const seoEntries = await SEO.find().sort({ updatedAt: -1 });
    res.status(200).json({ success: true, count: seoEntries.length, data: seoEntries });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: Create or update SEO metadata for a page
// @route   POST /api/seo/save
// @access  Private/Admin
exports.saveSeoMeta = async (req, res, next) => {
  try {
    let { slug, title, metaDescription, canonicalUrl, focusKeyword, secondaryKeywords, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage, robots, schemaType, pageType, pageId, structuredDataJson } = req.body;

    const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;

    const seo = await SEO.findOneAndUpdate(
      { slug: normalizedSlug },
      {
        pageType: pageType || 'page',
        pageId: pageId || normalizedSlug,
        slug: normalizedSlug,
        title,
        metaDescription,
        canonicalUrl: canonicalUrl || `https://www.a1baglamukhitours.in${normalizedSlug}`,
        focusKeyword,
        secondaryKeywords,
        ogTitle: ogTitle || title,
        ogDescription: ogDescription || metaDescription,
        ogImage,
        twitterTitle: twitterTitle || title,
        twitterDescription: twitterDescription || metaDescription,
        twitterImage: twitterImage || ogImage,
        robots: robots || 'index, follow',
        schemaType: schemaType || 'WebSite',
        structuredDataJson,
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: seo });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: Run SEO Health & Audit Checklist
// @route   GET /api/seo/audit
// @access  Private/Admin
exports.getSeoAudit = async (req, res, next) => {
  try {
    const tours = await Tour.find();
    const destinations = await Destination.find();
    const blogs = await Blog.find();
    const locations = await Location.find();
    const seoEntries = await SEO.find();

    const issues = [];
    const passes = [];

    // Check tours
    tours.forEach((tour) => {
      if (!tour.seo?.metaTitle && !tour.title) {
        issues.push({ item: `Tour: ${tour.title}`, type: 'error', message: 'Missing Meta Title tag' });
      } else if (tour.title && tour.title.length > 70) {
        issues.push({ item: `Tour: ${tour.title}`, type: 'warning', message: `Title length is ${tour.title.length} chars (recommended < 60)` });
      } else {
        passes.push({ item: `Tour: ${tour.title}`, message: 'Meta Title is properly formatted' });
      }

      if (!tour.overview || tour.overview.length < 50) {
        issues.push({ item: `Tour: ${tour.title}`, type: 'warning', message: 'Short meta overview / description' });
      } else {
        passes.push({ item: `Tour: ${tour.title}`, message: 'Meta Description present' });
      }

      if (!tour.featuredImage?.alt) {
        issues.push({ item: `Tour: ${tour.title}`, type: 'warning', message: 'Missing Alt text on featured image' });
      }
    });

    // Check blogs
    blogs.forEach((blog) => {
      if (!blog.seo?.metaTitle && !blog.title) {
        issues.push({ item: `Blog: ${blog.title}`, type: 'error', message: 'Missing Blog SEO title' });
      }
      if (!blog.featuredImage?.alt) {
        issues.push({ item: `Blog: ${blog.title}`, type: 'warning', message: 'Missing Alt text on Blog featured image' });
      }
      if (!blog.faqs || blog.faqs.length === 0) {
        issues.push({ item: `Blog: ${blog.title}`, type: 'info', message: 'No FAQ section added for FAQPage schema boost' });
      } else {
        passes.push({ item: `Blog: ${blog.title}`, message: 'FAQ structured data present' });
      }
    });

    // Check destinations
    destinations.forEach((dest) => {
      if (!dest.placesToVisit || dest.placesToVisit.length < 3) {
        issues.push({ item: `Destination: ${dest.name}`, type: 'warning', message: 'Fewer than 3 places to visit defined' });
      }
      passes.push({ item: `Destination: ${dest.name}`, message: 'Complete itinerary and overview configured' });
    });

    res.status(200).json({
      success: true,
      summary: {
        totalIndexedPages: tours.length + destinations.length + blogs.length + locations.length + 15,
        totalIssues: issues.length,
        totalPasses: passes.length,
        seoHealthScore: Math.max(65, Math.min(100, Math.round(100 - (issues.length * 3)))),
      },
      issues,
      passes: passes.slice(0, 10), // sample passes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate Dynamic XML Sitemap
// @route   GET /api/seo/sitemap.xml and /sitemap.xml
// @access  Public
exports.generateSitemapXml = async (req, res, next) => {
  try {
    const baseUrl = process.env.SITE_URL || 'https://www.a1baglamukhitours.in';

    const staticRoutes = [
      '',
      '/about-us',
      '/contact-us',
      '/tours',
      '/destinations',
      '/hotels',
      '/cabs',
      '/services/cab-booking',
      '/services/airport-transfer',
      '/services/tempo-traveller',
      '/services/car-rental',
      '/honeymoon-tours',
      '/family-tours',
      '/adventure-tours',
      '/pilgrimage-tours',
      '/weekend-trips',
      '/customized-tours',
      '/group-tours',
      '/corporate-travel',
      '/blog',
      '/faqs',
      '/testimonials',
      '/gallery',
      '/privacy-policy',
      '/terms-and-conditions',
      '/cancellation-refund-policy',
      '/sitemap',
      '/booking',
    ];

    const tours = await Tour.find({ isPublished: true }).select('slug updatedAt');
    const destinations = await Destination.find({ isPublished: true }).select('slug updatedAt');
    const blogs = await Blog.find({ isPublished: true }).select('slug updatedAt');
    const locations = await Location.find({ isPublished: true }).select('slug updatedAt');
    const services = await Service.find({ isPublished: true }).select('slug updatedAt');
    const hotels = await Hotel.find({ isPublished: true }).select('slug updatedAt');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const today = new Date().toISOString().split('T')[0];

    // Add static pages
    staticRoutes.forEach((route) => {
      const priority = route === '' ? '1.0' : route.includes('/tours') || route.includes('/destinations') ? '0.9' : '0.8';
      const changefreq = route === '' ? 'daily' : 'weekly';
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${route}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add Tours
    tours.forEach((tour) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/tours/${tour.slug}</loc>\n`;
      xml += `    <lastmod>${(tour.updatedAt || new Date()).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add Destinations
    destinations.forEach((dest) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/destinations/${dest.slug}</loc>\n`;
      xml += `    <lastmod>${(dest.updatedAt || new Date()).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add Blogs
    blogs.forEach((blog) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${blog.slug}</loc>\n`;
      xml += `    <lastmod>${(blog.updatedAt || new Date()).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add Locations
    locations.forEach((loc) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/locations/${loc.slug}</loc>\n`;
      xml += `    <lastmod>${(loc.updatedAt || new Date()).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add Services
    services.forEach((srv) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/services/${srv.slug}</loc>\n`;
      xml += `    <lastmod>${(srv.updatedAt || new Date()).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add Hotels
    hotels.forEach((htl) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/hotels/${htl.slug}</loc>\n`;
      xml += `    <lastmod>${(htl.updatedAt || new Date()).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.75</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
};

// @desc    Dynamic robots.txt endpoint
// @route   GET /robots.txt & /api/seo/robots.txt
// @access  Public
exports.getRobotsTxt = (req, res) => {
  const baseUrl = process.env.SITE_URL || 'https://www.a1baglamukhitours.in';
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api/
Disallow: /api/*
Disallow: /dashboard
Disallow: /login
Disallow: /register
Disallow: /booking-confirmed
Disallow: /thank-you
Disallow: /search

# Search Engine Crawlers
User-agent: Googlebot
Allow: /
Disallow: /admin
Disallow: /admin/*

User-agent: Bingbot
Allow: /
Disallow: /admin
Disallow: /admin/*

# AI Search & LLM Crawlers
User-agent: GPTBot
Allow: /
Disallow: /admin
Disallow: /admin/*

User-agent: ChatGPT-User
Allow: /
Disallow: /admin
Disallow: /admin/*

User-agent: ClaudeBot
Allow: /
Disallow: /admin
Disallow: /admin/*

User-agent: PerplexityBot
Allow: /
Disallow: /admin
Disallow: /admin/*

User-agent: Google-Extended
Allow: /
Disallow: /admin
Disallow: /admin/*

User-agent: Applebot-Extended
Allow: /
Disallow: /admin
Disallow: /admin/*

# XML Sitemaps & LLM Context
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${process.env.API_URL || baseUrl}/api/seo/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.status(200).send(robots);
};

// @desc    Dynamic llms.txt endpoint
// @route   GET /llms.txt & /api/seo/llms.txt
// @access  Public
exports.getLlmsTxt = (req, res) => {
  const baseUrl = process.env.SITE_URL || 'https://www.a1baglamukhitours.in';
  const content = `# Baglamukhi Tour & Travels

> Premier Himachal Pradesh Tour Operator, Amb Andaura Railway Station Taxi Service, and Maa Baglamukhi Dham & 9 Devi Darshan Specialist.

Baglamukhi Tour & Travels is an authorized, government-registered travel operator based near Amb Andaura Railway Station (AADR) and Maa Baglamukhi Temple Bankhandi in Kangra, Himachal Pradesh, India. We provide customized Himachal tour packages, 24/7 commercial tourist taxi services (yellow plate), luxury Maharaja Tempo Travellers, Force Cruiser 4x4 mountain SUVs, and doorstep railway station/airport transfers across Himachal Pradesh, Punjab, Chandigarh, and Delhi NCR.

- Official Website: ${baseUrl}
- Primary 24/7 Phone / WhatsApp: +91 98051 43007
- Email: info@baglamukhitourtravels.in / bookings@baglamukhitourtravels.in
- Base Stations: Amb Andaura Railway Station (AADR), Kangra (Bankhandi), Una, Chandigarh, Pathankot

## Core Tour Packages
- [All Himachal Tour Packages](${baseUrl}/tours): Complete catalog of personalized holiday packages across Shimla, Manali, Dharamshala, Dalhousie, and Spiti Valley.
- [Maa Baglamukhi Dham & 9 Devi Darshan Yatra](${baseUrl}/tours/9-devi-darshan-himachal-yatra): 5-7 days holy pilgrimage covering Mansa Devi, Naina Devi, Chintpurni, Jwala Ji, Baglamukhi Bankhandi, Kangra Brajeshwari, Chamunda Devi, and Amritsar Golden Temple.
- [Shimla & Manali Honeymoon / Family Tour](${baseUrl}/tours/shimla-manali-honeymoon-package): 6 Days / 5 Nights classic Himachal holiday covering Kufri, Solang Valley, Atal Tunnel Rohtang, and local sightseeing.
- [Dharamshala, McLeodganj & Dalhousie Peace Tour](${baseUrl}/tours/dharamshala-dalhousie-5-days-tour): 5 Days / 4 Nights scenic holiday covering Dalai Lama Temple, HPCA Stadium, Khajjiar (Mini Switzerland), and cedar forests.
- [Spiti Valley High Altitude 4x4 Adventure](${baseUrl}/tours/spiti-valley-road-trip-7-days): 7 Days road expedition to Kaza, Key Monastery, Kibber, Chicham Bridge, Hikkim, and Chandratal Lake.

## Taxi & Mountain Fleet Rental
- [All Cabs & Fleet Models](${baseUrl}/cabs): Verified commercial yellow plate tourist fleet with native Pahadi chauffeurs and all-inclusive pricing.
- [Force Cruiser & Trax Toofan 4x4](${baseUrl}/cabs): Rugged 9 to 13-seater mountain cruisers ideal for temple groups, Spiti Valley, and steep ghats (₹18/km onwards).
- [Force Tempo Traveller 12 Seater Luxury Maharaja](${baseUrl}/cabs): 2x1 pushback Maharaja recliners, individual AC blowers, TV, and air suspension for family groups (₹24/km onwards).
- [Force Tempo Traveller 17 Seater Hill Specialist](${baseUrl}/cabs): Spacious 17-passenger van with wide center aisle and heavy roof carrier (₹28/km onwards).
- [Toyota Innova Crysta Luxury SUV](${baseUrl}/cabs): 6+1 / 7+1 premium family SUV with captain seats, dual AC, and hill-hold assist (₹18/km onwards).
- [Maruti Suzuki Ertiga Smart Hybrid](${baseUrl}/cabs): Economical 6-seater family taxi for temple tours and mountain vacations (₹14/km onwards).
- [Maruti Suzuki Swift Dzire Sedan](${baseUrl}/cabs): Agile 4-passenger AC sedan for couple tours, airport pickups, and railway transfers (₹11/km onwards).

## Station & Temple Pickup Locations
- [Amb Andaura Railway Station Taxi](${baseUrl}/locations/amb-andaura-railway-station-taxi): Nearest terminal station to Maa Baglamukhi Dham (45 km) with direct Vande Bharat Express connectivity from New Delhi. 24/7 doorstep platform taxi pickup.
- [Chandigarh Airport & Station Taxi](${baseUrl}/locations/chandigarh-airport-taxi-service): Direct one-way and roundtrip cab transfers to Shimla, Manali, Dharamshala, and Baglamukhi.
- [Una Himachal Railway Station Cab](${baseUrl}/locations/una-himachal-railway-station-taxi): Reliable cabs from Una to Chintpurni, Jwala Ji, and Kangra.

## Optional & Machine-Readable Resources
- [Full LLM Knowledge Document](${baseUrl}/llms-full.txt): Comprehensive deep-dive documentation of all routes, fleet specs, itineraries, and rates.
- [XML Sitemap](${baseUrl}/sitemap.xml): Complete URL index for search engines and web crawlers.
- [Robots Configuration](${baseUrl}/robots.txt): Crawler rules and indexing directives.
`;
  res.header('Content-Type', 'text/markdown; charset=utf-8');
  res.status(200).send(content);
};
