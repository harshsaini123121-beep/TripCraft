const OpenAI = require('openai');

// Lazily initialized OpenAI client
let openaiInstance = null;
const getOpenAIClient = () => {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-dev' });
  }
  return openaiInstance;
};

// Realistic mock trip plan generator when OpenAI key is missing/placeholder
const generateMockTripPlan = ({ source, destination, budget, numberOfDays, numberOfPeople, preferences }) => {
  const destLower = destination.toLowerCase().trim();
  const isGoa = destLower.includes('goa');
  const isManali = destLower.includes('manali') || destLower.includes('shimla');
  const isJaipur = destLower.includes('jaipur') || destLower.includes('udaipur') || destLower.includes('jodhpur');
  const isLadakh = destLower.includes('ladakh') || destLower.includes('leh');
  const isVaranasi = destLower.includes('varanasi');

  let places = [];
  let cuisine = [];
  let hotelNames = [];
  let bestTime = "October to March";
  let tips = [
    "Carry a water bottle and stay hydrated during sightseeing.",
    "Support local vendors and try street food at clean, busy stalls.",
    "Keep emergency contact numbers handy and download offline maps."
  ];

  if (isGoa) {
    places = [
      { name: "Calangute Beach", description: "Known as the Queen of Beaches, famous for water sports and vibrant shacks.", entryFee: "Free", bestTime: "Late afternoon", category: "Beach", mustSee: true },
      { name: "Fort Aguada", description: "A historic 17th-century Portuguese fort and lighthouse offering panoramic ocean views.", entryFee: "₹50", bestTime: "Morning", category: "Heritage", mustSee: true },
      { name: "Basilica of Bom Jesus", description: "A UNESCO World Heritage site housing the sacred relics of St. Francis Xavier.", entryFee: "Free", bestTime: "Morning", category: "Heritage", mustSee: true },
      { name: "Anjuna Flea Market", description: "A lively weekly market offering local crafts, clothes, spices, and souvenirs.", entryFee: "Free", bestTime: "Wednesday daytime", category: "Market", mustSee: false },
      { name: "Dudhsagar Falls", description: "A magnificent four-tiered waterfall cascading down the Western Ghats.", entryFee: "₹400 (Jeep safari)", bestTime: "Early morning", category: "Waterfall", mustSee: true },
      { name: "Palolem Beach", description: "A scenic, crescent-shaped beach famous for its calm waters and cozy beach huts.", entryFee: "Free", bestTime: "Sunset", category: "Beach", mustSee: true },
      { name: "Chorao Island", description: "A peaceful island sanctuary ideal for bird watching amidst dense mangrove forests.", entryFee: "Free (Ferry ₹10)", bestTime: "Early morning", category: "Wildlife", mustSee: false },
      { name: "Mangueshi Temple", description: "A stunning 450-year-old temple dedicated to Lord Shiva with beautiful Goan architecture.", entryFee: "Free", bestTime: "Morning", category: "Temple", mustSee: false },
      { name: "Baga Beach", description: "Extremely popular beach known for its energetic nightlife, water sports, and beach dining.", entryFee: "Free", bestTime: "Night", category: "Beach", mustSee: true },
      { name: "Fontainhas (Latin Quarter)", description: "Charming neighborhood in Panaji with colorful Portuguese-style houses and narrow lanes.", entryFee: "Free", bestTime: "Late afternoon", category: "Heritage", mustSee: true }
    ];
    cuisine = ["Goan Fish Curry", "Pork Vindaloo", "Bebinca (traditional dessert)", "Chicken Xacuti", "Feni"];
    hotelNames = ["Goa Beach Resort", "Taj Exotica Resort & Spa", "Zostel Goa"];
    bestTime = "November to February";
    tips.push("Rent a scooter for budget-friendly local travel around beaches.", "Wear light linen clothes and carry high-SPF sunscreen.");
  } else if (isManali) {
    places = [
      { name: "Solang Valley", description: "Famous for adventure sports like paragliding, zorbing, and skiing during winter.", entryFee: "Free (Activities extra)", bestTime: "Daytime", category: "Mountain", mustSee: true },
      { name: "Hadimba Temple", description: "An ancient wooden temple dedicated to Goddess Hadimba, surrounded by giant cedar trees.", entryFee: "Free", bestTime: "Morning", category: "Temple", mustSee: true },
      { name: "Rohtang Pass", description: "High mountain pass offering breathtaking views of glaciers and snow peaks.", entryFee: "₹550 (Permit required)", bestTime: "Early morning", category: "Mountain", mustSee: true },
      { name: "Jogini Waterfalls", description: "A scenic trek leading to a beautiful cascading waterfall in Vashisht village.", entryFee: "Free", bestTime: "Morning", category: "Waterfall", mustSee: true },
      { name: "Old Manali", description: "Charming, rustic area with old wooden houses, cafes, and a bohemian vibe.", entryFee: "Free", bestTime: "Evening", category: "Heritage", mustSee: false },
      { name: "Manu Temple", description: "The only temple in India dedicated to Sage Manu, offering beautiful valley views.", entryFee: "Free", bestTime: "Morning", category: "Temple", mustSee: false },
      { name: "Vashisht Hot Springs", description: "Natural hot sulfur springs believed to have medicinal properties.", entryFee: "Free", bestTime: "Early morning", category: "Lake", mustSee: false },
      { name: "Mall Road", description: "The bustling heart of Manali, great for shopping woolens, local food, and souvenirs.", entryFee: "Free", bestTime: "Evening", category: "Market", mustSee: true },
      { name: "Club House", description: "An amusement center offering indoor/outdoor games, river crossing, and go-karting.", entryFee: "₹50", bestTime: "Afternoon", category: "Park", mustSee: false },
      { name: "Great Himalayan National Park", description: "Stunning biodiversity park with dense forests, rare wildlife, and trekking trails.", entryFee: "₹100", bestTime: "Daytime", category: "Wildlife", mustSee: true }
    ];
    cuisine = ["Siddu (steamed bread with stuffing)", "Trout Fish", "Thukpa", "Mittha (sweet rice dish)", "Patrodu"];
    hotelNames = ["Manali Heights Lodge", "The Himalayan Luxury Castle", "Zostel Manali"];
    bestTime = "March to June (Pleasant) or December to February (Snow)";
    tips.push("Book Rohtang Pass permits in advance as daily entries are limited.", "Keep warm layers handy, even during summer evenings.");
  } else if (isJaipur) {
    places = [
      { name: "Amber Palace", description: "Magnificent hilltop fort with grand courtyards, Sheesh Mahal, and elephant rides.", entryFee: "₹100", bestTime: "Morning", category: "Palace", mustSee: true },
      { name: "Hawa Mahal", description: "The iconic Palace of Winds with 953 small windows designed for royal ladies.", entryFee: "₹50", bestTime: "Early morning", category: "Palace", mustSee: true },
      { name: "City Palace", description: "A gorgeous blend of Rajput and Mughal architecture, still home to the royal family.", entryFee: "₹200", bestTime: "Afternoon", category: "Palace", mustSee: true },
      { name: "Jantar Mantar", description: "A UNESCO astronomical observatory featuring the world's largest stone sundial.", entryFee: "₹50", bestTime: "Noon", category: "Heritage", mustSee: true },
      { name: "Nahargarh Fort", description: "Fort on the edge of the Aravalli hills offering stunning sunset views of Jaipur.", entryFee: "₹50", bestTime: "Sunset", category: "Fort", mustSee: true },
      { name: "Jaigarh Fort", description: "Fort housing the Jaivana cannon, the world's largest cannon on wheels.", entryFee: "₹100", bestTime: "Morning", category: "Fort", mustSee: false },
      { name: "Birla Mandir", description: "A modern Hindu temple constructed entirely of high-quality white marble.", entryFee: "Free", bestTime: "Evening", category: "Temple", mustSee: false },
      { name: "Albert Hall Museum", description: "The oldest state museum displaying Royal portraits, armor, and an Egyptian mummy.", entryFee: "₹40", bestTime: "Late afternoon", category: "Museum", mustSee: false },
      { name: "Galta Ji (Monkey Temple)", description: "Unique pre-historic pilgrimage site with natural freshwater springs and monkeys.", entryFee: "Free", bestTime: "Late afternoon", category: "Temple", mustSee: false },
      { name: "Chokhi Dhani", description: "An ethnic Rajasthani village resort offering traditional dances, rides, and food.", entryFee: "₹900 (Includes dinner)", bestTime: "Night", category: "Heritage", mustSee: true }
    ];
    cuisine = ["Dal Baati Churma", "Laal Maas (spicy mutton)", "Gatte ki Sabji", "Pyaaz Kachori", "Ghevar (traditional sweet)"];
    hotelNames = ["Jaipur Heritage Hotel", "The Rambagh Palace", "Zostel Jaipur"];
    bestTime = "October to March";
    tips.push("Purchase a composite ticket to save on entry fees for multiple monuments.", "Hire government-approved guides to avoid local commission traps.");
  } else if (isLadakh) {
    places = [
      { name: "Pangong Tso Lake", description: "Breathtaking high-altitude lake that changes color from deep blue to light turquoise.", entryFee: "Free (Inner line permit needed)", bestTime: "Morning", category: "Lake", mustSee: true },
      { name: "Magnetic Hill", description: "A gravity-defying hill where vehicles appear to roll uphill against gravity.", entryFee: "Free", bestTime: "Daytime", category: "Mountain", mustSee: true },
      { name: "Leh Palace", description: "A former royal palace overlooking the town of Leh, resembling the Potala Palace.", entryFee: "₹25", bestTime: "Late afternoon", category: "Palace", mustSee: true },
      { name: "Shanti Stupa", description: "White-domed Buddhist stupa on a hilltop offering panoramic sunset views of Leh.", entryFee: "Free", bestTime: "Sunset", category: "Temple", mustSee: true },
      { name: "Nubra Valley", description: "Cold mountain desert famous for double-humped Bactrian camel safaris.", entryFee: "Free (Permit needed)", bestTime: "Daytime", category: "Mountain", mustSee: true },
      { name: "Diskit Monastery", description: "The oldest and largest Buddhist monastery in Nubra Valley, featuring a giant Buddha statue.", entryFee: "₹30", bestTime: "Morning", category: "Temple", mustSee: false },
      { name: "Khardung La Pass", description: "One of the highest motorable mountain passes in the world, covered in snow.", entryFee: "Free", bestTime: "Daytime", category: "Mountain", mustSee: true },
      { name: "Spituk Monastery", description: "Charming monastery featuring ancient masks, scriptures, and panoramic airport views.", entryFee: "₹30", bestTime: "Morning", category: "Temple", mustSee: false },
      { name: "Tso Moriri Lake", description: "A tranquil and pristine high-altitude wetland sanctuary visited by migratory birds.", entryFee: "Free (Permit needed)", bestTime: "Daytime", category: "Lake", mustSee: false },
      { name: "Hall of Fame Museum", description: "A museum built by the Indian Army in memory of brave soldiers who lost their lives.", entryFee: "₹100", bestTime: "Afternoon", category: "Museum", mustSee: true }
    ];
    cuisine = ["Thukpa (noodle soup)", "Skyu (Ladakhi pasta)", "Momos", "Butter Tea (Gur Gur Cha)", "Khambir (local bread)"];
    hotelNames = ["Leh Valley View Inn", "The Grand Dragon Ladakh", "Zostel Leh"];
    bestTime = "June to September";
    tips.push("Take complete rest for the first 24-48 hours in Leh to avoid altitude sickness (AMS).", "Carry cash since network and ATM availability are limited in remote areas.");
  } else if (isVaranasi) {
    places = [
      { name: "Dashashwamedh Ghat", description: "The main and most spectacular ghat on the Ganges, famous for the grand Ganga Aarti.", entryFee: "Free", bestTime: "Evening", category: "Temple", mustSee: true },
      { name: "Kashi Vishwanath Temple", description: "One of the most sacred Hindu temples dedicated to Lord Shiva, with a gold spire.", entryFee: "Free", bestTime: "Early morning", category: "Temple", mustSee: true },
      { name: "Sarnath", description: "A peaceful deer park where Gautama Buddha first taught the Dharma after enlightenment.", entryFee: "₹20", bestTime: "Morning", category: "Heritage", mustSee: true },
      { name: "Assi Ghat", description: "Sizable ghat famous for morning yoga, cultural music (Subah-e-Banaras), and boating.", entryFee: "Free", bestTime: "Sunrise", category: "Temple", mustSee: true },
      { name: "Manikarnika Ghat", description: "The primary and most auspicious cremation ghat, steeped in spiritual history.", entryFee: "Free", bestTime: "Daytime", category: "Heritage", mustSee: false },
      { name: "Ramnagar Fort", description: "An 18th-century sandstone fort on the eastern bank of the Ganges with a vintage museum.", entryFee: "₹75", bestTime: "Afternoon", category: "Fort", mustSee: false },
      { name: "Banaras Hindu University (BHU)", description: "One of the largest residential universities, home to the beautiful New Vishwanath Temple.", entryFee: "Free", bestTime: "Daytime", category: "Park", mustSee: false },
      { name: "Ganga River Boat Ride", description: "A boat ride along the ghats, offering a unique perspective of life and rituals.", entryFee: "₹200 - ₹500", bestTime: "Sunrise or Sunset", category: "Lake", mustSee: true },
      { name: "Varanasi Silk Weaver Village", description: "Watch local artisans hand-weave famous Banarasi silk sarees using traditional looms.", entryFee: "Free", bestTime: "Afternoon", category: "Market", mustSee: false },
      { name: "Chowk & Vishwanath Gali", description: "Bustling, narrow market streets famous for street food, brassware, and local crafts.", entryFee: "Free", bestTime: "Late afternoon", category: "Market", mustSee: true }
    ];
    cuisine = ["Kachori Sabzi", "Tamatar Chaat", "Lassi (Blue Lassi)", "Banarasi Paan", "Rabri Jalebi"];
    hotelNames = ["Ganges Riverview Hotel", "BrijRama Palace", "Zostel Varanasi"];
    bestTime = "October to March";
    tips.push("Book a sunrise boat tour early to capture the beautiful rituals along the ghats.", "Be respectful of photography restrictions, especially at Manikarnika cremation ghat.");
  } else {
    places = [
      { name: `Historic City Center of ${destination}`, description: "The bustling core of the city, showing historical buildings and local architecture.", entryFee: "Free", bestTime: "Morning", category: "Heritage", mustSee: true },
      { name: "Main Public Garden & Lake", description: "A peaceful park in the center of the town, offering boating and beautiful walking paths.", entryFee: "₹30", bestTime: "Evening", category: "Lake", mustSee: true },
      { name: "Central Shopping Bazaar", description: "Fascinating street markets with local handicrafts, street food stalls, and active crowds.", entryFee: "Free", bestTime: "Late afternoon", category: "Market", mustSee: true },
      { name: "Local Heritage Museum", description: "Museum showcasing the rich cultural history, archaeological finds, and heritage of the region.", entryFee: "₹50", bestTime: "Afternoon", category: "Museum", mustSee: false },
      { name: "Famous Scenic Viewpoint", description: "A high point in the area offering breathtaking panoramic views of the city and nature.", entryFee: "Free", bestTime: "Sunset", category: "Mountain", mustSee: true },
      { name: "Historic Fort Ruins", description: "Ancient stone fort ruins with old walls and bastions that tell stories of bygone eras.", entryFee: "₹40", bestTime: "Morning", category: "Fort", mustSee: false },
      { name: "Ancient Spiritual Shrine", description: "A revered place of worship known for its spiritual atmosphere and beautiful architecture.", entryFee: "Free", bestTime: "Morning", category: "Temple", mustSee: false },
      { name: "Local Wildlife Sanctuary", description: "Forest area reserved for local flora and fauna, ideal for wildlife trails and photography.", entryFee: "₹100", bestTime: "Early morning", category: "Wildlife", mustSee: false },
      { name: "Town Waterfalls", description: "A beautiful natural waterfall on the outskirts of the town, perfect for a short trek.", entryFee: "Free", bestTime: "Morning", category: "Waterfall", mustSee: false },
      { name: "Cultural Arts Palace", description: "Center presenting local music, folk dance performances, and art exhibitions.", entryFee: "₹150", bestTime: "Night", category: "Palace", mustSee: true }
    ];
    cuisine = ["Local Specialty Platter", "Traditional Street Chaat", "Fresh Local Bread", "Signature Curry", "Regional Sweet Dessert"];
    hotelNames = [`${destination} Grand Inn`, `${destination} Royal Palace & Spa`, `Zostel ${destination}`];
  }

  const totalCost = Math.min(budget, Math.max(3000, Math.round(budget * 0.95)));
  
  const transportCost = Math.round(totalCost * 0.25);
  const accommodationCost = Math.round(totalCost * 0.40);
  const foodCost = Math.round(totalCost * 0.20);
  const activitiesCost = Math.round(totalCost * 0.10);
  const miscCost = totalCost - (transportCost + accommodationCost + foodCost + activitiesCost);

  const costBreakdown = {
    transport: transportCost,
    accommodation: accommodationCost,
    food: foodCost,
    activities: activitiesCost,
    miscellaneous: miscCost
  };

  const singleNightBudget = Math.round(accommodationCost / numberOfDays);
  
  const hotels = [
    {
      name: hotelNames[2] || `Zostel ${destination}`,
      area: "Near City Center",
      pricePerNight: Math.round(singleNightBudget * 0.4),
      totalPrice: Math.round(singleNightBudget * 0.4) * numberOfDays,
      rating: 4.4,
      amenities: ["Free WiFi", "Room Service", "Parking"],
      platform: "Hostelworld / MakeMyTrip",
      bookingUrl: `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destination)}`,
      highlight: "Extremely popular backpacker hostel with vibrant social spaces and friendly staff."
    },
    {
      name: hotelNames[0] || `${destination} Heritage Hotel`,
      area: "Tourist Hub Area",
      pricePerNight: Math.round(singleNightBudget * 0.9),
      totalPrice: Math.round(singleNightBudget * 0.9) * numberOfDays,
      rating: 4.1,
      amenities: ["Free WiFi", "Breakfast", "AC", "Restaurant"],
      platform: "MakeMyTrip",
      bookingUrl: `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destination)}`,
      highlight: "Comfortable family-friendly hotel with cozy rooms and excellent hospitality."
    },
    {
      name: hotelNames[1] || `${destination} Grand Resort & Spa`,
      area: "Scenic Outskirts",
      pricePerNight: Math.round(singleNightBudget * 1.8),
      totalPrice: Math.round(singleNightBudget * 1.8) * numberOfDays,
      rating: 4.8,
      amenities: ["Free WiFi", "Breakfast", "AC", "Pool", "Gym", "Spa"],
      platform: "MakeMyTrip",
      bookingUrl: `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destination)}`,
      highlight: "Premium luxury property offering world-class dining, infinity pool, and pristine service."
    }
  ];

  const perPersonTransport = Math.round(transportCost / numberOfPeople);

  const transport = [
    {
      mode: "train",
      provider: "Indian Railways - Express Train",
      estimatedCostPerPerson: Math.round(perPersonTransport * 0.3),
      totalCost: Math.round(perPersonTransport * 0.3) * numberOfPeople,
      duration: "9 hours 45 minutes",
      platform: "RailYatri",
      bookingUrl: "https://www.railyatri.in/",
      pros: ["Comfortable sleeper coach", "Scenic countryside views", "Highly economical"],
      departureInfo: "Daily overnight express departs 9:30 PM, arrives early morning 7:15 AM."
    },
    {
      mode: "bus",
      provider: "Volvo AC Multi-Axle Sleeper",
      estimatedCostPerPerson: Math.round(perPersonTransport * 0.5),
      totalCost: Math.round(perPersonTransport * 0.5) * numberOfPeople,
      duration: "11 hours",
      platform: "RedBus",
      bookingUrl: "https://www.redbus.in/",
      pros: ["Direct drop-off", "Adjustable AC vents", "Charging points available"],
      departureInfo: "Multiple night buses available departing between 7:00 PM and 10:00 PM."
    },
    {
      mode: "flight",
      provider: "IndiGo / Air India",
      estimatedCostPerPerson: Math.round(perPersonTransport * 1.5),
      totalCost: Math.round(perPersonTransport * 1.5) * numberOfPeople,
      duration: "2 hours 15 minutes",
      platform: "MakeMyTrip",
      bookingUrl: "https://www.makemytrip.com/flights/",
      pros: ["Fastest mode of transport", "Complimentary water", "Saves full day of travel"],
      departureInfo: "Non-stop morning flight departs at 8:45 AM, arrives by 11:00 AM."
    }
  ];

  const itinerary = [];
  const themes = ["Arrival & Exploration", "Iconic Landmarks", "Adventure & Nature", "Cultural Immersion", "Relaxation & Shopping", "Hidden Gems", "Final Sightseeing & Departure"];
  
  for (let d = 1; d <= numberOfDays; d++) {
    const dayTheme = themes[(d - 1) % themes.length];
    const p1 = places[(d - 1) * 2 % places.length]?.name || "Local Sightseeing Spot";
    const p2 = places[((d - 1) * 2 + 1) % places.length]?.name || "Historic Monument";
    const p3 = places[((d - 1) * 2 + 2) % places.length]?.name || "Scenic Viewpoint";

    itinerary.push({
      day: d,
      title: d === 1 ? "Arrival & First Look" : d === numberOfDays ? "Saying Goodbye" : `Exploring ${dayTheme}`,
      theme: dayTheme,
      activities: [
        `09:00 AM - Breakfast and briefing for the day at the hotel or nearby cafe.`,
        `10:30 AM - Visited the beautiful ${p1} for photography and guide tour.`,
        `01:30 PM - Relaxed lunch at a local restaurant trying popular ${cuisine[d % cuisine.length] || 'specialties'}.`,
        `03:30 PM - Continued afternoon tour to ${p2} and learned about its history.`,
        `05:30 PM - Watched the stunning sunset at ${p3} while sipping hot tea.`,
        `08:30 PM - Celebrated the day with dinner and a walk in the local night market.`
      ]
    });
  }

  return {
    itinerary,
    hotels,
    transport,
    topPlaces: places,
    totalEstimatedCost: totalCost,
    costBreakdown,
    tips,
    bestTimeToVisit: bestTime,
    localCuisine: cuisine
  };
};

const generateTripPlan = async ({ source, destination, budget, numberOfDays, numberOfPeople, preferences }) => {
  const isApiKeyMissing = !process.env.OPENAI_API_KEY || 
    process.env.OPENAI_API_KEY.includes('YOUR_OPENAI_API_KEY') || 
    process.env.OPENAI_API_KEY.trim() === '';

  if (isApiKeyMissing) {
    console.log(`ℹ️ OpenAI API key missing or placeholder. Serving local mock trip plan for destination: ${destination}`);
    return generateMockTripPlan({ source, destination, budget, numberOfDays, numberOfPeople, preferences });
  }

  const budgetPerPerson = Math.round(budget / numberOfPeople);
  const budgetCategory = budget < 10000 ? 'budget' : budget < 30000 ? 'mid-range' : 'luxury';

  const prompt = `You are an expert Indian travel planner. Generate a detailed, realistic trip plan in JSON format.

Trip Details:
- From: ${source}
- To: ${destination}
- Total Budget: ₹${budget} for ${numberOfPeople} people (₹${budgetPerPerson}/person)
- Duration: ${numberOfDays} days
- Budget Category: ${budgetCategory}
- Preferences: ${preferences.length > 0 ? preferences.join(', ') : 'general sightseeing'}

Return ONLY a valid JSON object (no markdown, no backticks) with this EXACT structure:
{
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & First Impressions",
      "theme": "Exploration",
      "activities": ["9:00 AM - Activity description with context", "1:00 PM - Lunch at specific place", "3:00 PM - Visit specific attraction", "7:00 PM - Dinner experience"]
    }
  ],
  "hotels": [
    {
      "name": "Specific Hotel Name",
      "area": "Area/Locality name",
      "pricePerNight": 2500,
      "totalPrice": 7500,
      "rating": 4.2,
      "amenities": ["Free WiFi", "Breakfast", "AC", "Pool"],
      "platform": "MakeMyTrip",
      "bookingUrl": "https://www.makemytrip.com/hotels/",
      "highlight": "Why this hotel is special"
    }
  ],
  "transport": [
    {
      "mode": "train",
      "provider": "Indian Railways - Specific Train Name",
      "estimatedCostPerPerson": 800,
      "totalCost": 3200,
      "duration": "8 hours 30 minutes",
      "platform": "RailYatri",
      "bookingUrl": "https://www.railyatri.in/",
      "pros": ["Comfortable", "Scenic route", "Economical"],
      "departureInfo": "Departs early morning, arrives by afternoon"
    },
    {
      "mode": "bus",
      "provider": "Specific Bus Operator",
      "estimatedCostPerPerson": 500,
      "totalCost": 2000,
      "duration": "10 hours",
      "platform": "RedBus",
      "bookingUrl": "https://www.redbus.in/",
      "pros": ["Budget friendly", "Multiple departure times", "AC available"],
      "departureInfo": "Night buses available for convenience"
    },
    {
      "mode": "flight",
      "provider": "IndiGo / Air India",
      "estimatedCostPerPerson": 4500,
      "totalCost": 18000,
      "duration": "1 hour 30 minutes",
      "platform": "MakeMyTrip",
      "bookingUrl": "https://www.makemytrip.com/flights/",
      "pros": ["Fastest", "Comfortable", "Time saving"],
      "departureInfo": "Multiple daily flights available"
    }
  ],
  "topPlaces": [
    {
      "name": "Specific Place Name",
      "description": "2 sentence description of what makes this place special and what to do there",
      "entryFee": "₹50",
      "bestTime": "Early morning",
      "category": "Heritage",
      "mustSee": true
    }
  ],
  "totalEstimatedCost": ${budget},
  "costBreakdown": {
    "transport": 0,
    "accommodation": 0,
    "food": 0,
    "activities": 0,
    "miscellaneous": 0
  },
  "tips": ["Practical tip 1", "Practical tip 2", "Practical tip 3", "Safety tip", "Money saving tip"],
  "bestTimeToVisit": "October to March",
  "localCuisine": ["Dish 1", "Dish 2", "Dish 3", "Dish 4"]
}

Rules:
- Generate exactly ${numberOfDays} days in itinerary
- Generate exactly 3 hotels (budget, mid-range, premium options)
- Generate exactly 3 transport options (train, bus, flight) - skip flight if less than 500km
- Generate exactly 10 top places
- All prices in Indian Rupees (₹)
- costBreakdown must add up to totalEstimatedCost
- Use REAL hotel names, train names, and landmarks for ${destination}
- bookingUrl for hotels should always be: https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destination)}`;

  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = response.choices[0].message.content.trim();
  const cleaned = content.replace(/```json|```/g, '').trim();
  
  try {
    const plan = JSON.parse(cleaned);
    return plan;
  } catch (e) {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse AI response as JSON');
  }
};

module.exports = { generateTripPlan };
