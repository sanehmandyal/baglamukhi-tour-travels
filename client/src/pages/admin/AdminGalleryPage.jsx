import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiPlus, FiTrash2, FiImage, FiX } from 'react-icons/fi';

const AdminGalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Manali',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    altText: 'Scenic mountains in Himachal Pradesh'
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get('/gallery');
      if (res.data?.success) {
        setGallery(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/gallery', formData);
      setModalOpen(false);
      setFormData({
        title: '',
        category: 'Manali',
        imageUrl: '',
        altText: ''
      });
      fetchGallery();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving photo to gallery');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo from gallery?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (err) {
      alert('Failed to delete photo');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Photo Gallery & Media Assets</h1>
          <p className="text-sm text-slate-500">Manage high-resolution destination photos, fleet showcase, and guest moments</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-cyan-600/20 transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading gallery photos...</div>
      ) : gallery.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">No gallery photos added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map(item => (
            <div key={item._id} className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm aspect-4/3">
              <img
                src={item.imageUrl}
                alt={item.altText || item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 bg-rose-600 text-white rounded-lg shadow-md hover:bg-rose-700 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">{item.category}</span>
                  <h4 className="text-white text-xs font-bold truncate">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Add Photo to Gallery</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Rohtang Pass Snow Valley"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Destination Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Manali, Shimla, Dharamshala, Spiti"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">SEO Image Alt Text *</label>
                <input
                  type="text"
                  name="altText"
                  value={formData.altText}
                  onChange={handleChange}
                  placeholder="Descriptive keyword alt text for Google Image Search"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                />
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
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGalleryPage;
