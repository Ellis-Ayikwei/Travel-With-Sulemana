"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Calendar,
  Info,
  Camera,
  Navigation as NavigationIcon,
  Hotel,
  Lightbulb,
  Heart,
  Share2,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Destination {
  _id: string;
  slug: string;
  name: string;
  region: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  image: string;
  gallery?: string[];
  highlights?: string[];
  duration?: string;
  bestTime?: string;
  thingsToDo?: string[];
  howToGetThere?: string;
  whereToStay?: string[];
  localTips?: string[];
  estimatedCost?: string;
  rating?: number;
  reviews?: number;
  experienceIds?: string[];
}

interface Experience {
  _id: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  duration?: string;
}

// Static destinations data
const destinationsData: Destination[] = [
  {
    _id: "mole",
    slug: "mole-national-park",
    name: "Mole National Park",
    region: "Northern",
    tagline: "Ghana's Premier Wildlife Safari Destination",
    description: "Experience the thrill of encountering elephants, antelopes, and over 300 bird species in their natural habitat.",
    longDescription: "Mole National Park is Ghana's largest wildlife sanctuary, spanning 4,840 square kilometers of pristine Guinea savannah. Established in 1971, it's West Africa's premier destination for wildlife viewing. The park is home to over 90 mammal species including elephants, buffalo, baboons, warthogs, and various antelope species. With over 300 bird species recorded, it's also a paradise for bird watchers.",
    image: "/assets/images/mole.jpg",
    gallery: ["/assets/images/mole.jpg", "/assets/images/mole-2.jpg"],
    highlights: ["Elephant Safari", "Bird Watching", "Canopy Walkways", "Museum Experience"],
    duration: "2-3 days",
    bestTime: "November to April (dry season)",
    thingsToDo: [
      "Morning and evening game drives to spot elephants, antelopes, and other wildlife",
      "Guided walking safaris for close encounters with nature",
      "Bird watching - over 300 species recorded",
      "Visit the observation platform overlooking the watering hole",
      "Cultural visits to nearby Larabanga village"
    ],
    howToGetThere: "Located 150km west of Tamale. Accessible by road from Tamale (3-4 hours drive), Kumasi (6-7 hours), or Accra (10-12 hours). Regular buses and taxis available from Tamale.",
    whereToStay: [
      "Mole Motel - The only accommodation inside the park with restaurant and pool",
      "Zaina Lodge - Luxury eco-lodge just outside the park",
      "Budget guesthouses in nearby Larabanga village"
    ],
    localTips: [
      "Book accommodation in advance, especially during peak season",
      "Bring binoculars for wildlife viewing",
      "Wear neutral-colored clothing for game drives",
      "Visit the ancient Larabanga Mosque nearby",
      "Early mornings and late afternoons are best for wildlife spotting"
    ],
    estimatedCost: "$50-150 per day including accommodation and activities",
    rating: 4.7,
    reviews: 342
  },
  {
    _id: "larabanga",
    slug: "larabanga-mosque",
    name: "Larabanga Mosque",
    region: "Northern",
    tagline: "West Africa's Oldest Mosque",
    description: "Step back in time at this stunning 15th-century mosque, built in the traditional Sudanese architectural style.",
    longDescription: "The Larabanga Mosque is one of the oldest mosques in West Africa, dating back to 1421. Built in the traditional Sudanese-Sahelian architectural style, this unique structure stands as a testament to Ghana's Islamic heritage. The mosque features distinctive wooden beams protruding from its mud walls and has been carefully maintained using traditional building techniques for over 600 years.",
    image: "/assets/images/larabanga.jpg",
    gallery: ["/assets/images/larabanga.jpg"],
    highlights: ["Ancient Architecture", "Sacred Mystic Stone", "Local Guide", "Cultural Heritage"],
    duration: "Half day",
    bestTime: "Year-round",
    thingsToDo: [
      "Guided tour of the mosque and its history",
      "Learn about traditional Sudanese architecture",
      "Visit the sacred mystic stone",
      "Explore Larabanga village",
      "Combine with visit to nearby Mole National Park"
    ],
    howToGetThere: "Located 5km from Mole National Park entrance. Easily accessible from Tamale or as part of a Mole safari trip.",
    whereToStay: [
      "Mole Motel (15km away)",
      "Guesthouses in Larabanga village",
      "Day trip from Tamale"
    ],
    localTips: [
      "Dress modestly out of respect for the Islamic site",
      "Photography fee required - ask permission before taking photos",
      "Hire a local guide for detailed history and stories",
      "Combine with Mole National Park visit (only 5km away)",
      "Best visited in the morning or late afternoon"
    ],
    estimatedCost: "$10-20 for tour and donations",
    rating: 4.5,
    reviews: 156
  },
  {
    _id: "salaga",
    slug: "salaga-slave-wells",
    name: "Salaga Slave Wells",
    region: "Northern",
    tagline: "A Journey Through History",
    description: "Discover the poignant history of the trans-Saharan slave trade at these historic wells.",
    longDescription: "Salaga was once a major hub of the trans-Saharan slave trade. The slave wells and shrines here tell the powerful and heartbreaking story of thousands of people who passed through this town. These historic sites serve as an important reminder of Ghana's past and the resilience of its people.",
    image: "/assets/images/salaga.jpg",
    gallery: ["/assets/images/salaga.jpg"],
    highlights: ["Historical Tours", "Cultural Education", "Heritage Sites", "Local Stories"],
    duration: "1 day",
    bestTime: "Year-round",
    thingsToDo: [
      "Visit the ancient slave wells",
      "Tour the slave market site",
      "Learn about the trans-Saharan slave trade",
      "Visit the protection shrine",
      "Cultural walks through historic Salaga"
    ],
    howToGetThere: "Located in Salaga town, accessible from Tamale (100km) or Kumasi (220km) by road.",
    whereToStay: [
      "Basic guesthouses in Salaga",
      "Hotels in Tamale (100km away)",
      "Day trip option from Tamale"
    ],
    localTips: [
      "Hire a knowledgeable local guide for full historical context",
      "The tours can be emotionally heavy - prepare yourself",
      "Support local by buying crafts from artisans",
      "Combine with visit to other Northern sites",
      "Bring water and sun protection"
    ],
    estimatedCost: "$20-40 for guides and entrance fees",
    rating: 4.3,
    reviews: 98
  },
  {
    _id: "cape-coast",
    slug: "cape-coast-castle",
    name: "Cape Coast Castle",
    region: "Southern",
    tagline: "Where History Echoes",
    description: "Walk through the powerful corridors of Cape Coast Castle, a UNESCO World Heritage Site.",
    longDescription: "Cape Coast Castle stands as one of the most significant historical sites in Ghana. Built by the Swedes in 1653 and later expanded by the British, this UNESCO World Heritage Site was a major hub of the transatlantic slave trade. The haunting 'Door of No Return' and the dungeons below tell a powerful story of resilience and remembrance. Today, it serves as a museum and memorial to those who suffered through this dark chapter of history.",
    image: "/assets/images/capecoast.webp",
    gallery: ["/assets/images/capecoast.webp"],
    highlights: ["Historical Tours", "Ocean Views", "Museum Exhibits", "UNESCO Site"],
    duration: "1 day",
    bestTime: "Year-round",
    thingsToDo: [
      "Guided tour through the castle and dungeons",
      "Visit the 'Door of No Return'",
      "Explore the museum exhibits",
      "Learn about the transatlantic slave trade",
      "Enjoy panoramic ocean views from the ramparts"
    ],
    howToGetThere: "Located in Cape Coast town, 150km west of Accra (2-3 hours by road). Regular buses and shared taxis available.",
    whereToStay: [
      "Hotels and guesthouses in Cape Coast town",
      "Beachfront resorts along the coast",
      "Day trip from Accra possible"
    ],
    localTips: [
      "Guided tours highly recommended for full context",
      "The experience can be emotionally intense",
      "Combine with visit to Elmina  Castle nearby",
      "Kakum National Park canopy walk is 30 minutes away",
      "Best to visit early morning to avoid crowds"
    ],
    estimatedCost: "$30-60 for entrance and guide",
    rating: 4.9,
    reviews: 1253
  }
];

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [destination, setDestination] = useState<Destination | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (slug) {
      fetchDestination();
    }
  }, [slug]);

  const fetchDestination = () => {
    setLoading(true);
    // Find destination from static data
    const found = destinationsData.find(d => d.slug === slug);
    if (found) {
      setDestination(found);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Destination not found</h1>
          <Link href="/destinations" className="text-emerald-600 hover:underline">
            ← Back to Destinations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "things-to-do", label: "Things to Do", icon: Camera },
    { id: "practical", label: "Practical Info", icon: NavigationIcon },
    { id: "experiences", label: "Experiences", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Destinations
              </Link>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {destination.name}
              </h1>
              
              {destination.tagline && (
                <p className="text-xl md:text-2xl text-gray-200 mb-6">
                  {destination.tagline}
                </p>
              )}
              
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{destination.region}</span>
                </div>
                {destination.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{destination.duration}</span>
                  </div>
                )}
                {destination.bestTime && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Best: {destination.bestTime}</span>
                  </div>
                )}
                {destination.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{destination.rating} ({destination.reviews || 0} reviews)</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-emerald-600 text-emerald-600"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About {destination.name}</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {destination.description}
                  </p>
                  {destination.longDescription && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {destination.longDescription}
                    </p>
                  )}
                </div>

                {destination.highlights && destination.highlights.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {destination.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
                        >
                          <Star className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800 dark:text-gray-200">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {destination.gallery && destination.gallery.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {destination.gallery.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${destination.name} ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Things to Do Tab */}
            {activeTab === "things-to-do" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Things to Do</h2>
                {destination.thingsToDo && destination.thingsToDo.length > 0 ? (
                  <ul className="space-y-4">
                    {destination.thingsToDo.map((activity, index) => (
                      <li
                        key={index}
                        className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <Camera className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No activities listed yet.</p>
                )}
              </motion.div>
            )}

            {/* Practical Info Tab */}
            {activeTab === "practical" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {destination.howToGetThere && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <NavigationIcon className="w-6 h-6 text-emerald-600" />
                      How to Get There
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {destination.howToGetThere}
                    </p>
                  </div>
                )}

                {destination.whereToStay && destination.whereToStay.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <Hotel className="w-6 h-6 text-emerald-600" />
                      Where to Stay
                    </h3>
                    <ul className="space-y-2">
                      {destination.whereToStay.map((place, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-emerald-600 mt-1">•</span>
                          {place}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {destination.localTips && destination.localTips.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <Lightbulb className="w-6 h-6 text-emerald-600" />
                      Local Tips
                    </h3>
                    <ul className="space-y-2">
                      {destination.localTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-emerald-600 mt-1">💡</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {destination.estimatedCost && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                      Estimated Cost
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">{destination.estimatedCost}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Experiences Tab */}
            {activeTab === "experiences" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Related Experiences</h2>
                {experiences.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {experiences.map((experience) => (
                      <Link
                        key={experience._id}
                        href={`/experiences#${experience._id}`}
                        className="group block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 hover:border-emerald-600 transition-colors"
                      >
                        <img
                          src={experience.image}
                          alt={experience.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                            {experience.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {experience.description}
                          </p>
                          <div className="flex items-center justify-between">
                            {experience.duration && (
                              <span className="text-sm text-gray-500 dark:text-gray-500">
                                {experience.duration}
                              </span>
                            )}
                            {experience.price && (
                              <span className="font-bold text-emerald-600">
                                ${experience.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No experiences linked to this destination yet.</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-emerald-50 dark:bg-emerald-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Explore {destination.name}?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's plan your perfect journey to this amazing destination
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
            >
              Book Experience
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors border border-gray-200 dark:border-gray-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
