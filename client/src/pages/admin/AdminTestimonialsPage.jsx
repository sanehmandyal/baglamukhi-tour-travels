import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiUser, FiMapPin, FiX } from 'react-icons/fi';

const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    tourTaken: '',
    reviewText: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isApproved: true,
    isFeatured: true
  });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.get('/testimonials');
      if (res.data?.success) {
        setTestimonials(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({
        name: item.name || '',
        location: item.location || '',
        rating: item.rating || 5,
        tourTaken: item.tourTaken || '',
        reviewText: item.reviewText || '',
        avatar: item.avatar || '',
        isApproved: item.isApproved !== undefined ? item.isApproved : true,
        isFeatured: item.isFeatured || false
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        location: '',
        rating: 5,
        tourTaken: '',
        reviewText: '',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        isApproved: true,
        isFeatured: true
      });
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        rating: Number(formData.rating)
      };

      if (editingId) {
        await api.put(`/testimonials/${editingId}`, payload);
      } else {
        await api.post('/testimonials', payload);
      }

      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving review');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer review?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer Testimonials & Reviews</h1>
          <p className="text-sm text-slate-500">Manage real customer feedback, ratings, and featured homepage social proof</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-cyan-600/20 transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading reviews...</div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">No customer reviews found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(rev => (
            <div key={rev._id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <FiMapPin className="w-3 h-3 text-cyan-600" /> {rev.location || 'India'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <FiStar key={i} className="fill-amber-400 w-3.5 h-3.5" />
                    ))}
                  </div>
                </div>

                {rev.tourTaken && (
                  <div className="inline-block bg-cyan-50 text-cyan-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                    Tour: {rev.tourTaken}
                  </div>
                )}

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${rev.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {rev.isApproved ? 'Approved' : 'Pending'}
                  </span>
                  {rev.isFeatured && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(rev)}
                    className="p-1.5 text-slate-600 hover:text-cyan-600 hover:bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev._id)}
                    className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Review' : 'Add New Review'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Rajesh & Sneha Sharma"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Customer City</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai, Delhi, Gujarat"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Star Rating (1 - 5)</label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Tour Package Booked</label>
                <input
                  type="text"
                  name="tourTaken"
                  value={formData.tourTaken}
                  onChange={handleChange}
                  placeholder="e.g. 5D/4N Shimla Kullu Manali Honeymoon Package"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Review Feedback *</label>
                <textarea
                  name="reviewText"
                  rows="3"
                  value={formData.reviewText}
                  onChange={handleChange}
                  required
                  placeholder="Detailed traveler feedback and trip experience..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
              </div>

              <div className="flex items-center space-x-6 pt-1">
                <label className="flex items-center space-x-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isApproved"
                    checked={formData.isApproved}
                    onChange={handleChange}
                    className="rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>Approved for Display</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>Featured on Home</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-600 text-white rounded-lg text-sm font-semibold hover:bg-cyan-700 shadow-md shadow-cyan-600/20"
                >
                  {editingId ? 'Update Review' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonialsPage;
