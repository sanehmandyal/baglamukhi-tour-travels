import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Compass, CheckCircle } from 'lucide-react';
import api from '../../api/axios';

const AdminTourEditPage = () => {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    destination: 'Manali',
    category: 'Family',
    duration: { days: 5, nights: 4, label: '5 Days / 4 Nights' },
    price: { startingPrice: 12499, discountedPrice: 15999, currency: 'INR' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      alt: 'Manali snow mountains',
    },
    overview: '',
    highlights: ['Dedicated private cab with mountain driver', '3 Star deluxe hotel stays with breakfast & dinner'],
    inclusions: ['Hotel stays', 'Breakfast & Dinner', 'Private Cab for all transfers', 'Toll taxes and parking'],
    exclusions: ['Airfare / Train tickets', 'Adventure sport tickets', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrival & Scenic Mountain Drive', description: 'Pickup from Chandigarh, scenic highway drive and hotel check-in.', meals: 'Dinner', hotel: 'Deluxe Hotel' },
      { day: 2, title: 'Local Sightseeing Tour', description: 'Full day local temple & nature spots tour.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel' },
    ],
    hotelDetails: { hotelType: '3 Star Deluxe', stayDetails: 'Mountain view rooms with heater and hot water' },
    transportation: 'Dedicated Private AC Cab with expert mountain driver',
    cancellationPolicy: '100% refund up to 10 days before tour date.',
    isFeatured: true,
    isPopular: true,
    isPublished: true,
    seo: {
      metaTitle: '',
      metaDescription: '',
      focusKeyword: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      const fetchTour = async () => {
        setLoading(true);
        try {
          const res = await api.get('/tours/admin/all');
          if (res.data.success) {
            const found = res.data.data.find((t) => t._id === id);
            if (found) {
              setFormData(found);
            }
          }
        } catch (err) {
          setError('Failed to load tour details.');
        } finally {
          setLoading(false);
        }
      };
      fetchTour();
    }
  }, [id, isNew]);

  const handleAddItineraryDay = () => {
    const nextDay = (formData.itinerary?.length || 0) + 1;
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...(prev.itinerary || []),
        { day: nextDay, title: `Day ${nextDay} Sightseeing & Tour`, description: 'Sightseeing description...', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel' },
      ],
    }));
  };

  const handleRemoveItineraryDay = (index) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];
      updated[index][field] = value;
      return { ...prev, itinerary: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.destination) {
      setError('Title and Destination are required.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (isNew) {
        await api.post('/tours', formData);
      } else {
        await api.put(`/tours/${id}`, formData);
      }
      navigate('/admin/tours');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving tour package.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xs text-slate-500">Loading tour data...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/tours"
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-display">
              {isNew ? 'Create New Tour Package' : `Edit: ${formData.title}`}
            </h1>
            <p className="text-xs text-slate-500">Configure itinerary, pricing, media, and SEO metadata</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition flex items-center space-x-1.5 shadow-sm disabled:opacity-75"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Tour Package'}</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-xs sm:text-sm text-slate-700">
        {/* Basic Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">1. Basic Tour Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tour Package Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="e.g. Manali Deluxe 5 Days Holiday Tour Package"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Destination *</label>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="Manali"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
              >
                <option value="Family">Family</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Adventure">Adventure</option>
                <option value="Pilgrimage">Pilgrimage</option>
                <option value="Weekend">Weekend</option>
                <option value="Group">Group</option>
                <option value="Customized">Customized</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Days</label>
              <input
                type="number"
                min="1"
                value={formData.duration?.days || 5}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: { ...formData.duration, days: Number(e.target.value), label: `${e.target.value} Days / ${formData.duration?.nights || 4} Nights` },
                  })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nights</label>
              <input
                type="number"
                min="0"
                value={formData.duration?.nights || 4}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: { ...formData.duration, nights: Number(e.target.value), label: `${formData.duration?.days || 5} Days / ${e.target.value} Nights` },
                  })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Starting Price (INR) *</label>
              <input
                type="number"
                required
                value={formData.price?.startingPrice || 12499}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: { ...formData.price, startingPrice: Number(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-brand-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Featured Image URL *</label>
            <input
              type="text"
              required
              value={formData.featuredImage?.url || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  featuredImage: { ...formData.featuredImage, url: e.target.value, alt: formData.title },
                })
              }
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Tour Overview *</label>
            <textarea
              rows="4"
              required
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              placeholder="Detailed overview of the tour package experience..."
            ></textarea>
          </div>
        </div>

        {/* Day-by-Day Itinerary Builder */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display">2. Day-by-Day Itinerary Builder</h3>
            <button
              type="button"
              onClick={handleAddItineraryDay}
              className="px-3 py-1.5 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg flex items-center transition"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Day
            </button>
          </div>

          <div className="space-y-4">
            {formData.itinerary?.map((dayPlan, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs bg-brand-600 text-white px-2 py-0.5 rounded">
                    Day {dayPlan.day}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItineraryDay(idx)}
                    className="text-rose-500 hover:text-rose-700 text-xs flex items-center"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Day title (e.g. Chandigarh to Manali Drive)"
                    value={dayPlan.title}
                    onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Meals (e.g. Breakfast, Dinner)"
                    value={dayPlan.meals}
                    onChange={(e) => handleItineraryChange(idx, 'meals', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                  />
                </div>

                <textarea
                  rows="2"
                  placeholder="Day itinerary description..."
                  value={dayPlan.description}
                  onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                ></textarea>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Meta Config */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">3. Search Engine Optimization (SEO)</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">SEO Meta Title</label>
              <input
                type="text"
                value={formData.seo?.metaTitle || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaTitle: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
                placeholder="e.g. 5 Days Manali Tour Package from Chandigarh | Best Rates"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">SEO Meta Description</label>
              <textarea
                rows="2"
                value={formData.seo?.metaDescription || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaDescription: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
                placeholder="Meta description for Google search snippet (recommended 140-160 characters)"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Publish checkboxes */}
        <div className="flex items-center space-x-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded"
            />
            <span>Published on Website</span>
          </label>

          <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded"
            />
            <span>Featured Package on Homepage</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default AdminTourEditPage;
