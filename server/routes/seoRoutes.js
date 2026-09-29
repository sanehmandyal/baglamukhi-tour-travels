const express = require('express');
const router = express.Router();
const {
  getSeoMeta,
  getAllSeoEntries,
  saveSeoMeta,
  getSeoAudit,
  generateSitemapXml,
  getRobotsTxt,
} = require('../controllers/seoController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/meta', getSeoMeta);
router.get('/sitemap.xml', generateSitemapXml);
router.get('/robots.txt', getRobotsTxt);
router.get('/all', protect, authorize('admin', 'manager'), getAllSeoEntries);
router.post('/save', protect, authorize('admin', 'manager'), saveSeoMeta);
router.get('/audit', protect, authorize('admin', 'manager'), getSeoAudit);

module.exports = router;
