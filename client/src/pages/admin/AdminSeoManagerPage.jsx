import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiSearch, FiSave, FiGlobe, FiEye, FiCheckCircle, FiAlertTriangle, FiFileText, FiPlus, FiTrash2, FiRefreshCw } from 'react-icons/fi';

const AdminSeoManagerPage = () => {
  const [seoRecords, setSeoRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const [formData, setFormData] = useState({
    pagePath: '/',
    pageType: 'home',
    title: '',
    metaDescription: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    twitterCard: 'summary_large_image',
    canonicalUrl: '',
    schemaType: 'TravelAgency',
    noIndex: false,
    noFollow: false
  });

  const fetchSeoRecords = async () => {
    try {
      setLoading(true);
      const res = await api.get('/seo');
      if (res.data?.success) {
        setSeoRecords(res.data.data);
        if (res.data.data.length > 0 && !selectedRecord) {
          selectItem(res.data.data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoRecords();
  }, []);

  const selectItem = (item) => {
    setSelectedRecord(item);
    setFormData({
      pagePath: item.pagePath || '/',
      pageType: item.pageType || 'page',
      title: item.title || '',
      metaDescription: item.metaDescription || '',
      keywords: Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords || '',
      ogTitle: item.ogTitle || item.title || '',
      ogDescription: item.ogDescription || item.metaDescription || '',
      ogImage: item.ogImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      twitterCard: item.twitterCard || 'summary_large_image',
      canonicalUrl: item.canonicalUrl || '',
      schemaType: item.schemaType || 'TravelAgency',
      noIndex: Boolean(item.noIndex),
      noFollow: Boolean(item.noFollow)
    });
  };

  const handleAddNew = () => {
    setSelectedRecord(null);
    setFormData({
      pagePath: '/custom-landing-page',
      pageType: 'custom',
      title: 'Custom Tour Page | Baglamukhi Tour & Travels',
      metaDescription: 'Book reliable tour packages, taxi cabs, and hotel stays in Himachal with 24x7 support.',
      keywords: 'himachal tour, cab rental, thakur tour travel',
      ogTitle: '',
      ogDescription: '',
      ogImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      twitterCard: 'summary_large_image',
      canonicalUrl: '',
      schemaType: 'WebPage',
      noIndex: false,
      noFollow: false
    });
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
    setSaving(true);
    setNotice('');

    const payload = {
      ...formData,
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean)
    };

    try {
      if (selectedRecord?._id) {
        await api.put(`/seo/${selectedRecord._id}`, payload);
        setNotice('SEO record updated successfully!');
      } else {
        await api.post('/seo', payload);
        setNotice('New SEO record saved successfully!');
      }
      fetchSeoRecords();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving SEO metadata');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecord?._id) return;
    if (!window.confirm(`Delete SEO entry for ${selectedRecord.pagePath}?`)) return;
    try {
      await api.delete(`/seo/${selectedRecord._id}`);
      setSelectedRecord(null);
      fetchSeoRecords();
    } catch (err) {
      alert('Failed to delete SEO record');
    }
  };

  // SEO Health Score Calculation
  const titleLen = formData.title.length;
  const descLen = formData.metaDescription.length;
  const isTitleGood = titleLen >= 45 && titleLen <= 65;
  const isDescGood = descLen >= 120 && descLen <= 165;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Search Engine Optimization (SEO) Master Engine</h1>
          <p className="text-sm text-slate-500">Fine-tune Google SERP snippets, canonical URLs, Social OpenGraph tags, and Schema markup</p>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:text-cyan-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <FiGlobe className="w-3.5 h-3.5" /> View Live sitemap.xml
          </a>
          <button
            onClick={handleAddNew}
            className="flex items-center space-x-1.5 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-cyan-600/20"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>Add Route SEO</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice('')} className="text-emerald-600 hover:underline">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Route Selector */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800 text-sm">Indexed Routes ({seoRecords.length})</h3>
            <button onClick={fetchSeoRecords} className="text-slate-400 hover:text-cyan-600">
              <FiRefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
            {loading ? (
              <p className="text-xs text-slate-400 p-2">Loading SEO registry...</p>
            ) : (
              seoRecords.map(item => (
                <button
                  key={item._id}
                  onClick={() => selectItem(item)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                    selectedRecord?._id === item._id
                      ? 'bg-cyan-50/70 border-cyan-300 text-cyan-950 font-bold shadow-xs'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-cyan-700 truncate max-w-[200px]">{item.pagePath}</span>
                    <span className="text-[10px] uppercase tracking-wider bg-white px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">
                      {item.pageType || 'page'}
                    </span>
                  </div>
                  <p className="truncate text-slate-500 font-normal text-[11px]">{item.title}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side: SERP Live Preview & Editor */}
        <div className="lg:col-span-8 space-y-6">
          {/* Dynamic Google SERP Snippet Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FiEye className="text-cyan-600" /> Google Search Result Live Preview
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <span className={`px-2 py-0.5 rounded font-semibold ${isTitleGood ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  Title: {titleLen}/60
                </span>
                <span className={`px-2 py-0.5 rounded font-semibold ${isDescGood ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  Description: {descLen}/160
                </span>
              </div>
            </div>

            {/* Google SERP Card UI */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-sans max-w-2xl space-y-1">
              <div className="flex items-center space-x-2 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[9px] font-bold">
                  T
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-800 leading-tight">Baglamukhi Tour & Travels</span>
                  <span className="text-[11px] text-slate-500 leading-tight font-mono">
                    https://baglamukhitourtravels.com{formData.pagePath}
                  </span>
                </div>
              </div>

              <h4 className="text-blue-800 hover:underline text-lg font-medium leading-snug cursor-pointer line-clamp-1 pt-1">
                {formData.title || 'Baglamukhi Tour & Travels - Best Himachal Tours & Taxi Service'}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {formData.metaDescription || 'Plan and book affordable Shimla Manali tour packages, cab rentals from Chandigarh & Delhi, and luxury stays with Baglamukhi Tour & Travels.'}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <FiFileText className="text-cyan-600" /> Edit Metadata for <span className="font-mono text-cyan-600">{formData.pagePath}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Page URL Path *</label>
                <input
                  type="text"
                  name="pagePath"
                  value={formData.pagePath}
                  onChange={handleChange}
                  required
                  placeholder="e.g. /tours or /destinations/manali"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-mono outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Schema.org JSON-LD Type</label>
                <select
                  name="schemaType"
                  value={formData.schemaType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="TravelAgency">TravelAgency (Local Business)</option>
                  <option value="Product">Product / Tour Package</option>
                  <option value="TouristDestination">TouristDestination</option>
                  <option value="Article">Blog / News Article</option>
                  <option value="FAQPage">FAQPage</option>
                  <option value="WebPage">WebPage (General)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold uppercase text-slate-700">Meta Title *</label>
                  <span className={`text-[11px] font-medium ${isTitleGood ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {titleLen} / 60 chars (Optimal: 45-60)
                  </span>
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Manali Tour Packages | Best Price Taxi & Hotels - Baglamukhi Tour & Travels"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold uppercase text-slate-700">Meta Description *</label>
                  <span className={`text-[11px] font-medium ${isDescGood ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {descLen} / 160 chars (Optimal: 130-160)
                  </span>
                </div>
                <textarea
                  name="metaDescription"
                  rows="3"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  required
                  placeholder="Concise call-to-action summary that convinces searchers to click..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Target Keyword Focus (Comma-separated)</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="himachal tour package, manali taxi service, shimla cab booking"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Canonical URL (Optional override)</label>
                <input
                  type="url"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleChange}
                  placeholder="https://baglamukhitourtravels.com/tours"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Social Sharing Image (og:image)</label>
                <input
                  type="url"
                  name="ogImage"
                  value={formData.ogImage}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex items-center space-x-6 md:col-span-2 pt-2 border-t border-slate-100">
                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="noIndex"
                    checked={formData.noIndex}
                    onChange={handleChange}
                    className="rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>noindex (Block Google from indexing this route)</span>
                </label>
                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="noFollow"
                    checked={formData.noFollow}
                    onChange={handleChange}
                    className="rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>nofollow (Instruct Google not to follow out links)</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {selectedRecord?._id ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <FiTrash2 className="w-3.5 h-3.5" /> Delete Route
                </button>
              ) : <div></div>}

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <FiSave className="w-4 h-4" />
                <span>{saving ? 'Saving SEO...' : 'Save Meta Tag Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSeoManagerPage;
