/**
 * Helper to clean and format WhatsApp phone numbers
 */
export const cleanWhatsAppNumber = (phone) => {
  if (!phone) return '919805143007';
  const cleaned = phone.replace(/[^0-9]/g, '');
  // If 10 digits without country code (e.g. 9805143007), prepend 91
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  return cleaned.length > 0 ? cleaned : '919805143007';
};

/**
 * Generate a detailed WhatsApp link for a booking inquiry
 */
export const getBookingWhatsAppUrl = (booking, customPhone = null) => {
  const phone = cleanWhatsAppNumber(customPhone);
  const lines = [
    `*🚩 NEW BOOKING INQUIRY - BAGLAMUKHI TOUR & TRAVELS*`,
    ``,
    `*• Booking ID:* ${booking?.bookingId || booking?.code || 'Online Inquiry'}`,
    `*• Name:* ${booking?.name || 'N/A'}`,
    `*• Phone:* ${booking?.phone || 'N/A'}`,
    booking?.email ? `*• Email:* ${booking.email}` : null,
    `*• Destination:* ${booking?.destination || 'Himachal Pradesh'}`,
    `*• Package/Service:* ${booking?.tourPackage || booking?.serviceType || 'Tour Package'}`,
    `*• Travel Date:* ${booking?.travelDate ? new Date(booking.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible'}`,
    `*• Pickup Location:* ${booking?.pickupLocation || 'Amb Andaura / Chandigarh'}`,
    `*• Guests:* ${booking?.adults || 1} Adults${Number(booking?.children) > 0 ? `, ${booking.children} Children` : ''}`,
    booking?.estimatedBudget ? `*• Estimated Budget:* ₹${Number(booking.estimatedBudget).toLocaleString('en-IN')}` : null,
    booking?.customMessage ? `*• Note/Requests:* ${booking.customMessage}` : null,
    ``,
    `_Sent via Baglamukhi Tour & Travels Website Booking Desk_`
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phone}?text=${text}`;
};

/**
 * Generate a detailed WhatsApp link for a contact form message
 */
export const getContactWhatsAppUrl = (contact, customPhone = null) => {
  const phone = cleanWhatsAppNumber(customPhone);
  const lines = [
    `*📩 NEW WEBSITE INQUIRY - BAGLAMUKHI TOUR & TRAVELS*`,
    ``,
    `*• Name:* ${contact?.name || 'Guest'}`,
    `*• Phone:* ${contact?.phone || 'N/A'}`,
    contact?.email ? `*• Email:* ${contact.email}` : null,
    `*• Subject:* ${contact?.subject || 'Tour / Cab Inquiry'}`,
    `*• Message:* ${contact?.message || 'I would like more information.'}`,
    ``,
    `_Sent via Baglamukhi Tour & Travels Website_`
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phone}?text=${text}`;
};

/**
 * Generate a WhatsApp link for a specific cab inquiry
 */
export const getCabWhatsAppUrl = (cabName, customPhone = null, extraDetails = '') => {
  const phone = cleanWhatsAppNumber(customPhone);
  const message = `Hi Baglamukhi Tour & Travels, I want to book / inquire about the *${cabName || 'Cab'}* from Amb Andaura / Chandigarh / Himachal.${extraDetails ? ` Details: ${extraDetails}` : ''} Please share rates and availability.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate a WhatsApp link for a specific tour package inquiry
 */
export const getTourWhatsAppUrl = (tourTitle, duration = '', price = '', customPhone = null) => {
  const phone = cleanWhatsAppNumber(customPhone);
  const details = [
    `Hi Baglamukhi Tour & Travels, I am interested in booking / customizing this tour package:`,
    `*• Tour:* ${tourTitle || 'Himachal Tour'}`,
    duration ? `*• Duration:* ${duration}` : null,
    price ? `*• Starting Price:* ₹${Number(price).toLocaleString('en-IN')}` : null,
    `Please share the detailed itinerary and discount quote.`
  ].filter(Boolean).join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(details)}`;
};

/**
 * Generate a WhatsApp link for a specific destination inquiry
 */
export const getDestinationWhatsAppUrl = (destinationName, customPhone = null) => {
  const phone = cleanWhatsAppNumber(customPhone);
  const message = `Hi Baglamukhi Tour & Travels, I want to plan a trip to *${destinationName || 'Himachal'}*. Please share best tour packages, cab options, and hotel recommendations.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
