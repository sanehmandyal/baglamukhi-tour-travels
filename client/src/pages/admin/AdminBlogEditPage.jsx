import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { FiSave, FiArrowLeft, FiImage, FiFileText, FiTag, FiSearch } from 'react-icons/fi';
import ImageUploadInput from '../../components/common/ImageUploadInput';

const AdminBlogEditPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Travel Tips',
    summary: '',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tags: 'manali, himachal, travel guide',
    author: user?.name || 'Baglamukhi Tour & Travels Editorial',
    readTime: '5 min read',
    isPublished: true,
    isFeatured: false,
    metaTitle: '',
    metaDescription: '',
    keywords: 'himachal travel blog, manali tips, north india tour guide',
    canonicalUrl: ''
  });

  useEffect(() => {
    if (isEdit) {
      const fetchBlog = async () => {
        try {
          const res = await api.get(`/blogs/id/${id}`);
          let b = null;
          if (res.data?.success && res.data?.data) {
            b = res.data.data;
          } else {
            b = DEFAULT_BLOGS.find(x => x._id === id || x.slug === id);
          }
          if (b) {
            setFormData({
              title: b.title || '',
              slug: b.slug || '',
              category: b.category || 'Travel Tips',
              summary: b.excerpt || b.summary || '',
              content: b.content || '',
              featuredImage: b.featuredImage?.url || b.featuredImage || '',
              tags: Array.isArray(b.tags) ? b.tags.join(', ') : b.tags || '',
              author: b.author || user?.name || 'Admin',
              readTime: b.readTime || '5 min read',
              isPublished: b.isPublished !== undefined ? b.isPublished : true,
              isFeatured: b.isFeatured || false,
              metaTitle: b.seo?.metaTitle || b.metaTitle || '',
              metaDescription: b.seo?.metaDescription || b.metaDescription || '',
              keywords: Array.isArray(b.seo?.keywords) ? b.seo.keywords.join(', ') : (b.seo?.keywords || ''),
              canonicalUrl: b.seo?.canonicalUrl || b.canonicalUrl || ''
            });
          }
        } catch (err) {
          const b = DEFAULT_BLOGS.find(x => x._id === id || x.slug === id);
          if (b) {
            setFormData({
              title: b.title || '',
              slug: b.slug || '',
              category: b.category || 'Travel Tips',
              summary: b.excerpt || b.summary || '',
              content: b.content || '',
              featuredImage: b.featuredImage?.url || b.featuredImage || '',
              tags: Array.isArray(b.tags) ? b.tags.join(', ') : b.tags || '',
              author: b.author || user?.name || 'Admin',
              readTime: b.readTime || '5 min read',
              isPublished: b.isPublished !== undefined ? b.isPublished : true,
              isFeatured: b.isFeatured || false,
              metaTitle: b.seo?.metaTitle || b.metaTitle || '',
              metaDescription: b.seo?.metaDescription || b.metaDescription || '',
              keywords: Array.isArray(b.seo?.keywords) ? b.seo.keywords.join(', ') : (b.seo?.keywords || ''),
              canonicalUrl: b.seo?.canonicalUrl || b.canonicalUrl || ''
            });
          }
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'title' && !isEdit) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({
        ...prev,
        slug: generatedSlug,
        metaTitle: `${value} | Baglamukhi Tour & Travels Blog`
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      seo: {
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.summary,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
        canonicalUrl: formData.canonicalUrl
      }
    };

    // Strip non-ObjectId _id (e.g. blog_1)
    if (payload._id && !payload._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
      delete payload._id;
    }

    try {
      if (isEdit && id && id.match(/^[0-9a-fA-F]{24}$/)) {
        await api.put(`/blogs/${id}`, payload);
      } else {
        await api.post('/blogs', payload);
      }
      navigate('/admin/blogs');
    } catch (err) {
      console.error('Error saving blog:', err);
      setError(err.response?.data?.message || err.message || 'Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading blog editor...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/admin/blogs" className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit Blog Article' : 'Write New Article'}</h1>
            <p className="text-sm text-slate-500">Publish high-ranking travel guides, packing checklists, and destination insights</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Article Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FiFileText className="text-cyan-600" /> Article Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Article Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Ultimate Shimla & Manali Travel Itinerary for 2025"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">URL Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              >
                <option value="Travel Tips">Travel Tips</option>
                <option value="Destination Guide">Destination Guide</option>
                <option value="Honeymoon Ideas">Honeymoon Ideas</option>
                <option value="Himachal Tourism">Himachal Tourism</option>
                <option value="Pilgrimage Routes">Pilgrimage Routes</option>
                <option value="Taxi & Road Trip Guides">Taxi & Road Trip Guides</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Read Time</label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="e.g. 6 min read"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <ImageUploadInput
                label="Featured Image (Upload from device or enter URL) *"
                value={formData.featuredImage}
                onChange={(img) => setFormData(prev => ({ ...prev, featuredImage: img }))}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Summary / Excerpt *</label>
              <textarea
                name="summary"
                rows="2"
                value={formData.summary}
                onChange={handleChange}
                required
                placeholder="Brief snapshot shown on blog list cards and search snippets..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Article Content (Markdown / HTML Supported) *</label>
              <textarea
                name="content"
                rows="12"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Write full article body paragraphs, headings, lists, travel advice, best routes..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Tags (Comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="manali, himachal, rohtang pass, solang valley, snow point"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* SEO Meta Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FiSearch className="text-cyan-600" /> Search Engine Optimization (SEO)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="Recommended 50-60 characters"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              />
              <span className="text-xs text-slate-400 mt-1 block">{formData.metaTitle.length} / 60 characters</span>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Meta Description</label>
              <textarea
                name="metaDescription"
                rows="2"
                value={formData.metaDescription}
                onChange={handleChange}
                placeholder="Recommended 140-160 characters"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              ></textarea>
              <span className="text-xs text-slate-400 mt-1 block">{formData.metaDescription.length} / 160 characters</span>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">SEO Keywords</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="himachal tour blog, manali travel tips, best time to visit shimla"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
              />
              <span>Published Live</span>
            </label>
            <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
              />
              <span>Feature on Home</span>
            </label>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/admin/blogs')}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold shadow-md shadow-cyan-600/20 transition-all disabled:opacity-50"
            >
              <FiSave className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Article'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogEditPage;
