import React from 'react';

const GoogleMapEmbed = ({ title = 'Baglamukhi Tour & Travels Office Location' }) => {
  return (
    <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-soft border border-slate-200">
      <iframe
        title={title}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109741.02029575971!2d76.69348858356933!3d30.735062600000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;
