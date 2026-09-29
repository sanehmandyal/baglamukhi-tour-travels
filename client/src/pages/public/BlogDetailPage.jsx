import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Share2, Tag, ArrowRight, HelpCircle, Compass } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import TourCard from '../../components/cards/TourCard';
import BlogCard from '../../components/cards/BlogCard';
import { ArticleSchema, FAQSchema } from '../../components/common/SchemaMarkup';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/blogs/${slug}`);
        if (res.data.success) {
          setBlog(res.data.data);
          setRecentBlogs(res.data.recentBlogs || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading || !blog) {
    return (
      <div className="py-32 text-center text-slate-600 font-semibold text-sm">
        Loading travel guide...
      </div>
    );
  }

  const dateStr = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently Published';

  return (
    <div className="space-y-10 pb-16">
      <SEOHead
        title={blog.seo?.metaTitle || `${blog.title} | Baglamukhi Tour & Travels`}
        description={blog.seo?.metaDescription || blog.excerpt?.slice(0, 160)}
        canonical={`/blog/${blog.slug}`}
        ogImage={blog.featuredImage?.url}
        ogType="article"
      />

      <ArticleSchema blog={blog} />
      {blog.faqs && blog.faqs.length > 0 && <FAQSchema faqs={blog.faqs} />}

      <Breadcrumbs
        items={[
          { name: 'Blog', url: '/blog' },
          { name: blog.title, url: `/blog/${blog.slug}` },
        ]}
      />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3 text-center">
          <span className="px-3 py-1 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 rounded-full inline-block">
            {blog.category}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 pt-2 flex-wrap">
            <div className="flex items-center space-x-2">
              <img
                src={blog.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={blog.author?.name}
                className="w-7 h-7 rounded-full object-cover border"
              />
              <span className="font-semibold text-slate-800">{blog.author?.name}</span>
            </div>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-brand-500" />
              {dateStr}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-brand-500" />
              {blog.readingTime || '5 min read'}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-slate-100 shadow-soft">
          <img
            src={blog.featuredImage?.url}
            alt={blog.featuredImage?.alt || blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="p-6 bg-brand-50/70 rounded-2xl border-l-4 border-brand-600 text-slate-800 text-sm sm:text-base font-medium leading-relaxed italic">
          {blog.excerpt}
        </div>

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-light">
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200 flex items-center space-x-2 flex-wrap">
            <Tag className="w-4 h-4 text-slate-400 mr-1" />
            {blog.tags.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 rounded-lg">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box (E-E-A-T Signal) */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex items-center space-x-4 my-8">
          <img
            src={blog.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={blog.author?.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-200 flex-shrink-0"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-900">{blog.author?.name || 'Thakur Travel Specialist'}</h4>
            <p className="text-xs text-brand-600 font-semibold">{blog.author?.role || 'Himachal Tourism Expert'}</p>
            <p className="text-xs text-slate-500 mt-1 font-light">
              Over a decade of hands-on experience guiding tourists across Himachal Pradesh and Punjab.
            </p>
          </div>
        </div>

        {/* Article FAQs */}
        {blog.faqs && blog.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-display">Frequently Asked Questions</h3>
            <div className="space-y-3 text-xs sm:text-sm">
              {blog.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="font-bold text-slate-900 flex items-center">
                    <HelpCircle className="w-4 h-4 text-brand-600 mr-2 flex-shrink-0" />
                    {faq.question}
                  </h4>
                  <p className="text-slate-600 pl-6 leading-relaxed font-light">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-brand-700 to-cyanAccent-600 text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold font-display">Plan Your Trip with Our Experts</h3>
          <p className="text-xs text-cyan-100 max-w-md mx-auto">
            Get personalized itineraries, transparent cab fares, and instant hotel vouchers.
          </p>
          <Link
            to="/booking"
            className="inline-block px-6 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow transition"
          >
            Inquire For Free Quote
          </Link>
        </div>
      </article>

      {/* Recent Blog Suggestions */}
      {recentBlogs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 font-display">More Helpful Travel Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogs.map((rBlog) => (
              <BlogCard key={rBlog._id} blog={rBlog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;
