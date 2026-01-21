"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  CheckCircle,
  Moon,
  Sun,
  Menu,
  X,
  MapPinned,
  Utensils,
  Home,
  Navigation,
  Star,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function TripDetailPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { theme, setTheme } = useTheme();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trip data - in a real app, this would come from an API
  const tripData = {
    "1": {
      name: "Northern Ghana Safari Explorer",
      region: "Northern Ghana",
      startDate: "March 15, 2026",
      endDate: "March 22, 2026",
      duration: "7 days",
      groupSize: "8-12",
      price: 4499,
      deposit: 250,
      availability: 4,
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200",
      rating: 4.9,
      reviews: 48,
      description: "Experience the thrill of encountering elephants, antelopes, and exotic bird species in their natural habitat.",
      highlights: ["Mole National Park", "Larabanga Mosque", "Wildlife Safaris", "Local Guides"],
    },
    "2": {
      name: "Cape Coast Historical Journey",
      region: "Central Region",
      startDate: "April 5, 2026",
      endDate: "April 10, 2026",
      duration: "5 days",
      groupSize: "10-15",
      price: 3499,
      deposit: 200,
      availability: 6,
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=1200",
      rating: 4.8,
      reviews: 32,
      description: "Walk through the powerful corridors of Cape Coast Castle and discover Ghana's complex colonial past.",
      highlights: ["Cape Coast Castle", "Historical Tours", "Beach Relaxation", "Cultural Experience"],
    },
  };

  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const tripKey = (rawId && rawId in tripData ? rawId : "1") as keyof typeof tripData;
  const trip = tripData[tripKey];

  const tabs = [
    { id: "overview", label: "Trip Overview" },
    { id: "included", label: "What's Included" },
    { id: "packages", label: "Packages & Options" },
    { id: "itinerary", label: "Itinerary" },
    { id: "location", label: "Location" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Travel with<br />Sulemana
              </span>
            </Link>

            {/* Theme Toggle */}
            <div className="flex items-center gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              )}
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Trips
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-semibold">{trip.region}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {trip.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{trip.groupSize} people</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>{trip.rating} ({trip.reviews} reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tabs */}
            <div className="lg:col-span-2">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
                <div className="flex gap-1 md:gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 whitespace-nowrap font-semibold text-sm md:text-base transition-all border-b-2 ${
                        activeTab === tab.id
                          ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {trip.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {trip.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Highlights
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {trip.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Start Date</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{trip.startDate}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">End Date</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{trip.endDate}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Duration</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{trip.duration}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* What's Included Tab */}
                {activeTab === "included" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      What's Included
                    </h2>
                    
                    <div className="space-y-4">
                      {[
                        { icon: Home, title: "Accommodations", desc: "4-5 star hotels and lodges" },
                        { icon: Utensils, title: "Meals", desc: "Breakfast, lunch, and dinner included" },
                        { icon: Navigation, title: "Transportation", desc: "Airport transfers and in-country transport" },
                        { icon: MapPinned, title: "Guided Tours", desc: "Professional local guides at all attractions" },
                        { icon: CheckCircle, title: "Activities", desc: "All entrance fees and scheduled activities" },
                        { icon: Users, title: "Group Support", desc: "24/7 customer support throughout the trip" },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <Icon className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Packages & Options Tab */}
                {activeTab === "packages" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Packages & Options
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="border-2 border-emerald-600 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Double Occupancy
                          </h3>
                          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Popular
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Share a room with another traveler. Great for solo travelers wanting to save.
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${trip.price}
                          <span className="text-lg text-gray-600 dark:text-gray-400"> /person</span>
                        </p>
                      </div>

                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Single Occupancy
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Private room. Perfect for those wanting their own space.
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${Math.round(trip.price * 1.4)}
                          <span className="text-lg text-gray-600 dark:text-gray-400"> /person</span>
                        </p>
                      </div>

                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Triple Occupancy
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Three people sharing one room. Best value for groups.
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${Math.round(trip.price * 0.85)}
                          <span className="text-lg text-gray-600 dark:text-gray-400"> /person</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === "itinerary" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Day by Day Itinerary
                    </h2>
                    
                    <div className="space-y-6">
                      {[1, 2, 3, 4, 5, 6, 7].slice(0, parseInt(trip.duration)).map((day) => (
                        <div key={day} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Day {day}: Safari Adventure {day > 1 && "Continues"}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Experience the wonders of Ghana's wildlife. Early morning safari drive to spot elephants, antelopes, and various bird species in their natural habitat.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                              Breakfast included
                            </span>
                            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                              Lunch included
                            </span>
                            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                              Dinner included
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === "location" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Location & Map
                    </h2>
                    
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-96 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">Map integration coming soon</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                          Region: {trip.region}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          Located in the {trip.region}, this destination offers stunning natural beauty, rich cultural heritage, and unforgettable wildlife experiences.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                          Getting There
                        </h3>
                        <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                          <li>• Fly into Accra International Airport</li>
                          <li>• Domestic flight to Tamale (1.5 hours)</li>
                          <li>• Ground transfer provided (2-3 hours)</li>
                          <li>• Total journey: 6-7 hours</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Guest Reviews
                        </h2>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(trip.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {trip.rating} ({trip.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                Amazing Experience! ⭐⭐⭐⭐⭐
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Sarah Johnson • 2 months ago
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">
                            This trip was absolutely incredible. Our guide was knowledgeable and passionate about conservation. We saw so much wildlife and learned about Ghana's rich culture. Highly recommend!
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 space-y-6"
              >
                {/* Pricing */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">From</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${trip.price}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    per person
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 dark:text-gray-400">Deposit</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${trip.deposit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Remaining</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      ${trip.price - trip.deposit}
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">
                    ✓ {trip.availability} spots available
                  </p>
                </div>

                <button className="w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Book Now
                </button>

                <button className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors">
                  Ask a Question
                </button>

                <p className="text-center text-xs text-gray-600 dark:text-gray-400">
                  Free cancellation up to 60 days before departure
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-xl font-semibold text-white">Travel with Sulemana</span>
              </div>
              <p className="text-gray-400 text-sm">
                Exploring Ghana's hidden treasures and sharing authentic travel experiences.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/destinations" className="hover:text-white transition">Destinations</Link></li>
                <li><Link href="/book" className="hover:text-white transition">Book a Trip</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">
                info@travelwithsulemana.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Travel with Sulemana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
