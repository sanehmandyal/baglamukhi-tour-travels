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
        const serviceType = cab.category === 'tempo-traveller' ? 'Tempo Traveller' : 'Cab & Taxi';
        const routes = (cab.popularRoutes || ['Chandigarh to Manali', 'Maa Baglamukhi Dham']).map((r, i) => ({
          route: typeof r === 'string' ? r : `Route ${i + 1}`,
          distance: '150 km',
          sedanPrice: 2500,
          suvPrice: 3500,
          tempoPrice: 5500,
        }));

        const payload = {
          title: cab.title,
          slug: cab.slug,
          serviceType: serviceType,
          category: cab.category || 'cab-rental',
          vehicleType: cab.vehicleType || 'Mountain Cab',
          capacity: cab.capacity || '4+1 Passengers',
          luggageCapacity: cab.luggageCapacity || '3 Large Bags',
          pricePerKm: cab.pricePerKm || 14,
          baseFare: cab.baseFare || 2500,
          ratePerKm: cab.pricePerKm || 14,
          fullDayRate: cab.baseFare || 2500,
          shortDescription: cab.shortDescription || 'Himachal tourist cab with experienced hill chauffeur.',
          detailedContent: cab.shortDescription || 'Commercial tourist cab with certified mountain chauffeur.',
          fullDescription: cab.shortDescription || 'Commercial tourist cab with certified mountain chauffeur.',
          image: cab.image || '/images/cabs/force-cruiser-4x4.jpg',
          featuredImage: {
            url: cab.image || '/images/cabs/force-cruiser-4x4.jpg',
            alt: cab.title || 'Cab',
          },
          features: Array.isArray(cab.features) ? cab.features : ['AC', 'Heater', 'Fastag', 'Pahadi Driver'],
          popularRoutes: routes,
          isActive: true,
          isPublished: true,
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
