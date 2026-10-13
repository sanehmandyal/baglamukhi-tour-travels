/**
 * Utility to resolve authentic vehicle images based on car model name, category, or custom upload.
 */
export const resolveVehicleImage = (vehicle) => {
  if (!vehicle) return '/images/cabs/force-cruiser-4x4.jpg';

  const rawImage = typeof vehicle === 'string' ? vehicle : (vehicle.image || vehicle.featuredImage?.url || '');

  // If admin uploaded a custom base64 image, local upload, remote URL, or specific cab preset, honor it directly
  if (
    rawImage &&
    (rawImage.startsWith('data:image') ||
      rawImage.startsWith('/uploads/') ||
      (rawImage.startsWith('http') && !rawImage.includes('force-cruiser-4x4.jpg')) ||
      (rawImage.startsWith('/images/cabs/') && rawImage !== '/images/cabs/force-cruiser-4x4.jpg'))
  ) {
    return rawImage;
  }

  // Otherwise infer from vehicle title/name first
  const title = (
    typeof vehicle === 'object'
      ? (vehicle.title || vehicle.name || vehicle.slug || vehicle.vehicleType || '')
      : vehicle
  ).toLowerCase();

  if (title.includes('scorpio')) {
    return '/images/cabs/mahindra-scorpio.jpg';
  }
  if (title.includes('thar')) {
    return '/images/cabs/mahindra-thar-4x4.jpg';
  }
  if (title.includes('dzire') || title.includes('sedan') || title.includes('etios') || title.includes('swift') || title.includes('economy')) {
    return '/images/cabs/swift-dzire.jpg';
  }
  if (title.includes('innova') || title.includes('crysta')) {
    return '/images/cabs/toyota-innova-crysta.jpg';
  }
  if (title.includes('ertiga')) {
    return '/images/cabs/maruti-ertiga.jpg';
  }
  if (title.includes('17 seater') || title.includes('17-seater') || title.includes('20 seater') || title.includes('26 seater')) {
    return '/images/cabs/force-tempo-traveller-17.jpg';
  }
  if (title.includes('tempo') || title.includes('traveller') || title.includes('urbania') || title.includes('12 seater') || title.includes('maharaja')) {
    return '/images/cabs/force-tempo-traveller-12.jpg';
  }
  if (title.includes('sumo') || title.includes('spacio')) {
    return '/images/cabs/tata-sumo-gold.jpg';
  }
  if (title.includes('cruiser') || title.includes('toofan') || title.includes('4x4') || title.includes('4×4')) {
    return '/images/cabs/force-cruiser-4x4.jpg';
  }

  if (rawImage && rawImage.startsWith('/images/cabs/')) {
    return rawImage;
  }

  return '/images/cabs/force-cruiser-4x4.jpg';
};
