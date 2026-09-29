const express = require('express');
const router = express.Router();
const {
  getServices,
  getServiceBySlug,
  getAdminServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.get('/admin/all', protect, authorize('admin', 'manager'), getAdminServices);
router.get('/:slug', getServiceBySlug);
router.post('/', protect, authorize('admin', 'manager'), createService);
router.put('/:id', protect, authorize('admin', 'manager'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;
