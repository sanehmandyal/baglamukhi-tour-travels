import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogCard = ({ blog }) => {
  if (!blog) return null;

  const dateStr = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent Guide';

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-yellow-400/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        <img
          src={blog.featuredImage?.url || 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=600&q=80'}
          alt={blog.featuredImage?.alt || blog.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-[11px] font-black text-neutral-950 bg-yellow-400 backdrop-blur-md rounded-full shadow-sm">
            {blog.category || 'Travel Guide'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center space-x-3 text-[11px] text-neutral-400 mb-2">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-yellow-500" />
              {dateStr}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-yellow-500" />
              {blog.readingTime || '5 min read'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-neutral-950 group-hover:text-yellow-600 transition-colors duration-200 line-clamp-2 leading-snug">
            <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-xs text-neutral-600 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        {/* Author and Read More Link */}
        <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {blog.author?.avatar ? (
              <img src={blog.author.avatar} alt={blog.author.name} className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-neutral-900 text-yellow-400 flex items-center justify-center text-[10px] font-bold">
                B
              </div>
            )}
            <span className="text-xs text-neutral-600 font-semibold truncate max-w-[120px]">
              {blog.author?.name || 'Baglamukhi Editorial'}
            </span>
          </div>

          <Link
            to={`/blog/${blog.slug}`}
            className="text-xs font-bold text-neutral-950 hover:text-yellow-600 flex items-center transition"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform text-yellow-500" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
