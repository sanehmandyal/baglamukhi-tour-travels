import React, { useState, useEffect } from 'react';
import { CalendarCheck, Search, Filter, Trash2, Eye, CheckCircle, Clock, XCircle, Phone, Mail, User } from 'lucide-react';
import api from '../../api/axios';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Modal edit state
  const [adminNotes, setAdminNotes] = useState('');
  const [modalStatus, setModalStatus] = useState('Pending');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== 'All') params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await api.get(`/bookings?${params.toString()}`);
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, search]);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setAdminNotes(booking.adminNotes || '');
    setModalStatus(booking.status || 'Pending');
    setModalOpen(true);
  };

  const handleSaveModal = async () => {
    if (!selectedBooking) return;
    try {
      await api.put(`/bookings/${selectedBooking._id}`, {
        status: modalStatus,
        adminNotes,
      });
      setModalOpen(false);
      fetchBookings();
    } catch (err) {
      alert('Failed to update booking.');
    }
  };

  const handleDelete = async (id, code) => {
    if (window.confirm(`Delete booking inquiry #${code}?`)) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (err) {
        alert('Failed to delete booking.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Bookings & Inquiries Management</h1>
          <p className="text-xs text-slate-500">Track customer inquiries, update statuses, and log driver allocations</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by ID, name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Pending', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                statusFilter === st
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No booking inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-3">Guest Details</th>
                  <th className="py-3 px-3">Destination / Tour</th>
                  <th className="py-3 px-3">Travel Date</th>
                  <th className="py-3 px-3">Travelers</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-brand-700">{b.bookingId}</td>
                    <td className="py-3 px-3 font-medium text-slate-900">
                      <p className="font-bold">{b.name}</p>
                      <p className="text-[11px] text-slate-500">{b.phone}</p>
                      <p className="text-[10px] text-slate-400">{b.email}</p>
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate">{b.tourPackage || b.destination}</td>
                    <td className="py-3 px-3">{new Date(b.travelDate).toLocaleDateString()}</td>
                    <td className="py-3 px-3">
                      {b.adults} Adults {b.children > 0 ? `, ${b.children} Child` : ''}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'Contacted'
                            ? 'bg-sky-100 text-sky-800'
                            : b.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => handleOpenModal(b)}
                          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition"
                          title="View & Update Notes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b._id, b.bookingId)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal View / Status Editor */}
      {modalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Inquiry Details #{selectedBooking.bookingId}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 text-xs block">Guest Name</span>
                  <span className="font-bold text-slate-900">{selectedBooking.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Phone</span>
                  <span className="font-bold text-brand-700">{selectedBooking.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Pickup City</span>
                  <span>{selectedBooking.pickupLocation || 'Chandigarh'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Travel Date</span>
                  <span>{new Date(selectedBooking.travelDate).toLocaleDateString()}</span>
                </div>
              </div>

              {selectedBooking.customMessage && (
                <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 text-xs text-brand-900">
                  <strong>Customer Special Request:</strong>
                  <p className="mt-0.5">{selectedBooking.customMessage}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Update Status</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-semibold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted (WhatsApp/Call Done)</option>
                  <option value="Confirmed">Confirmed (Advance Received & Voucher Sent)</option>
                  <option value="Completed">Completed (Trip Finished)</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Internal Admin Notes / Chauffeur Info</label>
                <textarea
                  rows="3"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Assigned Dzire cab driver Sunil (HP-01-XXXX). Hotel voucher emailed."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookingsPage;
