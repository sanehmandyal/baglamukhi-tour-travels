import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiPlus, FiEdit2, FiTrash2, FiHelpCircle, FiX, FiCheck } from 'react-icons/fi';

const AdminFAQsPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0,
    isActive: true
  });

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/faqs');
      if (res.data?.success) {
        setFaqs(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenModal = (faq = null) => {
    if (faq) {
      setEditingId(faq._id);
      setFormData({
        question: faq.question || '',
        answer: faq.answer || '',
        category: faq.category || 'General',
        order: faq.order || 0,
        isActive: faq.isActive !== undefined ? faq.isActive : true
      });
    } else {
      setEditingId(null);
      setFormData({
        question: '',
        answer: '',
        category: 'General',
        order: faqs.length,
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        order: Number(formData.order)
      };

      if (editingId) {
        await api.put(`/faqs/${editingId}`, payload);
      } else {
        await api.post('/faqs', payload);
      }

      setModalOpen(false);
      fetchFaqs();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving FAQ');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await api.delete(`/faqs/${id}`);
      fetchFaqs();
    } catch (err) {
      alert('Failed to delete FAQ');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Frequently Asked Questions (FAQ)</h1>
          <p className="text-sm text-slate-500">Manage FAQ answers that display on tour pages, home, and FAQs hub (improves Google Rich Snippets)</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-cyan-600/20 transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading FAQs...</div>
      ) : faqs.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">No FAQs listed yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
          {faqs.map((faq, index) => (
            <div key={faq._id} className="p-5 flex flex-col md:flex-row items-start justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                    {faq.category || 'General'}
                  </span>
                  <span className="text-xs text-slate-400">Order: #{faq.order ?? index}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{faq.question}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center space-x-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => handleOpenModal(faq)}
                  className="p-2 text-slate-600 hover:text-cyan-600 hover:bg-white rounded-lg border border-slate-200 transition-colors"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="p-2 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg border border-slate-200 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
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
              <h2 className="text-lg font-bold text-slate-900">{editingId ? 'Edit FAQ' : 'Add New FAQ'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Question *</label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Is Rohtang Pass permit included in the package?"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="General">General Questions</option>
                    <option value="Tour Packages">Tour Packages</option>
                    <option value="Cabs & Taxi">Cabs & Taxi</option>
                    <option value="Payment & Booking">Payment & Booking</option>
                    <option value="Cancellation">Cancellation Policy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Display Priority Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Answer (Rich Text / Plain) *</label>
                <textarea
                  name="answer"
                  rows="4"
                  value={formData.answer}
                  onChange={handleChange}
                  required
                  placeholder="Detailed clear response for travelers..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="rounded text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Active (Visible on Website and Schema.org FAQPage)
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
                  {editingId ? 'Update FAQ' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQsPage;
