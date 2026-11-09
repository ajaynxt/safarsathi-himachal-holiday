export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  days: number;
  nights: number;
  startingPrice: string;
  rating: number;
  reviewsCount: number;
  featuredImage: string;
  pickupDrop: string;
  bestSeason: string;
  difficulty: 'Easy' | 'Moderate' | 'Adventure';
  badge?: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    stay: string;
    meals: string;
  }[];
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'Sedan' | 'MUV / SUV' | 'Group Tempo' | 'Luxury Volvo';
  seating: string;
  luggage: string;
  ac: boolean;
  ratePerKm?: string;
  idealFor: string;
  image: string;
  features: string[];
}

export interface Hotel {
  id: string;
  city: 'Shimla' | 'Manali' | 'Kasol' | 'Amritsar' | 'Srinagar';
  name: string;
  category: 'Luxury' | 'Boutique' | 'Resort' | 'Riverside Cottages' | 'Houseboat';
  rating: number;
  image: string;
  gallery: string[];
  priceRange: string;
  amenities: string[];
  location: string;
  totalPhotosCount: number;
}

export const COMPANY_INFO = {
  name: "SafarSathi",
  subName: "Himachal Holiday",
  tagline: "Your Journey Our Responsibility",
  subTagline: "Your Himalayan Escape",
  phone: "8351987587",
  phoneDisplay: "+91 83519 87587",
  email: "safarsathi.india@gmail.com",
  instagram: "https://www.instagram.com/safar_sathiindia?xtok=MW1vNnhiMWx3dW9zaA==",
  instagramHandle: "@safar_sathiindia",
  address: "New Bus Stand, Tutikandi, Shimla - 171004, Himachal Pradesh, India",
  whatsappUrl: (msg: string) => `https://wa.me/918351987587?text=${encodeURIComponent(msg)}`,
  serviceLocations: ["Delhi NCR", "Chandigarh", "Shimla", "Manali", "Dharamshala", "Spiti", "Amritsar", "Jammu & Kashmir"]
};

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "shimla-manali-5n-6d",
    title: "Shimla & Manali Complete Holiday",
    tagline: "The classic Himachal road trip with pine valleys, Solang adventure & Atal Tunnel",
    duration: "5 Nights / 6 Days",
    days: 6,
    nights: 5,
    startingPrice: "₹14,999",
    rating: 4.9,
    reviewsCount: 168,
    badge: "Official Banner Package",
    featuredImage: `/safarsathi-himachal-holiday/images/packages/shimla_manali_5_nights_6_days.png`,
    pickupDrop: "Delhi / Chandigarh",
    bestSeason: "Round the Year (Snow: Dec-Feb)",
    difficulty: "Easy",
    highlights: ["Kufri snow views & green valley", "Solang Valley adventure sports", "Atal Tunnel & Sissu (Lahaul)", "Mall Road Shimla & Hadimba Temple"],
    inclusions: ["Dedicated Private Cab (Etios/Dzire/Innova)", "3-Star / 4-Star Mountain View Hotel Stay", "Daily Breakfast & Delicious Dinner", "All Tolls, Parking, Green Tax & Driver Allowances"],
    exclusions: ["Flight / Train tickets to starting point", "Personal adventure sports activities (Paragliding, Skiing)", "Rohtang Pass permit fee (if applicable)"],
    itinerary: [
      { day: 1, title: "Delhi / Chandigarh to Shimla (Scenic Drive)", description: "Pick up from Delhi/Chandigarh Airport or Railway station. Scenic Himalayan expressway drive to Shimla. Evening stroll at Mall Road, Ridge & Lakkar Bazaar.", stay: "Shimla Luxury Hotel", meals: "Dinner" },
      { day: 2, title: "Shimla Local & Kufri Sightseeing", description: "Visit Kufri, Green Valley view point, Himalayan Nature Park, and Jakhoo Temple with the giant Hanuman statue.", stay: "Shimla Luxury Hotel", meals: "Breakfast & Dinner" },
      { day: 3, title: "Shimla to Manali via Kullu Valley & Pandoh Dam", description: "Spectacular drive through Sundernagar Lake, Pandoh Dam, and Kullu Valley. Visit world-famous Kullu Shawl factories and Vaishno Devi temple.", stay: "Manali Riverside Resort", meals: "Breakfast & Dinner" },
      { day: 4, title: "Solang Valley, Atal Tunnel & Sissu Experience", description: "Excursion to Solang Valley for adventure activities, drive through the marvel Atal Tunnel into snowy Lahaul Valley (Sissu Waterfall).", stay: "Manali Riverside Resort", meals: "Breakfast & Dinner" },
      { day: 5, title: "Manali Local Sightseeing & Cultural Tour", description: "Visit 500-year-old Hadimba Devi Temple, Vashisht Hot Springs, Tibetan Monastery, and charming Old Manali cafes.", stay: "Manali Riverside Resort", meals: "Breakfast & Dinner" },
      { day: 6, title: "Manali to Delhi / Chandigarh Departure", description: "After breakfast, drive back to Chandigarh / Delhi with unforgettable mountain memories.", stay: "Departure", meals: "Breakfast" }
    ]
  },
  {
    id: "shimla-manali-spiti-7n-8d",
    title: "Shimla Manali Spiti Valley Expedition",
    tagline: "Explore the middle land of high passes, ancient monasteries & Chandratal Lake",
    duration: "7 Nights / 8 Days",
    days: 8,
    nights: 7,
    startingPrice: "₹24,500",
    rating: 5.0,
    reviewsCount: 112,
    badge: "Trending Circuit",
    featuredImage: `/safarsathi-himachal-holiday/images/packages/shimla_manali_spti_tour_package_7_night_8_days.png`,
    pickupDrop: "Shimla / Chandigarh / Manali",
    bestSeason: "May to October",
    difficulty: "Adventure",
    highlights: ["Key Gompa & Kibber Village", "World's Highest Post Office (Hikkim)", "Highest Motorable Village (Komic)", "Pristine Chandratal Lake & Kunzum Pass"],
    inclusions: ["4x4 SUV / Custom Tempo Traveller", "Authentic Homestays & Boutique Stays with Heating", "Daily Nutritious Breakfast & Dinner", "Oxygen Cylinder & First Aid Backup", "Experienced Himalayan High-Altitude Driver"],
    exclusions: ["Monastery entry fees & personal camera permits", "Travel & medical insurance", "Lunch & personal beverages"],
    itinerary: [
      { day: 1, title: "Shimla to Kalpa / Reckong Peo (Kinnaur)", description: "Drive along the ferocious Sutlej River through Kinnaur gate into Kalpa. Sunset views over the sacred Kinner Kailash peak.", stay: "Kalpa Mountain View Hotel", meals: "Dinner" },
      { day: 2, title: "Kalpa to Nako & Tabo Monastery", description: "Witness the confluence of Spiti and Sutlej rivers. Visit Nako lake and the 1000-year-old UNESCO heritage Tabo Monastery.", stay: "Tabo Heritage Stay", meals: "Breakfast & Dinner" },
      { day: 3, title: "Tabo to Dhankar & Kaza", description: "Explore cliff-hanging Dhankar Monastery. Arrive at Kaza, the bustling heart of Spiti Valley.", stay: "Kaza Boutique Stay", meals: "Breakfast & Dinner" },
      { day: 4, title: "High Altitude Wonders: Hikkim, Komic & Langza", description: "Send a postcard from world's highest post office at Hikkim (4,400m), visit Komic monastery, and search for marine fossils at Langza Buddha statue.", stay: "Kaza Boutique Stay", meals: "Breakfast & Dinner" },
      { day: 5, title: "Key Monastery & Chicham Bridge to Chandratal", description: "Visit iconic Key Monastery and cross Asia's highest bridge at Chicham. Traverse Kunzum Pass to reach the crescent moon lake Chandratal.", stay: "Chandratal Luxury Swiss Camps", meals: "Breakfast & Dinner" },
      { day: 6, title: "Chandratal to Manali via Atal Tunnel", description: "Cross the rugged Batal and Gramphu water crossings, connect to Atal Tunnel and descend into lush Manali.", stay: "Manali Resort", meals: "Breakfast & Dinner" },
      { day: 7, title: "Manali Local Sightseeing", description: "Hadimba Temple, Vashisht Sulphur Springs, and Mall Road shopping.", stay: "Manali Resort", meals: "Breakfast & Dinner" },
      { day: 8, title: "Manali to Chandigarh Departure", description: "Farewell to the Himalayas with scenic return transfer to Chandigarh.", stay: "Departure", meals: "Breakfast" }
    ]
  },
  {
    id: "full-himachal-8n-9d",
    title: "Shimla Manali Dharamshala Dalhousie Grand Tour",
    tagline: "The complete Himachal grand circuit covering British heritage, snow peaks & Tibetan culture",
    duration: "8 Nights / 9 Days",
    days: 9,
    nights: 8,
    startingPrice: "₹26,999",
    rating: 4.9,
    reviewsCount: 145,
    badge: "Grand Circuit",
    featuredImage: `/safarsathi-himachal-holiday/images/packages/himachal_shimla_manali_dharmshala_dalhousie_8_nights_9_days.png`,
    pickupDrop: "Delhi / Chandigarh",
    bestSeason: "Throughout the year",
    difficulty: "Easy",
    highlights: ["Shimla & Kufri snow views", "Solang Valley, Atal Tunnel & Rohtang", "McLeodganj Dalai Lama Temple & HPCA Stadium", "Mini Switzerland Khajjiar & Dalhousie"],
    inclusions: ["Dedicated Private Vehicle throughout 9 Days", "Deluxe Hotel stays in Shimla, Manali, Dharamshala, Dalhousie", "Daily Breakfast & Dinner", "Sightseeing and intercity transfers"],
    exclusions: ["Airfare / Train fare", "Personal adventure sports activities", "Monastery/Monument entry tickets"],
    itinerary: [
      { day: 1, title: "Chandigarh/Delhi to Shimla", description: "Pickup and scenic transfer to Shimla. Evening at Mall Road.", stay: "Shimla Hotel", meals: "Dinner" },
      { day: 2, title: "Shimla & Kufri Local Tour", description: "Kufri snow views, Green Valley, Jakhoo Temple.", stay: "Shimla Hotel", meals: "Breakfast & Dinner" },
      { day: 3, title: "Shimla to Manali via Kullu", description: "Drive along Pandoh Dam, river rafting point Kullu.", stay: "Manali Resort", meals: "Breakfast & Dinner" },
      { day: 4, title: "Solang Valley & Atal Tunnel", description: "Adventure sports and snow excursion to Lahaul Valley.", stay: "Manali Resort", meals: "Breakfast & Dinner" },
      { day: 5, title: "Manali to Dharamshala via Palampur", description: "Tea gardens and Baijnath Shiva Temple en route to Dharamshala.", stay: "Dharamshala Hotel", meals: "Breakfast & Dinner" },
      { day: 6, title: "Dharamshala & McLeodganj", description: "Dalai Lama Temple, Bhagsunag Waterfall, cricket stadium.", stay: "Dharamshala Hotel", meals: "Breakfast & Dinner" },
      { day: 7, title: "Dharamshala to Dalhousie", description: "Scenic transfer to colonial hill station Dalhousie.", stay: "Dalhousie Hotel", meals: "Breakfast & Dinner" },
      { day: 8, title: "Khajjiar (Mini Switzerland) Excursion", description: "Dense deodar forests, Khajjiar lake and golf course.", stay: "Dalhousie Hotel", meals: "Breakfast & Dinner" },
      { day: 9, title: "Dalhousie to Pathankot / Chandigarh Departure", description: "Departure transfer with sweet mountain memories.", stay: "Departure", meals: "Breakfast" }
    ]
  },
  {
    id: "jammu-kashmir-6n-7d",
    title: "Jammu & Kashmir Paradise Tour",
    tagline: "Shikara rides on Dal Lake, snowy slopes of Gulmarg, and Betaab Valley of Pahalgam",
    duration: "6 Nights / 7 Days",
    days: 7,
    nights: 6,
    startingPrice: "₹22,500",
    rating: 4.9,
    reviewsCount: 138,
    badge: "Paradise on Earth",
    featuredImage: `/safarsathi-himachal-holiday/images/packages/jammu_and_kashmir_6_nights_7_days.png`,
    pickupDrop: "Jammu / Srinagar",
    bestSeason: "March to November (Snow: Dec-Feb)",
    difficulty: "Easy",
    highlights: ["1 Night in Luxury Dal Lake Houseboat", "World's 2nd Highest Gondola in Gulmarg", "Pahalgam Betaab & Aru Valley", "Mughal Gardens of Srinagar (Shalimar & Nishat)"],
    inclusions: ["Exclusive Private Cab for entire tour", "1 Night in Luxury Dal Lake Houseboat", "5 Nights in Srinagar & Pahalgam Premium Hotels", "Daily Breakfast and Royal Kashmiri Dinner", "Complimentary 1-Hour Shikara Ride"],
    exclusions: ["Airfare / Rail tickets", "Gondola cable car tickets (Phase 1 & 2)", "Pony / Horse ride charges"],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar & Dal Lake Shikara", description: "Traditional Kashmiri welcome. Sunset Shikara ride across floating gardens and Char Chinar.", stay: "Dal Lake Luxury Houseboat", meals: "Dinner" },
      { day: 2, title: "Srinagar to Gulmarg Meadow of Flowers", description: "Gondola cable car ride to Apharwat peak for snow games and skiing.", stay: "Srinagar Premium Hotel", meals: "Breakfast & Dinner" },
      { day: 3, title: "Srinagar to Pahalgam Valley of Shepherds", description: "Drive along Saffron fields of Pampore and Apple orchards.", stay: "Pahalgam Riverside Resort", meals: "Breakfast & Dinner" },
      { day: 4, title: "Pahalgam Local Exploration (Aru & Betaab Valley)", description: "Visit postcard-perfect Betaab Valley and green meadows of Aru.", stay: "Pahalgam Riverside Resort", meals: "Breakfast & Dinner" },
      { day: 5, title: "Pahalgam to Srinagar Mughal Gardens", description: "Nishat Bagh, Shalimar Bagh, Chashme Shahi, and Shankaracharya Temple.", stay: "Srinagar Premium Hotel", meals: "Breakfast & Dinner" },
      { day: 6, title: "Sonamarg Meadow of Gold Excursion", description: "Glacier views and snow river at Thajiwas Glacier.", stay: "Srinagar Premium Hotel", meals: "Breakfast & Dinner" },
      { day: 7, title: "Srinagar / Jammu Airport Departure", description: "Drop at airport with golden memories of Kashmir paradise.", stay: "Departure", meals: "Breakfast" }
    ]
  },
  {
    id: "kerala-5n-6d",
    title: "Enchanting Kerala Backwaters & Munnar",
    tagline: "Munnar tea estates, Thekkady wildlife, and Alleppey luxury backwater houseboat",
    duration: "5 Nights / 6 Days",
    days: 6,
    nights: 5,
    startingPrice: "₹18,999",
    rating: 4.8,
    reviewsCount: 92,
    badge: "God's Own Country",
    featuredImage: `/safarsathi-himachal-holiday/images/packages/kerala_5_nights_6_days_package.png`,
    pickupDrop: "Cochin Airport / Railway Station",
    bestSeason: "September to May",
    difficulty: "Easy",
    highlights: ["Munnar rolling tea plantations & waterfalls", "Thekkady spice plantations & Periyar lake", "Private traditional Alleppey Houseboat cruise", "Authentic Kerala cuisine & Ayurvedic wellness"],
    inclusions: ["Private Air Conditioned Cab throughout Kerala", "1 Night in Alleppey Backwater Houseboat", "4 Nights in Munnar & Thekkady Luxury Resorts", "All Meals in Houseboat + Breakfast & Dinner in Resorts"],
    exclusions: ["Flight tickets to Cochin", "Optional Ayurvedic Spa packages", "Spice plantation entry fees"],
    itinerary: [
      { day: 1, title: "Cochin to Munnar Tea Country", description: "Pickup and drive through Cheeyappara & Valara waterfalls into misty Munnar.", stay: "Munnar Tea Resort", meals: "Dinner" },
      { day: 2, title: "Munnar Local Sightseeing", description: "Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, Echo Point, and Tea Museum.", stay: "Munnar Tea Resort", meals: "Breakfast & Dinner" },
      { day: 3, title: "Munnar to Thekkady (Periyar)", description: "Drive through cardamon and spice plantations. Boating on Periyar Lake wildlife sanctuary.", stay: "Thekkady Spice Resort", meals: "Breakfast & Dinner" },
      { day: 4, title: "Thekkady to Alleppey Houseboat", description: "Check in to traditional luxury houseboat. Cruise through palm-fringed backwaters.", stay: "Alleppey Luxury Houseboat", meals: "Lunch, Dinner & Breakfast" },
      { day: 5, title: "Alleppey to Cochin Sightseeing", description: "Chinese fishing nets, Fort Kochi, and Marine Drive.", stay: "Cochin Deluxe Hotel", meals: "Breakfast & Dinner" },
      { day: 6, title: "Cochin Airport Departure", description: "Transfer to Cochin airport for departure.", stay: "Departure", meals: "Breakfast" }
    ]
  }
];

export const VEHICLE_FLEET: Vehicle[] = [
  {
    id: "swift-dzire",
    name: "Maruti Swift Dzire (White)",
    category: "Sedan",
    seating: "4 Passengers + 1 Driver",
    luggage: "2 Large + 2 Small Bags",
    ac: true,
    idealFor: "Couples, small families & local Shimla/Manali tours",
    image: `/safarsathi-himachal-holiday/images/fleet/dzire.jpeg`,
    features: ["100% Commercial White Fleet", "Pahadi-trained experienced driver", "AC with mountain heater", "Clean sanitized interiors", "Fastag enabled"]
  },
  {
    id: "toyota-etios",
    name: "Toyota Etios (White)",
    category: "Sedan",
    seating: "4 Passengers + 1 Driver",
    luggage: "3 Large Bags (Spacious Boot)",
    ac: true,
    idealFor: "Outstation transfers from Delhi / Chandigarh to Himachal",
    image: `/safarsathi-himachal-holiday/images/fleet/etios.jpeg`,
    features: ["White Commercial Plate", "Extra large luggage boot space", "Smooth hill suspension", "Pahadi chauffeur in uniform", "High reliability on hill climbs"]
  },
  {
    id: "honda-city-sedan",
    name: "Honda City (White Premium)",
    category: "Sedan",
    seating: "4 Passengers + 1 Driver",
    luggage: "3 Large Bags",
    ac: true,
    idealFor: "VIP executive travel, luxury couples & honeymoon transfers",
    image: `/safarsathi-himachal-holiday/images/fleet/honda_city.jpeg`,
    features: ["Pristine White Luxury Finish", "Plush ergonomic leather seats", "Complimentary mineral water", "High safety rating", "Silent & ultra-smooth highway ride"]
  },
  {
    id: "toyota-glanza",
    name: "Toyota Glanza (White)",
    category: "Sedan",
    seating: "4 Passengers + 1 Driver",
    luggage: "2 Large Bags",
    ac: true,
    idealFor: "Budget-friendly couples & easy navigation through hill town streets",
    image: `/safarsathi-himachal-holiday/images/fleet/glanza.jpeg`,
    features: ["White Compact Cruiser", "Fuel efficient & eco-friendly", "Dual AC & USB mobile charging", "Hill climb assist", "Bluetooth surround audio"]
  },
  {
    id: "maruti-ertiga",
    name: "Maruti Ertiga (White 7-Seater)",
    category: "MUV / SUV",
    seating: "6 Passengers + 1 Driver",
    luggage: "3 Large + 2 Small Bags + Carrier",
    ac: true,
    idealFor: "Families & groups of 4-6 seeking comfort & economical rates",
    image: `/safarsathi-himachal-holiday/images/fleet/ertiga.jpeg`,
    features: ["White Commercial Fleet", "Dual AC vents for all 3 rows", "Overhead luggage carrier", "Agile & safe on mountain curves", "Certified hill chauffeur"]
  },
  {
    id: "toyota-innova-crysta",
    name: "Toyota Innova Crysta (White King of Hills)",
    category: "MUV / SUV",
    seating: "6/7 Passengers + 1 Driver",
    luggage: "4 Large + 3 Small Bags + Carrier",
    ac: true,
    idealFor: "Supreme comfort for families, senior citizens, Rohtang & Spiti circuit",
    image: `/safarsathi-himachal-holiday/images/fleet/innova_crysta.jpeg`,
    features: ["Super White Pristine Vehicle", "Captain reclining luxury seats", "High ground clearance & supreme safety", "Rear AC controls & charging ports", "Preferred by 90% Himalayan travelers"]
  },
  {
    id: "tempo-traveller",
    name: "Force Tempo Traveller (White 9-17 Seater)",
    category: "Group Tempo",
    seating: "9, 12, 16 or 17 Seater options",
    luggage: "Dedicated large boot + roof carrier",
    ac: true,
    idealFor: "Corporate groups, extended families, student tours & group adventures",
    image: `/safarsathi-himachal-holiday/images/fleet/tempo_traveller.jpeg`,
    features: ["White Tourist Permit Coach", "Individual pushback recliners", "Panoramic mountain view windows", "First aid & high-altitude kit", "Pahadi master driver"]
  },
  {
    id: "luxury-volvo-bus",
    name: "Luxury Multi-Axle Volvo Bus (Indian Coach)",
    category: "Luxury Volvo",
    seating: "45 Semi-Sleeper AC Seats",
    luggage: "Under-chassis massive baggage bay",
    ac: true,
    idealFor: "Overnight transfers from Delhi / Chandigarh to Shimla & Manali",
    image: `/safarsathi-himachal-holiday/images/fleet/volvo_bus.jpeg`,
    features: ["Indian Multi-Axle Luxury Volvo Coach", "Air suspension for bump-free sleep", "Blanket, water bottle & charging sockets", "Live GPS tracking", "Daily fixed departures"]
  }
];

export const HOTEL_STAYS: Hotel[] = [
  {
    id: "shimla-verified-hotel",
    city: "Shimla",
    name: "SafarSathi.in Resort & Suites - Shimla",
    category: "Luxury",
    rating: 4.9,
    location: "Near Mall Road & Tutikandi, Shimla",
    priceRange: "Included in Tour Package",
    image: `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_01.jpeg`,
    gallery: [
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_01.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_02.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_03.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_04.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_05.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_06.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_07.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_08.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_09.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_10.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_11.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/shimla/shimla_12.jpeg`
    ],
    totalPhotosCount: 39,
    amenities: ["Panoramic Pine Valley View", "Central Room Heating", "24x7 Hot Water", "In-house Multi-cuisine Restaurant", "Free Valet Parking", "High Speed Wi-Fi"]
  },
  {
    id: "manali-verified-hotel",
    city: "Manali",
    name: "SafarSathi.in Riverside Cottages & Resort - Manali",
    category: "Riverside Cottages",
    rating: 4.9,
    location: "Along Beas River, Manali - Naggar Road",
    priceRange: "Included in Tour Package",
    image: `/safarsathi-himachal-holiday/images/hotels/manali/manali_01.jpeg`,
    gallery: [
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_01.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_02.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_03.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_04.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_05.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_resort_01.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_resort_02.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_resort_03.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_resort_04.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_resort_05.jpeg`
    ],
    totalPhotosCount: 22,
    amenities: ["Direct Beas River Frontage", "Bonfire & Evening Music", "Balcony in Every Room", "Delicious Pahadi & North Indian Food", "Snow View Lawn", "24x7 Hot Water"]
  },
  {
    id: "kasol-riverside-stay",
    city: "Kasol",
    name: "SafarSathi.in Alpine Riverside Retreat - Kasol",
    category: "Resort",
    rating: 4.8,
    location: "Kasol Village, Parvati Valley",
    priceRange: "Included in Tour Package",
    image: `/safarsathi-himachal-holiday/images/hotels/manali/manali_06.jpeg`,
    gallery: [
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_06.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_07.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_resort_06.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/manali/manali_resort_07.jpeg`
    ],
    totalPhotosCount: 8,
    amenities: ["Direct River Access", "Pine Forest Setting", "Israeli & Indian Cafe", "Acoustic Nights & Fire Pit", "Heated Cozy Beds", "Guided Village Hikes"]
  },
  {
    id: "amritsar-verified-hotel",
    city: "Amritsar",
    name: "SafarSathi.in Golden Temple Heritage Hotel - Amritsar",
    category: "Boutique",
    rating: 4.9,
    location: "Walking Distance to Golden Temple, Amritsar",
    priceRange: "Included in Tour Package",
    image: `/safarsathi-himachal-holiday/images/hotels/amritsar/amritsar_01.jpeg`,
    gallery: [
      `/safarsathi-himachal-holiday/images/hotels/amritsar/amritsar_01.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/amritsar/amritsar_02.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/amritsar/amritsar_03.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/amritsar/amritsar_04.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/amritsar/amritsar_05.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/amritsar/amritsar_06.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/amritsar/amritsar_07.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/amritsar/amritsar_08.jpeg`
    ],
    totalPhotosCount: 14,
    amenities: ["500m from Harmandir Sahib", "Authentic Punjabi Breakfast", "Airport / Station Pickup Service", "Lift & Wheelchair Accessible", "Pure Veg Restaurant", "Full Power Backup"]
  },
  {
    id: "srinagar-verified-hotel",
    city: "Srinagar",
    name: "SafarSathi.in Royal Heritage Luxury Stay & Houseboat - Srinagar",
    category: "Houseboat",
    rating: 4.9,
    location: "Boulevard Road, Dal Lake, Srinagar",
    priceRange: "Included in Tour Package",
    image: `/safarsathi-himachal-holiday/images/hotels/srinagar/srinagar_01.jpeg`,
    gallery: [
      `/safarsathi-himachal-holiday/images/hotels/srinagar/srinagar_01.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/srinagar/srinagar_02.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/srinagar/srinagar_03.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/srinagar/srinagar_04.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/srinagar/srinagar_05.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/srinagar/srinagar_06.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/srinagar/srinagar_07.jpeg`,
      `/safarsathi-himachal-holiday/images/hotels/srinagar/srinagar_08.jpeg`
    ],
    totalPhotosCount: 16,
    amenities: ["Lake View Balconies", "Carved Walnut Wood Decor", "Room Heating & Electric Blankets", "Traditional Kashmiri Wazwan & Kahwa", "Private Shikara Transfers Included", "24x7 Hot Water"]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rohit & Ananya Verma",
    location: "New Delhi",
    tour: "Shimla Manali 5N/6D",
    rating: 5,
    comment: "SafarSathi made our honeymoon so effortless! The Innova Crysta was spotless, and our driver Bhupender Ji knew every scenic spot and safe cafe in Himachal. Best rates and zero hidden charges.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Dr. Sandeep Kulkarni",
    location: "Pune, Maharashtra",
    tour: "Spiti Valley Expedition",
    rating: 5,
    comment: "Taking my family to Spiti was a big responsibility. The team at Tutikandi Shimla handled oxygen backups, homestays, and weather updates smoothly. Real local pahadi expertise!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Simranjit Singh",
    location: "Amritsar, Punjab",
    tour: "Kashmir 5N/6D with Houseboat",
    rating: 5,
    comment: "From the luxury houseboat in Dal Lake to the snow in Gulmarg, everything went strictly as per itinerary. Instant WhatsApp replies anytime we needed anything.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];
