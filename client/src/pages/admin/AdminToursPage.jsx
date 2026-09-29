import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Compass, Search, Check, X } from 'lucide-react';
import api from '../../api/axios';

const AdminToursPage = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [seeding, setSeeding] = useState(false);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tours/admin/all');
      if (res.data.success) {
        setTours(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedTours = async () => {
    setSeeding(true);
    try {
      const res = await api.post('/seed');
      if (res.data.success) {
        await fetchTours();
      }
    } catch (err) {
      alert('Error initializing packages: ' + (err.response?.data?.message || err.message));
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete tour package: "${title}"?`)) {
      try {
        await api.delete(`/tours/${id}`);
        fetchTours();
      } catch (err) {
        alert('Failed to delete tour package.');
      }
    }
  };

  const filtered = tours.filter(
    (t) =>
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.destination?.toLowerCase().includes(search.toLowerCase()) ||
      t.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Tour Packages Management</h1>
          <p className="text-xs text-slate-500">Add, edit itineraries, customize inclusions, and manage pricing</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSeedTours}
            disabled={seeding}
            className="px-3.5 py-2.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition flex items-center shadow-sm disabled:opacity-50"
          >
            {seeding ? 'Populating...' : '⚡ Seed Default Packages'}
          </button>

          <Link
            to="/admin/tours/new"
            className="px-4 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition flex items-center shadow-sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create New Tour Package
          </Link>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
        <div className="relative max-w-sm">
          <input
            type="text"
            placeholder="Search tours by name, destination, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">Loading tours inventory...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <p className="text-slate-500 text-xs">No tour packages found in database.</p>
            <button
              onClick={handleSeedTours}
              disabled={seeding}
              className="px-4 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition shadow-sm inline-flex items-center"
            >
              {seeding ? 'Populating Data...' : '⚡ Auto-Populate Initial Himachal Tour Packages'}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-3 px-4">Tour Title</th>
                  <th className="py-3 px-3">Destination</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3">Starting Price</th>
                  <th className="py-3 px-3">Published</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((tour) => (
                  <tr key={tour._id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs">
                      <div className="flex items-center space-x-2">
                        <img
                          src={tour.featuredImage?.url}
                          alt={tour.title}
                          className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                        />
                        <span className="truncate">{tour.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">{tour.destination}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-slate-100 font-medium rounded text-[11px]">
                        {tour.category}
                      </span>
                    </td>
                    <td className="py-3 px-3">{tour.duration?.label}</td>
                    <td className="py-3 px-3 font-bold text-brand-700">
                      ₹{tour.price?.startingPrice?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      {tour.isPublished ? (
                        <span className="inline-flex items-center text-emerald-700 font-bold text-[11px]">
                          <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-slate-400 font-bold text-[11px]">
                          <X className="w-3.5 h-3.5 mr-1" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link
                          to={`/tours/${tour.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition"
                          title="View live page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/tours/edit/${tour._id}`}
                          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition"
                          title="Edit package"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(tour._id, tour.title)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition"
                          title="Delete package"
                        >
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

export default AdminToursPage;
