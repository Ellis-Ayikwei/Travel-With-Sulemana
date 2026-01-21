"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Moon,
  Sun,
  Menu,
  X,
  Calendar,
  User,
  ArrowRight,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in Ghana You Must Visit",
      excerpt: "Discover the lesser-known destinations that offer authentic experiences and stunning natural beauty.",
      content: "Ghana is known for its popular destinations like Cape Coast and Mole National Park, but there are countless hidden gems waiting to be explored...",
      category: "Travel Tips",
      author: "Sulemana",
      date: "2024-12-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800",
      featured: true,
    },
    {
      id: 2,
      title: "The Best Time to Visit Ghana: A Seasonal Guide",
      excerpt: "Learn about Ghana's weather patterns and discover the perfect time for your adventure.",
      content: "Planning a trip to Ghana? Understanding the seasons will help you make the most of your visit...",
      category: "Guide",
      author: "Sulemana",
      date: "2024-12-10",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800",
      featured: true,
    },
    {
      id: 3,
      title: "Ghana's Culinary Traditions: Food Stories",
      excerpt: "Explore the rich history and flavors behind Ghana's most iconic dishes.",
      content: "Ghanaian cuisine is a reflection of the country's diverse cultures and rich heritage. From jollof rice to fufu...",
      category: "Culture",
      author: "Ama Owusu",
      date: "2024-12-05",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1568833394510-84331c7a6466?q=80&w=800",
      featured: false,
    },
    {
      id: 4,
      title: "Wildlife Photography: Capturing Africa's Magic",
      excerpt: "Pro tips for photographing Ghana's incredible wildlife and landscapes.",
      content: "Whether you're an amateur or professional photographer, Ghana offers endless opportunities for stunning shots...",
      category: "Photography",
      author: "Kwame Photography",
      date: "2024-11-28",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1502884593812-c42a7a0e7804?q=80&w=800",
      featured: false,
    },
    {
      id: 5,
      title: "Sustainable Tourism: Traveling Responsibly in Ghana",
      excerpt: "How to minimize your environmental impact while exploring Ghana's natural wonders.",
      content: "As travelers, we have a responsibility to protect the destinations we love. Here's how to travel sustainably in Ghana...",
      category: "Sustainability",
      author: "Sulemana",
      date: "2024-11-20",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800",
      featured: false,
    },
    {
      id: 6,
      title: "Meeting Ghana's Artisans: Craftsmanship Stories",
      excerpt: "Discover the talented individuals keeping Ghana's traditional crafts alive.",
      content: "From weaving to pottery, Ghana's artisans create beautiful pieces rooted in tradition and innovation...",
      category: "Culture",
      author: "Ama Owusu",
      date: "2024-11-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800",
      featured: false,
    },
  ];

  const categories = ["All", "Travel Tips", "Guide", "Culture", "Photography", "Sustainability"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

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
              <Link href="/watch" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Watch
              </Link>
              <Link href="/blog" className="text-black dark:text-white font-semibold">
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
              <Link href="/watch" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Watch
              </Link>
              <Link href="/blog" className="block text-black dark:text-white font-semibold">
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
              Travel Stories & Insights
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Read our latest articles about Ghana's destinations, travel tips, and cultural insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
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

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="h-96 md:h-full relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full">
                    Featured
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold rounded-lg transition-colors w-fit"
                >
                  Read Article
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-black dark:text-white font-semibold hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No articles found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter for travel tips, stories, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg font-semibold">
                Subscribe
              </button>
            </div>
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
