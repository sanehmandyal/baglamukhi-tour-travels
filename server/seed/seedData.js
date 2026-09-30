const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('../models/User');
const SiteSettings = require('../models/SiteSettings');
const Destination = require('../models/Destination');
const Tour = require('../models/Tour');
const Location = require('../models/Location');
const Service = require('../models/Service');
const Hotel = require('../models/Hotel');
const Blog = require('../models/Blog');
const Category = require('../models/Category');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const Gallery = require('../models/Gallery');
const Booking = require('../models/Booking');
const ContactMessage = require('../models/ContactMessage');
const SEO = require('../models/SEO');

const seedDatabase = async (dropDb = true) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/baglamukhi_tour_travels';
      await mongoose.connect(mongoUri);
      console.log('[Seed] Connected to MongoDB database...');
    }

    // Always clear collections before populating seed inventory
    await Promise.allSettled([
      Destination.deleteMany({}),
      Tour.deleteMany({}),
      Location.deleteMany({}),
      Service.deleteMany({}),
      Hotel.deleteMany({}),
      Blog.deleteMany({}),
      Testimonial.deleteMany({}),
      FAQ.deleteMany({}),
      Gallery.deleteMany({}),
      SEO.deleteMany({}),
      SiteSettings.deleteMany({}),
    ]);
    console.log('[Seed] Cleared collections for fresh seed.');

    // 1. Create or Preserve Admin User
    let adminUser = await User.findOne({ email: 'admin@baglamukhitourtravels.com' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Baglamukhi Tour & Travels Admin',
        email: 'admin@baglamukhitourtravels.com',
        password: 'Admin@123456',
        role: 'admin',
        phone: '+91 98051 43007',
        isActive: true,
      });
      console.log('[Seed] Admin user created (admin@baglamukhitourtravels.com / Admin@123456)');
    } else {
      if (!adminUser.isActive) {
        adminUser.isActive = true;
        await adminUser.save();
      }
      console.log('[Seed] Admin user preserved with their custom password.');
    }

    // 2. Create Site Settings
    const settings = await SiteSettings.create({
      companyName: 'BAGLAMUKHI TOUR & TRAVELS',
      tagline: 'Leading Tour & Travel Operator in Himachal, Punjab & Chandigarh',
      primaryPhone: '+91 98051 43007',
      secondaryPhone: '+91 98051 43007',
      whatsappNumber: '+91 98051 43007',
      email: 'info@baglamukhitourtravels.com',
      supportEmail: 'bookings@baglamukhitourtravels.com',
      address: 'Near Amb Andaura Railway Station (AADR) & Maa Baglamukhi Temple, Bankhandi, Kangra, Himachal Pradesh - 177203, India',
      city: 'Amb Andaura, Kangra & Chandigarh',
      state: 'Himachal Pradesh',
      pincode: '177203',
      operatingHours: '24 Hours / 7 Days a Week (Round the Clock Support)',
      socialLinks: {
        facebook: 'https://facebook.com/baglamukhitourtravels',
        instagram: 'https://instagram.com/baglamukhitourtravels',
        youtube: 'https://youtube.com/@baglamukhitourtravels',
        twitter: 'https://twitter.com/baglamukhitravels',
        tripadvisor: 'https://tripadvisor.com',
      },
      analytics: {
        googleAnalyticsId: 'G-XXXXXXXXXX',
        googleTagManagerId: 'GTM-XXXXXXX',
        googleSiteVerification: 'google-verification-key',
      },
    });

    // 3. Create Destinations
    const destinationsData = [
      {
        name: 'Maa Baglamukhi Temple (Bankhandi, Kangra)',
        slug: 'baglamukhi-temple-kangra',
        tagline: 'Divine Pitambara Shaktipeeth & Victory Shrine',
        state: 'Himachal Pradesh',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
          alt: 'Maa Baglamukhi Temple Bankhandi Kangra Himachal Pradesh',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1514222788835-3a1a1d5b32f8?auto=format&fit=crop&w=800&q=80', alt: 'Sacred Havan Kund Maa Baglamukhi Dham' },
          { url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80', alt: 'Kangra Valley Hill View' },
          { url: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=80', alt: 'Mata Brajeshwari Kangra' },
        ],
        shortDescription: 'The sacred Maa Baglamukhi Temple situated at Bankhandi in Kangra is world-renowned for fulfilling sankalpas, warding off obstacles, and granting triumph over legal and personal hardships.',
        detailedOverview: 'Maa Baglamukhi Dham at Bankhandi (Kangra, HP) is one of the most revered Tantric pilgrimage destinations in North India. Dedicated to Goddess Baglamukhi (the 8th Mahavidya, also known as Mata Pitambara), devotees and dignitaries from across India visit this sacred shrine to perform special yellow havans, anushthans, and receive divine blessings.',
        bestTimeToVisit: 'Throughout the year. Navratris, Chaitra & Ashwin festivals, and Thursdays are especially auspicious.',
        idealTripDuration: '2 to 3 Days (combined with Kangra Devi, Jwala Ji & Chamunda Devi)',
        nearestAirport: 'Gaggal Airport, Kangra (DHM - 35 km) / Chandigarh Airport (215 km)',
        nearestRailwayStation: 'Una Himachal (Vande Bharat Express - 70 km) / Pathankot (85 km)',
        howToReach: {
          byAir: 'Fly into Kangra Gaggal Airport (35 km) or Chandigarh International Airport (215 km) with direct private cab service.',
          byTrain: 'Arrive via New Delhi-Una Vande Bharat Express at Una Station (1.5 hrs cab drive) or Pathankot Cantt.',
          byRoad: 'Located directly on the Hoshiarpur-Dharamshala NH. Direct 4-hour highway drive from Chandigarh.',
        },
        placesToVisit: [
          { name: 'Maa Baglamukhi Temple Sanctum', description: 'Ancient sanctum where Mata Baglamukhi is worshipped in glowing golden attire (Pitambara).', timing: '5:00 AM - 9:30 PM' },
          { name: 'Sacred Havan Shala', description: 'Dedicated havan kunds where thousands of yellow mustard and turmeric havans are conducted daily.', timing: '6:00 AM - 8:00 PM' },
          { name: 'Mata Jwala Ji Temple (Nearby)', description: 'Eternal natural flame Shaktipeeth located just 22 km from Baglamukhi Dham.', timing: '5:00 AM - 10:00 PM' },
          { name: 'Maa Chintpurni Devi Shrine', description: 'Renowned wish-fulfilling shrine located approximately 32 km away.', timing: '4:00 AM - 10:00 PM' },
          { name: 'Mata Brajeshwari Kangra Devi', description: 'One of the prime 51 Shaktipeeths where Sati’s left breast fell.', timing: '5:00 AM - 9:00 PM' },
          { name: 'Kangra Fort & Bathu Ki Ladi', description: 'Historic 1000-year-old fort and submerged stone temple clusters on Pong Dam lake.', timing: '9:00 AM - 5:30 PM' },
        ],
        thingsToDo: [
          { title: 'Perform Special Baglamukhi Havan & Puja', description: 'Participate in traditional Pitambara anushthan conducted by Vedic priests for success and health.' },
          { title: '9 Devi Shaktipeeth Circuit Yatra', description: 'Embark on a sacred spiritual tour covering Jwala Ji, Chintpurni, Chamunda, and Kangra Devi.' },
          { title: 'Explore Kangra Tea Gardens & Fort', description: 'Visit historic hill fortifications and lush green Kangra valley tea estates.' },
        ],
        suggestedItinerary: [
          { day: 1, title: 'Arrival & Evening Aarti at Maa Baglamukhi Dham', description: 'Pickup from Chandigarh / Una Station, scenic drive to Bankhandi Kangra, hotel check-in, and attend divine evening Aarti.' },
          { day: 2, title: 'Special Havan Puja & Jwala Ji / Chintpurni Darshan', description: 'Early morning Vedic Havan at Baglamukhi temple, followed by darshan at holy Jwala Ji and Chintpurni shrines.' },
          { day: 3, title: 'Kangra Devi, Chamunda Devi & Return Transfer', description: 'Morning blessings at Kangra Brajeshwari Devi and Chamunda Nandikeshwar Dham, followed by return drive to Chandigarh / Delhi.' },
        ],
        travelTips: [
          'Wear yellow clothing or traditional attire during Baglamukhi puja and havana.',
          'Pre-book temple priest slots and VIP darshan assistance via our travel desk.',
          'Combine your pilgrimage with Dharamshala or McLeodganj for a complete spiritual hill tour.',
        ],
        faqs: [
          { question: 'What is the significance of Maa Baglamukhi Temple Kangra?', answer: 'Maa Baglamukhi is worshipped as the goddess of supreme victory, legal protection, speech power, and elimination of evil obstacles.' },
          { question: 'How far is Maa Baglamukhi Temple from Chandigarh?', answer: 'It is approximately 215 km (around 4.5 hours drive via the smooth Hoshiarpur/Una highway).' },
        ],
        isFeatured: true,
        isPublished: true,
        seo: {
          metaTitle: 'Maa Baglamukhi Temple Bankhandi Kangra | Darshan, Havan & Tour Packages',
          metaDescription: 'Plan your pilgrimage to Maa Baglamukhi Temple Bankhandi Kangra. Book VIP darshan, special Havan puja, private cabs from Chandigarh & Una, and hotel stays.',
          canonicalUrl: 'http://localhost:5173/destinations/baglamukhi-temple-kangra',
          focusKeyword: 'Maa Baglamukhi temple Kangra',
        },
      },
      {
        name: 'Manali',
        slug: 'manali',
        tagline: 'Valley of the Gods & Snow Paradise',
        state: 'Himachal Pradesh',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
          alt: 'Snow covered mountains in Manali Himachal Pradesh',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80', alt: 'Solang Valley Manali' },
          { url: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=80', alt: 'Hadimba Devi Temple Manali' },
          { url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80', alt: 'Rohtang Pass Snow Highway' },
        ],
        shortDescription: 'Nestled on the banks of Beas River, Manali offers breathtaking snow peaks, lush cedar forests, adventure sports in Solang Valley, and scenic mountain cafes.',
        detailedOverview: 'Manali is one of India’s most iconic hill stations, positioned at an altitude of 2,050 meters in the Kullu district of Himachal Pradesh. Renowned for its snow-capped Pir Panjal and Dhauladhar ranges, tranquil apple orchards, vibrant Old Manali cafes, and world-class road access via the Atal Tunnel to Lahaul Valley.',
        bestTimeToVisit: 'October to June for pleasant weather & paragliding; December to February for fresh snowfall.',
        idealTripDuration: '4 to 5 Days',
        nearestAirport: 'Bhuntar Airport, Kullu (50 km) / Chandigarh Airport (310 km)',
        nearestRailwayStation: 'Chandigarh Railway Station (300 km) / Kalka (280 km)',
        howToReach: {
          byAir: 'Fly into Kullu Bhuntar Airport (50 km) or Chandigarh International Airport (310 km) followed by our private taxi.',
          byTrain: 'Nearest major broad-gauge railhead is Chandigarh (CDG) or Kalka (KLK). Regular cab transfers are arranged.',
          byRoad: 'Connected via smooth 4-lane NH-21 from Chandigarh (approx. 7-8 hours scenic drive via Kiratpur-Nerchowk expressway).',
        },
        placesToVisit: [
          { name: 'Solang Valley', description: 'Hub of adventure sports including paragliding, zorbing, ATV rides, and winter skiing.', timing: '8:30 AM - 6:00 PM' },
          { name: 'Atal Tunnel & Sissu Waterfall', description: 'World longest high-altitude tunnel (9.02 km) leading to the dramatic Lahaul valley landscape and freezing waterfalls.', timing: 'Open 24 hrs (subject to weather)' },
          { name: 'Hadimba Devi Temple', description: 'Historic 1553 AD pagoda-style wooden temple dedicated to Goddess Hadimba surrounded by towering deodar forests.', timing: '8:00 AM - 6:30 PM' },
          { name: 'Old Manali & Manu Temple', description: 'Charming stone-and-wood village with bohemian cafes, live music, handicraft shops, and the ancient Manu Temple.', timing: 'All Day' },
          { name: 'Rohtang Pass (Snow Point)', description: 'Spectacular 3,978m mountain pass offering panoramic Himalayan glaciers and year-round snow play (Permit required).', timing: '6:00 AM - 4:00 PM (Closed on Tuesdays)' },
          { name: 'Jogini Waterfall', description: 'Scenic 3 km pine forest nature trek starting from Vashisht hot springs to a majestic cascade.', timing: 'Daylight hours' },
        ],
        thingsToDo: [
          { title: 'Paragliding in Solang Valley', description: 'Soar like an eagle with certified pilots overlooking snow peaks.' },
          { title: 'Drive through Atal Tunnel to Sissu', description: 'Experience the contrast between green Kullu and barren Lahaul valley.' },
          { title: 'Dip in Vashisht Sulphur Hot Springs', description: 'Natural medicinal thermal baths with therapeutic mineral waters.' },
          { title: 'White Water Rafting in Beas River', description: 'Exciting Grade II & III rapids at Raison / Kullu.' },
        ],
        suggestedItinerary: [
          { day: 1, title: 'Arrival in Manali & Local Sightseeing', description: 'Pickup from Chandigarh/Delhi, scenic drive to Manali, check-in, visit Hadimba Temple, Club House, and Mall Road.' },
          { day: 2, title: 'Solang Valley & Atal Tunnel Excursion', description: 'Full day adventure in Solang Valley, drive through Atal Tunnel to Sissu Lake and waterfall in Lahaul.' },
          { day: 3, title: 'Naggar Castle & Kullu Valley Tour', description: 'Visit historic wooden Naggar Castle, Nicholas Roerich Art Gallery, followed by river rafting and Kullu Shawl weaving centers.' },
          { day: 4, title: 'Vashisht Temple & Old Manali Stroll', description: 'Morning bath at Vashisht hot springs, hike to Jogini falls, evening cafe hopping in Old Manali.' },
          { day: 5, title: 'Departure with Sweet Memories', description: 'Check out after breakfast, shopping at local markets, and return drive to Chandigarh / Delhi.' },
        ],
        travelTips: [
          'Carry layered woolen clothes even in summer as evenings can get chilly.',
          'Pre-book Rohtang Pass permits in advance as daily vehicle caps apply.',
          'Always keep cash handy as network connectivity in remote spots like Sissu may vary.',
          'Travel in well-maintained cabs driven by local mountain drivers for safety.',
        ],
        faqs: [
          { question: 'What is the best month to see snowfall in Manali?', answer: 'December end through late February offers the highest probability of heavy snowfall in Manali town and Solang Valley.' },
          { question: 'How much time does it take from Chandigarh to Manali?', answer: 'With the new Kiratpur-Manali 4-lane expressway tunnels, travel time has reduced to around 6.5 to 7.5 hours by private taxi.' },
          { question: 'Is Manali safe for family trips and senior citizens?', answer: 'Yes, Manali is very safe and family-friendly with well-equipped hotels, accessible roads, and quality medical facilities.' },
        ],
        isFeatured: true,
        isPublished: true,
        seo: {
          metaTitle: 'Manali Tour Packages & Travel Guide | Baglamukhi Tour & Travels',
          metaDescription: 'Explore Manali with customized tour packages, taxi service from Chandigarh, luxury hotel stays, Solang Valley & Atal Tunnel trips.',
          canonicalUrl: 'http://localhost:5173/destinations/manali',
          focusKeyword: 'Manali tour package',
        },
      },
      {
        name: 'Shimla',
        slug: 'shimla',
        tagline: 'Queen of Hill Stations & Colonial Charm',
        state: 'Himachal Pradesh',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
          alt: 'Shimla Ridge and Christ Church Himachal Pradesh',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=800&q=80', alt: 'Kufri Snow and Nature Park' },
          { url: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80', alt: 'Jakhoo Temple Hanuman Statue Shimla' },
        ],
        shortDescription: 'The erstwhile British summer capital, Shimla boasts charming neo-Gothic architecture, pedestrian Mall Road, scenic toy train rides, and pine-clad hills.',
        detailedOverview: 'Shimla, the capital of Himachal Pradesh, stands proudly at 2,205 meters elevation. It is loved for its iconic Mall Road, historic Christ Church, Vice Regal Lodge, and panoramic viewpoints like Jakhoo Hill and Kufri.',
        bestTimeToVisit: 'March to June for cool summer breeze; November to February for snow at Kufri & Narkanda.',
        idealTripDuration: '3 to 4 Days',
        nearestAirport: 'Jubbarhatti Airport Shimla (22 km) / Chandigarh Airport (120 km)',
        nearestRailwayStation: 'Shimla Toy Train Station / Kalka Railway Station (90 km)',
        howToReach: {
          byAir: 'Fly to Chandigarh International Airport (120 km) followed by our comfortable 3-hour private cab.',
          byTrain: 'Take the scenic UNESCO Heritage Toy Train from Kalka to Shimla or drive up via Himalayan Expressway.',
          byRoad: 'Excellent four-lane highway connectivity from Chandigarh (approx. 3.5 hours drive).',
        },
        placesToVisit: [
          { name: 'The Ridge & Christ Church', description: 'Open cultural hub of Shimla featuring the iconic 1857 neo-Gothic stained glass church.', timing: 'Open all day' },
          { name: 'Mall Road & Lakkar Bazaar', description: 'Pedestrian shopping avenue with traditional Himachali woolen shawls, wooden crafts, and bakeries.', timing: '10:00 AM - 9:00 PM' },
          { name: 'Jakhoo Hill & Temple', description: 'Highest point in Shimla housing the world famous 108-foot colossal statue of Lord Hanuman.', timing: '7:00 AM - 7:00 PM' },
          { name: 'Kufri & Mahasu Peak', description: 'Winter adventure hotspot known for yak rides, horse riding, Himalayan Nature Park, and snow fun.', timing: '9:00 AM - 5:30 PM' },
          { name: 'Viceregal Lodge (IIAS)', description: 'Magnificent Scottish baronial style building with manicured gardens and rich colonial history.', timing: '9:30 AM - 5:00 PM (Closed Mondays)' },
        ],
        thingsToDo: [
          { title: 'Ride the Kalka-Shimla Toy Train', description: 'Experience 102 tunnels and over 800 bridges on the UNESCO heritage narrow gauge railway.' },
          { title: 'Take the Jakhoo Ropeway Cable Car', description: 'Enjoy aerial panoramic views of Shimla town and surrounding pine valleys.' },
          { title: 'Horse Riding at Kufri Green Valley', description: 'Ride through dense deodar forests to reach Mahasu Peak viewpoint.' },
        ],
        suggestedItinerary: [
          { day: 1, title: 'Arrival & Evening on Mall Road', description: 'Pickup from Chandigarh, scenic highway drive to Shimla, check-in, evening stroll on Mall Road and Ridge.' },
          { day: 2, title: 'Kufri & Jakhoo Temple Excursion', description: 'Day trip to Kufri, nature park, horse riding, followed by Jakhoo Hill ropeway and temple.' },
          { day: 3, title: 'Colonial Heritage & Departure', description: 'Visit Viceregal Lodge, Chadwick Falls, local shopping, and return transfer to Chandigarh.' },
        ],
        travelTips: [
          'Vehicles are not allowed on Mall Road and Ridge; be prepared for pleasant uphill walking.',
          'Keep sunglasses and sunscreen handy during bright sunny days in the hills.',
        ],
        faqs: [
          { question: 'How far is Shimla from Chandigarh?', answer: 'Shimla is approximately 115 km from Chandigarh and takes about 3 to 3.5 hours by private taxi.' },
          { question: 'Can we combine Shimla and Manali in one tour?', answer: 'Yes! Our most popular package is the 6 Days 5 Nights Shimla-Manali tour covering both destinations seamlessly.' },
        ],
        isFeatured: true,
        isPublished: true,
        seo: {
          metaTitle: 'Shimla Tour Packages & Taxi Service | Baglamukhi Tour & Travels',
          metaDescription: 'Book customized Shimla tour packages from Chandigarh. Includes private cab, Kufri sightseeing, Mall Road hotel stays, and toy train assistance.',
          canonicalUrl: 'http://localhost:5173/destinations/shimla',
          focusKeyword: 'Shimla tour package',
        },
      },
      {
        name: 'Dharamshala & McLeodganj',
        slug: 'dharamshala-mcleodganj',
        tagline: 'Little Lhasa & The Spiritual Abode of Dalai Lama',
        state: 'Himachal Pradesh',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
          alt: 'Dhauladhar Mountains and Buddhist Prayer Flags Dharamshala',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80', alt: 'Bhagsunag Waterfall McLeodganj' },
          { url: 'https://images.unsplash.com/photo-1596761611086-4f40445d4c82?auto=format&fit=crop&w=800&q=80', alt: 'HPCA Cricket Stadium Dharamshala' },
        ],
        shortDescription: 'Home to His Holiness the Dalai Lama, surrounded by majestic Dhauladhar snow peaks, Tibetan monasteries, cedar forests, and the world highest international cricket stadium.',
        detailedOverview: 'Dharamshala and upper McLeodganj offer a serene blend of Tibetan Buddhist culture, adventure trekking at Triund, tranquil tea gardens, and lush pine landscapes under the towering snow-covered Dhauladhar range.',
        bestTimeToVisit: 'September to June for sightseeing and pleasant weather.',
        idealTripDuration: '3 to 4 Days',
        nearestAirport: 'Gaggal Airport, Kangra (15 km)',
        nearestRailwayStation: 'Pathankot Cantt (85 km) / Kangra Toy Train Station',
        howToReach: {
          byAir: 'Fly directly into Kangra Gaggal Airport (15 km from Dharamshala) or Chandigarh (245 km).',
          byTrain: 'Pathankot Cantt (85 km) is the nearest broad gauge station with connecting taxi service.',
          byRoad: 'Convenient road drive from Chandigarh (approx. 5.5 hours) or Una / Jalandhar.',
        },
        placesToVisit: [
          { name: 'Tsuglagkhang Complex (Dalai Lama Temple)', description: 'Spiritual epicenter with the Namgyal Monastery, Tibetan museum, and serene prayer wheels.', timing: '6:00 AM - 6:00 PM' },
          { name: 'HPCA International Cricket Stadium', description: 'One of the most photogenic cricket grounds in the world overlooking snow peaks.', timing: '9:00 AM - 5:30 PM' },
          { name: 'Bhagsunag Waterfall & Temple', description: 'Ancient Shiva temple with freshwater spring and a picturesque cascading waterfall with Shiva Cafe.', timing: '7:00 AM - 6:00 PM' },
          { name: 'St. John in the Wilderness Church', description: 'Neo-Gothic church built in 1852 tucked inside deodar forests with Belgian stained glass windows.', timing: '8:00 AM - 5:00 PM' },
          { name: 'Norbulingka Institute', description: 'Cultural academy preserving traditional Tibetan thangka painting, woodcarving, and brass statues.', timing: '9:00 AM - 5:30 PM' },
        ],
        thingsToDo: [
          { title: 'Triund Day Trek', description: 'Scenic 9 km mountain trek to the Triund ridge offering panoramic views of Kangra Valley.' },
          { title: 'Tibetan Cooking & Meditation Workshop', description: 'Learn authentic momo making or attend mindfulness sessions in McLeodganj.' },
          { title: 'Kangra Tea Garden Walk', description: 'Stroll through lush aromatic tea estates and taste fresh green and black Kangra tea.' },
        ],
        suggestedItinerary: [
          { day: 1, title: 'Arrival & HPCA Stadium Visit', description: 'Pickup from Chandigarh / Pathankot, drive to Dharamshala, visit HPCA Stadium and Kangra tea gardens.' },
          { day: 2, title: 'McLeodganj Buddhist Heritage', description: 'Visit Dalai Lama Temple, Tibetan Market, Church in the Wilderness, and Bhagsunag waterfall.' },
          { day: 3, title: 'Norbulingka & Kangra Fort Excursion', description: 'Tour Norbulingka art center, historic Kangra Fort, and Brajeshwari Devi Temple.' },
        ],
        travelTips: [
          'Maintain silence and spin prayer wheels clockwise when visiting Tibetan monasteries.',
          'Try authentic Tibetan dishes like Thukpa, Tingmo, and butter tea.',
        ],
        faqs: [
          { question: 'Is Dharamshala connected by direct flights?', answer: 'Yes, Kangra Gaggal Airport (15 km) connects Dharamshala with Delhi and Chandigarh.' },
        ],
        isFeatured: true,
        isPublished: true,
        seo: {
          metaTitle: 'Dharamshala McLeodganj Tour Packages | Baglamukhi Tour & Travels',
          metaDescription: 'Book Dharamshala and McLeodganj holiday packages with private cabs, monastery tours, HPCA stadium visit, and comfortable hotel stays.',
          canonicalUrl: 'http://localhost:5173/destinations/dharamshala-mcleodganj',
          focusKeyword: 'Dharamshala tour package',
        },
      },
      {
        name: 'Amritsar',
        slug: 'amritsar',
        tagline: 'The Spiritual Golden Heart of Punjab',
        state: 'Punjab',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=1200&q=80',
          alt: 'Harmandir Sahib Golden Temple Amritsar illuminated at night',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80', alt: 'Sri Harmandir Sahib Sanctum' },
          { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', alt: 'Devotional pilgrims' },
        ],
        shortDescription: 'Holy city of Sri Harmandir Sahib (The Golden Temple), vibrant Punjabi culinary culture, Jallianwala Bagh memorial, and patriotic Wagah Border ceremony.',
        detailedOverview: 'Amritsar is the spiritual and cultural capital of Punjab, world renowned for the Golden Temple where thousands partake in the 24-hour community kitchen (Langar). It is also known for authentic Amritsari Kulcha, lassi, and the electrifying Wagah Border lowering of flags.',
        bestTimeToVisit: 'October to March for cool and pleasant weather.',
        idealTripDuration: '2 to 3 Days',
        nearestAirport: 'Sri Guru Ram Dass Jee International Airport, Amritsar (ATQ)',
        nearestRailwayStation: 'Amritsar Junction (ASR)',
        howToReach: {
          byAir: 'Direct international and domestic flights to Sri Guru Ram Dass Jee Airport (ATQ).',
          byTrain: 'Direct superfast trains (Shatabdi/Vande Bharat) from Delhi and Chandigarh.',
          byRoad: 'Connected via Grand Trunk Road (NH-1 / NH-44) from Chandigarh (4 hours drive) and Delhi.',
        },
        placesToVisit: [
          { name: 'Sri Harmandir Sahib (Golden Temple)', description: 'Most sacred shrine of Sikhism covered in 500+ kg of gold leaf, surrounded by the holy Amrit Sarovar pool.', timing: 'Open 24 Hours' },
          { name: 'Attari-Wagah Border', description: 'International border flag-lowering military drill ceremony performed with patriotic fervor.', timing: '3:30 PM - 6:00 PM' },
          { name: 'Jallianwala Bagh', description: 'Historic public garden memorial commemorating the martyrs of 1919 with original bullet marks preserved.', timing: '6:30 AM - 7:30 PM' },
          { name: 'Partition Museum', description: 'World first museum dedicated to the 1947 partition of India housed in the restored Town Hall.', timing: '10:00 AM - 6:00 PM (Closed Mondays)' },
        ],
        thingsToDo: [
          { title: 'Taste Authentic Amritsari Kulcha & Lassi', description: 'Indulge in crispy tandoori stuffed kulchas with homemade butter at famous local joints.' },
          { title: 'Witness Palki Sahib Ceremony', description: 'Late evening ceremonial procession carrying the holy Guru Granth Sahib to the sanctum.' },
        ],
        suggestedItinerary: [
          { day: 1, title: 'Golden Temple & Wagah Border', description: 'Arrival in Amritsar, visit Golden Temple & Jallianwala Bagh, afternoon drive to Wagah border ceremony.' },
          { day: 2, title: 'Heritage Walk, Shopping & Departure', description: 'Explore Partition Museum, Hall Bazaar for Phulkari dupattas and juttis, and return transfer.' },
        ],
        travelTips: [
          'Cover your head with a scarf or bandana and remove shoes before entering Golden Temple premises.',
          'Reach Wagah Border by 3:00 PM to secure good seating in the tourist gallery.',
        ],
        faqs: [
          { question: 'How far is Amritsar from Chandigarh?', answer: 'Amritsar is approximately 225 km from Chandigarh and takes about 4 hours via highway.' },
        ],
        isFeatured: true,
        isPublished: true,
        seo: {
          metaTitle: 'Amritsar Tour Packages & Taxi Service | Baglamukhi Tour & Travels',
          metaDescription: 'Book Amritsar Golden Temple tour packages and Chandigarh to Amritsar taxi service with Wagah border ceremony assistance.',
          canonicalUrl: 'http://localhost:5173/destinations/amritsar',
          focusKeyword: 'Amritsar tour package',
        },
      },
      {
        name: 'Dalhousie & Khajjiar',
        slug: 'dalhousie-khajjiar',
        tagline: 'Mini Switzerland of India & Colonial Pine Hills',
        state: 'Himachal Pradesh',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
          alt: 'Khajjiar Green Meadow and Lake Dalhousie',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', alt: 'Dainkund Peak Dalhousie' },
        ],
        shortDescription: 'Quiet colonial hill retreat spanning five hills, featuring dense oak and deodar forests, church architecture, and the emerald meadow of Khajjiar.',
        detailedOverview: 'Dalhousie is an idyllic hill station named after Lord Dalhousie, set against the backdrop of snow-capped Pir Panjal peaks. A short drive away lies Khajjiar, famously christened "Mini Switzerland of India" for its saucer-shaped green meadow and floating island lake.',
        bestTimeToVisit: 'March to June for greenery; December to February for snow wonderland.',
        idealTripDuration: '3 Days',
        nearestAirport: 'Pathankot (80 km) / Gaggal Kangra (110 km)',
        nearestRailwayStation: 'Pathankot Cantt (80 km)',
        howToReach: {
          byAir: 'Nearest airport is Gaggal or Amritsar, followed by private taxi transfer.',
          byTrain: 'Pathankot Cantt (PTKC) is well connected to major Indian cities.',
          byRoad: 'Scenic road drive from Pathankot (2.5 hours) or Chandigarh (6.5 hours).',
        },
        placesToVisit: [
          { name: 'Khajjiar Lake & Meadow', description: 'Saucer-shaped alpine meadow surrounded by cedar forest with horse riding and zorbing.', timing: 'All Day' },
          { name: 'Dainkund Peak (Singing Hill)', description: 'Highest viewpoint in Dalhousie offering 360-degree vistas of the Himalayan valleys.', timing: 'Daylight hours' },
          { name: 'Panchpula & Satdhara Falls', description: 'Pleasant picnic stream dedicated to freedom fighter Sardar Ajit Singh with natural mineral springs.', timing: '8:00 AM - 6:00 PM' },
        ],
        thingsToDo: [
          { title: 'Zorbing & Horse Riding in Khajjiar', description: 'Roll down lush green slopes in giant inflatable zorb balls.' },
          { title: 'Trek to Kalatop Wildlife Sanctuary', description: 'Walk amidst dense deodar woods home to Himalayan black bears and barking deer.' },
        ],
        suggestedItinerary: [
          { day: 1, title: 'Arrival & Dalhousie Churches', description: 'Pickup, check-in, visit St. John Church and Subhash Chowk.' },
          { day: 2, title: 'Full Day Khajjiar & Kalatop', description: 'Excursion to Khajjiar Mini Switzerland and Kalatop forest.' },
          { day: 3, title: 'Dainkund Peak & Departure', description: 'Hike to Dainkund singing peak and return journey.' },
        ],
        travelTips: ['Carry warm clothing as high elevation makes evenings breezy.'],
        faqs: [
          { question: 'Why is Khajjiar called Mini Switzerland?', answer: 'In 1992, the Swiss Envoy officially recognized Khajjiar for its exact topographical resemblance to Switzerland.' },
        ],
        isFeatured: false,
        isPublished: true,
        seo: {
          metaTitle: 'Dalhousie & Khajjiar Tour Packages | Baglamukhi Tour & Travels',
          metaDescription: 'Book Dalhousie Khajjiar holiday packages with private cabs, forest cottages, sightseeing of Mini Switzerland and Dainkund peak.',
          canonicalUrl: 'http://localhost:5173/destinations/dalhousie-khajjiar',
          focusKeyword: 'Dalhousie Khajjiar tour package',
        },
      },
    ];

    const createdDestinations = await Destination.insertMany(destinationsData);
    console.log(`[Seed] Seeded ${createdDestinations.length} Destinations.`);

    // 4. Create Tour Packages
    const toursData = [
      {
        title: 'Manali Deluxe 5 Days 4 Nights Holiday Tour Package',
        slug: 'manali-deluxe-5-days-tour-package',
        destination: 'Manali',
        destinationRef: createdDestinations[0]._id,
        category: 'Family',
        duration: { days: 5, nights: 4, label: '5 Days / 4 Nights' },
        price: { startingPrice: 12499, discountedPrice: 15999, perPerson: true, currency: 'INR' },
        pickupDrop: { pickupLocation: 'Chandigarh / Delhi Airport', dropLocation: 'Chandigarh / Delhi' },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
          alt: 'Manali Snow Mountain Tour Package with Baglamukhi Tour and Travels',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80', alt: 'Solang Valley Adventure' },
          { url: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=80', alt: 'Hadimba Devi Temple' },
        ],
        overview: 'Experience the ultimate 5-day Manali getaway with dedicated private cab, 3-star mountain view hotel stays, daily breakfast & dinner, Solang Valley paragliding, Atal Tunnel drive to Sissu Lahaul, and Kullu river rafting.',
        highlights: [
          'Private Sedan / SUV Cab throughout the tour with mountain-certified driver',
          '4 Nights Accommodation in Premium Hotel with private balcony',
          'Daily Buffet Breakfast and Multi-Cuisine Dinner included',
          'Full-day adventure excursion to Solang Valley & Atal Tunnel Sissu',
          'Heritage visit to 500-year-old Hadimba Devi Temple & Vashisht Hot Springs',
          'All toll taxes, state tourist permits, fuel charges, and driver allowances included',
        ],
        itinerary: [
          {
            day: 1,
            title: 'Chandigarh to Manali Scenic Drive (approx. 270 km / 7 hrs)',
            description: 'Our professional driver greets you at Chandigarh Airport or Railway Station. Enjoy a smooth ride along the scenic Kiratpur-Manali expressway, passing Sundernagar Lake, Pandoh Dam, and Hanogi Mata Temple. Check in to your hotel in Manali and relax.',
            meals: 'Dinner',
            hotel: 'Deluxe Hotel Manali with River/Valley View',
            activities: ['Scenic Highway Drive', 'Pandoh Dam Viewpoint', 'Hotel Check-in & Rest'],
          },
          {
            day: 2,
            title: 'Manali Local Sightseeing & Heritage Exploration',
            description: 'After breakfast, visit the historic Hadimba Devi Temple set amidst tall cedar trees. Proceed to the Tibetan Monastery, Club House, and the ancient Vashisht village natural hot sulphur springs. Spend the evening exploring the lively Mall Road.',
            meals: 'Breakfast, Dinner',
            hotel: 'Deluxe Hotel Manali',
            activities: ['Hadimba Temple', 'Vashisht Hot Springs', 'Mall Road Shopping'],
          },
          {
            day: 3,
            title: 'Solang Valley & Atal Tunnel to Sissu (Lahaul Valley)',
            description: 'Embark on an exhilarating day trip to Solang Valley for paragliding and zorbing. Then cross the engineering marvel Atal Tunnel (9.02 km) to enter the stunning snow landscapes of Sissu in Lahaul Valley.',
            meals: 'Breakfast, Dinner',
            hotel: 'Deluxe Hotel Manali',
            activities: ['Solang Valley Sports', 'Atal Tunnel Drive', 'Sissu Waterfall'],
          },
          {
            day: 4,
            title: 'Naggar Castle, Art Gallery & Kullu River Rafting',
            description: 'Visit the historic wood-and-stone Naggar Castle overlooking the Beas valley. Stop at the Nicholas Roerich Art Gallery and Shawl weaving factories in Kullu. Optional white water river rafting in Beas river.',
            meals: 'Breakfast, Dinner',
            hotel: 'Deluxe Hotel Manali',
            activities: ['Naggar Castle', 'Kullu River Rafting', 'Shawl Factory Tour'],
          },
          {
            day: 5,
            title: 'Manali to Chandigarh Return Transfer',
            description: 'Enjoy a leisurely breakfast, check out of the hotel, and proceed on your comfortable return journey to Chandigarh Airport or Railway Station with unforgettable memories.',
            meals: 'Breakfast',
            hotel: 'Departure',
            activities: ['Souvenir Shopping', 'Return Cab Drive to Chandigarh'],
          },
        ],
        inclusions: [
          '4 Nights Deluxe Hotel Accommodation on double sharing basis',
          'Daily 4 Breakfasts and 4 Dinners at hotel restaurant',
          'Dedicated Private Cab (Dzire / Etios / Ertiga / Innova) for all transfers and sightseeing',
          'All toll taxes, parking fees, driver allowance, and state border taxes',
          'Solang Valley & Atal Tunnel excursion assistance',
          '24/7 dedicated on-call tour coordinator support',
        ],
        exclusions: [
          'Airfare or Train tickets to/from Chandigarh',
          'Adventure activities tickets (Paragliding, River Rafting, Skiing)',
          'Rohtang Pass NGT environmental permit charges (if opted)',
          'Personal expenses, laundry, heater charges, and tips',
        ],
        hotelDetails: {
          hotelType: '3 Star Deluxe / 4 Star Premium Mountain View',
          stayDetails: 'Spacious rooms with private balcony, central heating/heaters, tea-coffee maker, and free Wi-Fi.',
        },
        transportation: 'Dedicated Private AC Cab (AC turned off in hill sections for vehicle safety) with expert hill driver.',
        cancellationPolicy: '100% refund on cancellation 10 days prior to departure. 50% refund between 9 to 4 days.',
        faqs: [
          { question: 'Is cab pickup from Delhi available for this tour?', answer: 'Yes, we can easily arrange pickup and drop from Delhi Airport or your residence at a nominal differential fare.' },
          { question: 'Can this itinerary be customized for couples or larger families?', answer: 'Absolutely. We specialize in fully customizable tour plans suited to your pace and budget.' },
        ],
        reviewsCount: 142,
        avgRating: 4.9,
        isFeatured: true,
        isPopular: true,
        isPublished: true,
        seo: {
          metaTitle: '5 Days Manali Tour Package from Chandigarh | Baglamukhi Tour & Travels',
          metaDescription: 'Book 5 Days 4 Nights Manali holiday package with private cab, hotel, meals, Solang Valley, Atal Tunnel & Kullu rafting. Best price guarantee.',
          canonicalUrl: 'http://localhost:5173/tours/manali-deluxe-5-days-tour-package',
          focusKeyword: '5 days Manali tour package',
        },
      },
      {
        title: 'Shimla Manali Combined 6 Days 5 Nights Complete Tour Package',
        slug: 'shimla-manali-combined-6-days-package',
        destination: 'Shimla & Manali',
        category: 'Family',
        duration: { days: 6, nights: 5, label: '6 Days / 5 Nights' },
        price: { startingPrice: 15999, discountedPrice: 19999, perPerson: true, currency: 'INR' },
        pickupDrop: { pickupLocation: 'Chandigarh / Delhi Airport', dropLocation: 'Chandigarh / Delhi' },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80',
          alt: 'Shimla Manali 6 Days holiday tour package',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=800&q=80', alt: 'Kufri Shimla View' },
          { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', alt: 'Manali Mountains' },
        ],
        overview: 'The most popular Himachal holiday package covering both the colonial queen of hills Shimla and the alpine wonderland of Manali in 6 unforgettable days with private chauffeur service.',
        highlights: [
          '2 Nights in Shimla & 3 Nights in Manali in curated scenic hotels',
          'Visit Kufri, Mall Road, Ridge, and Jakhoo Temple in Shimla',
          'Explore Solang Valley, Atal Tunnel, Sissu, and Kullu Valley',
          'Dedicated private cab for all 6 days from Chandigarh to Chandigarh',
          'Daily delicious buffet breakfast and dinner included',
        ],
        itinerary: [
          { day: 1, title: 'Chandigarh to Shimla (115 km / 3.5 hrs)', description: 'Pickup from Chandigarh and picturesque drive to Shimla. Evening at leisure strolling along Mall Road and Ridge.', meals: 'Dinner', hotel: 'Deluxe Hotel Shimla' },
          { day: 2, title: 'Shimla & Kufri Excursion', description: 'Day tour of Kufri, Himalayan Nature Park, horse riding at Mahasu peak, followed by Jakhoo Hill and Christ Church.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel Shimla' },
          { day: 3, title: 'Shimla to Manali via Kullu Valley (250 km / 7 hrs)', description: 'Scenic mountain transfer to Manali passing Pandoh Dam, Sundernagar Lake, and Kullu valley.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel Manali' },
          { day: 4, title: 'Solang Valley & Atal Tunnel Tour', description: 'Full day adventure at Solang Valley and drive through Atal Tunnel to Sissu waterfall.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel Manali' },
          { day: 5, title: 'Manali Local Sightseeing & River Rafting', description: 'Visit Hadimba Temple, Vashisht Hot Springs, Old Manali, and river rafting at Kullu.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel Manali' },
          { day: 6, title: 'Manali to Chandigarh Departure', description: 'Breakfast, check-out, and return transfer to Chandigarh airport/railway station.', meals: 'Breakfast', hotel: 'Departure' },
        ],
        inclusions: ['5 Nights Hotel Stay', 'Daily Breakfast & Dinner', 'Private Cab for 6 Days', 'All Taxes & Tolls'],
        exclusions: ['Activity charges', 'Rohtang Pass fee', 'Flight/Train tickets'],
        hotelDetails: { hotelType: '3 Star Deluxe / 4 Star Option', stayDetails: 'Handpicked verified mountain view properties.' },
        transportation: 'Dedicated Private Cab with experienced Himachal mountain chauffeur.',
        cancellationPolicy: 'Full refund 10 days before tour date.',
        faqs: [
          { question: 'Is this tour suitable for kids and senior citizens?', answer: 'Yes, this is our top-selling family itinerary with comfortable driving breaks and accessible tourist spots.' },
        ],
        reviewsCount: 218,
        avgRating: 4.95,
        isFeatured: true,
        isPopular: true,
        isPublished: true,
        seo: {
          metaTitle: 'Shimla Manali 6 Days Tour Package | Baglamukhi Tour & Travels',
          metaDescription: 'Book 6 Days 5 Nights Shimla Manali tour package from Chandigarh. Includes private car, 3-star hotel stays, meals, Kufri & Solang Valley.',
          canonicalUrl: 'http://localhost:5173/tours/shimla-manali-combined-6-days-package',
          focusKeyword: 'Shimla Manali tour package',
        },
      },
      {
        title: '9 Devi Darshan Himachal & Punjab Pilgrimage Tour Package',
        slug: '9-devi-darshan-himachal-pilgrimage-package',
        destination: 'Himachal & Punjab',
        category: 'Pilgrimage',
        duration: { days: 6, nights: 5, label: '6 Days / 5 Nights' },
        price: { startingPrice: 14499, discountedPrice: 17999, perPerson: true, currency: 'INR' },
        pickupDrop: { pickupLocation: 'Chandigarh / Una / Delhi', dropLocation: 'Chandigarh / Amritsar' },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
          alt: 'Mata Vaishno Devi and Himachal Devi Darshan Tour',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1514222788835-3a1a1d5b32f8?auto=format&fit=crop&w=800&q=80', alt: 'Amritsar Golden Temple' },
        ],
        overview: 'A spiritually enriching pilgrimage covering Mata Mansa Devi, Naina Devi, Chintpurni Mata, Jwala Ji, Brajeshwari Kangra Devi, Chamunda Devi, Baglamukhi Temple, and Golden Temple Amritsar.',
        highlights: [
          'VIP Darshan guidance at renowned Shaktipeeths of Himachal Pradesh',
          'Visit historic Maa Baglamukhi Temple at Bankhandi Kangra',
          'Private comfortable AC Cab / Tempo Traveller suitable for family & seniors',
          'Clean vegetarian hotels near temple premises',
        ],
        itinerary: [
          { day: 1, title: 'Chandigarh to Mata Mansa Devi & Naina Devi', description: 'Pickup from Chandigarh, darshan at Mata Mansa Devi, then drive to holy Naina Devi overlooking Gobind Sagar Lake.', meals: 'Dinner', hotel: 'Deluxe Hotel Bilaspur / Una' },
          { day: 2, title: 'Chintpurni Mata & Jwala Ji Temple', description: 'Morning darshan at Maa Chintpurni Devi followed by the eternal flame shrine of Maa Jwala Ji.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel Jwala Ji / Kangra' },
          { day: 3, title: 'Mata Brajeshwari Devi & Maa Baglamukhi Temple', description: 'Visit ancient Kangra Shaktipeeth and perform special havana at holy Maa Baglamukhi temple Bankhandi.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel Kangra / Dharamshala' },
          { day: 4, title: 'Chamunda Devi Temple & Dharamshala', description: 'Morning blessings at Chamunda Nandikeshwar Dham, visit Dalai Lama Temple and HPCA stadium.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel Dharamshala' },
          { day: 5, title: 'Dharamshala to Golden Temple Amritsar', description: 'Drive to sacred Amritsar, evening visit to Sri Harmandir Sahib (Golden Temple) for Palki Sahib ceremony.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel Amritsar' },
          { day: 6, title: 'Wagah Border & Return Drop', description: 'Visit Jallianwala Bagh, Durgiana Temple, and drop at Amritsar / Chandigarh railway station.', meals: 'Breakfast', hotel: 'Departure' },
        ],
        inclusions: ['5 Nights Pure Vegetarian Hotel Stays', 'Breakfast & Dinner', 'Private Cab for all 6 Days', 'All Toll Taxes'],
        exclusions: ['Personal pooja samagri charges', 'Train/Airfare'],
        hotelDetails: { hotelType: '3 Star Pure Veg Family Hotels', stayDetails: 'Located near temple complexes with elevator and senior citizen access.' },
        transportation: 'Spacious AC Cab / Innova / Tempo Traveller with polite devotional drivers.',
        cancellationPolicy: 'Free cancellation up to 7 days before trip.',
        faqs: [
          { question: 'Is special assistance available for elderly parents?', answer: 'Yes, our drivers assist with ropeway tickets and nearest parking spots for easy temple access.' },
        ],
        reviewsCount: 165,
        avgRating: 4.98,
        isFeatured: true,
        isPopular: true,
        isPublished: true,
        seo: {
          metaTitle: '9 Devi Darshan Himachal Tour Package | Baglamukhi Tour & Travels',
          metaDescription: 'Book sacred 9 Devi Darshan yatra covering Naina Devi, Chintpurni, Jwala Ji, Chamunda, Baglamukhi, and Golden Temple Amritsar.',
          canonicalUrl: 'http://localhost:5173/tours/9-devi-darshan-himachal-pilgrimage-package',
          focusKeyword: '9 devi darshan tour package',
        },
      },
      {
        title: 'Spiti Valley High Altitude Road Trip & 4x4 Expedition (7 Days)',
        slug: 'spiti-valley-7-days-road-trip',
        destination: 'Spiti Valley',
        category: 'Adventure',
        duration: { days: 7, nights: 6, label: '7 Days / 6 Nights' },
        price: { startingPrice: 22999, discountedPrice: 27999, perPerson: true, currency: 'INR' },
        pickupDrop: { pickupLocation: 'Chandigarh / Manali', dropLocation: 'Chandigarh / Manali' },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=80',
          alt: 'Spiti Valley road trip 4x4 expedition Himalayas',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80', alt: 'Chandratal Lake Spiti' },
        ],
        overview: 'An epic Himalayan odyssey to the middle land of Spiti Valley, visiting Key Monastery, highest post office Hikkim, fossil village Langza, and the mystical turquoise crescent of Chandratal Lake.',
        highlights: [
          'High clearance 4x4 / SUV vehicle with extreme terrain mountain driver',
          'Visit world highest post office at Hikkim (4,440 m) & post a postcard',
          'Camp under million stars at Chandratal Moon Lake',
          'Centuries-old Key and Tabo Monasteries exploration',
        ],
        itinerary: [
          { day: 1, title: 'Manali to Kaza via Atal Tunnel & Kunzum Pass', description: 'Drive over 4,590m Kunzum Pass to Kaza.', meals: 'Dinner', hotel: 'Spiti Hotel / Homestay Kaza' },
          { day: 2, title: 'Key Monastery & Kibber High Village', description: 'Visit 1000-year-old Key Gompa and Chicham suspension bridge.', meals: 'Breakfast, Dinner', hotel: 'Kaza' },
          { day: 3, title: 'Hikkim, Komic & Langza Buddha Statue', description: 'Drive to world highest inhabited villages.', meals: 'Breakfast, Dinner', hotel: 'Kaza' },
          { day: 4, title: 'Dhankar Monastery & Tabo Caves', description: 'Explore ancient cliff monastery of Dhankar and UNESCO site Tabo.', meals: 'Breakfast, Dinner', hotel: 'Tabo / Kaza' },
          { day: 5, title: 'Kaza to Chandratal Moon Lake Camping', description: 'Trek around mystical Chandratal lake and luxury camp stay.', meals: 'Breakfast, Dinner', hotel: 'Chandratal Swiss Tents' },
          { day: 6, title: 'Chandratal to Manali via Batal & Rohtang', description: 'Adventurous drive back to Manali.', meals: 'Breakfast, Dinner', hotel: 'Manali Resort' },
          { day: 7, title: 'Manali to Chandigarh Drop', description: 'Return transfer to Chandigarh.', meals: 'Breakfast', hotel: 'Departure' },
        ],
        inclusions: ['6 Nights Homestays & Swiss Tents', 'Breakfast & Dinner', 'Dedicated 4x4 SUV', 'Inner line permits'],
        exclusions: ['Personal oxygen cylinder fees', 'Airfare'],
        hotelDetails: { hotelType: 'Traditional Spitian Homestays & Alpine Camps', stayDetails: 'Warm local hospitality with heavy duvets and tandoor heating.' },
        transportation: 'Robust 4WD SUV (Innova / Scorpio / 4x4 Bolero / Isuzu).',
        cancellationPolicy: 'Free cancellation up to 14 days before trip.',
        faqs: [
          { question: 'What is the best time for Spiti Valley road trip?', answer: 'June to mid-October is ideal when all mountain passes including Kunzum are open.' },
        ],
        reviewsCount: 76,
        avgRating: 4.92,
        isFeatured: true,
        isPopular: true,
        isPublished: true,
        seo: {
          metaTitle: 'Spiti Valley Road Trip & 4x4 Tour Package | Baglamukhi Tour & Travels',
          metaDescription: 'Embark on a 7 Days Spiti Valley expedition from Chandigarh/Manali. Visit Chandratal Lake, Key Monastery, Hikkim and Komic with 4x4 SUVs.',
          canonicalUrl: 'http://localhost:5173/tours/spiti-valley-7-days-road-trip',
          focusKeyword: 'Spiti valley tour package',
        },
      },
      {
        title: 'Weekend Shimla & Kasauli Short Getaway from Chandigarh (3 Days)',
        slug: 'shimla-kasauli-weekend-trip-from-chandigarh',
        destination: 'Shimla & Kasauli',
        category: 'Weekend',
        duration: { days: 3, nights: 2, label: '3 Days / 2 Nights' },
        price: { startingPrice: 7999, discountedPrice: 9999, perPerson: true, currency: 'INR' },
        pickupDrop: { pickupLocation: 'Chandigarh / Mohali / Panchkula', dropLocation: 'Chandigarh' },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=800&q=80',
          alt: 'Shimla Kasauli weekend getaway tour',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80', alt: 'Shimla Ridge' },
        ],
        overview: 'A rejuvenating quick weekend break from Chandigarh exploring the colonial serenity of Kasauli Gilbert Trail, Sunset Point, and the vibrant heritage of Shimla.',
        highlights: [
          'Quick 2.5 hour scenic drive from Chandigarh tricities',
          '1 Night in Kasauli pine cottage & 1 Night in Shimla',
          'Gilbert Nature Trail, Christ Church Kasauli & Mall Road Shimla',
        ],
        itinerary: [
          { day: 1, title: 'Chandigarh to Kasauli Nature Retreat', description: 'Morning pickup from Chandigarh, drive to Kasauli, Gilbert Nature trail walk and sunset point.', meals: 'Dinner', hotel: 'Pine Cottage Kasauli' },
          { day: 2, title: 'Kasauli to Shimla & Mall Road Stroll', description: 'Drive to Shimla, visit Ridge and Mall Road.', meals: 'Breakfast, Dinner', hotel: 'Deluxe Hotel Shimla' },
          { day: 3, title: 'Kufri Sightseeing & Return to Chandigarh', description: 'Morning trip to Kufri and afternoon drop back to Chandigarh.', meals: 'Breakfast', hotel: 'Departure' },
        ],
        inclusions: ['2 Nights Hotel Stay', 'Breakfast & Dinner', 'Private Cab for 3 Days'],
        exclusions: ['Personal expenses'],
        hotelDetails: { hotelType: '3 Star Deluxe Hill Properties', stayDetails: 'Balcony rooms with valley view.' },
        transportation: 'Dedicated Private AC Sedan Cab.',
        cancellationPolicy: 'Free cancellation up to 4 days prior.',
        faqs: [],
        reviewsCount: 95,
        avgRating: 4.88,
        isFeatured: false,
        isPopular: true,
        isPublished: true,
        seo: {
          metaTitle: 'Shimla Kasauli Weekend Tour Package from Chandigarh | Baglamukhi Tour & Travels',
          metaDescription: 'Book a 3 Days 2 Nights weekend break to Shimla & Kasauli from Chandigarh with private car, meals, and scenic hotel stays.',
          canonicalUrl: 'http://localhost:5173/tours/shimla-kasauli-weekend-trip-from-chandigarh',
          focusKeyword: 'weekend trip from Chandigarh',
        },
      },
    ];

    const createdTours = await Tour.insertMany(toursData);
    console.log(`[Seed] Seeded ${createdTours.length} Tour Packages.`);

    // 5. Create Local SEO Locations
    const locationsData = [
      {
        cityName: 'Chandigarh',
        state: 'Chandigarh UT / Punjab',
        slug: 'chandigarh',
        title: 'Best Tour & Travel Agency in Chandigarh | Himachal Tour Packages & Cabs',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
          alt: 'Tour and travel agency in Chandigarh Baglamukhi Tour & Travels',
        },
        shortIntro: 'Looking for the best tour and travel agency in Chandigarh? Baglamukhi Tour & Travels offers verified Himachal tour packages, Shimla Manali cabs, airport taxi transfers, and tempo traveller rentals at guaranteed lowest prices.',
        fullDescription: 'Baglamukhi Tour & Travels operates a full-service travel desk in Chandigarh serving travelers across Sector 17, Sector 35, Sector 43 ISBT, and Chandigarh International Airport (IXC). We provide top-maintained private cabs (Dzire, Innova Crysta, Ertiga) and tempo travellers for all hill stations including Shimla, Manali, Dharamshala, Dalhousie, and Spiti Valley with experienced mountain-certified drivers.',
        servicesOffered: [
          { title: 'Himachal Holiday Tour Packages', description: 'Customized Shimla, Manali, Dharamshala, and Spiti tour packages starting directly with door-to-door cab pickup from Chandigarh.' },
          { title: 'Chandigarh to Manali Taxi Service', description: 'One-way and round-trip private cabs on the newly opened 4-lane expressway with travel time of just 6.5 hours.' },
          { title: 'Chandigarh Airport (IXC) Transfers', description: 'On-time 24/7 airport pickups and drops to all Punjab, Haryana, and Himachal destinations.' },
          { title: 'Tempo Traveller Rental in Chandigarh', description: '9, 12, 16, 20 & 26 seater luxury pushback tempo travellers for corporate groups and extended family trips.' },
        ],
        popularRoutes: [
          { destination: 'Chandigarh to Manali', distance: '270 km', duration: '6.5 - 7.5 hrs', startingPrice: 4499 },
          { destination: 'Chandigarh to Shimla', distance: '115 km', duration: '3.5 hrs', startingPrice: 2499 },
          { destination: 'Chandigarh to Dharamshala', distance: '245 km', duration: '5.5 hrs', startingPrice: 4199 },
          { destination: 'Chandigarh to Amritsar', distance: '225 km', duration: '4 hrs', startingPrice: 3799 },
          { destination: 'Chandigarh to Delhi Airport', distance: '250 km', duration: '4 hrs', startingPrice: 3299 },
        ],
        nearbyAttractions: [
          { name: 'Rock Garden of Chandigarh', distance: 'Within city', highlights: 'Sculptures crafted from recycled industrial waste by Nek Chand.' },
          { name: 'Sukhna Lake', distance: 'Within city', highlights: 'Serene man-made lake at the foothills of Shivalik mountains with boating.' },
        ],
        localOfficeDetails: {
          address: 'Office No. 44, Ground Floor, Sector 43-B, Near ISBT & Highway, Chandigarh, 160043',
          phone: '+91 98051 43007',
          whatsapp: '+919805143007',
          email: 'chandigarh@baglamukhitourtravels.com',
          operatingHours: '24 Hours / 7 Days a Week',
          mapEmbedUrl: 'https://maps.google.com',
        },
        faqs: [
          { question: 'Where is Baglamukhi Tour & Travels office located in Chandigarh?', answer: 'Our central dispatch hub is located near Sector 43 ISBT, facilitating quick pickups across Chandigarh, Mohali, and Panchkula.' },
          { question: 'Do you provide airport taxi service at Chandigarh Airport?', answer: 'Yes, we provide 24x7 advance-booked airport taxi transfers with flight tracking and punctual chauffeurs.' },
        ],
        isPublished: true,
        seo: {
          metaTitle: 'Tour and Travel Agency in Chandigarh | Cabs & Tour Packages',
          metaDescription: 'Top-rated travel agency in Chandigarh for Himachal holiday packages, Shimla Manali taxi service, airport transfers, and tempo traveller rental.',
          canonicalUrl: 'http://localhost:5173/locations/chandigarh',
          focusKeyword: 'tour and travel agency in Chandigarh',
        },
      },
      {
        cityName: 'Mohali',
        state: 'Punjab',
        slug: 'mohali',
        title: 'Tour & Travel Operator in Mohali | Himachal Taxi & Holiday Packages',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
          alt: 'Mohali cab and travel booking services',
        },
        shortIntro: 'Reliable tour operator and taxi provider in SAS Nagar Mohali. Enjoy doorstep cab pickup for Shimla, Manali, Dharamshala, and luxury tempo traveller hire.',
        fullDescription: 'Baglamukhi Tour & Travels delivers premium cab services and holiday packages across Phase 1 to 11 Mohali, Aerocity, IT City, and Sector 70. Whether you require a weekend taxi to Kasauli or an all-inclusive 6-day family holiday to Manali, our verified fleet is at your service 24/7.',
        servicesOffered: [
          { title: 'Mohali to Himachal Taxi Service', description: 'Affordable one-way and roundtrip cabs to Shimla, Manali, Kullu, Kasol, and Dalhousie.' },
          { title: 'Airport Pickups from Aerocity Mohali', description: 'Punctual transfer directly to Chandigarh International Airport and New Delhi.' },
        ],
        popularRoutes: [
          { destination: 'Mohali to Manali', distance: '275 km', duration: '7 hrs', startingPrice: 4499 },
          { destination: 'Mohali to Shimla', distance: '120 km', duration: '3.5 hrs', startingPrice: 2499 },
        ],
        nearbyAttractions: [{ name: 'PCA Stadium Mohali', distance: 'Within city', highlights: 'Iconic world-class cricket venue.' }],
        localOfficeDetails: {
          address: 'Main Highway Road, Phase 7 / Sector 70, SAS Nagar Mohali, Punjab',
          phone: '+91 98051 43007',
          whatsapp: '+919805143007',
          email: 'mohali@baglamukhitourtravels.com',
          operatingHours: '24/7 Booking Support',
        },
        faqs: [],
        isPublished: true,
        seo: {
          metaTitle: 'Tour and Travel Agency in Mohali | Cabs & Himachal Packages',
          metaDescription: 'Book reliable taxi service and tour packages in Mohali with Baglamukhi Tour & Travels. Best rates for Shimla, Manali, and airport cabs.',
          canonicalUrl: 'http://localhost:5173/locations/mohali',
          focusKeyword: 'travel agency in Mohali',
        },
      },
      {
        cityName: 'Zirakpur',
        state: 'Punjab',
        slug: 'zirakpur',
        title: 'Taxi Service & Tour Operator in Zirakpur | Himachal Cabs & Trips',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
          alt: 'Zirakpur taxi service and tour packages',
        },
        shortIntro: 'Gateway to Himachal Pradesh! Book reliable taxi services and holiday tour packages from Zirakpur highway junction with Baglamukhi Tour & Travels.',
        fullDescription: 'Located strategically on the Chandigarh-Shimla and Delhi-Amritsar highway crossroads, our Zirakpur hub ensures rapid 15-minute cab dispatch for VIP tourists, corporate travelers, and families heading to Himachal hills.',
        servicesOffered: [
          { title: 'Highway Taxi Dispatch', description: 'Immediate cab availability on VIP Road, Chandigarh-Ambala Highway, and PR7 Airport Road.' },
        ],
        popularRoutes: [
          { destination: 'Zirakpur to Shimla', distance: '110 km', duration: '3.5 hrs', startingPrice: 2399 },
          { destination: 'Zirakpur to Manali', distance: '265 km', duration: '6.5 hrs', startingPrice: 4399 },
        ],
        nearbyAttractions: [{ name: 'Chhatbir Zoo', distance: '6 km', highlights: 'Famous zoological park with lion safari.' }],
        localOfficeDetails: {
          address: 'Near VIP Road Junction, Chandigarh-Ambala Highway, Zirakpur, Punjab',
          phone: '+91 98051 43007',
          whatsapp: '+919805143007',
          email: 'zirakpur@baglamukhitourtravels.com',
        },
        faqs: [],
        isPublished: true,
        seo: {
          metaTitle: 'Taxi Service & Tour Travel in Zirakpur | Baglamukhi Tour & Travels',
          metaDescription: 'Book instant taxi service in Zirakpur for Shimla, Manali, Delhi airport, and Himachal holidays. Transparent pricing, clean cars.',
          canonicalUrl: 'http://localhost:5173/locations/zirakpur',
          focusKeyword: 'taxi service in Zirakpur',
        },
      },
      {
        cityName: 'Panchkula',
        state: 'Haryana',
        slug: 'panchkula',
        title: 'Tour & Travel Agency in Panchkula | Himachal Cabs & Weekend Tours',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=1200&q=80',
          alt: 'Panchkula travel agency and cab booking',
        },
        shortIntro: 'Top rated travel agency in Panchkula offering Himachal holiday packages, Morni Hills day trips, Kalka station transfers, and luxury cabs.',
        fullDescription: 'Baglamukhi Tour & Travels operates throughout Sector 1 to 21 Panchkula, MDC, and Pinjore-Kalka belt. We provide comfortable sedans, Innova Crystas, and tempo travellers for hill vacations with round-the-clock roadside assistance.',
        servicesOffered: [
          { title: 'Panchkula to Kalka & Shimla Transfers', description: 'Fast connectivity through the Himalayan Expressway to Kasauli, Chail, and Shimla.' },
        ],
        popularRoutes: [
          { destination: 'Panchkula to Shimla', distance: '105 km', duration: '3 hrs', startingPrice: 2299 },
        ],
        nearbyAttractions: [{ name: 'Pinjore Yadavindra Gardens', distance: '15 km', highlights: '17th-century Mughal style terraced gardens.' }],
        localOfficeDetails: {
          address: 'Sector 11 / MDC Commercial Plaza, Panchkula, Haryana',
          phone: '+91 98051 43007',
          whatsapp: '+919805143007',
          email: 'panchkula@baglamukhitourtravels.com',
        },
        faqs: [],
        isPublished: true,
        seo: {
          metaTitle: 'Tour and Travel in Panchkula | Himachal Holiday Packages',
          metaDescription: 'Best tour & travel agency in Panchkula for Shimla Manali holiday packages, Kalka station cabs, and tempo traveller rental.',
          canonicalUrl: 'http://localhost:5173/locations/panchkula',
          focusKeyword: 'travel agency in Panchkula',
        },
      },
      {
        cityName: 'Amb Andaura & Una',
        state: 'Himachal Pradesh',
        slug: 'una',
        title: 'Tour & Travel Agency in Amb Andaura & Una HP | Vande Bharat & Pilgrimage Cabs',
        heroImage: {
          url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
          alt: 'Amb Andaura Una Himachal Pradesh travel and Devi Darshan cabs',
        },
        shortIntro: 'Premier travel desk at Amb Andaura (AADR) & Una Railway Stations for Maa Baglamukhi, Chintpurni, Jwala Ji, Kangra Devi, Dharamshala, and Manali trips.',
        fullDescription: 'Amb Andaura (AADR) is the main broad gauge Vande Bharat Express terminal in Himachal Pradesh and the closest railway head to Maa Baglamukhi Dham Bankhandi and Mata Chintpurni. Baglamukhi Tour & Travels provides prompt station pickups with verified hill drivers.',
        servicesOffered: [
          { title: 'Amb Andaura Vande Bharat Train Taxi Pickup', description: 'Guaranteed punctual cab waiting right as the Vande Bharat Express arrives at Amb Andaura (AADR).' },
          { title: 'Maa Baglamukhi & 9 Devi Shaktipeeth Darshan Yatra', description: 'Specialized round-trip pilgrim taxis from Amb Andaura to Bankhandi Kangra.' },
        ],
        popularRoutes: [
          { destination: 'Amb Andaura to Maa Baglamukhi Temple', distance: '45 km', duration: '1 hr', startingPrice: 1399 },
          { destination: 'Amb Andaura to Chintpurni Temple', distance: '30 km', duration: '45 mins', startingPrice: 999 },
          { destination: 'Amb Andaura to Jwala Ji Temple', distance: '55 km', duration: '1.2 hrs', startingPrice: 1599 },
          { destination: 'Amb Andaura to Dharamshala', distance: '95 km', duration: '2.5 hrs', startingPrice: 2499 },
        ],
        nearbyAttractions: [{ name: 'Maa Baglamukhi Temple Bankhandi', distance: '45 km', highlights: 'Holy 8th Mahavidya Pitambara Dham.' }, { name: 'Maa Chintpurni Dham', distance: '30 km', highlights: 'Sacred Shaktipeeth shrine.' }],
        localOfficeDetails: {
          address: 'Station Road, Near Amb Andaura Railway Station (AADR), Una District, Himachal Pradesh, 177203',
          phone: '+91 98051 43007',
          whatsapp: '+919805143007',
          email: 'ambandaura@baglamukhitourtravels.com',
        },
        faqs: [],
        isPublished: true,
        seo: {
          metaTitle: 'Amb Andaura Railway Station Taxi Service & Tour Travel | Baglamukhi Travels',
          metaDescription: 'Book taxi from Amb Andaura Railway Station (AADR Vande Bharat) for Maa Baglamukhi, Chintpurni, Jwala Ji, Kangra, and Dharamshala. Direct local booking at +91 98051 43007.',
          canonicalUrl: 'http://localhost:5173/locations/una',
          focusKeyword: 'amb andaura railway station taxi service',
        },
      },
    ];

    const createdLocations = await Location.insertMany(locationsData);
    console.log(`[Seed] Seeded ${createdLocations.length} Local SEO Locations.`);

    // 6. Create Services (Cabs, Tempo, Airport Transfers, Bus)
    const servicesData = [
      {
        title: 'Cab & Taxi Booking Service (Dzire, Ertiga & Innova Crysta)',
        slug: 'cab-booking',
        serviceType: 'Cab & Taxi',
        icon: 'Car',
        featuredImage: {
          url: '/images/cabs/toyota-innova-crysta.jpg',
          alt: 'Toyota Innova Crysta and Himachali tourist cab booking',
        },
        shortDescription: 'Professional 24/7 cab booking in Chandigarh, Mohali, and Himachal Pradesh. Clean Dzire, Etios, Ertiga, and Innova Crysta with trained mountain drivers.',
        detailedContent: 'Baglamukhi Tour & Travels operates a modern fleet of well-maintained commercial vehicles. Every car undergoes daily sanitization, brake inspections, and is driven by courteous chauffeurs with deep mountain driving experience on Himachal ghat roads.',
        fleetOptions: [
          { vehicleName: 'Swift Dzire / Toyota Etios (Sedan)', seatingCapacity: '4 Passengers + 1 Driver', luggageCapacity: '2 Large + 2 Small Bags', ratePerKm: 11, fullDayRate: 2500, features: ['AC', 'Music System', 'Clean Interiors', 'Fastag Enabled'] },
          { vehicleName: 'Maruti Ertiga (Compact SUV)', seatingCapacity: '6 Passengers + 1 Driver', luggageCapacity: '3 Large Bags + Carrier', ratePerKm: 14, fullDayRate: 3500, features: ['AC', 'Spacious Seating', 'Roof Carrier', 'Fastag'] },
          { vehicleName: 'Toyota Innova Crysta (Luxury SUV)', seatingCapacity: '6-7 Passengers + 1 Driver', luggageCapacity: '4 Large Bags + Roof Rack', ratePerKm: 18, fullDayRate: 4800, features: ['Dual AC', 'Captain Seats', 'Extra Legroom', 'Superior Hill Comfort'] },
        ],
        popularRoutes: [
          { route: 'Chandigarh to Manali', distance: '270 km', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
          { route: 'Chandigarh to Shimla', distance: '115 km', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
          { route: 'Chandigarh to Dharamshala', distance: '245 km', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
          { route: 'Chandigarh to Delhi Airport', distance: '250 km', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
        ],
        features: ['No Hidden Surcharges', 'Verified Local Chauffeurs', 'GPS Enabled Fleet', '24/7 Customer Hotline'],
        faqs: [
          { question: 'Are toll taxes and parking charges included?', answer: 'Our tour packages include all tolls, parking, and driver allowances. For one-way cab trips, standard state tax and tolls are transparently stated beforehand.' },
        ],
        isPublished: true,
        seo: {
          metaTitle: 'Cab & Taxi Booking Service in Chandigarh | Baglamukhi Tour & Travels',
          metaDescription: 'Book reliable Dzire, Ertiga, and Innova Crysta cabs for Himachal Pradesh, Shimla, Manali, and Delhi airport. Lowest price guaranteed.',
          canonicalUrl: 'http://localhost:5173/services/cab-booking',
          focusKeyword: 'cab booking service',
        },
      },
      {
        title: 'Airport Transfer Services (Chandigarh & Delhi Airport)',
        slug: 'airport-transfer',
        serviceType: 'Airport Transfer',
        icon: 'Plane',
        featuredImage: {
          url: '/images/cabs/swift-dzire.jpg',
          alt: 'Airport transfer cab service Chandigarh and Delhi with Dzire sedan',
        },
        shortDescription: 'Punctual, stress-free airport pickup and drop service for Chandigarh International Airport (IXC) and New Delhi IGI Airport (DEL).',
        detailedContent: 'Never miss a flight or wait for stranded cabs. We track live flight statuses so our driver is ready at the arrival terminal with a personalized name-board to assist you with luggage.',
        fleetOptions: [
          { vehicleName: 'Executive Sedan Airport Cab', seatingCapacity: '4 Persons', luggageCapacity: '3 Suitcases', ratePerKm: 12, fullDayRate: 2800, features: ['Flight Tracking', 'Meet & Greet', 'Punctual Guarantee'] },
        ],
        popularRoutes: [
          { route: 'Chandigarh Airport to Shimla', distance: '125 km', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
          { route: 'Chandigarh Airport to Manali', distance: '280 km', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
          { route: 'Chandigarh to Delhi IGI Airport', distance: '260 km', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
        ],
        features: ['Flight Tracking', 'Zero Cancellation Fee for Rescheduled Flights', 'Clean & Odor-free Cars'],
        faqs: [],
        isPublished: true,
        seo: {
          metaTitle: 'Chandigarh Airport Taxi Transfer Service | Baglamukhi Tour & Travels',
          metaDescription: 'Book 24/7 on-time airport taxi from Chandigarh Airport (IXC) and Delhi IGI Airport to Shimla, Manali, and Punjab.',
          canonicalUrl: 'http://localhost:5173/services/airport-transfer',
          focusKeyword: 'airport transfer taxi',
        },
      },
      {
        title: 'Force Cruiser & Trax Toofan 4x4 Mountain Fleet (9-13 Seater)',
        slug: 'force-cruiser-rental',
        serviceType: 'Mountain Cruiser 4x4',
        icon: 'Shield',
        featuredImage: {
          url: '/images/cabs/force-cruiser-4x4.jpg',
          alt: 'Force Cruiser and Trax Toofan 4x4 Mountain Fleet',
        },
        shortDescription: 'Rugged 9 to 13 seater Force Mountain Cruisers with 4x4 power, high ground clearance, and heavy-duty suspension for tough Himachal valleys and remote Shaktipeeths.',
        detailedContent: 'Specially tuned for demanding mountain terrains such as Spiti Valley, Sangla, Sach Pass, and high-altitude pilgrimage routes. Equipped with high-torque engines and heavy rooftop carriers for hassle-free group travel.',
        fleetOptions: [
          { vehicleName: 'Force Cruiser 4x4 (9 Seater Front Facing)', seatingCapacity: '9 Passengers', luggageCapacity: 'Heavy Rooftop Carrier', ratePerKm: 18, fullDayRate: 4800, features: ['4x4 Low Range', 'High Ground Clearance (210mm)', 'Power Steering', 'Hill Chauffeur'] },
          { vehicleName: 'Trax Toofan Heavy Duty (13 Seater)', seatingCapacity: '13 Passengers', luggageCapacity: 'Extra Heavy Luggage Carrier', ratePerKm: 20, fullDayRate: 5200, features: ['High Seating Capacity', 'Sturdy Metal Build', 'Great for Village & Temple Tours'] },
        ],
        popularRoutes: [
          { route: 'Chandigarh to Maa Baglamukhi & 9 Devi Yatra', distance: '650 km circuit', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
          { route: 'Chandigarh to Spiti Valley 4x4 Expedition', distance: '1200 km circuit', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
        ],
        features: ['Heavy Duty 4x4 Traction', 'High Clearance for River Crossings', 'Experienced Rough-Terrain Drivers'],
        faqs: [],
        isPublished: true,
        seo: {
          metaTitle: 'Force Cruiser & 4x4 Trax Toofan Rental | Baglamukhi Tour & Travels',
          metaDescription: 'Hire 9 to 13 seater Force Cruisers and 4x4 Trax Toofan vehicles in Himachal for group pilgrimage and Spiti mountain expeditions.',
          canonicalUrl: 'http://localhost:5173/services/force-cruiser-rental',
          focusKeyword: 'Force Cruiser Himachal rental',
        },
      },
      {
        title: 'Force Urbania & Luxury Tempo Traveller Rental (12 to 26 Seater)',
        slug: 'tempo-traveller',
        serviceType: 'Tempo Traveller',
        icon: 'Users',
        featuredImage: {
          url: '/images/cabs/force-tempo-traveller-12.jpg',
          alt: 'Luxury Force Urbania and Tempo Traveller rental for group tours',
        },
        shortDescription: 'Hire ultra-luxury Force Urbania and Maharaja Tempo Travellers (12, 17, 20 & 26 Seater) with 2x1 Maharaja pushback seats, individual AC vents, and LED entertainment for group tours.',
        detailedContent: 'Ideal for extended families, wedding groups, corporate outings, and sacred 9 Devi Darshan yatras traveling to Shimla, Manali, Dharamshala, and Amritsar. Features ambient lighting, individual USB charging points, and air suspension.',
        fleetOptions: [
          { vehicleName: 'Force Urbania Ultra Luxury (12 Seater)', seatingCapacity: '12 Passengers', luggageCapacity: 'Spacious Rear Boot', ratePerKm: 26, fullDayRate: 6500, features: ['Monocoque Body Safety', 'Independent Front Suspension', 'Panoramic Windows', 'Individual AC Vents'] },
          { vehicleName: '17 Seater Maharaja Tempo Traveller', seatingCapacity: '17 Passengers', luggageCapacity: 'Heavy Rooftop Carrier', ratePerKm: 25, fullDayRate: 6500, features: ['2x1 Pushback Reclining Seats', 'HD LED TV & Sound System', 'Curtains & Ambient Light'] },
          { vehicleName: '26 Seater Executive Coach', seatingCapacity: '26 Passengers', luggageCapacity: 'Heavy Luggage Bays', ratePerKm: 32, fullDayRate: 8500, features: ['Wide Center Aisle', 'Air Suspension', 'Comfort for Senior Pilgrims'] },
        ],
        popularRoutes: [
          { route: 'Chandigarh to Manali (Roundtrip 5 Days)', distance: '600 km approx.', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
          { route: 'Chandigarh to 9 Devi Darshan Yatra (6 Days)', distance: '750 km approx.', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
        ],
        features: ['2x1 Recliner Pushback Seats', 'Individual USB Charging Ports', 'Top Mountain Trained Drivers'],
        faqs: [],
        isPublished: true,
        seo: {
          metaTitle: 'Tempo Traveller & Force Urbania Rental in Chandigarh & Himachal | Baglamukhi Tour & Travels',
          metaDescription: 'Hire 12, 17, 20, 26 seater luxury Maharaja tempo travellers and Force Urbania in Chandigarh for Manali, Shimla, and group tours. Best direct rates on request.',
          canonicalUrl: 'http://localhost:5173/services/tempo-traveller',
          focusKeyword: 'tempo traveller rental',
        },
      },
      {
        title: 'Mahindra Thar & Scorpio Mountain 4x4 Fleet',
        slug: 'mahindra-scorpio-rental',
        serviceType: 'Mountain SUV 4x4',
        icon: 'Compass',
        featuredImage: {
          url: '/images/cabs/mahindra-thar-4x4.jpg',
          alt: 'Mahindra Thar and Scorpio Mountain 4x4 Fleet',
        },
        shortDescription: 'High-performance Mahindra Scorpio-N and Bolero 4x4 SUVs built to navigate steep Himalayan passes, fresh snowfall, and unpaved mountain roads.',
        detailedContent: 'Engineered for mountain dominance. Equipped with high-torque diesel engines, shift-on-fly 4x4, and high ground clearance for Atal Tunnel, Rohtang, Kinnaur, and Lahaul Valley.',
        fleetOptions: [
          { vehicleName: 'Mahindra Scorpio-N 4x4 (6+1 Seater)', seatingCapacity: '6-7 Passengers', luggageCapacity: '3 Large Bags', ratePerKm: 20, fullDayRate: 5000, features: ['4Xplor Terrain Modes', 'Dual Climate AC', 'High Ground Clearance', 'Hill Hold Assist'] },
          { vehicleName: 'Mahindra Bolero 4x4 Camper/SUV', seatingCapacity: '6 Passengers', luggageCapacity: 'Rooftop Carrier', ratePerKm: 16, fullDayRate: 4000, features: ['Proven Mountain Reliability', 'Tough Suspension', 'High Altitude Certified'] },
        ],
        popularRoutes: [
          { route: 'Chandigarh to Atal Tunnel & Sissu Lahaul', distance: '320 km', sedanPrice: 0, suvPrice: 0, tempoPrice: 0 },
        ],
        features: ['High Altitude Performance', 'Shift-on-Fly 4x4', 'GPS Tracking & SOS Emergency'],
        faqs: [],
        isPublished: true,
        seo: {
          metaTitle: 'Mahindra Scorpio-N 4x4 SUV Rental | Baglamukhi Tour & Travels',
          metaDescription: 'Book Mahindra Scorpio-N 4x4 and SUV cabs in Chandigarh for Rohtang Pass, Spiti, Kinnaur, and Manali trips.',
          canonicalUrl: 'http://localhost:5173/services/mahindra-scorpio-rental',
          focusKeyword: 'Mahindra Scorpio rental Himachal',
        },
      },
      {
        title: 'Bus & Luxury Coach Rental Services',
        slug: 'car-rental',
        serviceType: 'Bus Rental',
        icon: 'Bus',
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
          alt: 'Luxury Bus and Tourist Coach rental',
        },
        shortDescription: 'Book 35 to 52 seater luxury AC Volvo coaches and BharatBenz tourist buses for school trips, wedding baraat transport, and corporate conventions.',
        detailedContent: 'We provide full logistics solutions for large groups requiring reliable, air-conditioned bus rentals with verified permits across Punjab, Himachal Pradesh, Haryana, Delhi, and Rajasthan.',
        fleetOptions: [
          { vehicleName: '35 Seater Mini Luxury Coach', seatingCapacity: '35 Persons', luggageCapacity: 'Dedicated luggage bays', ratePerKm: 42, fullDayRate: 11000, features: ['Air Suspension', 'Pushback Seats', 'PA System'] },
          { vehicleName: '45-52 Seater Volvo Multi-Axle Bus', seatingCapacity: '45-52 Persons', luggageCapacity: 'Heavy Underfloor Bays', ratePerKm: 65, fullDayRate: 18000, features: ['Ultra Luxury Volvo Suspension', 'Automatic Climate Control', 'Onboard Entertainment'] },
        ],
        popularRoutes: [],
        features: ['All India Tourist Permits', 'Experienced Dual Drivers for Night Travel', 'Spotless Cleanliness'],
        faqs: [],
        isPublished: true,
        seo: {
          metaTitle: 'Luxury Bus & Coach Rental | Baglamukhi Tour & Travels',
          metaDescription: 'Rent 35 to 52 seater luxury tourist buses and Volvo coaches in Chandigarh and Punjab for weddings, corporate events, and tours.',
          canonicalUrl: 'http://localhost:5173/services/car-rental',
          focusKeyword: 'bus rental services',
        },
      },
    ];

    const createdServices = await Service.insertMany(servicesData);
    console.log(`[Seed] Seeded ${createdServices.length} Transport Services.`);

    // 7. Create Hotels
    const hotelsData = [
      {
        name: 'The Himalayan Mountain View Resort & Spa',
        slug: 'the-himalayan-mountain-resort-manali',
        destination: 'Manali',
        hotelType: 'Luxury Resort',
        starRating: 4,
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
          alt: 'Luxury Resort in Manali with mountain view',
        },
        galleryImages: [
          { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', alt: 'Deluxe Suite room' },
        ],
        address: 'Hadimba Road, Near Log Huts, Manali, Himachal Pradesh',
        shortOverview: 'Premium 4-star mountain resort offering panoramic snow peak views, multi-cuisine restaurant, spa, and cozy wooden architecture.',
        description: 'Set amidst apple orchards and towering cedar trees, this resort is our premier stay partner in Manali. Enjoy heated rooms, private balconies facing Rohtang peaks, bonfire evenings, and multi-cuisine buffet dining.',
        priceStartingFrom: 3499,
        amenities: ['Free High-Speed Wi-Fi', 'Complimentary Buffet Breakfast', 'Private Mountain Balcony', 'Room Heater', '24-hour Hot Water', 'In-house Restaurant', 'Doctor on Call'],
        roomCategories: [
          { name: 'Deluxe Valley View Room', price: 3499, features: ['Queen Bed', 'Balcony', 'Valley View'] },
          { name: 'Super Deluxe Himalayan Suite', price: 4999, features: ['King Bed', 'Jacuzzi / Bathtub', 'Snow Peak View', 'Tea Maker'] },
        ],
        checkInTime: '12:00 PM',
        checkOutTime: '11:00 AM',
        isPartnerHotel: true,
        isPublished: true,
        seo: {
          metaTitle: 'The Himalayan Mountain Resort Manali | Room Booking & Rates',
          metaDescription: 'Book luxury hotel stays in Manali at discounted partner rates with Baglamukhi Tour & Travels. Mountain views, heated rooms, delicious food.',
          canonicalUrl: 'http://localhost:5173/hotels/the-himalayan-mountain-resort-manali',
          focusKeyword: 'hotel in Manali',
        },
      },
      {
        name: 'Pine Valley Heights Heritage Hotel',
        slug: 'pine-valley-heights-shimla',
        destination: 'Shimla',
        hotelType: 'Deluxe',
        starRating: 4,
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
          alt: 'Shimla heritage hotel near Mall road',
        },
        galleryImages: [],
        address: 'Near Lift / Circular Road, The Mall, Shimla, Himachal Pradesh',
        shortOverview: 'Centrally located luxury hotel near the Mall Road lift offering classic colonial aesthetics, modern comforts, and breathtaking valley vistas.',
        description: 'Conveniently accessible by vehicle with ample parking and direct access to Mall Road. Features wooden paneled suites, fine dining restaurant, and sunset terrace.',
        priceStartingFrom: 2999,
        amenities: ['Mall Road Proximity', 'Valley View Rooms', 'Elevator Access', 'Central Heating', 'Free Parking', 'Multi-cuisine Dining'],
        roomCategories: [
          { name: 'Executive Deluxe Room', price: 2999, features: ['Double Bed', 'Cedar Wood Interior'] },
          { name: 'Colonial Family Suite', price: 4499, features: ['2 Double Beds', 'Living Room Area'] },
        ],
        checkInTime: '1:00 PM',
        checkOutTime: '11:00 AM',
        isPartnerHotel: true,
        isPublished: true,
        seo: {
          metaTitle: 'Pine Valley Heights Hotel Shimla | Baglamukhi Tour & Travels',
          metaDescription: 'Stay at Pine Valley Heights hotel near Shimla Mall road. Enjoy colonial comfort, delicious buffet meals, and mountain panoramas.',
          canonicalUrl: 'http://localhost:5173/hotels/pine-valley-heights-shimla',
          focusKeyword: 'hotel in Shimla',
        },
      },
    ];

    const createdHotels = await Hotel.insertMany(hotelsData);
    console.log(`[Seed] Seeded ${createdHotels.length} Hotels.`);

    // 8. Create Blogs (CMS SEO Content)
    const blogsData = [
      {
        title: 'Best Time to Visit Manali: Season by Season Travel & Snow Guide',
        slug: 'best-time-to-visit-manali',
        category: 'Travel Guides',
        tags: ['Manali', 'Best Time', 'Snowfall', 'Himachal Travel', 'Solang Valley'],
        author: {
          name: 'Rajesh Thakur',
          role: 'Founder & Senior Himachal Travel Consultant',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
          alt: 'Best time to visit Manali Himachal Pradesh snowy landscape',
        },
        excerpt: 'Planning a trip to Manali? Discover the best months for fresh snowfall, paragliding in Solang Valley, honeymoon vacations, and avoiding peak tourist traffic.',
        content: `
## Discovering Manali Throughout the Year

Manali, cradled in the majestic Kullu valley at an elevation of 2,050 meters, is a year-round paradise. However, the best time to visit depends entirely on the experience you are seeking—whether you dream of walking in knee-deep fresh snow, flying through blue skies on a paraglider, or escaping scorching city summers.

---

### 1. Winter Season (October to February) - For Snow Lovers & Honeymooners
- **Temperature:** -5°C to 12°C
- **Highlights:** Fresh snowfall in December, January, and February; skiing at Solang Valley; romantic snowy landscapes.
- **What to Wear:** Heavy down jackets, thermal innerwear, gloves, woolen beanies, and waterproof snow boots.

If seeing live snowfall is top on your bucket list, **late December through mid-February** is the golden window. Solang Valley, Gulaba, and Sissu on the other side of the Atal Tunnel transform into pristine white playgrounds.

---

### 2. Summer Season (March to June) - For Families & Pleasant Sightseeing
- **Temperature:** 10°C to 25°C
- **Highlights:** Blooming apple orchards, lush green cedar valleys, open Rohtang Pass, white water river rafting in Beas.
- **What to Wear:** Light woolens for mornings and evenings, cotton clothing during daytime.

Summers in Manali offer refreshing respite from the heat of Delhi, Chandigarh, and Punjab. All adventure activities are fully operational, and temperatures remain delightfully comfortable.

---

### 3. Monsoon Season (July to September) - Lush Greenery & Budget Deals
- **Temperature:** 15°C to 22°C
- **Highlights:** Serene uncrowded waterfalls, dramatic monsoon cloud formations, discounted hotel tariffs.
- **Tip:** Check highway weather reports before traveling; our experienced local drivers ensure safe journey on all mountain routes.

---

### Practical Travel Tips for Manali
1. **Expressway Route:** The newly completed Kiratpur-Nerchowk-Manali 4-lane expressway cuts travel time from Chandigarh to just ~6.5 to 7 hours.
2. **Atal Tunnel:** Travel through the 9.02 km tunnel to Sissu for breathtaking views of Lahaul waterfalls.
3. **Advance Booking:** During peak holiday periods (May-June & Dec 20 - Jan 5), always pre-book tour packages to secure premier hotel rooms and verified permits.
        `,
        readingTime: '6 min read',
        faqs: [
          { question: 'Which month has the heaviest snowfall in Manali?', answer: 'January and early February typically witness the heaviest and most consistent snowfall in Manali town and Solang Valley.' },
          { question: 'Is Atal Tunnel open throughout the winter?', answer: 'Yes, the Atal Tunnel remains operational for most of the winter, with brief closures only during extreme blizzard conditions.' },
        ],
        relatedTours: [createdTours[0]._id, createdTours[1]._id],
        relatedDestinations: [createdDestinations[0]._id],
        isPublished: true,
        publishedAt: new Date(),
        seo: {
          metaTitle: 'Best Time to Visit Manali: Weather, Snowfall & Travel Tips',
          metaDescription: 'Complete guide on the best time to visit Manali. Learn about snowfall months, summer weather, paragliding seasons, and ideal trip itineraries.',
          canonicalUrl: 'http://localhost:5173/blog/best-time-to-visit-manali',
          focusKeyword: 'best time to visit Manali',
        },
      },
      {
        title: 'Shimla vs Manali: Which Himachal Destination Should You Choose?',
        slug: 'shimla-vs-manali-travel-guide',
        category: 'Destination Guides',
        tags: ['Shimla', 'Manali', 'Comparison', 'Himachal Tours'],
        author: {
          name: 'Aman Thakur',
          role: 'Tour Operations Lead',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
          alt: 'Shimla vs Manali Himachal Pradesh travel guide comparison',
        },
        excerpt: 'Confused between Shimla and Manali for your upcoming vacation? We compare travel time, sights, adventure activities, romance factor, and budgets to help you pick.',
        content: `
## Shimla or Manali: The Ultimate Comparison

Both Shimla and Manali are iconic gems of Himachal Pradesh, yet each provides a distinct vacation experience. Here is an honest, side-by-side breakdown from our 15+ years of local travel expertise.

---

### Quick Comparison Table

| Feature | Shimla | Manali |
| :--- | :--- | :--- |
| **Distance from Chandigarh** | 115 km (3.5 hrs) | 270 km (6.5 hrs) |
| **Vibe** | Colonial, British Heritage, Pedestrian Ridge | Alpine Adventure, Bohemian Cafes, Snow Peaks |
| **Snowfall Probability** | Moderate (Kufri/Narkanda) | High (Solang, Atal Tunnel, Rohtang) |
| **Key Attractions** | Mall Road, Ridge, Jakhoo Temple, Kufri | Solang Valley, Atal Tunnel, Hadimba Temple, Sissu |
| **Best For** | Short 2-3 Day Trips, Heritage Walks | 4-5 Day Holidays, Adventure Sports, Honeymoon |

---

### When to Pick Shimla
Choose **Shimla** if you have limited travel days (2 to 3 days), want a quick weekend escape from Chandigarh/Delhi, or love leisurely walks on heritage pedestrian promenades without vehicle fumes.

### When to Pick Manali
Choose **Manali** if you are craving high-octane adventure (paragliding, river rafting, skiing), dramatic towering snow mountains, riverside cafes in Old Manali, and driving through the famous Atal Tunnel.

### The Best Solution: Combine Both!
Our 6 Days 5 Nights **Shimla-Manali Combined Package** lets you enjoy the best of both worlds with a single private chauffeur.
        `,
        readingTime: '5 min read',
        faqs: [
          { question: 'Can we visit both Shimla and Manali in 5 to 6 days?', answer: 'Yes! A 6 Days / 5 Nights itinerary (2 nights in Shimla + 3 nights in Manali) is the most balanced and popular tour plan.' },
        ],
        relatedTours: [createdTours[1]._id],
        relatedDestinations: [createdDestinations[0]._id, createdDestinations[1]._id],
        isPublished: true,
        publishedAt: new Date(),
        seo: {
          metaTitle: 'Shimla vs Manali: Which is Better for Your Trip? | Travel Guide',
          metaDescription: 'Detailed comparison between Shimla and Manali. Sights, snow, travel time, and costs compared to help you plan the perfect Himachal vacation.',
          canonicalUrl: 'http://localhost:5173/blog/shimla-vs-manali-travel-guide',
          focusKeyword: 'Shimla vs Manali',
        },
      },
      {
        title: 'How to Plan a 6 Days Himachal Trip from Chandigarh: Complete Itinerary',
        slug: 'how-to-plan-himachal-trip-from-chandigarh',
        category: 'Travel Tips',
        tags: ['Himachal Itinerary', 'Chandigarh', 'Shimla Manali Route'],
        author: {
          name: 'Rajesh Thakur',
          role: 'Founder & Senior Himachal Travel Consultant',
        },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
          alt: 'Planning a Himachal trip from Chandigarh road route',
        },
        excerpt: 'A step-by-step master plan for an unforgettable 6-day holiday covering Shimla, Kullu, and Manali starting with doorstep pickup from Chandigarh.',
        content: `
## The Ultimate 6 Days Himachal Pradesh Road Trip Blueprint

Starting your Himachal journey from Chandigarh is the smartest decision for any traveler. With international airport and high-speed rail connectivity, you save hours compared to starting from Delhi.

### Daily Breakdown
- **Day 1:** Chandigarh arrival & scenic drive to Shimla via Himalayan Expressway.
- **Day 2:** Shimla colonial heritage, Jakhoo Temple ropeway, and Kufri nature park.
- **Day 3:** Scenic mountain drive from Shimla to Manali through Kullu valley and Pandoh Dam.
- **Day 4:** Full day Solang Valley paragliding and Atal Tunnel drive to Sissu Lahaul.
- **Day 5:** Hadimba Devi Temple, Vashisht sulphur springs, river rafting in Beas river, and Old Manali.
- **Day 6:** Souvenir shopping on Mall Road and return transfer to Chandigarh.
        `,
        readingTime: '5 min read',
        faqs: [],
        relatedTours: [createdTours[1]._id],
        isPublished: true,
        publishedAt: new Date(),
        seo: {
          metaTitle: '6 Days Himachal Trip Plan from Chandigarh | Complete Guide',
          metaDescription: 'Step-by-step 6 days itinerary for Shimla Manali holiday starting from Chandigarh. Route map, tips, and budget estimates.',
          canonicalUrl: 'http://localhost:5173/blog/how-to-plan-himachal-trip-from-chandigarh',
          focusKeyword: 'Himachal trip from Chandigarh',
        },
      },
    ];

    const createdBlogs = await Blog.insertMany(blogsData);
    console.log(`[Seed] Seeded ${createdBlogs.length} Travel Blog Articles.`);

    // 9. Create Testimonials
    const testimonialsData = [
      {
        name: 'Vikas Sharma',
        location: 'Chandigarh / Mohali',
        tripTaken: 'Manali Deluxe 5 Days Tour',
        rating: 5,
        reviewText: 'Booked a 5-day Manali package with Baglamukhi Tour & Travels for our family. The private Dzire cab was spotless, driver Sanjeev was extremely polite and careful in hill driving, and hotel rooms in Manali had stunning snow views. Truly hassle-free service!',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        isVerified: true,
        isFeatured: true,
        reviewDate: 'October 2024',
      },
      {
        name: 'Pooja & Ankit Mehra',
        location: 'Delhi NCR',
        tripTaken: 'Manali Honeymoon Special Package',
        rating: 5,
        reviewText: 'Our honeymoon in Manali was unforgettable. The candlelight dinner, flower bed decoration, and trip to Sissu via Atal Tunnel were arranged perfectly by Baglamukhi Tour & Travels team. 100% recommended for couples looking for genuine quality.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        isVerified: true,
        isFeatured: true,
        reviewDate: 'December 2024',
      },
      {
        name: 'Harpreet Singh Sandhu',
        location: 'Ludhiana, Punjab',
        tripTaken: 'Shimla Manali 6 Days Tour',
        rating: 5,
        reviewText: 'We hired an Innova Crysta for our family trip from Chandigarh. Driver was on time at the airport, knew all shortcut spots and best dhabas on the way. Zero hidden charges. Best travel agency in the region!',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        isVerified: true,
        isFeatured: true,
        reviewDate: 'January 2025',
      },
      {
        name: 'Sunil Gupta & Family',
        location: 'Jaipur, Rajasthan',
        tripTaken: '9 Devi Darshan Himachal Pilgrimage',
        rating: 5,
        reviewText: 'Traveling with elderly parents for Devi Darshan can be challenging, but Baglamukhi Tour & Travels made it effortless. Our driver helped with VIP darshan queues at Chintpurni and Jwala Ji. Very grateful for their service.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        isVerified: true,
        isFeatured: true,
        reviewDate: 'February 2025',
      },
    ];

    await Testimonial.insertMany(testimonialsData);
    console.log('[Seed] Seeded Testimonials.');

    // 10. Create FAQs
    const faqsData = [
      {
        category: 'General',
        question: 'How do I book a tour package or taxi with Baglamukhi Tour & Travels?',
        answer: 'You can book directly by filling out our online booking form, contacting our 24/7 hotline at +91 98051 43007, or chatting with us on WhatsApp (+91 98051 43007). Our travel executive will customize your itinerary and confirm your booking instantly.',
      },
      {
        category: 'Booking & Payments',
        question: 'What is the advance payment requirement to confirm our booking?',
        answer: 'We only require a nominal 20% to 25% advance token amount to lock in your private cab and hotel vouchers. The remaining balance can be paid conveniently during your trip upon arrival.',
      },
      {
        category: 'Tours & Itineraries',
        question: 'Can we customize the day-by-day itinerary or hotel category?',
        answer: 'Yes, 100%! All our tour packages are fully flexible. You can add extra days, upgrade to 4-star/5-star luxury resorts, add romantic honeymoon inclusions, or alter sightseeing spots.',
      },
      {
        category: 'Cabs & Transport',
        question: 'Are your cabs private or shared? Are drivers experienced on mountain roads?',
        answer: 'All our vehicles are 100% private and dedicated exclusively to your family or group. Every chauffeur is hill-certified with years of expertise navigating Himachal ghat roads and winter conditions safely.',
      },
      {
        category: 'Cancellation & Refund',
        question: 'What is your cancellation and refund policy?',
        answer: 'We offer hassle-free cancellation. Bookings cancelled 10 days before departure receive a full refund minus nominal processing charges. In case of flight cancellations or roadblocks, we offer flexible date-rescheduling at no extra cost.',
      },
    ];

    await FAQ.insertMany(faqsData);
    console.log('[Seed] Seeded FAQs.');

    // 11. Create Gallery Items
    const galleryData = [
      { title: 'Snowy Solang Valley Peak', imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', altText: 'Snow covered Solang Valley mountains Manali', locationTag: 'Manali', category: 'Snow' },
      { title: 'The Ridge & Christ Church', imageUrl: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80', altText: 'Historic Christ Church in Shimla', locationTag: 'Shimla', category: 'Mountains' },
      { title: 'Golden Temple Night View', imageUrl: 'https://images.unsplash.com/photo-1514222788835-3a1a1d5b32f8?auto=format&fit=crop&w=800&q=80', altText: 'Harmandir Sahib Golden Temple Amritsar illuminated', locationTag: 'Amritsar', category: 'Temples' },
      { title: 'Dhauladhar Peaks Dharamshala', imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', altText: 'Prayer flags with Dhauladhar mountain range', locationTag: 'Dharamshala', category: 'Mountains' },
      { title: 'Chandratal Moon Lake', imageUrl: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=80', altText: 'Turquoise Chandratal lake in Spiti Valley', locationTag: 'Spiti Valley', category: 'Adventure' },
      { title: 'Khajjiar Green Alpine Meadow', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', altText: 'Khajjiar Mini Switzerland meadow Dalhousie', locationTag: 'Dalhousie', category: 'Mountains' },
    ];

    await Gallery.insertMany(galleryData);
    console.log('[Seed] Seeded Gallery.');

    // 12. Create Sample Bookings
    const bookingsData = [
      {
        bookingId: 'TT-8921-3401',
        name: 'Amitabh Verma',
        email: 'amitabh.verma@example.com',
        phone: '+91 98765 43210',
        destination: 'Manali',
        tourPackage: 'Manali Deluxe 5 Days 4 Nights Holiday Tour Package',
        tourId: createdTours[0]._id,
        serviceType: 'Tour Package',
        travelDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        adults: 2,
        children: 1,
        pickupLocation: 'Chandigarh Airport',
        customMessage: 'Need a good mountain facing room on upper floor with balcony.',
        status: 'Confirmed',
        adminNotes: 'Assigned Dzire cab with driver Sunil. Hotel voucher issued.',
        estimatedBudget: 24998,
      },
      {
        bookingId: 'TT-9104-5822',
        name: 'Neha Kapoor',
        email: 'neha.kapoor@example.com',
        phone: '+91 98123 45678',
        destination: 'Shimla & Manali',
        tourPackage: 'Shimla Manali Combined 6 Days 5 Nights Complete Tour Package',
        tourId: createdTours[1]._id,
        serviceType: 'Tour Package',
        travelDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        adults: 4,
        children: 0,
        pickupLocation: 'Chandigarh Railway Station',
        customMessage: 'Traveling with elderly parents. Please provide Innova Crysta.',
        status: 'Contacted',
        adminNotes: 'Spoke over phone. Sent updated quote with Innova.',
        estimatedBudget: 63996,
      },
      {
        bookingId: 'TT-7419-8903',
        name: 'Rohit Deshmukh',
        email: 'rohit.d@example.com',
        phone: '+91 97654 32198',
        destination: 'Manali',
        tourPackage: 'Romantic Manali Honeymoon Special Package with Candlelight Dinner',
        tourId: createdTours[2]._id,
        serviceType: 'Honeymoon Package',
        travelDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        adults: 2,
        children: 0,
        pickupLocation: 'Delhi IGI Airport',
        customMessage: 'Please ensure candle light dinner is scheduled on 2nd evening.',
        status: 'Pending',
        adminNotes: 'New inquiry from website. Need to send WhatsApp quote.',
        estimatedBudget: 33998,
      },
    ];

    await Booking.insertMany(bookingsData);
    console.log('[Seed] Seeded Bookings.');

    // 13. Create Sample Contact Messages
    const contactMessagesData = [
      {
        name: 'Sandeep Bansal',
        email: 'sandeep.bansal@example.com',
        phone: '+91 99887 76655',
        subject: 'Corporate Group Trip to Manali for 25 Persons',
        message: 'Hi, we are planning a 4-day corporate outing for 25 engineers from Chandigarh to Manali next month. Please share Tempo Traveller and 4-star hotel packages with team building activities.',
        status: 'Unread',
      },
      {
        name: 'Ananya Roy',
        email: 'ananya.roy@example.com',
        phone: '+91 98301 23456',
        subject: 'Chandigarh to Shimla One-Way Taxi Quote',
        message: 'Need a comfortable sedan taxi on upcoming Friday morning from Chandigarh Airport to Wildflower Hall Shimla.',
        status: 'Read',
      },
    ];

    await ContactMessage.insertMany(contactMessagesData);
    console.log('[Seed] Seeded Contact Messages.');

    // 14. Create Master SEO Metadata Registry
    const seoMetaEntries = [
      {
        pageType: 'page',
        pageId: 'home',
        slug: '/',
        title: 'Baglamukhi Tour & Travels | Best Tour Packages, Taxi & Holiday Trips',
        metaDescription: 'Book customized Himachal tour packages, Shimla Manali trips, Chandigarh cab services, tempo travellers, and pilgrimage tours with Baglamukhi Tour & Travels.',
        canonicalUrl: 'http://localhost:5173/',
        focusKeyword: 'tour and travel agency',
        secondaryKeywords: ['Himachal tour packages', 'Manali tour package', 'Chandigarh taxi service', 'Shimla travel'],
        ogTitle: 'Baglamukhi Tour & Travels | Premium Himachal Holidays & Taxi Service',
        ogDescription: 'Experience unforgettable Himalayan holidays with trusted local drivers, luxury hotel stays, and guaranteed lowest prices.',
        ogImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
        schemaType: 'WebSite',
      },
      {
        pageType: 'page',
        pageId: 'about-us',
        slug: '/about-us',
        title: 'About Us | Baglamukhi Tour & Travels - 15+ Years Travel Excellence',
        metaDescription: 'Learn about Baglamukhi Tour & Travels, our journey, verified fleet of cabs, customer satisfaction records, and mountain travel expertise.',
        canonicalUrl: 'http://localhost:5173/about-us',
        focusKeyword: 'about Baglamukhi Tour and Travels',
        schemaType: 'LocalBusiness',
      },
      {
        pageType: 'page',
        pageId: 'contact-us',
        slug: '/contact-us',
        title: 'Contact Us | Baglamukhi Tour & Travels - 24/7 Helpline & Address',
        metaDescription: 'Get in touch with Baglamukhi Tour & Travels. Call +91 98051 43007 or visit our Amb Andaura and Kangra offices for customized holiday bookings.',
        canonicalUrl: 'http://localhost:5173/contact-us',
        focusKeyword: 'contact travel agency',
        schemaType: 'LocalBusiness',
      },
      {
        pageType: 'page',
        pageId: 'tours',
        slug: '/tours',
        title: 'Tour Packages | Himachal, Shimla, Manali & Pilgrimage Trips',
        metaDescription: 'Browse best-selling holiday tour packages for Manali, Shimla, Dharamshala, Spiti, and 9 Devi Darshan with private cabs and luxury hotels.',
        canonicalUrl: 'http://localhost:5173/tours',
        focusKeyword: 'Himachal tour packages',
        schemaType: 'TouristTrip',
      },
      {
        pageType: 'page',
        pageId: 'destinations',
        slug: '/destinations',
        title: 'Destinations | Explore Manali, Shimla, Dharamshala & Punjab',
        metaDescription: 'Explore premier travel destinations across Himachal Pradesh, Punjab, and North India with detailed travel guides, itineraries, and tips.',
        canonicalUrl: 'http://localhost:5173/destinations',
        focusKeyword: 'Himachal travel destinations',
        schemaType: 'TouristDestination',
      },
      {
        pageType: 'page',
        pageId: 'cabs',
        slug: '/cabs',
        title: 'Cab & Taxi Services in Chandigarh & Himachal | Baglamukhi Tour & Travels',
        metaDescription: 'Book reliable one-way and roundtrip cabs (Dzire, Ertiga, Innova Crysta, Tempo Traveller) in Chandigarh, Mohali, Shimla, and Manali.',
        canonicalUrl: 'http://localhost:5173/cabs',
        focusKeyword: 'taxi service Chandigarh',
        schemaType: 'Service',
      },
      {
        pageType: 'page',
        pageId: 'blog',
        slug: '/blog',
        title: 'Travel Blog & Guides | Himachal Tips & Itineraries | Baglamukhi Tour & Travels',
        metaDescription: 'Read the latest Himachal travel guides, best time to visit Manali, things to do in Shimla, snowfall alerts, and budgeting tips.',
        canonicalUrl: 'http://localhost:5173/blog',
        focusKeyword: 'Himachal travel blog',
        schemaType: 'Article',
      },
      {
        pageType: 'page',
        pageId: 'faqs',
        slug: '/faqs',
        title: 'Frequently Asked Questions (FAQs) | Baglamukhi Tour & Travels',
        metaDescription: 'Find answers to common questions regarding tour bookings, cancellation policy, payment modes, mountain safety, and cab rates.',
        canonicalUrl: 'http://localhost:5173/faqs',
        focusKeyword: 'travel FAQs',
        schemaType: 'FAQPage',
      },
      {
        pageType: 'page',
        pageId: 'testimonials',
        slug: '/testimonials',
        title: 'Customer Reviews & Testimonials | Baglamukhi Tour & Travels',
        metaDescription: 'Read authentic customer reviews and ratings for Himachal holiday packages and taxi services with Baglamukhi Tour & Travels.',
        canonicalUrl: 'http://localhost:5173/testimonials',
        focusKeyword: 'travel agency reviews',
      },
      {
        pageType: 'page',
        pageId: 'gallery',
        slug: '/gallery',
        title: 'Travel Photo Gallery | Himachal Mountains & Heritage Spots',
        metaDescription: 'View real traveler photos of Solang Valley snow, Shimla Ridge, Golden Temple, Spiti Valley, and our clean tourist fleet.',
        canonicalUrl: 'http://localhost:5173/gallery',
        focusKeyword: 'Himachal travel photos',
      },
    ];

    await SEO.insertMany(seoMetaEntries);
    console.log('[Seed] Seeded Master SEO Metadata Registry.');

    console.log('\n======================================================');
    console.log(' DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(' Admin Login: admin@baglamukhitourtravels.com / Admin@123456');
    console.log('======================================================\n');
    return true;
  } catch (error) {
    console.error('[Seed Error]:', error);
    throw error;
  }
};

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = seedDatabase;
