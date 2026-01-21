"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Moon,
  Sun,
  Menu,
  X,
  Play,
  Calendar,
  Heart,
  Share2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function WatchPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const videos = [
    {
      id: 1,
      title: "Sunrise Safari at Mole National Park",
      description: "Experience the magic of an African sunrise while exploring Mole National Park's incredible wildlife.",
      category: "Adventure",
      date: "2024-12-15",
      views: "12.5K",
      likes: 892,
      duration: "12:34",
      thumbnail: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Cape Coast Castle: A Journey Through History",
      description: "Walk through the powerful corridors of Cape Coast Castle and learn about Ghana's complex history.",
      category: "History",
      date: "2024-12-10",
      views: "8.3K",
      likes: 645,
      duration: "15:42",
      thumbnail: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Ghanaian Cuisine: A Culinary Adventure",
      description: "Discover the flavors of Ghana through vibrant markets and authentic cooking experiences.",
      category: "Culture",
      date: "2024-12-05",
      views: "15.2K",
      likes: 1230,
      duration: "14:18",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 4,
      title: "Kakum Canopy Walk: Above the Treetops",
      description: "Walk 40 meters above the forest floor in this thrilling and unforgettable experience.",
      category: "Adventure",
      date: "2024-11-28",
      views: "18.7K",
      likes: 1456,
      duration: "10:05",
      thumbnail: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 5,
      title: "Music & Dance: The Heartbeat of Ghana",
      description: "Experience Ghana's vibrant music and dance traditions with local artists and performers.",
      category: "Culture",
      date: "2024-11-20",
      views: "9.1K",
      likes: 723,
      duration: "13:22",
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 6,
      title: "Accra City Tour: Modern Ghana",
      description: "Explore the vibrant capital city, from modern architecture to bustling markets and art galleries.",
      category: "City",
      date: "2024-11-15",
      views: "11.4K",
      likes: 865,
      duration: "16:50",
      thumbnail: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 7,
      title: "Beach Life: Ghana's Coastal Paradise",
      description: "Relax and explore Ghana's beautiful beaches, from quiet coves to bustling coastal towns.",
      category: "Leisure",
      date: "2024-11-10",
      views: "16.8K",
      likes: 1342,
      duration: "11:44",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 8,
      title: "Local Artisans: Crafting Ghana's Soul",
      description: "Meet the talented artisans who create Ghana's beautiful crafts and artwork.",
      category: "Culture",
      date: "2024-11-05",
      views: "6.9K",
      likes: 521,
      duration: "12:15",
      thumbnail: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const categories = ["All", "Adventure", "Culture", "History", "City", "Leisure"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

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
              <Link href="/experiences" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Experiences
              </Link>
              <Link href="/watch" className="text-black dark:text-white font-semibold">
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
              <Link href="/experiences" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Experiences
              </Link>
              <Link href="/watch" className="block text-black dark:text-white font-semibold">
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
              Ghana Through My Lens
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Watch our travel documentaries and discover the magic, culture, and beauty of Ghana.
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

      {/* Videos Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                <div className="relative h-48 bg-gray-200 dark:bg-gray-800 group overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-black fill-black ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
                    {video.duration}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 text-xs font-semibold rounded-full">
                      {video.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {video.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-4">
                      <span>{video.views} views</span>
                      <span>{video.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{video.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={videos.find((v) => v.id === selectedVideo)?.videoUrl}
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Inspired by These Videos?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book your own adventure and experience Ghana firsthand.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg font-semibold"
            >
              Book Your Trip
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
