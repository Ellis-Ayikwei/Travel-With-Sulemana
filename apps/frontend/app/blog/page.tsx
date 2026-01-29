"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search, Clock, Tag } from "lucide-react";
import { useState, useMemo } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in Ghana You Must Visit",
      excerpt: "Beyond the bustle of Accra lies a world of pristine waterfalls, ancient architecture, and untouched canopy walkways.",
      category: "Travel Tips",
      author: "Sulemana",
      date: "Dec 15, 2024",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
      featured: true,
    },
    {
      id: 2,
      title: "The Best Time to Visit Ghana: A Seasonal Guide",
      excerpt: "From the vibrant festivals of August to the cool Harmattan breezes, timing your trip is an art form.",
      category: "Guide",
      author: "Sulemana",
      date: "Dec 10, 2024",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800",
      featured: false,
    },
    {
      id: 3,
      title: "Ghana's Culinary Traditions: Food Stories",
      excerpt: "Explore the rich history and flavors behind Ghana's most iconic dishes, from Jollof wars to authentic Fufu.",
      category: "Culture",
      author: "Ama Owusu",
      date: "Dec 05, 2024",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1568833394510-84331c7a6466?q=80&w=800",
      featured: false,
    },
    {
      id: 4,
      title: "Wildlife Photography: Capturing Africa's Magic",
      excerpt: "Pro tips for photographing Ghana's incredible wildlife, from Mole National Park to the Volta Region.",
      category: "Photography",
      author: "Kwame Photo",
      date: "Nov 28, 2024",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1502884593812-c42a7a0e7804?q=80&w=800",
      featured: false,
    },
    {
      id: 5,
      title: "Sustainable Tourism: Traveling Responsibly",
      excerpt: "How to minimize your footprint while maximizing your impact on local Ghanaian communities.",
      category: "Sustainability",
      author: "Sulemana",
      date: "Nov 20, 2024",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800",
      featured: false,
    },
    {
      id: 6,
      title: "Meeting Ghana's Artisans: Craft Stories",
      excerpt: "Step inside the workshops of the masters keeping Kente weaving and bead-making alive.",
      category: "Culture",
      author: "Ama Owusu",
      date: "Nov 15, 2024",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800",
      featured: false,
    },
  ];

  const categories = ["All", "Travel Tips", "Guide", "Culture", "Photography", "Sustainability"];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = blogPosts.find((p) => p.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500">
      <Navigation />

      {/* --- CINEMATIC HERO --- */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Travel Hero"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none mb-6">
              THE <br />
              <span className="text-amber-500">JOURNAL.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-xl font-medium leading-relaxed">
              Stories from the heart of West Africa. Curated guides, cultural deep-dives, and expedition notes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SEARCH & CATEGORIES (Sticky Glassmorphism) --- */}
      <section className="sticky top-20 z-40">
        <div className="container mx-auto px-6 -mt-12">
          <div className="bg-white/70 dark:bg-black/70 backdrop-blur-2xl p-4 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search the archives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl text-sm focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar w-full py-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-black dark:bg-amber-500 text-white dark:text-black"
                        : "bg-transparent text-gray-500 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED ARTICLE --- */}
      {selectedCategory === "All" && !searchQuery && featuredPost && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[3rem] overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/5"
            >
              <div className="lg:col-span-7 h-[500px] lg:h-[700px] overflow-hidden">
                <img
                  src={featuredPost.image}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Featured"
                />
              </div>
              <div className="lg:col-span-5 p-10 md:p-20 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                  <span className="px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase tracking-tighter rounded">Featured Story</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{featuredPost.readTime} Read</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed italic">
                  "{featuredPost.excerpt}"
                </p>
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] group/btn"
                >
                  Explore Article <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-3 transition-transform text-amber-500" />
                </Link>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* --- BLOG GRID --- */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-x-16 lg:gap-y-24">
            <AnimatePresence mode="popLayout">
              {filteredPosts
                .filter(p => selectedCategory !== "All" || !p.featured)
                .map((post, idx) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 shadow-xl">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={post.title}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-black text-[10px] font-black uppercase rounded-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-amber-500" /> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-amber-500" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter leading-tight group-hover:text-amber-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                    <div className="pt-6 flex items-center justify-between border-t border-gray-100 dark:border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                          {post.author[0]}
                        </div>
                        {post.author}
                      </span>
                      <ArrowRight className="w-5 h-5 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-amber-500" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-40 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-[3rem]"
            >
              <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-black tracking-tighter uppercase">No stories found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or category filters.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- PREMIUM NEWSLETTER --- */}
      <section className="py-24 bg-gray-50 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">
                JOIN THE <br /> <span className="text-amber-500">INNER CIRCLE.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Deep-dives into the hidden corners of Ghana, sent once a month. No spam, just pure culture.
              </p>
            </div>
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Explorer's email"
                className="px-8 py-5 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl text-sm min-w-[300px] outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
              <button className="px-10 py-5 bg-black dark:bg-amber-500 text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}