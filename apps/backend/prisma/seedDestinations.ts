import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const destinationsData = [
  {
    slug: "mole-national-park",
    name: "Mole National Park",
    region: "Northern",
    tagline: "Ghana's Largest Wildlife Sanctuary",
    description: "Experience Africa's wildlife in Ghana's premier safari destination. Home to elephants, antelopes, baboons, and over 300 bird species.",
    longDescription: "Mole National Park is Ghana's largest and most prestigious protected area, covering 4,840 square kilometers of Guinea savannah. Established in 1971, it stands as West Africa's premier destination for wildlife viewing, offering visitors unique encounters with African elephants, rare bird species, and diverse wildlife in their natural habitat.",
    image: "/uploads/destinations/mole-national-park.jpg",
    gallery: [
      "/uploads/destinations/mole-1.jpg",
      "/uploads/destinations/mole-2.jpg",
      "/uploads/destinations/mole-3.jpg"
    ],
    highlights: [
      "Walking safaris with elephants",
      "Over 300 bird species",
      "Panoramic savannah views",
      "Traditional village visits"
    ],
    duration: "2-3 days",
    bestTime: "November to April",
    thingsToDo: [
      "Morning and evening game drives",
      "Guided walking safaris",
      "Bird watching expeditions",
      "Cultural village tours",
      "Photography at the watering hole"
    ],
    howToGetThere: "Mole is accessible by road from Tamale (150km, 3-4 hours drive). Regular buses and taxis are available from Tamale. The park can also be reached from Kumasi (520km) or Accra (700km).",
    whereToStay: [
      "Mole Motel - The only accommodation inside the park with restaurant and pool",
      "Zaina Lodge - Luxury eco-lodge near the park",
      "Budget guesthouses in Larabanga village (15km away)"
    ],
    localTips: [
      "Book walking safaris in advance - they're the highlight of Mole",
      "Visit the ancient Larabanga Mosque nearby",
      "Bring binoculars for bird watching",
      "Dry season (Nov-Apr) offers best wildlife viewing",
      "The park restaurant has limited options - bring snacks"
    ],
    estimatedCost: "$50-150 per day (park fees, accommodation, safaris)",
    rating: 4.7,
    reviews: 342
  },
  {
    slug: "larabanga-mosque",
    name: "Larabanga Mosque",
    region: "Northern",
    tagline: "West Africa's Oldest Mosque",
    description: "Visit the oldest mosque in Ghana and one of the oldest in West Africa, built in the Sudanese architectural style in 1421.",
    longDescription: "The Larabanga Mosque is a stunning example of Sudanese-Sahelian architecture and stands as a testament to Ghana's Islamic heritage. Built entirely from mud and timber, this remarkable structure has been maintained for over 600 years using traditional construction methods passed down through generations.",
    image: "/uploads/destinations/larabanga-mosque.jpg",
    gallery: [
      "/uploads/destinations/larabanga-1.jpg",
      "/uploads/destinations/larabanga-2.jpg"
    ],
    highlights: [
      "600-year-old architecture",
      "Traditional Sudanese design",
      "Sacred Muslim site",
      "Cultural heritage experience"
    ],
    duration: "Half day",
    bestTime: "Year-round",
    thingsToDo: [
      "Guided mosque tour",
      "Learn about Islamic architecture",
      "Visit the mystic stone",
      "Explore Larabanga village",
      "Combine with Mole National Park visit"
    ],
    howToGetThere: "Located 5km from Mole National Park entrance. Accessible from Tamale (145km) by road. Most visitors combine with a trip to Mole.",
    whereToStay: [
      "Stay at Mole Motel (15km away)",
      "Guesthouses in Larabanga village",
      "Day trip from Tamale"
    ],
    localTips: [
      "Respect Islamic customs - dress modestly",
      "Photography fee required",
      "Local guides are available and recommended",
      "Combine with Mole National Park visit",
      "Visit the mystic stone nearby"
    ],
    estimatedCost: "$10-20 (tour and donations)",
    rating: 4.5,
    reviews: 156
  },
  {
    slug: "cape-coast-castle",
    name: "Cape Coast Castle",
    region: "Central",
    tagline: "UNESCO World Heritage Site",
    description: "A powerful historical site documenting the Trans-Atlantic slave trade. One of Ghana's most visited and emotionally moving destinations.",
    longDescription: "Cape Coast Castle stands as a haunting reminder of the brutal Trans-Atlantic slave trade. Built by the Swedes in 1653 and later expanded by the British, this UNESCO World Heritage Site tells the painful story of millions of Africans who passed through its 'Door of No Return' on their way to the Americas.",
    image: "/uploads/destinations/cape-coast-castle.jpg",
    gallery: [
      "/uploads/destinations/cape-coast-1.jpg",
      "/uploads/destinations/cape-coast-2.jpg",
      "/uploads/destinations/cape-coast-3.jpg"
    ],
    highlights: [
      "UNESCO World Heritage Site",
      "Door of No Return",
      "Historical dungeons",
      "Guided historical tours",
      "Ocean views from ramparts"
    ],
    duration: "Full day",
    bestTime: "Year-round",
    thingsToDo: [
      "Guided historical tour",
      "Visit the female and male dungeons",
      "Walk through the Door of No Return",
      "Explore the museum",
      "Climb to the castle ramparts"
    ],
    howToGetThere: "Located in Cape Coast town center, 150km west of Accra (2-3 hours by road). Regular buses and taxis from Accra and Kumasi.",
    whereToStay: [
      "Hotels in Cape Coast town",
      "Beachfront resorts nearby",
      "Budget guesthouses",
      "Day trip from Accra possible"
    ],
    localTips: [
      "Guided tours are essential for context",
      "Emotionally intense - prepare yourself",
      "Combine with Elmina Castle visit",
      "Canopy walkway at Kakum is 30 minutes away",
      "Bring water and comfortable walking shoes"
    ],
    estimatedCost: "$30-80 (entrance, guide, transport)",
    rating: 4.9,
    reviews: 1253
  },
  {
    slug: "kakum-national-park",
    name: "Kakum National Park",
    region: "Central",
    tagline: "Walk Above the Rainforest Canopy",
    description: "Experience Ghana's most famous canopy walkway suspended 40 meters above the rainforest floor. Home to forest elephants, Diana monkeys, and exotic birds.",
    longDescription: "Kakum National Park protects 375 square kilometers of tropical rainforest and is best known for its spectacular canopy walkway - one of only three in Africa. The seven suspension bridges span 350 meters and reach heights of 40 meters, offering breathtaking views and unique wildlife encounters.",
    image: "/uploads/destinations/kakum-canopy.jpg",
    gallery: [
      "/uploads/destinations/kakum-1.jpg",
      "/uploads/destinations/kakum-2.jpg",
      "/uploads/destinations/kakum-3.jpg"
    ],
    highlights: [
      "Canopy walkway 40m high",
      "Pristine rainforest",
      "Forest elephants",
      "Diana monkeys",
      "300+ bird species"
    ],
    duration: "Half to full day",
    bestTime: "Year-round (dry season preferred)",
    thingsToDo: [
      "Canopy walkway experience",
      "Guided nature walks",
      "Bird watching",
      "Night safari drives",
      "Butterfly observation"
    ],
    howToGetThere: "Located 30km north of Cape Coast, 170km from Accra. Accessible by shared taxi from Cape Coast or private car. Most visitors combine with Cape Coast Castle.",
    whereToStay: [
      "Cape Coast hotels (30km away)",
      "Eco-lodges near the park",
      "Day trip from Accra or Cape Coast"
    ],
    localTips: [
      "Visit early morning for best wildlife viewing",
      "Not recommended for those afraid of heights",
      "Wear comfortable walking shoes",
      "Combine with Cape Coast Castle visit",
      "Book night safari in advance if interested"
    ],
    estimatedCost: "$25-60 (entrance, walkway, guide)",
    rating: 4.6,
    reviews: 876
  },
  {
    slug: "wli-waterfalls",
    name: "Wli Waterfalls",
    region: "Volta",
    tagline: "Ghana's Highest Waterfall",
    description: "Trek through lush forest to reach Ghana's tallest waterfall. Home to colonies of fruit bats and perfect for nature lovers seeking adventure.",
    longDescription: "Wli Waterfalls (pronounced 'vlee') is Ghana's highest waterfall, cascading from approximately 80 meters. Located in the Agumatsa Wildlife Sanctuary near the Togo border, the falls are surrounded by pristine rainforest teeming with wildlife, including the spectacular colony of fruit bats.",
    image: "/uploads/destinations/wli-waterfalls.jpg",
    gallery: [
      "/uploads/destinations/wli-1.jpg",
      "/uploads/destinations/wli-2.jpg",
      "/uploads/destinations/wli-3.jpg"
    ],
    highlights: [
      "Ghana's tallest waterfall",
      "Forest trek adventure",
      "Fruit bat colonies",
      "Natural swimming pool",
      "Pristine rainforest"
    ],
    duration: "Full day",
    bestTime: "June to November (rainy season - most dramatic)",
    thingsToDo: [
      "Lower falls hike (45 min)",
      "Upper falls trek (3-4 hours)",
      "Swimming at the base",
      "Bat watching at sunset",
      "Village cultural tours"
    ],
    howToGetThere: "Located near Hohoe in Volta Region, 270km from Accra (4-5 hours). Accessible from Ho (60km) or Hohoe (20km). The village of Wli is the starting point.",
    whereToStay: [
      "Wli Waterfalls Guesthouse",
      "Hotels in Hohoe",
      "Eco-lodges in the area",
      "Homestays in Wli village"
    ],
    localTips: [
      "Wear good hiking shoes - trail can be slippery",
      "Bring swimwear for the natural pool",
      "Upper falls requires good fitness level",
      "Visit during rainy season for full waterfall",
      "Local guides are mandatory and helpful"
    ],
    estimatedCost: "$15-40 (guide, entrance, transport)",
    rating: 4.4,
    reviews: 543
  }
];

async function main() {
  console.log('Start seeding destinations...');
  
  for (const destination of destinationsData) {
    const created = await prisma.destination.upsert({
      where: { slug: destination.slug },
      update: destination,
      create: destination,
    });
    console.log(`Created/Updated destination: ${created.name}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
