const express = require('express');
const router = express.Router();
const {
  getFaqs,
  getAdminFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} = require('../controllers/faqController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getFaqs);
router.get('/admin/all', protect, authorize('admin', 'manager'), getAdminFaqs);
router.post('/', protect, authorize('admin', 'manager'), createFaq);
router.put('/:id', protect, authorize('admin', 'manager'), updateFaq);
router.delete('/:id', protect, authorize('admin'), deleteFaq);

module.exports = router;
