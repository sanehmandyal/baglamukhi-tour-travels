import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '../../context/SettingsContext';

export const OrganizationSchema = () => {
  const { settings } = useSettings();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: settings.companyName || 'Baglamukhi Tour & Travels',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    '@id': 'http://localhost:5173/#organization',
    url: 'http://localhost:5173',
    telephone: settings.primaryPhone || '+91 98000 00000',
    email: settings.email || 'info@baglamukhitourtravels.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address || 'Shop No. 12, Main Bus Stand Complex',
      addressLocality: 'Kangra / Chandigarh',
      addressRegion: 'Himachal Pradesh / Punjab',
      postalCode: settings.pincode || '160017',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.7333',
      longitude: '76.7794',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      settings.socialLinks?.facebook,
      settings.socialLinks?.instagram,
      settings.socialLinks?.youtube,
      settings.socialLinks?.twitter,
    ].filter(Boolean),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const WebSiteSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Baglamukhi Tour & Travels',
    url: 'http://localhost:5173',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'http://localhost:5173/search?q={search_term_string}',
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.overview,
    touristType: tour.category || 'Family',
    offers: {
      '@type': 'Offer',
      price: tour.price?.startingPrice || 9999,
      priceCurrency: tour.price?.currency || 'INR',
      availability: 'https://schema.org/InStock',
      url: `http://localhost:5173/tours/${tour.slug}`,
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Baglamukhi Tour & Travels',
      url: 'http://localhost:5173',
      telephone: '+91 98000 00000',
    },
    itinerary: tour.itinerary?.map((item) => ({
      '@type': 'City',
      name: item.title,
      description: item.description,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const ArticleSchema = ({ blog }) => {
  if (!blog) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage?.url,
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'Thakur Travel Experts',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Baglamukhi Tour & Travels',
      logo: {
        '@type': 'ImageObject',
        url: 'http://localhost:5173/favicon.svg',
      },
    },
    datePublished: blog.publishedAt || new Date().toISOString(),
    dateModified: blog.updatedAt || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `http://localhost:5173/blog/${blog.slug}`,
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `http://localhost:5173${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
