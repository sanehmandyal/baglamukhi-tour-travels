const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', submitContactMessage);
router.get('/', protect, authorize('admin', 'manager'), getContactMessages);
router.put('/:id', protect, authorize('admin', 'manager'), updateContactStatus);
router.delete('/:id', protect, authorize('admin'), deleteContactMessage);

module.exports = router;
