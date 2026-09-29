import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Map } from 'lucide-react';
import api from '../../api/axios';

const AdminLocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/locations/admin/all');
      if (res.data.success) {
        setLocations(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete local city page for "${name}"?`)) {
      try {
        await api.delete(`/locations/${id}`);
        fetchLocations();
      } catch (err) {
        alert('Failed to delete location.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Local SEO City Pages</h1>
          <p className="text-xs text-slate-500">Manage localized city landing pages (Chandigarh, Mohali, Zirakpur, Panchkula, Una)</p>
        </div>

        <Link
          to="/admin/locations/new"
          className="px-4 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition flex items-center shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Local City Page
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading location pages...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-3 px-4">City Name</th>
                  <th className="py-3 px-3">State / Territory</th>
                  <th className="py-3 px-3">Slug / URL</th>
                  <th className="py-3 px-3">Local Phone</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {locations.map((loc) => (
                  <tr key={loc._id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">{loc.cityName}</td>
                    <td className="py-3 px-3">{loc.state}</td>
                    <td className="py-3 px-3 font-mono text-brand-600">/locations/{loc.slug}</td>
                    <td className="py-3 px-3">{loc.localOfficeDetails?.phone}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link to={`/locations/${loc.slug}`} target="_blank" className="p-1.5 text-slate-500 hover:text-brand-600">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link to={`/admin/locations/edit/${loc._id}`} className="p-1.5 text-slate-500 hover:text-brand-600">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(loc._id, loc.cityName)} className="p-1.5 text-slate-500 hover:text-rose-600">
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

export default AdminLocationsPage;
