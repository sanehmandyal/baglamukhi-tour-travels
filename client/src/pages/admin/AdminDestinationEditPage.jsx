import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import api from '../../api/axios';

const AdminDestinationEditPage = () => {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    state: 'Himachal Pradesh',
    tagline: 'Scenic Hill Station',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
      alt: 'Destination view',
    },
    shortDescription: '',
    detailedOverview: '',
    bestTimeToVisit: 'October to June',
    idealTripDuration: '3 to 5 Days',
    nearestAirport: 'Chandigarh Airport',
    nearestRailwayStation: 'Chandigarh / Kalka',
    placesToVisit: [
      { name: 'Main Viewpoint / Sights', description: 'Scenic mountain viewpoints and adventure zones', timing: '8:00 AM - 6:00 PM' },
    ],
    isFeatured: true,
    isPublished: true,
    seo: {
      metaTitle: '',
      metaDescription: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      const fetchDest = async () => {
        setLoading(true);
        try {
          const res = await api.get('/destinations/admin/all');
          if (res.data.success) {
            const found = res.data.data.find((d) => d._id === id);
            if (found) setFormData(found);
          }
        } catch (err) {
          setError('Failed to fetch destination.');
        } finally {
          setLoading(false);
        }
      };
      fetchDest();
    }
  }, [id, isNew]);

  const handleAddPlace = () => {
    setFormData((prev) => ({
      ...prev,
      placesToVisit: [
        ...(prev.placesToVisit || []),
        { name: '', description: '', timing: '9:00 AM - 6:00 PM' },
      ],
    }));
  };

  const handleRemovePlace = (index) => {
    setFormData((prev) => ({
      ...prev,
      placesToVisit: prev.placesToVisit.filter((_, i) => i !== index),
    }));
  };

  const handlePlaceChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.placesToVisit];
      updated[index][field] = value;
      return { ...prev, placesToVisit: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (isNew) {
        await api.post('/destinations', formData);
      } else {
        await api.put(`/destinations/${id}`, formData);
      }
      navigate('/admin/destinations');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving destination.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-xs text-slate-500">Loading destination...</div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <Link to="/admin/destinations" className="p-2 bg-white border border-slate-200 rounded-xl">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 font-display">
            {isNew ? 'Add Destination Guide' : `Edit: ${formData.name}`}
          </h1>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition flex items-center space-x-1.5 shadow"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Destination'}</span>
        </button>
      </div>

      {error && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm text-slate-700">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">Destination Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                placeholder="e.g. Manali"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State / Region</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Image URL</label>
            <input
              type="text"
              value={formData.heroImage?.url || ''}
              onChange={(e) => setFormData({ ...formData, heroImage: { ...formData.heroImage, url: e.target.value, alt: formData.name } })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description *</label>
            <textarea
              rows="2"
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Overview *</label>
            <textarea
              rows="4"
              required
              value={formData.detailedOverview}
              onChange={(e) => setFormData({ ...formData, detailedOverview: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            ></textarea>
          </div>
        </div>

        {/* Places to Visit Builder */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display">Places to Visit in {formData.name || 'Destination'}</h3>
            <button
              type="button"
              onClick={handleAddPlace}
              className="px-3 py-1.5 text-xs font-bold text-brand-600 bg-brand-50 rounded-lg flex items-center"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Attraction
            </button>
          </div>

          <div className="space-y-3">
            {formData.placesToVisit?.map((place, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-slate-700">Attraction #{idx + 1}</span>
                  <button type="button" onClick={() => handleRemovePlace(idx)} className="text-rose-500 text-xs">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Place name (e.g. Solang Valley)"
                  value={place.name}
                  onChange={(e) => handlePlaceChange(idx, 'name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                />
                <textarea
                  rows="2"
                  placeholder="Description of attractions, activities..."
                  value={place.description}
                  onChange={(e) => handlePlaceChange(idx, 'description', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                ></textarea>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminDestinationEditPage;
