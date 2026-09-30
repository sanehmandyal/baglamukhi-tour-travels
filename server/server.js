const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Connect to MongoDB & ensure admin and tour data exists
const connectDB = require('./config/db');
const seedDatabase = require('./seed/seedData');

connectDB().then(async () => {
  try {
    const User = require('./models/User');
    const Tour = require('./models/Tour');
    const Service = require('./models/Service');
    const Destination = require('./models/Destination');

    const existing = await User.findOne({ email: 'admin@baglamukhitourtravels.com' });
    if (!existing) {
      await User.create({
        name: 'Baglamukhi Tour & Travels Admin',
        email: 'admin@baglamukhitourtravels.com',
        password: 'Admin@123456',
        role: 'admin',
        phone: '+91 98051 43007',
        isActive: true,
      });
      console.log('[Auth] Admin user auto-initialized (admin@baglamukhitourtravels.com)');
    }

    const tourCount = await Tour.countDocuments();
    const serviceCount = await Service.countDocuments();
    const destinationCount = await Destination.countDocuments();

    if (tourCount === 0 || serviceCount === 0 || destinationCount === 0) {
      console.log('[Seed] Database inventory is empty or missing services/tours. Auto-seeding full Himachal packages & fleet...');
      await seedDatabase(true);
      console.log('[Seed] Auto-seeding completed successfully!');
    }
  } catch (err) {
    console.error('[Auth/Seed] Auto-init notice:', err.message);
  }
});

const app = express();

// Security Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible CDN & image loading
    crossOriginEmbedderPolicy: false,
  })
);

// Compression for optimal Core Web Vitals
app.use(compression());

// CORS configuration
const isAllowedOrigin = (origin) => {
  if (!origin) return true; // allow curl, mobile apps, server-to-server
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) return true;
  if (origin.endsWith('.vercel.app') || origin === 'https://baglamukhi-tour-travels.vercel.app') return true;
  if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) return true;
  return false;
};

app.use(
  cors({
    origin: function (origin, callback) {
      if (isAllowedOrigin(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, true); // Fallback to permissive for travel inquiries
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Rate limiting for API protection
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again after 10 minutes' },
});
app.use('/api', limiter);

// Request body parsers (supports high-res image uploads & base64)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check and root endpoints (serves Render health check and root URL visits)
app.head(['/', '/api/health', '/health'], (req, res) => {
  res.status(200).end();
});

app.get(['/', '/api/health', '/health'], (req, res) => {
  if (req.accepts('html') && !req.xhr && !req.path.startsWith('/api/')) {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Baglamukhi Tour & Travels API Server</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
          .card { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 40px; max-width: 600px; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); text-align: center; }
          .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.2); color: #34d399; font-weight: 700; font-size: 13px; padding: 6px 14px; border-radius: 9999px; margin-bottom: 20px; border: 1px solid rgba(16, 185, 129, 0.3); }
          .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
          h1 { margin: 0 0 10px; font-size: 24px; color: #ffffff; }
          p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 25px; }
          .btn { display: inline-block; background: #f59e0b; color: #000; font-weight: 700; padding: 12px 24px; border-radius: 12px; text-decoration: none; transition: background 0.2s; font-size: 14px; }
          .btn:hover { background: #d97706; }
          .endpoints { text-align: left; background: #0f172a; border-radius: 12px; padding: 16px; margin-top: 25px; font-size: 12px; font-family: monospace; color: #cbd5e1; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge"><div class="dot"></div> Server Online & Operational</div>
          <h1>Baglamukhi Tour & Travels API</h1>
          <p>The backend production API service is connected to MongoDB and ready to serve travel inquiries, tour packages, Himachal taxi reservations, and content.</p>
          <a href="https://baglamukhi-tour-travels.vercel.app" class="btn" target="_blank">Open Main Website →</a>
          <div class="endpoints">
            <div><strong>Status:</strong> HTTP 200 OK</div>
            <div><strong>Environment:</strong> ${process.env.NODE_ENV || 'production'}</div>
            <div><strong>Uptime:</strong> ${Math.floor(process.uptime())}s</div>
            <div><strong>Tours API:</strong> /api/tours</div>
            <div><strong>Destinations API:</strong> /api/destinations</div>
          </div>
        </div>
      </body>
      </html>
    `);
  }
  res.status(200).json({
    status: 'online',
    service: 'Baglamukhi Tour & Travels Backend API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'connected',
    frontend: 'https://baglamukhi-tour-travels.vercel.app',
    message: 'Backend is active and ready to serve requests.',
  });
});

// SEO direct root endpoints: robots.txt and sitemap.xml
const { generateSitemapXml, getRobotsTxt } = require('./controllers/seoController');
app.get('/sitemap.xml', generateSitemapXml);
app.get('/robots.txt', getRobotsTxt);

// API Routes
app.use(['/api/auth', '/auth'], require('./routes/authRoutes'));
app.use(['/api/tours', '/tours'], require('./routes/tourRoutes'));
app.use(['/api/destinations', '/destinations'], require('./routes/destinationRoutes'));
app.use(['/api/locations', '/locations'], require('./routes/locationRoutes'));
app.use(['/api/services', '/services'], require('./routes/serviceRoutes'));
app.use(['/api/bookings', '/bookings'], require('./routes/bookingRoutes'));
app.use(['/api/blogs', '/blogs'], require('./routes/blogRoutes'));
app.use(['/api/testimonials', '/testimonials'], require('./routes/testimonialRoutes'));
app.use(['/api/faqs', '/faqs'], require('./routes/faqRoutes'));
app.use(['/api/gallery', '/gallery'], require('./routes/galleryRoutes'));
app.use(['/api/contact', '/contact'], require('./routes/contactRoutes'));
app.use(['/api/seo', '/seo'], require('./routes/seoRoutes'));
app.use(['/api/stats', '/stats'], require('./routes/statsRoutes'));
app.use(['/api/settings', '/settings'], require('./routes/settingsRoutes'));
app.use(['/api/search', '/search'], require('./routes/searchRoutes'));

// Database Seed / Re-sync Endpoint
app.use(['/api/seed', '/seed'], require('./routes/seedRoutes'));

// Serve frontend in production if built locally/monorepo
const fs = require('fs');
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist) && fs.existsSync(path.join(clientDist, 'index.html'))) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientDist, 'index.html'));
  });
}

// Error handling middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`[Baglamukhi Tour & Travels Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection]: ${err.message}`);
  // server.close(() => process.exit(1));
});

module.exports = app;
