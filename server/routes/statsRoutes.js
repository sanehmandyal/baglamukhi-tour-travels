const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/statsController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, authorize('admin', 'manager'), getDashboardStats);

module.exports = router;
