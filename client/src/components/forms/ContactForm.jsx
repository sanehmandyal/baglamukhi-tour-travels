import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, User, MessageSquare, MessageCircle } from 'lucide-react';
import api from '../../api/axios';
import { useSettings } from '../../context/SettingsContext';
import { getContactWhatsAppUrl } from '../../utils/whatsappHelper';

const ContactForm = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Tour Package Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDirectWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide at least your Name and Phone Number to connect on WhatsApp.');
      return;
    }
    const waUrl = getContactWhatsAppUrl(formData, settings?.whatsappNumber);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/contact', formData);
      if (res.data.success) {
        setSubmittedData({ ...formData });
        const waUrl = getContactWhatsAppUrl(formData, settings?.whatsappNumber);
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: 'Tour Package Inquiry', message: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit message. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
        <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
        <h4 className="text-xl font-bold text-emerald-900 font-display">Thank You! Message Sent.</h4>
        <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
          Our travel executive has received your message and will call/WhatsApp you at <strong>{submittedData?.phone || 'your number'}</strong> within 15 minutes with complete information.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {submittedData && (
            <a
              href={getContactWhatsAppUrl(submittedData, settings?.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition flex items-center shadow"
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              Chat Directly on WhatsApp (+91 98051 43007)
            </a>
          )}
          <button
            onClick={() => setSuccess(false)}
            className="px-5 py-2.5 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-xl hover:bg-emerald-100 transition"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
      <h3 className="text-xl font-bold text-slate-900 font-display mb-1">Send Us a Direct Message</h3>
      <p className="text-xs text-slate-500 mb-6">We respond promptly to all travel inquiries within 15 minutes.</p>

      {error && (
        <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98051 43007"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
            >
              <option value="Tour Package Inquiry">Tour Package Inquiry</option>
              <option value="Cab / Taxi Booking">Cab / Taxi Booking</option>
              <option value="Hotel Reservation">Hotel Reservation</option>
              <option value="Tempo Traveller Hire">Tempo Traveller Hire</option>
              <option value="Corporate / Group Booking">Corporate / Group Booking</option>
              <option value="Other Query">Other Query</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
          <textarea
            name="message"
            required
            rows="4"
            placeholder="Tell us about your travel dates, group size, and preferred destinations..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="space-y-2.5 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
          >
            {loading ? (
              <span>Sending Message...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message & Forward to WhatsApp</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition duration-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp (+91 98051 43007)</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
