import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Calendar, User, Phone, Mail, MapPin, Users, ShieldCheck, Check } from 'lucide-react';
import api from '../../api/axios';

const BookingForm = ({ defaultPackage = '', defaultDestination = 'Manali', tourId = null, startingPrice = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: defaultDestination || 'Manali',
    tourPackage: defaultPackage || 'Manali Deluxe 5 Days Tour',
    tourId: tourId || null,
    serviceType: 'Tour Package',
    travelDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    adults: 2,
    children: 0,
    pickupLocation: 'Chandigarh',
    dropLocation: 'Chandigarh',
    customMessage: '',
    estimatedBudget: startingPrice ? startingPrice * 2 : 24998,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'adults' && startingPrice) {
        updated.estimatedBudget = Number(value) * startingPrice;
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.travelDate) {
      setError('Please fill in all mandatory fields (Name, Phone, Travel Date).');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/bookings', formData);
      if (res.data.success) {
        navigate(`/booking-confirmation?code=${res.data.data.bookingId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking. Please call our 24/7 helpline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-premium">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-xl font-bold text-slate-900 font-display">Book Your Holiday Package</h3>
        <p className="text-xs text-slate-500 mt-1">
          Lock in special promotional rates with zero cancellation fee up to 10 days before travel.
        </p>
      </div>

      {error && (
        <div className="p-3.5 mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Customer Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Rajesh Kumar"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone / WhatsApp Number *</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98051 43007"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        {/* Email & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="rajesh@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Travel Date *</label>
            <div className="relative">
              <input
                type="date"
                name="travelDate"
                required
                value={formData.travelDate}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        {/* Destination & Package */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Selected Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pickup Location</label>
            <select
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
            >
              <option value="Amb Andaura Railway Station (AADR - Vande Bharat)">Amb Andaura Railway Station (AADR - Vande Bharat)</option>
              <option value="Maa Baglamukhi Temple Bankhandi Kangra">Maa Baglamukhi Temple (Bankhandi Kangra)</option>
              <option value="Chandigarh Airport (IXC)">Chandigarh Airport (IXC)</option>
              <option value="Chandigarh Railway Station">Chandigarh Railway Station</option>
              <option value="Delhi IGI Airport">Delhi IGI Airport (DEL)</option>
              <option value="Una Himachal Station">Una Himachal Station (UHL)</option>
              <option value="Kalka Railway Station">Kalka Railway Station</option>
              <option value="Amritsar Airport / Station">Amritsar Airport / Station</option>
              <option value="Doorstep Pickup (Mohali / Panchkula / Zirakpur)">Doorstep Pickup (Mohali / Panchkula / Zirakpur)</option>
            </select>
          </div>
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Adults (12+ Years)</label>
            <div className="relative">
              <input
                type="number"
                name="adults"
                min="1"
                max="50"
                value={formData.adults}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Children (Below 12)</label>
            <input
              type="number"
              name="children"
              min="0"
              max="20"
              value={formData.children}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Customization Requests & Notes
          </label>
          <textarea
            name="customMessage"
            rows="3"
            placeholder="e.g. Honeymoon suite with balcony, pure veg meals, Innova Crysta required, senior citizen support..."
            value={formData.customMessage}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Trust features */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1.5" />
            No advance credit card needed
          </span>
          <span className="font-semibold text-brand-700">Instant SMS & WhatsApp Confirmation</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-brand-600 via-brand-500 to-cyanAccent-500 hover:from-brand-700 hover:to-cyanAccent-600 rounded-xl shadow-md shadow-brand-500/25 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-75"
        >
          {loading ? (
            <span>Processing Booking...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Confirm Booking & Receive Travel Voucher</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
