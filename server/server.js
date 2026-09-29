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

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

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

// Request body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

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

// Health check endpoints
app.get(['/', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Baglamukhi Tour & Travels Backend API',
    uptime: process.uptime(),
    frontend: 'https://baglamukhi-tour-travels.vercel.app',
    message: 'Backend is active and ready to serve requests.',
  });
});

app.head(['/', '/api/health'], (req, res) => {
  res.status(200).end();
});

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
