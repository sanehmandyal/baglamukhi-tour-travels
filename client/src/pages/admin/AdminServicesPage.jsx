import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiPlus, FiEdit2, FiTrash2, FiTruck, FiUsers, FiDollarSign, FiX, FiCheck } from 'react-icons/fi';

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'cab-rental',
    vehicleType: 'Sedan / SUV',
    capacity: '4+1 Passengers',
    luggageCapacity: '3 Large Bags',
    pricePerKm: 12,
    baseFare: 2500,
    shortDescription: '',
    fullDescription: '',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    features: 'AC, Experienced Chauffeur, Clean & Sanitized, GPS Enabled, Luggage Carrier',
    popularRoutes: 'Chandigarh to Shimla, Delhi to Manali, Chandigarh to Dharamshala',
    isActive: true
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services');
      if (res.data?.success) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingId(service._id);
      setFormData({
        title: service.title || '',
        slug: service.slug || '',
        category: service.category || 'cab-rental',
        vehicleType: service.vehicleType || 'Sedan / SUV',
        capacity: service.capacity || '4+1 Passengers',
        luggageCapacity: service.luggageCapacity || '3 Large Bags',
        pricePerKm: service.pricePerKm || 12,
        baseFare: service.baseFare || 2500,
        shortDescription: service.shortDescription || '',
        fullDescription: service.fullDescription || '',
        image: service.image || '',
        features: Array.isArray(service.features) ? service.features.join(', ') : service.features || '',
        popularRoutes: Array.isArray(service.popularRoutes) ? service.popularRoutes.join(', ') : service.popularRoutes || '',
        isActive: service.isActive !== undefined ? service.isActive : true
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        slug: '',
        category: 'cab-rental',
        vehicleType: 'Sedan / SUV',
        capacity: '4+1 Passengers',
        luggageCapacity: '3 Large Bags',
        pricePerKm: 12,
        baseFare: 2500,
        shortDescription: '',
        fullDescription: '',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
        features: 'AC, Experienced Chauffeur, Clean & Sanitized, GPS Enabled, Luggage Carrier',
        popularRoutes: 'Chandigarh to Shimla, Delhi to Manali, Chandigarh to Dharamshala',
        isActive: true
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

    if (name === 'title' && !editingId) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        pricePerKm: Number(formData.pricePerKm),
        baseFare: Number(formData.baseFare),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        popularRoutes: formData.popularRoutes.split(',').map(r => r.trim()).filter(Boolean)
      };

      if (editingId) {
        await api.put(`/services/${editingId}`, payload);
      } else {
        await api.post('/services', payload);
      }

      setModalOpen(false);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving vehicle service');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transport service?')) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert('Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transport & Fleet Services</h1>
          <p className="text-sm text-slate-500">Manage Cabs, Airport Taxi Transfers, Tempo Travellers, and Luxury Coaches</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-cyan-600/20 transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Vehicle / Service</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading transport services...</div>
      ) : services.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">No transport services registered yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(srv => (
            <div key={srv._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-44 w-full relative">
                  <img
                    src={srv.image || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'}
                    alt={srv.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-cyan-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-semibold capitalize">
                    {srv.category?.replace('-', ' ')}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">{srv.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                    <span className="flex items-center gap-1 font-medium">
                      <FiUsers className="text-cyan-600" /> {srv.capacity}
                    </span>
                    <span className="font-bold text-cyan-700">
                      ₹{srv.pricePerKm}/km
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">{srv.shortDescription}</p>

                  <div className="flex flex-wrap gap-1">
                    {srv.features?.slice(0, 3).map((f, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${srv.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                  {srv.isActive ? 'Active Fleet' : 'Inactive'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(srv)}
                    className="p-1.5 text-slate-600 hover:text-cyan-600 hover:bg-white rounded-lg border border-slate-200 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv._id)}
                    className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg border border-slate-200 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Vehicle / Service' : 'Add Vehicle / Service'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Service / Fleet Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Innova Crysta Himachal Taxi Service"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Service Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="cab-rental">Cab & Taxi Rental</option>
                    <option value="airport-transfer">Airport / Railway Station Transfers</option>
                    <option value="tempo-traveller">Tempo Traveller Rental</option>
                    <option value="bus-rental">Bus & Coach Rental</option>
                    <option value="luxury-cars">Luxury Car Rentals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Seating Capacity</label>
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g. 6+1 Seater"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Luggage Capacity</label>
                  <input
                    type="text"
                    name="luggageCapacity"
                    value={formData.luggageCapacity}
                    onChange={handleChange}
                    placeholder="e.g. 4 Large Bags + Rooftop Carrier"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Rate Per Km (₹)</label>
                  <input
                    type="number"
                    name="pricePerKm"
                    value={formData.pricePerKm}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Starting Base Fare (₹)</label>
                  <input
                    type="number"
                    name="baseFare"
                    value={formData.baseFare}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Vehicle Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Key Features (Comma-separated)</label>
                  <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    placeholder="Dual AC, Hill Certified Driver, Fastag Equipped, Pushback Seats"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Popular Routes (Comma-separated)</label>
                  <input
                    type="text"
                    name="popularRoutes"
                    value={formData.popularRoutes}
                    onChange={handleChange}
                    placeholder="Chandigarh to Manali, Delhi to Shimla, Chandigarh to Dharamshala"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Short Summary</label>
                  <textarea
                    name="shortDescription"
                    rows="2"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2 md:col-span-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-slate-700 cursor-pointer">
                    Fleet Service Active & Bookable
                  </label>
                </div>
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
                  {editingId ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicesPage;
