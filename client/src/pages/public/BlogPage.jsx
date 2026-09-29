import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BlogCard from '../../components/cards/BlogCard';
import { DEFAULT_BLOGS } from '../../data/initialData';

const BlogPage = () => {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);

        const res = await api.get(`/blogs?${params.toString()}`);
        if (res.data.success && res.data.data?.length > 0) {
          setBlogs(res.data.data);
        } else if (!category && !search) {
          setBlogs(DEFAULT_BLOGS);
        }
      } catch (err) {
        console.error(err);
        if (!category && !search) setBlogs(DEFAULT_BLOGS);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [category, search]);

  const categories = ['All', 'Travel Guides', 'Destination Guides', 'Travel Tips', 'Himachal Travel'];

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Travel Blog & Himachal Guides | Baglamukhi Tour & Travels"
        description="Expert travel guides, snowfall alerts, Shimla Manali itineraries, best time to visit Himachal, and budgeting tips from local travel specialists."
        canonical="/blog"
      />
      <Breadcrumbs items={[{ name: 'Travel Blog', url: '/blog' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            Himachal Travel Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Travel Blogs & Holiday Guides
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Practical travel advice, road conditions, snow updates, food recommendations, and step-by-step itineraries written by certified travel experts.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Category Filter */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search articles & guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 sm:top-3" />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => {
              const isSelected = (cat === 'All' && !category) || (category === cat);
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat === 'All' ? '' : cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                    isSelected ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-600 font-semibold text-sm">
            Loading travel articles...
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-sm text-slate-600">No blog posts found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
