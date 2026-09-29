import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiMail, FiPhone, FiCalendar, FiCheckCircle, FiTrash2, FiMessageSquare, FiExternalLink, FiClock } from 'react-icons/fi';

const AdminContactMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get('/contact');
      if (res.data?.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      fetchMessages();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      fetchMessages();
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inquiry & Contact Messages Inbox</h1>
          <p className="text-sm text-slate-500">View customer questions, customized tour queries, and callback requests</p>
        </div>

        <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === 'all' ? 'bg-cyan-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === 'new' ? 'bg-cyan-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            New ({messages.filter(m => m.status === 'new').length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === 'read' ? 'bg-cyan-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('replied')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === 'replied' ? 'bg-cyan-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Resolved
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading inbox messages...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">No messages found in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map(msg => (
            <div
              key={msg._id}
              className={`bg-white rounded-2xl border p-5 transition-all shadow-sm flex flex-col md:flex-row items-start justify-between gap-5 ${
                msg.status === 'new' ? 'border-cyan-300 bg-cyan-50/20 shadow-cyan-100' : 'border-slate-200'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{msg.name}</h3>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    msg.status === 'new' ? 'bg-rose-100 text-rose-700' :
                    msg.status === 'read' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {msg.status}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5" />
                    {new Date(msg.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-cyan-600">
                    <FiMail className="text-cyan-600" /> {msg.email}
                  </a>
                  <a href={`tel:${msg.phone}`} className="flex items-center gap-1 font-semibold text-slate-800 hover:text-cyan-600">
                    <FiPhone className="text-cyan-600" /> {msg.phone}
                  </a>
                  {msg.subject && (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      Subject: {msg.subject}
                    </span>
                  )}
                  {msg.serviceType && (
                    <span className="bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded font-medium">
                      Type: {msg.serviceType}
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 mt-2">
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-end justify-between gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${msg.name}, thank you for contacting Baglamukhi Tour & Travels regarding your inquiry.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
                  >
                    <FiMessageSquare className="w-3.5 h-3.5" /> WhatsApp Reply
                  </a>
                  <a
                    href={`tel:${msg.phone}`}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-cyan-600/20"
                  >
                    <FiPhone className="w-3.5 h-3.5" /> Call
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={msg.status}
                    onChange={(e) => handleStatusUpdate(msg._id, e.target.value)}
                    className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="new">Mark as New</option>
                    <option value="read">In Progress / Contacted</option>
                    <option value="replied">Resolved / Booked</option>
                  </select>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContactMessagesPage;
