import React from 'react';
import { Filter, RotateCcw, Search, MapPin, Tag } from 'lucide-react';

const TourFilterForm = ({
  filters,
  onFilterChange,
  onResetFilters,
  categories = [],
  destinations = [],
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h4 className="text-base font-bold text-slate-900 flex items-center font-display">
          <Filter className="w-4 h-4 mr-2 text-brand-600" />
          Filter Tour Packages
        </h4>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-slate-400 hover:text-brand-600 flex items-center transition"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          Reset
        </button>
      </div>

      {/* Keyword Search */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Search Keyword</label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. Manali, Honeymoon, Snow..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Destination Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Destination</label>
        <select
          value={filters.destination || ''}
          onChange={(e) => onFilterChange('destination', e.target.value)}
          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
        >
          <option value="">All Destinations</option>
          <option value="Manali">Manali & Solang Valley</option>
          <option value="Shimla">Shimla & Kufri</option>
          <option value="Dharamshala">Dharamshala & McLeodganj</option>
          <option value="Dalhousie">Dalhousie & Khajjiar</option>
          <option value="Amritsar">Amritsar Golden Temple</option>
          <option value="Spiti">Spiti Valley</option>
          <option value="Pilgrimage">Himachal Devi Darshan</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tour Category</label>
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Family', 'Honeymoon', 'Pilgrimage', 'Adventure', 'Weekend', 'Group'].map((cat) => {
            const isSelected = (filters.category === cat) || (!filters.category && cat === 'All');
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange('category', cat === 'All' ? '' : cat)}
                className={`px-3 py-1.5 text-xs rounded-xl font-medium transition ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Duration (Days)</label>
        <select
          value={filters.duration || ''}
          onChange={(e) => onFilterChange('duration', e.target.value)}
          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
        >
          <option value="">Any Duration</option>
          <option value="3">3 Days (Weekend Short Trip)</option>
          <option value="4">4 Days</option>
          <option value="5">5 Days (Popular)</option>
          <option value="6">6 Days (Shimla Manali Combined)</option>
          <option value="7">7+ Days (Extended Road Trips)</option>
        </select>
      </div>

      {/* Sort Option */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sort By</label>
        <select
          value={filters.sort || ''}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
        >
          <option value="">Recommended & Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Highest Rated / Popular</option>
          <option value="duration_asc">Duration: Shortest First</option>
        </select>
      </div>
    </div>
  );
};

export default TourFilterForm;
