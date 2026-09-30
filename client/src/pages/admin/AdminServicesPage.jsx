import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiPlus, FiEdit2, FiTrash2, FiTruck, FiUsers, FiDollarSign, FiX, FiCheck, FiZap, FiImage } from 'react-icons/fi';
import ImageUploadInput from '../../components/common/ImageUploadInput';
import { DEFAULT_CABS } from '../../data/initialData';
import { syncDatabaseInventory } from '../../utils/seedHelper';

const VEHICLE_PRESETS = [
  {
    name: 'Force Cruiser & Trax Toofan 4×4',
    category: 'cab-rental',
    vehicleType: 'Heavy Duty Mountain 4x4 (9-13 Seater)',
    capacity: '9 to 13 Passengers',
    luggageCapacity: 'Heavy Rooftop Carrier + Boot',
    pricePerKm: 18,
    baseFare: 4500,
    image: '/images/cabs/force-cruiser-4x4.jpg',
    features: 'High Ground Clearance (210mm), Heavy Duty 4WD Mountain Power, Metal Body Durability, Expert Pahadi Driver',
    popularRoutes: 'Maa Baglamukhi & Kangra Shaktipeeths, Spiti Valley Rough Roads, Kinnaur Valley Circuit',
    shortDescription: 'Rugged 9-13 seater Force Mountain Cruisers with 4x4 traction and heavy-duty suspension built for tough Himachal pilgrimage routes and valleys.'
  },
  {
    name: 'Force Tempo Traveller (12 Seater Luxury Maharaja)',
    category: 'tempo-traveller',
    vehicleType: 'Luxury Tourist Tempo (12 Seater + Driver)',
    capacity: '12 Passengers + 1 Driver',
    luggageCapacity: 'Spacious Rear Boot + Heavy Roof Carrier',
    pricePerKm: 24,
    baseFare: 6500,
    image: '/images/cabs/force-tempo-traveller-12.jpg',
    features: '2x1 Maharaja Reclining Seats, Individual AC Vents & USB Ports, LED TV & Music System, Air Suspension Comfort',
    popularRoutes: 'Chandigarh to 9 Devi Darshan Yatra, Chandigarh to Manali Group Tour, Delhi to Shimla Manali',
    shortDescription: 'Premium 12-seater Maharaja Tempo Traveller with 2x1 pushback seats, individual AC vents, and heavy luggage carrier for comfortable group travel.'
  },
  {
    name: 'Force Tempo Traveller (17 Seater Hill Specialist)',
    category: 'tempo-traveller',
    vehicleType: 'Group Tourist Tempo (17 Seater + Driver)',
    capacity: '17 Passengers + 1 Driver',
    luggageCapacity: 'Extra Heavy Rooftop Carrier',
    pricePerKm: 28,
    baseFare: 7500,
    image: '/images/cabs/force-tempo-traveller-17.jpg',
    features: '2x2 Reclining Pushback Seats, Individual AC Outlets, Curtains & Ambient Lighting, Wide Center Aisle',
    popularRoutes: 'Chandigarh to Himachal Temple Circuit, Chandigarh to Amritsar & Manali, Delhi to Dharamshala Dalhousie',
    shortDescription: 'Spacious 17-seater Tempo Traveller designed for large family groups, pilgrimage yatras, and corporate outings in Himachal.'
  },
  {
    name: 'Tata Sumo Gold & Spacio 4×4',
    category: 'cab-rental',
    vehicleType: 'Rugged Hill Taxi (7+1 / 9 Seater)',
    capacity: '7 to 9 Passengers',
    luggageCapacity: 'Rooftop Carrier & Rear Space',
    pricePerKm: 15,
    baseFare: 3500,
    image: '/images/cabs/tata-sumo-gold.jpg',
    features: 'CR4 High-Torque Engine, Rugged Hill Suspension, High Clearance for Mountain Roads, Pahadi Expert Chauffeur',
    popularRoutes: 'Chandigarh to Baglamukhi Kangra, Shimla to Kinnaur Spiti, Pathankot to Chamba & Dalhousie',
    shortDescription: 'The undisputed rugged workhorse of Himachal hill roads. Reliable power and high ground clearance for temple yatras and valley tours.'
  },
  {
    name: 'Toyota Innova Crysta (Luxury Mountain SUV)',
    category: 'cab-rental',
    vehicleType: 'Luxury Tourist SUV (6+1 / 7+1 Seater)',
    capacity: '6+1 / 7+1 Passengers',
    luggageCapacity: '4 Large Bags + Heavy Roof Carrier',
    pricePerKm: 18,
    baseFare: 4800,
    image: '/images/cabs/toyota-innova-crysta.jpg',
    features: 'Dual AC with Rear Roof Vents, Captain Reclining Seats, Superior Hill Suspension, Hill Certified Chauffeur',
    popularRoutes: 'Chandigarh to Manali, Chandigarh to Shimla, Maa Baglamukhi 9 Devi Yatra, Delhi to Himachal',
    shortDescription: 'The gold standard for family vacations and mountain road trips in Himachal. Premium comfort, extra legroom, and effortless power.'
  },
  {
    name: 'Maruti Suzuki Ertiga Smart Hybrid',
    category: 'cab-rental',
    vehicleType: '6-Seater Family MUV',
    capacity: '6 Passengers + 1 Driver',
    luggageCapacity: '3 Bags + Roof Carrier',
    pricePerKm: 14,
    baseFare: 3400,
    image: '/images/cabs/maruti-ertiga.jpg',
    features: 'Smart Hybrid Petrol Engine, Dual AC, Comfortable 3-Row Seating, Rooftop Luggage Rack',
    popularRoutes: 'Chandigarh to Dharamshala, Chandigarh to Shimla, Una to Kangra Temples',
    shortDescription: 'Economical and spacious 6-seater family taxi for temple tours and mountain station vacations.'
  },
  {
    name: 'Maruti Suzuki Swift Dzire Sedan',
    category: 'cab-rental',
    vehicleType: 'Executive Hill Sedan (4+1 Seater)',
    capacity: '4 Passengers + 1 Driver',
    luggageCapacity: '2 Large + 2 Small Bags',
    pricePerKm: 11,
    baseFare: 2500,
    image: '/images/cabs/swift-dzire.jpg',
    features: 'Chilled AC, Music System, Neat & Clean Cabin, Experienced Hill Driver',
    popularRoutes: 'Chandigarh Airport Pickup, Chandigarh to Shimla, Una to Baglamukhi Temple',
    shortDescription: 'Comfortable and affordable 4-passenger AC sedan for couple tours, airport transfers, and temple yatras.'
  },
  {
    name: 'Mahindra Thar 4×4 Adventure SUV',
    category: 'cab-rental',
    vehicleType: '4x4 Mountain Off-Roader',
    capacity: '4 Passengers',
    luggageCapacity: '2 Soft Bags',
    pricePerKm: 22,
    baseFare: 5500,
    image: '/images/cabs/mahindra-thar-4x4.jpg',
    features: 'High 4x4 Traction Low Ratio, 226mm Ground Clearance, Convertible Hardtop, Snow Specialist',
    popularRoutes: 'Manali to Atal Tunnel & Sissu, Spiti Winter Snow Drive, Rohtang Pass Excursion',
    shortDescription: 'Iconic 4x4 off-roader for high-altitude mountain passes, winter snow excursions, and photography trips.'
  }
];

const AdminServicesPage = () => {
  const [services, setServices] = useState(DEFAULT_CABS);
  const [loading, setLoading] = useState(false);
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
    image: '/images/cabs/force-cruiser-4x4.jpg',
    features: 'High Ground Clearance, 4WD Mountain Power, Dual AC, Clean Interiors, Hill Expert Chauffeur',
    popularRoutes: 'Chandigarh to Manali, Maa Baglamukhi Temple, Shimla, Dharamshala',
    isActive: true
  });

  const [seeding, setSeeding] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services/admin/all');
      if (res.data?.success && Array.isArray(res.data?.data) && res.data.data.length > 0) {
        setServices(res.data.data);
      } else {
        const publicRes = await api.get('/services');
        if (publicRes.data?.success && Array.isArray(publicRes.data?.data) && publicRes.data.data.length > 0) {
          setServices(publicRes.data.data);
        } else {
          setServices(DEFAULT_CABS);
        }
      }
    } catch (err) {
      try {
        const fallbackRes = await api.get('/services');
        if (fallbackRes.data?.success && Array.isArray(fallbackRes.data?.data) && fallbackRes.data.data.length > 0) {
          setServices(fallbackRes.data.data);
          return;
        }
      } catch (e) {}
      setServices(DEFAULT_CABS);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedServices = async () => {
    setSeeding(true);
    try {
      await syncDatabaseInventory('services');
      await fetchServices();
    } catch (err) {
      alert('Seeding notice: ' + (err.response?.data?.message || err.message));
    } finally {
      setSeeding(false);
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
        pricePerKm: service.pricePerKm || 14,
        baseFare: service.baseFare || 2500,
        shortDescription: service.shortDescription || '',
        fullDescription: service.fullDescription || '',
        image: service.image || '/images/cabs/force-cruiser-4x4.jpg',
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
        vehicleType: 'Heavy Duty Mountain 4x4 (9-13 Seater)',
        capacity: '9 to 13 Passengers',
        luggageCapacity: 'Heavy Rooftop Carrier + Boot',
        pricePerKm: 18,
        baseFare: 4500,
        shortDescription: 'Rugged Himachali tourist cab with experienced mountain driver for temple darshan and holiday tours.',
        fullDescription: '',
        image: '/images/cabs/force-cruiser-4x4.jpg',
        features: 'High Ground Clearance, Heavy Duty Mountain Power, Fastag Equipped, Expert Pahadi Chauffeur',
        popularRoutes: 'Maa Baglamukhi Kangra, Chandigarh to Manali, Shimla, Dharamshala',
        isActive: true
      });
    }
    setModalOpen(true);
  };

  const handleSelectPreset = (preset) => {
    const slug = preset.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData(prev => ({
      ...prev,
      title: preset.name,
      slug: slug,
      category: preset.category,
      vehicleType: preset.vehicleType,
      capacity: preset.capacity,
      luggageCapacity: preset.luggageCapacity,
      pricePerKm: preset.pricePerKm,
      baseFare: preset.baseFare,
      image: preset.image,
      features: preset.features,
      popularRoutes: preset.popularRoutes,
      shortDescription: preset.shortDescription
    }));
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
        pricePerKm: Number(formData.pricePerKm) || 14,
        baseFare: Number(formData.baseFare) || 2500,
        image: formData.image || '/images/cabs/force-cruiser-4x4.jpg',
        featuredImage: {
          url: formData.image || '/images/cabs/force-cruiser-4x4.jpg',
          alt: formData.title || 'Cab',
        },
        features: typeof formData.features === 'string' ? formData.features.split(',').map(f => f.trim()).filter(Boolean) : formData.features,
        popularRoutes: typeof formData.popularRoutes === 'string' ? formData.popularRoutes.split(',').map(r => r.trim()).filter(Boolean) : formData.popularRoutes,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
        isPublished: formData.isActive !== undefined ? formData.isActive : true,
      };

      if (editingId && editingId.match(/^[0-9a-fA-F]{24}$/)) {
        await api.put(`/services/${editingId}`, payload);
      } else {
        await api.post('/services', payload);
      }

      setModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error('Error saving cab:', err);
      alert(err.response?.data?.message || err.message || 'Error saving cab service.');
      setModalOpen(false);
      fetchServices();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transport service?')) return;
    try {
      if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
        await api.delete(`/services/${id}`);
      }
      setServices(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      setServices(prev => prev.filter(s => s._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Cabs & Fleet Management</h1>
          <p className="text-xs text-slate-500">Add, edit rates, vehicle capacities, and photos for Himachali taxis & tempo travellers</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-brand-600/20 transition-all"
          >
            <FiPlus className="w-4 h-4" />
            <span>+ Add New Cab / Vehicle</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Loading fleet inventory...</div>
      ) : services.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-4">
          <p className="text-slate-500 font-medium text-xs">No transport services registered yet.</p>
          <button
            onClick={handleSeedServices}
            disabled={seeding}
            className="px-4 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition shadow-sm inline-flex items-center"
          >
            {seeding ? 'Populating Data...' : '⚡ Auto-Populate Himachali Fleet (Cruiser, Tempo, Innova, Sumo)'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(srv => (
            <div key={srv._id || srv.slug} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="h-44 w-full relative bg-slate-100">
                  <img
                    src={srv.image || '/images/cabs/force-cruiser-4x4.jpg'}
                    alt={srv.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/images/cabs/force-cruiser-4x4.jpg'; }}
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-amber-400 px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize">
                    {srv.category?.replace('-', ' ')}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">{srv.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <FiUsers className="text-brand-600" /> {srv.capacity}
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      ₹{srv.pricePerKm || 14}/km
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">{srv.shortDescription}</p>

                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(srv.features) ? srv.features : srv.features?.split(','))?.slice(0, 3).map((f, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {typeof f === 'string' ? f.trim() : f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${srv.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                  {srv.isActive ? 'Active Fleet' : 'Inactive'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(srv)}
                    className="p-2 text-slate-600 hover:text-brand-600 hover:bg-white rounded-xl border border-slate-200 transition"
                    title="Edit Cab Details"
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv._id)}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-white rounded-xl border border-slate-200 transition"
                    title="Delete Vehicle"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Adding & Editing Vehicles */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  {editingId ? 'Edit Vehicle / Cab' : 'Add New Himachali Cab / Vehicle'}
                </h2>
                <p className="text-xs text-slate-500">Configure vehicle specifications, mountain features, and rates</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets Selection */}
            {!editingId && (
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <FiZap className="w-4 h-4 text-amber-700" />
                  <span>Quick Autofill from Himachali Vehicle Presets:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {VEHICLE_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-amber-300 hover:bg-amber-100 rounded-lg text-amber-950 transition shadow-xs"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Vehicle Name / Model *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Force Cruiser 4x4 or Toyota Innova Crysta"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Vehicle Type</label>
                  <input
                    type="text"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    placeholder="e.g. Heavy Duty Mountain 4x4"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="cab-rental">Himachal Cab & Taxi Rental</option>
                    <option value="tempo-traveller">Tempo Traveller Rental (12S / 17S)</option>
                    <option value="airport-transfer">Airport / Station Transfers</option>
                    <option value="luxury-cars">Luxury & 4x4 Mountain SUVs</option>
                    <option value="bus-rental">Bus & Mini Coach Rental</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Seating Capacity</label>
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g. 6+1 Seater / 9 to 13 Seater"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Luggage Capacity</label>
                  <input
                    type="text"
                    name="luggageCapacity"
                    value={formData.luggageCapacity}
                    onChange={handleChange}
                    placeholder="e.g. 4 Large Bags + Heavy Roof Carrier"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Rate Per Km (₹)</label>
                  <input
                    type="number"
                    name="pricePerKm"
                    value={formData.pricePerKm}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Starting Base Fare (₹)</label>
                  <input
                    type="number"
                    name="baseFare"
                    value={formData.baseFare}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Vehicle Image</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="/images/cabs/force-cruiser-4x4.jpg or image URL"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>Presets:</span>
                      <button type="button" onClick={() => setFormData(p => ({ ...p, image: '/images/cabs/force-cruiser-4x4.jpg' }))} className="text-brand-600 underline">Cruiser</button>
                      <button type="button" onClick={() => setFormData(p => ({ ...p, image: '/images/cabs/force-tempo-traveller-12.jpg' }))} className="text-brand-600 underline">Tempo 12S</button>
                      <button type="button" onClick={() => setFormData(p => ({ ...p, image: '/images/cabs/force-tempo-traveller-17.jpg' }))} className="text-brand-600 underline">Tempo 17S</button>
                      <button type="button" onClick={() => setFormData(p => ({ ...p, image: '/images/cabs/toyota-innova-crysta.jpg' }))} className="text-brand-600 underline">Innova</button>
                      <button type="button" onClick={() => setFormData(p => ({ ...p, image: '/images/cabs/tata-sumo-gold.jpg' }))} className="text-brand-600 underline">Sumo</button>
                      <button type="button" onClick={() => setFormData(p => ({ ...p, image: '/images/cabs/maruti-ertiga.jpg' }))} className="text-brand-600 underline">Ertiga</button>
                      <button type="button" onClick={() => setFormData(p => ({ ...p, image: '/images/cabs/swift-dzire.jpg' }))} className="text-brand-600 underline">Dzire</button>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Key Mountain Features (Comma-separated)</label>
                  <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    placeholder="High Ground Clearance, Heavy Duty 4WD, AC, Luggage Carrier"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Popular Mountain Routes (Comma-separated)</label>
                  <input
                    type="text"
                    name="popularRoutes"
                    value={formData.popularRoutes}
                    onChange={handleChange}
                    placeholder="Maa Baglamukhi Kangra, Chandigarh to Manali, Shimla, Spiti Valley"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Short Description</label>
                  <textarea
                    name="shortDescription"
                    rows="2"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2 md:col-span-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <label htmlFor="isActive" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Fleet Vehicle Active & Bookable on Website
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 shadow-md shadow-brand-600/20"
                >
                  {editingId ? 'Update Vehicle' : 'Add Vehicle to Fleet'}
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
