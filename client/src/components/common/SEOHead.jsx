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

  const brandName = settings.companyName || 'Baglamukhi Tour & Travels';
  const siteTitle = title
    ? title.toLowerCase().includes('baglamukhi')
      ? title
      : `${title} | ${brandName}`
    : `${brandName} | Best Himachal Tour Packages, Amb Andaura Taxi & 9 Devi Darshan`;

  const metaDesc =
    description ||
    settings.tagline ||
    'Official Baglamukhi Tour & Travels. Book customized Himachal tour packages, Amb Andaura Railway Station taxi pickup, 9 Devi Darshan yatra, and luxury Tempo Travellers. Call +91 98051 43007.';

  const currentOrigin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://baglamukhitourtravels.com';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${currentOrigin}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : `${currentOrigin}${currentPath}`;

  const image = ogImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';

  const robotsDirective = noindex
    ? 'noindex, nofollow'
    : nofollow
    ? 'index, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const defaultKeywords = [
    'Baglamukhi Tour and Travels',
    'Maa Baglamukhi Temple taxi',
    'Amb Andaura railway station cab',
    'Himachal tour packages',
    '9 Devi Darshan yatra',
    'Shimla Manali tour package',
    'Tempo Traveller rent Chandigarh',
    'Force Cruiser Himachal',
  ];

  const combinedKeywords = keywords
    ? Array.isArray(keywords)
      ? keywords.join(', ')
      : keywords
    : defaultKeywords.join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={combinedKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robotsDirective} />
      <meta name="author" content="Baglamukhi Tour & Travels" />

      {/* Local Geo SEO Tags */}
      <meta name="geo.region" content="IN-HP" />
      <meta name="geo.placename" content="Amb Andaura, Kangra, Himachal Pradesh" />
      <meta name="geo.position" content="31.6866;76.0094" />
      <meta name="ICBM" content="31.6866, 76.0094" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={settings.companyName || 'Baglamukhi Tour & Travels'} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

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
