import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import api from '../../api/axios';

const AdminLocationEditPage = () => {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cityName: '',
    state: 'Punjab / Chandigarh UT',
    slug: '',
    title: '',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
      alt: 'Local travel agency office',
    },
    shortIntro: '',
    fullDescription: '',
    localOfficeDetails: {
      address: '',
      phone: '+91 98051 43007',
      whatsapp: '+919805143007',
      email: 'info@baglamukhitourtravels.com',
      operatingHours: '24 Hours / 7 Days a Week',
    },
    popularRoutes: [
      { destination: 'Manali', distance: '270 km', duration: '6.5 hrs', startingPrice: 4499 },
      { destination: 'Shimla', distance: '115 km', duration: '3.5 hrs', startingPrice: 2499 },
    ],
    isPublished: true,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      const fetchLocation = async () => {
        const res = await api.get('/locations/admin/all');
        if (res.data.success) {
          const found = res.data.data.find((l) => l._id === id);
          if (found) setFormData(found);
        }
      };
      fetchLocation();
    }
  }, [id, isNew]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isNew) {
        await api.post('/locations', formData);
      } else {
        await api.put(`/locations/${id}`, formData);
      }
      navigate('/admin/locations');
    } catch (err) {
      alert('Error saving location.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <Link to="/admin/locations" className="p-2 bg-white border border-slate-200 rounded-xl">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 font-display">
            {isNew ? 'Create Local SEO City Page' : `Edit: ${formData.cityName}`}
          </h1>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition flex items-center space-x-1.5 shadow"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save City Page'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">City Name *</label>
            <input
              type="text"
              required
              value={formData.cityName}
              onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              placeholder="e.g. Chandigarh"
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
          <label className="block text-xs font-semibold text-slate-700 mb-1">Page Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            placeholder="e.g. Best Tour & Travel Agency in Chandigarh | Cabs & Packages"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Short Introduction *</label>
          <textarea
            rows="2"
            required
            value={formData.shortIntro}
            onChange={(e) => setFormData({ ...formData, shortIntro: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Local Description *</label>
          <textarea
            rows="4"
            required
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl"
          ></textarea>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="font-bold text-slate-900">Local Office Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Address</label>
              <input
                type="text"
                value={formData.localOfficeDetails?.address || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    localOfficeDetails: { ...formData.localOfficeDetails, address: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
              <input
                type="text"
                value={formData.localOfficeDetails?.phone || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    localOfficeDetails: { ...formData.localOfficeDetails, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLocationEditPage;
