import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, PhoneCall } from 'lucide-react';
import api from '../../api/axios';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { FAQSchema } from '../../components/common/SchemaMarkup';
import { useSettings } from '../../context/SettingsContext';

const FAQsPage = () => {
  const { settings } = useSettings();
  const [faqs, setFaqs] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await api.get('/faqs');
        if (res.data.success) {
          setFaqs(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaqs();
  }, []);

  const categories = ['All', 'General', 'Booking & Payments', 'Tours & Itineraries', 'Cabs & Transport', 'Cancellation & Refund'];

  const filteredFaqs = selectedCat === 'All' ? faqs : faqs.filter((f) => f.category === selectedCat);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Frequently Asked Questions (FAQs) | Baglamukhi Tour & Travels"
        description="Got travel questions? Read answers regarding booking steps, advance payments, cancellation rules, mountain safety, and car rentals."
        canonical="/faqs"
      />

      <FAQSchema faqs={filteredFaqs} />
      <Breadcrumbs items={[{ name: 'FAQs', url: '/faqs' }]} />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-14 text-white text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center justify-center">
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            Clear Answers
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Everything you need to know about our holiday packages, hotel inclusions, taxi fares, and payment policies.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                selectedCat === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq._id || idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full p-5 text-left flex items-center justify-between transition ${
                    isOpen ? 'bg-brand-50/50 text-brand-900' : 'text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm font-bold flex items-center">
                    <HelpCircle className="w-4 h-4 text-brand-600 mr-2 flex-shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-brand-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="bg-slate-100 rounded-3xl p-8 text-center space-y-3 border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 font-display">Still have a specific query?</h3>
          <p className="text-xs text-slate-600">
            Our Himachal holiday consultants are happy to answer your questions right away.
          </p>
          <a
            href={`tel:${settings.primaryPhone?.replace(/\s+/g, '') || '+919805143007'}`}
            className="inline-flex items-center px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition"
          >
            <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
            Call {settings.primaryPhone || '+91 98051 43007'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
