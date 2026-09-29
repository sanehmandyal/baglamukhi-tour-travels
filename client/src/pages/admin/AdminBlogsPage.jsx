import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, BookOpen } from 'lucide-react';
import api from '../../api/axios';

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/blogs/admin/all');
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete blog post "${title}"?`)) {
      try {
        await api.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        alert('Failed to delete blog.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Travel Blogs CMS</h1>
          <p className="text-xs text-slate-500">Publish articles, snow updates, itineraries, and SEO travel guides</p>
        </div>

        <Link
          to="/admin/blogs/new"
          className="px-4 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition flex items-center shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Write New Article
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading articles...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-3 px-4">Article Title</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Author</th>
                  <th className="py-3 px-3">Published Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center space-x-2">
                        <img src={b.featuredImage?.url} alt={b.title} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="truncate max-w-xs">{b.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">{b.category}</td>
                    <td className="py-3 px-3">{b.author?.name}</td>
                    <td className="py-3 px-3">{new Date(b.publishedAt || b.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link to={`/blog/${b.slug}`} target="_blank" className="p-1.5 text-slate-500 hover:text-brand-600">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link to={`/admin/blogs/edit/${b._id}`} className="p-1.5 text-slate-500 hover:text-brand-600">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(b._id, b.title)} className="p-1.5 text-slate-500 hover:text-rose-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogsPage;
