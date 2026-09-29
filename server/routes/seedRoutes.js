const express = require('express');
const router = express.Router();
const seedDatabase = require('../seed/seedData');

// @desc    Seed or re-sync initial database inventory
// @route   GET /api/seed or POST /api/seed
// @access  Public / Admin
router.all('/', async (req, res) => {
  try {
    const dropDb = req.query.fresh === 'true' || req.body?.fresh === true || true;
    console.log(`[API Seed] Triggering database seed (dropDb: ${dropDb})...`);
    await seedDatabase(dropDb);
    res.status(200).json({
      success: true,
      message: 'Database successfully populated with Himachal tour packages, authentic fleet, destinations, blogs, FAQs, and testimonials!',
    });
  } catch (err) {
    console.error('[API Seed Error]:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to seed database: ' + err.message,
    });
  }
});

module.exports = router;
