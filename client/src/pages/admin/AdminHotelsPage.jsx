import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiMapPin, FiCheck, FiX, FiSearch } from 'react-icons/fi';

const AdminHotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    destination: 'Manali',
    city: 'Manali',
    hotelType: 'Resort',
    starRating: 4,
    pricePerNight: 2800,
    discountPrice: 2200,
    address: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: 'Free WiFi, Mountain View, Restaurant, Heating, Free Parking',
    isPartner: true,
    isFeatured: true
  });

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await api.get('/hotels');
      if (res.data?.success) {
        setHotels(res.data.data);
      }
    } catch (err) {
      setError('Failed to fetch hotels list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleOpenModal = (hotel = null) => {
    if (hotel) {
      setEditingId(hotel._id);
      setFormData({
        name: hotel.name || '',
        slug: hotel.slug || '',
        destination: hotel.destination || 'Manali',
        city: hotel.city || 'Manali',
        hotelType: hotel.hotelType || 'Resort',
        starRating: hotel.starRating || 4,
        pricePerNight: hotel.pricePerNight || 2800,
        discountPrice: hotel.discountPrice || '',
        address: hotel.address || '',
        description: hotel.description || '',
        image: hotel.images?.[0] || hotel.image || '',
        amenities: Array.isArray(hotel.amenities) ? hotel.amenities.join(', ') : hotel.amenities || '',
        isPartner: hotel.isPartner !== undefined ? hotel.isPartner : true,
        isFeatured: hotel.isFeatured || false
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        slug: '',
        destination: 'Manali',
        city: 'Manali',
        hotelType: 'Resort',
        starRating: 4,
        pricePerNight: 2800,
        discountPrice: 2200,
        address: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        amenities: 'Free WiFi, Mountain View, Restaurant, Heating, Free Parking',
        isPartner: true,
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

    if (name === 'name' && !editingId) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        pricePerNight: Number(formData.pricePerNight),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
        starRating: Number(formData.starRating),
        images: [formData.image],
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
      };

      if (editingId) {
        await api.put(`/hotels/${editingId}`, payload);
      } else {
        await api.post('/hotels', payload);
      }

      setModalOpen(false);
      fetchHotels();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving hotel');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hotel partner?')) return;
    try {
      await api.delete(`/hotels/${id}`);
      fetchHotels();
    } catch (err) {
      alert('Failed to delete hotel');
    }
  };

  const filteredHotels = hotels.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hotel Partners & Stays</h1>
          <p className="text-sm text-slate-500">Manage verified resorts, luxury cottages, boutique stays and pilgrimage dharamshalas</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-cyan-600/20 transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Hotel</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
        <FiSearch className="text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by hotel name, location, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Table / Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading hotel partners...</div>
      ) : filteredHotels.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">No hotel stays found matching criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <div key={hotel._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative h-44 w-full">
                  <img
                    src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-amber-500 flex items-center gap-1 shadow-sm">
                    <FiStar className="fill-amber-400 text-amber-400 w-3.5 h-3.5" />
                    <span>{hotel.starRating} Star</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-medium text-white">
                    {hotel.hotelType || 'Resort'}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-slate-900 text-base">{hotel.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <FiMapPin className="text-cyan-600 w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{hotel.city || hotel.destination} - {hotel.address || 'Central'}</span>
                  </p>

                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-lg font-black text-cyan-700">₹{hotel.discountPrice || hotel.pricePerNight}</span>
                    {hotel.discountPrice && (
                      <span className="text-xs text-slate-400 line-through">₹{hotel.pricePerNight}</span>
                    )}
                    <span className="text-xs text-slate-500">/ night</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {hotel.amenities?.slice(0, 3).map((am, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {am}
                      </span>
                    ))}
                    {hotel.amenities?.length > 3 && (
                      <span className="text-[11px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                        +{hotel.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hotel.isPartner && (
                    <span className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                      Partner
                    </span>
                  )}
                  {hotel.isFeatured && (
                    <span className="text-[11px] bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(hotel)}
                    className="p-1.5 text-slate-600 hover:text-cyan-600 hover:bg-white rounded-lg border border-slate-200 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
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

      {/* Modal for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Hotel Stay' : 'Add New Hotel Stay'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Hotel Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Himalayan Apple Blossom Resort & Spa"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">URL Slug *</label>
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
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Destination City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Manali, Shimla, Dharamshala"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Accommodation Type</label>
                  <select
                    name="hotelType"
                    value={formData.hotelType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Resort">Luxury Resort</option>
                    <option value="Hotel">Deluxe Hotel</option>
                    <option value="Cottage">Mountain Cottage / Villa</option>
                    <option value="Homestay">Boutique Homestay</option>
                    <option value="Camp">Luxury Glamping / Camp</option>
                    <option value="Dharamshala">Pilgrimage Dharamshala / Ashrams</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Star Rating (1 - 5)</label>
                  <input
                    type="number"
                    name="starRating"
                    min="1"
                    max="5"
                    value={formData.starRating}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Regular Price / Night (₹) *</label>
                  <input
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Special Discounted Price (₹)</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Address / Landmark</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Left Bank, Aleo, Near Mall Road, Manali, HP"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Photo Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Amenities (Comma-separated)</label>
                  <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    placeholder="Free WiFi, Mountain View, Restaurant, Geyser, Parking"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Property highlights, room features, complimentary breakfast details..."
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-6 md:col-span-2 pt-2">
                  <label className="flex items-center space-x-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPartner"
                      checked={formData.isPartner}
                      onChange={handleChange}
                      className="rounded text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="font-medium">Verified Partner Hotel</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="rounded text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="font-medium">Featured on Stays Page</span>
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
                  {editingId ? 'Update Hotel' : 'Create Hotel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHotelsPage;
