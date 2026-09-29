import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, MapPin } from 'lucide-react';
import api from '../../api/axios';
import { syncDatabaseInventory } from '../../utils/seedHelper';

const AdminDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [seeding, setSeeding] = useState(false);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/destinations/admin/all');
      if (res.data.success) {
        setDestinations(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDestinations = async () => {
    setSeeding(true);
    try {
      await syncDatabaseInventory('destinations');
      await fetchDestinations();
    } catch (err) {
      alert('Seeding notice: ' + (err.response?.data?.message || err.message));
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete destination "${name}"?`)) {
      try {
        await api.delete(`/destinations/${id}`);
        fetchDestinations();
      } catch (err) {
        alert('Failed to delete destination.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Destinations Management</h1>
          <p className="text-xs text-slate-500">Manage destination guides, attractions, and SEO data</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSeedDestinations}
            disabled={seeding}
            className="px-3.5 py-2.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition flex items-center shadow-sm disabled:opacity-50"
          >
            {seeding ? 'Populating...' : '⚡ Seed Destinations'}
          </button>
          <Link
            to="/admin/destinations/new"
            className="px-4 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition flex items-center shadow-sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Destination
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading destinations...</div>
        ) : destinations.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <p className="text-slate-500 text-xs">No destinations found in database.</p>
            <button
              onClick={handleSeedDestinations}
              disabled={seeding}
              className="px-4 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition shadow-sm inline-flex items-center"
            >
              {seeding ? 'Populating Data...' : '⚡ Auto-Populate Himachal Destinations'}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-3 px-4">Destination Name</th>
                  <th className="py-3 px-3">State</th>
                  <th className="py-3 px-3">Best Time</th>
                  <th className="py-3 px-3">Attractions Count</th>
                  <th className="py-3 px-3">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {destinations.map((d) => (
                  <tr key={d._id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center space-x-2">
                        <img src={d.heroImage?.url} alt={d.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span>{d.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">{d.state}</td>
                    <td className="py-3 px-3 max-w-xs truncate">{d.bestTimeToVisit}</td>
                    <td className="py-3 px-3 font-semibold">{d.placesToVisit?.length || 0} Places</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${d.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                        {d.isFeatured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link to={`/destinations/${d.slug}`} target="_blank" className="p-1.5 text-slate-500 hover:text-brand-600">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link to={`/admin/destinations/edit/${d._id}`} className="p-1.5 text-slate-500 hover:text-brand-600">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(d._id, d.name)} className="p-1.5 text-slate-500 hover:text-rose-600">
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

export default AdminDestinationsPage;
