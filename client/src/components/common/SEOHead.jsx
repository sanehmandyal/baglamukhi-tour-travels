import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '../../context/SettingsContext';

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  nofollow = false,
  keywords,
  schemaJson,
}) => {
  const { settings } = useSettings();

  const siteTitle = title
    ? `${title} | ${settings.companyName || 'Baglamukhi Tour & Travels'}`
    : `${settings.companyName || 'Baglamukhi Tour & Travels'} | Best Tour Packages, Taxi & Holiday Trips`;

  const metaDesc =
    description ||
    settings.tagline ||
    'Book customized Himachal tour packages, Shimla Manali trips, Chandigarh cab services, tempo travellers, and pilgrimage tours with Baglamukhi Tour & Travels.';

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'http://localhost:5173';
  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `http://localhost:5173${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : currentUrl;

  const image = ogImage || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80';

  const robotsDirective = noindex
    ? 'noindex, nofollow'
    : nofollow
    ? 'index, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robotsDirective} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={settings.companyName || 'Baglamukhi Tour & Travels'} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={image} />

      {/* Custom Structured Data */}
      {schemaJson && (
        <script type="application/ld+json">
          {typeof schemaJson === 'string' ? schemaJson : JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
