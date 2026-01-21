"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Moon,
  Sun,
  Menu,
  X,
  MapPin,
  Users,
  Clock,
  Star,
  Utensils,
  Camera,
  Mountain,
  Waves,
  Music,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ExperiencesPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const experiences = [
    {
      id: 1,
      title: "Wildlife Safari Adventure",
      category: "Adventure",
      description: "Get up close with Ghana's incredible wildlife in their natural habitat at Mole National Park.",
      duration: "2-3 days",
      groupSize: "4-8 people",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800",
      rating: 4.9,
      reviews: 48,
      icon: Mountain,
      details: ["Early morning game drives", "Expert wildlife guides", "Photography opportunities", "Comfortable lodge stay"],
    },
    {
      id: 2,
      title: "Culinary & Market Tour",
      category: "Culture",
      description: "Discover Ghana's rich culinary traditions through vibrant market tours and cooking experiences.",
      duration: "1-2 days",
      groupSize: "6-12 people",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800",
      rating: 4.8,
      reviews: 32,
      icon: Utensils,
      details: ["Local market exploration", "Cooking classes", "Taste local delicacies", "Meet local vendors"],
    },
    {
      id: 3,
      title: "Beach & Water Sports",
      category: "Leisure",
      description: "Relax on pristine beaches and enjoy thrilling water sports along Ghana's beautiful coastline.",
      duration: "3-4 days",
      groupSize: "2-10 people",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
      rating: 4.7,
      reviews: 28,
      icon: Waves,
      details: ["Beach relaxation", "Surfing lessons", "Snorkeling", "Sunset experiences"],
    },
    {
      id: 4,
      title: "Historical Sites Tour",
      category: "History",
      description: "Walk through Ghana's colonial past and learn about the country's complex and fascinating history.",
      duration: "2 days",
      groupSize: "8-15 people",
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800",
      rating: 4.9,
      reviews: 42,
      icon: Camera,
      details: ["Castle tours", "Museum visits", "Historical guides", "Educational talks"],
    },
    {
      id: 5,
      title: "Photography Expedition",
      category: "Creative",
      description: "Capture Ghana's stunning landscapes and culture with professional photography guidance.",
      duration: "3-5 days",
      groupSize: "4-8 people",
      image: "https://images.unsplash.com/photo-1502884593812-c42a7a0e7804?q=80&w=800",
      rating: 4.8,
      reviews: 25,
      icon: Camera,
      details: ["Professional guidance", "Prime photo locations", "Editing workshops", "Portfolio building"],
    },
    {
      id: 6,
      title: "Local Music & Arts",
      category: "Culture",
      description: "Experience Ghana's vibrant music and arts scene with local musicians and artists.",
      duration: "1-2 days",
      groupSize: "10-20 people",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=800",
      rating: 4.7,
      reviews: 20,
      icon: Music,
      details: ["Live performances", "Artist meetings", "Workshop sessions", "Cultural events"],
    },
  ];

  const categories = ["All", "Adventure", "Culture", "History", "Leisure", "Creative"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredExperiences =
    selectedCategory === "All"
      ? experiences
      : experiences.filter((exp) => exp.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:inline">
                Travel with Sulemana
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Home
              </Link>
              <Link href="/destinations" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Destinations
              </Link>
              <Link href="/experiences" className="text-black dark:text-white font-semibold">
                Experiences
              </Link>
              <Link href="/watch" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Watch
              </Link>
              <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Blog
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
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

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              <Link href="/" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Home
              </Link>
              <Link href="/destinations" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Destinations
              </Link>
              <Link href="/experiences" className="block text-black dark:text-white font-semibold">
                Experiences
              </Link>
              <Link href="/watch" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Watch
              </Link>
              <Link href="/blog" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Blog
              </Link>
              <Link href="/about" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                About
              </Link>
              <Link href="/contact" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Unique Experiences
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Go beyond the typical tourist experience. Immerse yourself in authentic Ghanaian culture, wildlife, and landscapes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((experience, index) => {
              const Icon = experience.icon;
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-sm font-semibold">
                      {experience.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-black dark:text-gray-300 mb-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-semibold">{experience.title}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {experience.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {experience.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{experience.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{experience.rating} ({experience.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="mb-6 pb-6 border-t border-gray-200 dark:border-gray-800">
                      <ul className="space-y-2">
                        {experience.details.slice(0, 2).map((detail, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/book"
                      className="w-full inline-flex items-center justify-center px-4 py-3 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold rounded-lg transition-colors"
                    >
                      Explore More
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Your Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Browse our available trips and customize your perfect Ghanaian adventure.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg font-semibold"
            >
              Browse Trips
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xl">T</span>
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
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">info@travelwithsulemana.com</p>
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
