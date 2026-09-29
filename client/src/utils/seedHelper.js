import api from '../api/axios';
import {
  DEFAULT_TOURS,
  DEFAULT_CABS,
  DEFAULT_DESTINATIONS,
  DEFAULT_BLOGS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_FAQS,
} from '../data/initialData';

/**
 * Universal seeder helper that tries the backend /seed endpoint first,
 * and seamlessly fallbacks to direct REST insertions if the seed route is pending deployment.
 */
export const syncDatabaseInventory = async (target = 'all') => {
  try {
    const res = await api.post('/seed');
    if (res.data?.success) {
      return { success: true, message: res.data.message };
    }
  } catch (err) {
    console.warn('[SeedHelper] /seed endpoint unavailable or deploying, falling back to direct REST sync...', err.message);
  }

  // Fallback direct REST insertions
  let count = 0;

  if (target === 'all' || target === 'services') {
    for (const cab of DEFAULT_CABS) {
      try {
        const payload = {
          title: cab.title,
          slug: cab.slug,
          category: cab.category || 'cab-rental',
          vehicleType: cab.vehicleType,
          capacity: cab.capacity,
          luggageCapacity: cab.luggageCapacity,
          pricePerKm: cab.pricePerKm || 14,
          baseFare: cab.baseFare || 2500,
          shortDescription: cab.shortDescription,
          fullDescription: cab.shortDescription,
          image: cab.image,
          features: Array.isArray(cab.features) ? cab.features.join(', ') : cab.features,
          popularRoutes: Array.isArray(cab.popularRoutes) ? cab.popularRoutes.join(', ') : cab.popularRoutes,
          isActive: true,
        };
        await api.post('/services', payload);
        count++;
      } catch (e) {
        console.warn(`[SeedHelper] Service ${cab.slug} insert note:`, e.message);
      }
    }
  }

  if (target === 'all' || target === 'tours') {
    for (const tour of DEFAULT_TOURS) {
      try {
        const payload = {
          title: tour.title,
          slug: tour.slug,
          destination: tour.destination,
          category: tour.category,
          duration: tour.duration,
          price: { startingPrice: 9999, discountedPrice: 12999, perPerson: true, currency: 'INR' },
          pickupDrop: tour.pickupDrop,
          featuredImage: tour.featuredImage,
          galleryImages: tour.galleryImages,
          overview: tour.overview,
          highlights: tour.highlights,
          itinerary: tour.itinerary,
          inclusions: tour.inclusions,
          exclusions: tour.exclusions,
          reviewsCount: tour.reviewsCount || 100,
          avgRating: tour.avgRating || 4.9,
          isFeatured: tour.isFeatured || false,
          isPopular: tour.isPopular || true,
          isPublished: true,
        };
        await api.post('/tours', payload);
        count++;
      } catch (e) {
        console.warn(`[SeedHelper] Tour ${tour.slug} insert note:`, e.message);
      }
    }
  }

  if (target === 'all' || target === 'destinations') {
    for (const dest of DEFAULT_DESTINATIONS) {
      try {
        const payload = {
          name: dest.name,
          slug: dest.slug,
          tagline: dest.tagline,
          state: dest.state || 'Himachal Pradesh',
          heroImage: dest.heroImage,
          galleryImages: dest.galleryImages,
          shortDescription: dest.shortDescription,
          detailedOverview: dest.detailedOverview,
          bestTimeToVisit: dest.bestTimeToVisit,
          idealTripDuration: dest.idealTripDuration,
          nearestAirport: dest.nearestAirport,
          nearestRailwayStation: dest.nearestRailwayStation,
          topAttractions: dest.topAttractions,
          isFeatured: dest.isFeatured || false,
          isPublished: true,
        };
        await api.post('/destinations', payload);
        count++;
      } catch (e) {
        console.warn(`[SeedHelper] Destination ${dest.slug} insert note:`, e.message);
      }
    }
  }

  return {
    success: true,
    message: `Database sync completed (${count} records processed).`,
  };
};
