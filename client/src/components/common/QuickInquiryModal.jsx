import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, Phone, Calendar, User, Mail, MapPin, Sparkles } from 'lucide-react';
import api from '../../api/axios';

const QuickInquiryModal = ({ isOpen, onClose, initialPackage = '' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: initialPackage || 'Maa Baglamukhi / Himachal',
    tourPackage: initialPackage || 'Maa Baglamukhi Darshan & Himachal Tour',
    travelDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    adults: 2,
    children: 0,
    pickupLocation: 'Chandigarh',
    customMessage: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/bookings', formData);
      if (res.data.success) {
        onClose();
        navigate(`/booking-confirmation?code=${res.data.data.bookingId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit inquiry. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-neutral-800 max-w-lg w-full overflow-hidden relative">
        {/* Black & Gold Luxury Header */}
        <div className="bg-neutral-950 px-6 py-5 text-white flex justify-between items-center border-b border-neutral-800">
          <div>
            <h3 className="text-lg font-black font-display text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Get a Free Instant Tour Quote
            </h3>
            <p className="text-xs text-yellow-400/90 mt-0.5">Maa Baglamukhi Darshan, Himachal Tours & Cab Dispatch</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">Your Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <User className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">Phone / WhatsApp Number *</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="+91 98000 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">Travel Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <Calendar className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">Adults</label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">Children</label>
              <input
                type="number"
                min="0"
                max="20"
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-neutral-800 mb-1">Pickup City</label>
              <input
                type="text"
                placeholder="Chandigarh / Delhi"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1">Tour Package / Requirements</label>
            <textarea
              rows="2"
              placeholder="e.g. Need Innova cab for 5 days Shimla Manali & Maa Baglamukhi temple darshan..."
              value={formData.customMessage}
              onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-neutral-950 font-black rounded-xl shadow-lg shadow-yellow-500/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-neutral-950" />
            <span>{loading ? 'Submitting Inquiry...' : 'Get Instant Custom Quote'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickInquiryModal;
