import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '../../context/SettingsContext';

const getSiteOrigin = () => {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return 'https://baglamukhitourtravels.com';
};

export const OrganizationSchema = () => {
  const { settings } = useSettings();
  const origin = getSiteOrigin();

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': `${origin}/#organization`,
    name: settings.companyName || 'Baglamukhi Tour & Travels',
    legalName: 'Baglamukhi Tour & Travels Private Limited',
    alternateName: ['Baglamukhi Travels', 'Maa Baglamukhi Taxi Service', 'Amb Andaura Taxi Service'],
    url: origin,
    logo: {
      '@type': 'ImageObject',
      url: `${origin}/baglamukhi-temple-logo.jpg`,
      width: '512',
      height: '512',
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description:
      'Leading tour and travel agency in Himachal Pradesh specializing in Maa Baglamukhi temple darshan, Amb Andaura Railway Station (AADR) taxi transfers, 9 Devi Shaktipeeth yatras, Shimla Manali holiday packages, and luxury Tempo Traveller rentals.',
    telephone: settings.primaryPhone || '+91 98051 43007',
    email: settings.email || 'info@baglamukhitourtravels.com',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address || 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi',
      addressLocality: 'Amb Andaura / Bankhandi Kangra',
      addressRegion: 'Himachal Pradesh',
      postalCode: settings.pincode || '177203',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '31.6866',
      longitude: '76.0094',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Himachal Pradesh' },
      { '@type': 'AdministrativeArea', name: 'Punjab' },
      { '@type': 'AdministrativeArea', name: 'Chandigarh' },
      { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '482',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Himachal Tour Packages & Cab Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maa Baglamukhi & 9 Devi Darshan Pilgrimage Yatra' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Amb Andaura Railway Station (Vande Bharat) Taxi Service' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manali & Shimla Deluxe Holiday Packages' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maharaja Tempo Traveller Rental (12S / 17S / 20S)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Force Cruiser 4x4 & Innova Crysta Mountain Cabs' } },
      ],
    },
    sameAs: [
      settings.socialLinks?.facebook || 'https://facebook.com/baglamukhitourtravels',
      settings.socialLinks?.instagram || 'https://instagram.com/baglamukhitourtravels',
      settings.socialLinks?.youtube || 'https://youtube.com/@baglamukhitourtravels',
    ].filter(Boolean),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const WebSiteSchema = () => {
  const origin = getSiteOrigin();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Baglamukhi Tour & Travels',
    url: origin,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${origin}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const TourPackageSchema = ({ tour }) => {
  if (!tour) return null;
  const origin = getSiteOrigin();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.overview || `Book the best ${tour.title} with Baglamukhi Tour & Travels.`,
    touristType: tour.category || 'Family, Couples, Pilgrims',
    image: tour.featuredImage?.url || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.avgRating ? String(tour.avgRating) : '4.9',
      reviewCount: tour.reviewsCount ? String(tour.reviewsCount) : '184',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: tour.price?.startingPrice || 9999,
      priceCurrency: tour.price?.currency || 'INR',
      availability: 'https://schema.org/InStock',
      url: `${origin}/tours/${tour.slug}`,
      validFrom: '2026-01-01',
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Baglamukhi Tour & Travels',
      url: origin,
      telephone: '+91 98051 43007',
    },
    itinerary: tour.itinerary?.map((item, idx) => ({
      '@type': 'City',
      name: `Day ${item.day || idx + 1}: ${item.title}`,
      description: item.description,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const TaxiServiceSchema = ({ cabName = 'Himachal Cabs & Fleet' }) => {
  const origin = getSiteOrigin();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: `Baglamukhi Tour & Travels - ${cabName}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Baglamukhi Tour & Travels',
      telephone: '+91 98051 43007',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amb Andaura / Bankhandi Kangra / Chandigarh',
        addressRegion: 'Himachal Pradesh',
        addressCountry: 'IN',
      },
    },
    areaServed: [
      'Amb Andaura Railway Station (AADR)',
      'Maa Baglamukhi Temple Bankhandi Kangra',
      'Una Himachal',
      'Chandigarh',
      'Shimla',
      'Manali',
      'Dharamshala',
      'Amritsar',
      'Delhi NCR',
    ],
    serviceType: 'Commercial Tourist Cab, 4x4 Cruiser & Maharaja Tempo Traveller Rental',
    description: '24x7 verified commercial taxi and tempo traveller service for Himachal Pradesh hills and Shaktipeeth pilgrimage circuits.',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const ArticleSchema = ({ blog }) => {
  if (!blog) return null;
  const origin = getSiteOrigin();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage?.url || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'Baglamukhi Travel Specialists',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Baglamukhi Tour & Travels',
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/baglamukhi-temple-logo.jpg`,
      },
    },
    datePublished: blog.publishedAt || new Date().toISOString(),
    dateModified: blog.updatedAt || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${origin}/blog/${blog.slug}`,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const FAQSchema = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const BreadcrumbSchema = ({ items }) => {
  if (!items || items.length === 0) return null;
  const origin = getSiteOrigin();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${origin}${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
