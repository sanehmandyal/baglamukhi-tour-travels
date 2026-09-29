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
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS'));
      }
    },
    credentials: true,
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
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/seo', require('./routes/seoRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Baglamukhi Tour & Travels Backend API',
    uptime: process.uptime(),
  });
});

// Serve frontend in production if built
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
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
