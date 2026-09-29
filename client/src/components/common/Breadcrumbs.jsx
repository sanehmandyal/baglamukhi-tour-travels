import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbSchema } from './SchemaMarkup';

const Breadcrumbs = ({ items = [] }) => {
  const allItems = [{ name: 'Home', url: '/' }, ...items];

  return (
    <>
      <BreadcrumbSchema items={allItems} />
      <nav aria-label="Breadcrumb" className="py-3 px-4 bg-slate-50 border-b border-slate-200/80 text-sm">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-slate-500 flex-wrap">
          <Link
            to="/"
            className="flex items-center hover:text-brand-600 transition-colors duration-200"
            title="Home"
          >
            <Home className="w-4 h-4 mr-1 text-slate-400" />
            <span className="sr-only">Home</span>
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                {isLast ? (
                  <span className="text-slate-800 font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="hover:text-brand-600 transition-colors duration-200 truncate max-w-[150px] sm:max-w-[200px]"
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
