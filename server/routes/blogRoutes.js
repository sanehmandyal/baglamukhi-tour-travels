const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getBlogs);
router.get('/admin/all', protect, authorize('admin', 'manager', 'editor'), getAdminBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, authorize('admin', 'manager', 'editor'), createBlog);
router.put('/:id', protect, authorize('admin', 'manager', 'editor'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

module.exports = router;
