"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Clock,
  Users,
  Camera,
  Music,
  Waves,
  Mountain,
  Zap,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const categories = ["All", "Adventure", "Culture", "History", "Leisure", "Creative"];

const trips = [
  {
    id: 1,
    name: "Northern Ghana Safari Explorer",
    category: "Adventure",
    region: "Northern Ghana",
    startDate: "March 15, 2026",
    duration: "7 Days",
    groupSize: "8-12 Guests",
    price: 4499,
    availability: 4,
    tag: "Wildlife & Safari",
    highlights: ["Mole National Park", "Larabanga Mosque", "Wildlife Safaris", "Local Guides"],
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200",
    icon: Mountain,
  },
  {
    id: 2,
    name: "Cape Coast Historical Journey",
    category: "History",
    region: "Central Region",
    startDate: "April 5, 2026",
    duration: "5 Days",
    groupSize: "10-15 Guests",
    price: 3499,
    availability: 6,
    tag: "Heritage & History",
    highlights: ["Cape Coast Castle", "Historical Tours", "Beach Relaxation", "Cultural Experience"],
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=1200",
    icon: Camera,
  },
  {
    id: 3,
    name: "Kakum & Waterfall Adventure",
    category: "Adventure",
    region: "Eastern Region",
    startDate: "May 10, 2026",
    duration: "4 Days",
    groupSize: "6-10 Guests",
    price: 2999,
    availability: 2,
    tag: "Adventure & Nature",
    highlights: ["Canopy Walkway", "Wli Waterfalls", "Nature Hikes", "Swimming"],
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200",
    icon: Waves,
  },
  {
    id: 4,
    name: "West Coast Cultural Experience",
    category: "Culture",
    region: "Western Region",
    startDate: "June 1, 2026",
    duration: "6 Days",
    groupSize: "12-18 Guests",
    price: 3999,
    availability: 7,
    tag: "Artisan & Culture",
    highlights: ["Local Villages", "Artisan Workshops", "Traditional Food", "Photography Tours"],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200",
    icon: Music,
  },
];

export default function UnifiedExpeditionsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTrips = selectedCategory === "All" 
    ? trips 
    : trips.filter(trip => trip.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-[#070707] transition-colors duration-500 selection:bg-emerald-500/30">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-gray-100 dark:border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(16,185,129,0.05),_transparent)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 mb-12 text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-70 transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl"
          >
            <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8] text-gray-900 dark:text-white">
              DISCOVER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500">
                THE UNKNOWN.
              </span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
               <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl font-medium leading-relaxed">
                Curated expeditions designed for the modern explorer. We don&apos;t just visit Ghana; we immerse you in the pulse of its heritage, wildlife, and people.
              </p>
              <div className="hidden md:flex gap-4">
                 <div className="px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <span className="block text-2xl font-black text-gray-900 dark:text-white">2026</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest">Active Season</span>
                 </div>
                 <div className="px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <span className="block text-2xl font-black text-gray-900 dark:text-white">12+</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest">Routes</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STICKY CATEGORY NAV --- */}
      <section className="sticky top-0 z-50 py-6 bg-white/80 dark:bg-[#070707]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 transition-all">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto no-scrollbar gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  selectedCategory === category
                    ? "bg-gray-900 dark:bg-emerald-500 text-white dark:text-black border-transparent"
                    : "bg-transparent text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-900 dark:hover:border-emerald-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPEDITION LIST --- */}
      <section className="py-24 px-6 container mx-auto">
        <div className="grid grid-cols-1 gap-32">
          <AnimatePresence mode="wait">
            {filteredTrips.map((trip, index) => {
              const Icon = trip.icon;
              return (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                >
                  {/* Visual Pillar */}
                  <div className="relative w-full lg:w-3/5 aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-3xl bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <img
                      src={trip.image}
                      alt={trip.name}
                      className="w-full h-full object-cover grayscale-[100%] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Info */}
                    <div className="absolute top-8 left-8">
                       <div className="flex gap-2">
                        <span className="px-4 py-2 bg-white/95 dark:bg-[#070707]/90 backdrop-blur-md text-gray-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/20">
                          {trip.tag}
                        </span>
                        {trip.availability <= 4 && (
                          <span className="px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2">
                             Limited
                          </span>
                        )}
                       </div>
                    </div>
                  </div>

                  {/* Content Pillar */}
                  <div className="w-full lg:w-2/5 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em]">
                        <Zap className="w-4 h-4 fill-emerald-500" /> Expedition {trip.id.toString().padStart(2, '0')}
                      </div>
                      <h3 className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter text-gray-900 dark:text-white italic uppercase group-hover:text-emerald-500 transition-colors">
                        {trip.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                        <MapPin className="w-3 h-3 text-emerald-500" /> {trip.region}
                      </div>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed border-l-2 border-emerald-500/30 pl-6">
                      Discover the {trip.category.toLowerCase()} of {trip.region}. A journey focused on {trip.tag.toLowerCase()}, featuring {trip.highlights.slice(0, 2).join(" and ")}.
                    </p>

                    <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-100 dark:border-white/5">
                      <div>
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Duration</span>
                        <span className="text-lg font-black text-gray-900 dark:text-white">{trip.duration}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Base Price</span>
                        <span className="text-lg font-black text-gray-900 dark:text-white">${trip.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                      <button 
                         onClick={() => router.push(`/book/${trip.id}`)}
                         className="flex-1 px-8 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white transition-all transform group-hover:translate-x-2"
                      >
                        Reserve Spot
                      </button>
                      <button className="p-5 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                         <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* --- FAQ SECTION: LIGHT MODE SWITCH --- */}
      <section className="py-32 bg-gray-50 dark:bg-white text-black rounded-[4rem] mx-4 md:mx-6 mb-12 shadow-2xl transition-colors duration-700">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
               <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] block mb-6">Logistics</span>
               <h2 className="text-6xl font-black tracking-tighter leading-none mb-8">THE <br/> PROTOCOL.</h2>
               <div className="space-y-6">
                  <div className="flex items-center gap-4 text-sm font-bold opacity-60">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" /> Security Personnel Included
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold opacity-60">
                    <Clock className="w-5 h-5 text-emerald-600" /> 24/7 Logistics Support
                  </div>
               </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                { q: "What's Included?", a: "Ultra-luxury accommodation, 3 curated meals daily by private chefs, all luxury transportation, and expert local guides." },
                { q: "Payment Terms", a: "Secure your journey with a 25% deposit. We offer flexible payment plans for the remaining balance up to 60 days before launch." },
                { q: "Health & Safety", a: "Every expedition includes comprehensive travel insurance options and access to top-tier medical facilities in Ghana." },
                { q: "Custom Trips", a: "Don't see your perfect route? We specialize in crafting bespoke itineraries for private groups of 4 or more." }
              ].map((faq, i) => (
                  <div key={i} className="group">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> {faq.q}
                      </h4>
                      <p className="text-lg font-semibold leading-relaxed text-gray-800">{faq.a}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT FOOTER --- */}
      <section className="py-32">
        <div className="container mx-auto px-6 text-center">
           <motion.div
             whileInView={{ opacity: 1, scale: 1 }}
             initial={{ opacity: 0, scale: 0.9 }}
             className="max-w-4xl mx-auto space-y-12"
           >
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic">Ready to leave the <span className="text-emerald-500">Ordinary</span> behind?</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <a href="mailto:expeditions@sulemana.com" className="group flex items-center gap-4 text-2xl font-black text-gray-900 dark:text-white hover:text-emerald-500 transition-colors">
                  START CONVERSATION <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
                </a>
              </div>
           </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}