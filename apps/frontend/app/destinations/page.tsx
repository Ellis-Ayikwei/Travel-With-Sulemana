"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function DestinationsPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const regions = [
    { id: "all", label: "All Destinations" },
    { id: "northern", label: "Northern Ghana" },
    { id: "southern", label: "Southern Ghana" },
    { id: "eastern", label: "Eastern Ghana" },
    { id: "western", label: "Western Ghana" },
  ];

  const destinations = [
    {
      id: "mole",
      name: "Mole National Park",
      region: "northern",
      tagline: "Ghana's Premier Wildlife Safari Destination",
      description: "Experience the thrill of encountering elephants, antelopes, and over 300 bird species in their natural habitat. Mole offers unforgettable safari adventures across 4,840 square kilometers of pristine savanna.",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200",
      highlights: [
        "Elephant Safari",
        "Bird Watching",
        "Canopy Walkways",
        "Museum Experience"
      ],
      duration: "2-3 days",
      bestTime: "Nov - Apr"
    },
    {
      id: "larabanga",
      name: "Larabanga Mosque",
      region: "northern",
      tagline: "West Africa's Oldest Mosque",
      description: "Step back in time at this stunning 15th-century mosque, built in the traditional Sudanese architectural style. The Larabanga Mosque stands as a testament to Ghana's Islamic heritage and timeless beauty.",
      image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200",
      highlights: [
        "Ancient Architecture",
        "Sacred Mystic Stone",
        "Local Guide",
      ],
      duration: "Half day",
      bestTime: "Year-round"
    },
    {
      id: "salaga",
      name: "Salaga Slave Wells",
      region: "northern",
      tagline: "A Journey Through History",
      description: "Discover the poignant history of the trans-Saharan slave trade at these historic wells. Salaga was once a major trading post, and these wells and shrines tell powerful stories of Ghana's past.",
      image: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?q=80&w=1200",
      highlights: [
        "Historical Tours",
        "Cultural Education",
        "Heritage Sites",
        "Local Stories"
      ],
      duration: "1 day",
      bestTime: "Year-round"
    },
    {
      id: "cape-coast",
      name: "Cape Coast Castle",
      region: "southern",
      tagline: "Where History Echoes",
      description: "Walk through the powerful corridors of Cape Coast Castle, a UNESCO World Heritage Site that stands as a sobering reminder of the Atlantic slave trade. This fortress offers profound insights into Ghana's complex colonial past.",
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=1200",
      highlights: [
        "Historical Tours",
        "Ocean Views",
        "Museum Exhibits"
      ],
      duration: "1 day",
      bestTime: "Year-round"
    },
    {
      id: "kakum",
      name: "Kakum National Park",
      region: "southern",
      tagline: "Walk Above the Rainforest",
      description: "Experience the rainforest from a bird's eye view on the famous canopy walkway, suspended 40 meters above the ground. Kakum is home to diverse wildlife including forest elephants, diana monkeys, and over 250 bird species.",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200",
      highlights: [
        "Canopy Walkway",
        "Rainforest Trails",
        "Wildlife Spotting",
        "Nature Photography"
      ],
      duration: "1-2 days",
      bestTime: "Nov - Mar"
    },
    {
      id: "wli",
      name: "Wli Waterfalls",
      region: "eastern",
      tagline: "Ghana's Highest Waterfall",
      description: "Trek through lush vegetation to reach the spectacular Wli Waterfalls, the highest in Ghana and West Africa. The journey rewards you with breathtaking views and refreshing natural pools.",
      image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200",
      highlights: [
        "Hiking Trails",
        "Swimming Pools",
        "Bat Colonies",
        "Forest Walks"
      ],
      duration: "1 day",
      bestTime: "May - Sep"
    },
  ];

  const filteredDestinations = selectedRegion === "all" 
    ? destinations 
    : destinations.filter(d => d.region === selectedRegion);

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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/destinations" className="text-gray-900 dark:text-white font-medium transition">
                Destinations
              </Link>
              <Link href="/experiences" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                Experiences
              </Link>
              <Link href="/watch" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                Watch
              </Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                Blog
              </Link>
              <Link href="/plan" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                Plan Your Trip
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                Contact
              </Link>
            </div>

            {/* Theme Toggle & Mobile Menu */}
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 mt-4">
              <div className="flex flex-col gap-4">
                <Link href="/destinations" className="text-gray-900 dark:text-white font-medium py-2">
                  Destinations
                </Link>
                <Link href="/experiences" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2">
                  Experiences
                </Link>
                <Link href="/watch" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2">
                  Watch
                </Link>
                <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2">
                  Blog
                </Link>
                <Link href="/plan" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2">
                  Plan Your Trip
                </Link>
                <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Map */}
      <section className="relative h-[500px] overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000"
            alt="Ghana Map"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 justify-center text-gray-600 dark:text-gray-400 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Côte d'Ivoire — Ghana — Benin</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Explore Ghana's Treasures
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              From wildlife-rich savannas to historic coastal fortresses, discover the destinations that make Ghana unforgettable
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Interactive Map
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            From wildlife-rich savannas to historic coastal fortresses, discover the destinations that make Ghana unforgettable
          </p>
          
          {/* Map Placeholder */}
          <div className="relative h-[400px] bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600"
              alt="Ghana Map"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-700 dark:text-gray-300 font-medium">Interactive Map Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Region Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedRegion === region.id
                    ? "bg-emerald-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {destination.name}
                  </h2>
                  <p className="text-xl text-gray-900 dark:text-gray-100 font-medium mb-4">
                    {destination.tagline}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                    {destination.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Highlights
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {destination.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-5 h-5" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Star className="w-5 h-5" />
                      <span>Best: {destination.bestTime}</span>
                    </div>
                  </div>

                  <Link
                    href={`/destinations/${destination.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Let us help you plan the perfect Ghana experience with personalized itineraries and local insights
          </p>
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 hover:bg-gray-50 transition-colors rounded-lg font-semibold text-lg"
          >
            Subscribe
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-xl font-semibold text-white">
                  Travel with<br />Sulemana
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Exploring Ghana's hidden treasures and sharing authentic travel experiences.
              </p>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="text-white font-semibold mb-4">Destinations</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/destinations/northern" className="hover:text-white transition">Northern Ghana</Link></li>
                <li><Link href="/destinations/southern" className="hover:text-white transition">Southern Ghana</Link></li>
                <li><Link href="/destinations/eastern" className="hover:text-white transition">Eastern Ghana</Link></li>
                <li><Link href="/destinations/western" className="hover:text-white transition">Western Ghana</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Plan Your Trip</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/plan" className="hover:text-white transition">Custom Itinerary</Link></li>
                <li><Link href="/watch" className="hover:text-white transition">Travel Videos</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Travel Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Follow the Journey</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  <span>+1.4M Followers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  <span>TikTok Journey</span>
                </li>
                <li className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  <span>X (Twitter)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Youtube className="w-4 h-4" />
                  <span>Subscribe</span>
                </li>
              </ul>
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
