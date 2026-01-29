"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  MapPinned,
  Utensils,
  Home,
  Navigation as NavigationIcon,
  Star,
  Info,
  ShieldCheck,
  PlaneTakeoff,
  Clock
} from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function TripDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const params = useParams();
  const router = useRouter();

  const tripData = {
    "1": {
      name: "Northern Ghana Safari Explorer",
      region: "Northern Ghana",
      startDate: "March 15, 2026",
      endDate: "March 22, 2026",
      duration: "7 Days",
      groupSize: "8-12 Guests",
      price: 4499,
      deposit: 250,
      availability: 4,
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200",
      rating: 4.9,
      reviews: 48,
      description: "Experience the thrill of encountering elephants, antelopes, and exotic bird species in their natural habitat. This journey takes you deep into the heart of the savannah for an authentic wildlife immersion.",
      highlights: ["Mole National Park Safari", "Ancient Larabanga Mosque", "Guided Nature Walks", "Community Cultural Visits"],
    },
    // ... data for other IDs
  };

  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const tripKey = (rawId && rawId in tripData ? rawId : "1") as keyof typeof tripData;
  const trip = tripData[tripKey];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "The Journey" },
    { id: "included", label: "Inclusions" },
    { id: "packages", label: "Accommodations" },
    { id: "reviews", label: "Guest Stories" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-emerald-100">
      <Navigation />

      {/* --- REFINED BREADCRUMB --- */}
      <div className="pt-24 pb-6 px-6 container mx-auto">
        <Link
          href="/book"
          className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Browse Expeditions
        </Link>
      </div>

      {/* --- CINEMATIC HERO --- */}
      <section className="container mx-auto px-4 md:px-6 mb-12">
        <div className="relative h-[60vh] md:h-[70vh] rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img
            src={trip.image}
            alt={trip.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          
          <div className="absolute bottom-12 left-8 md:left-16 right-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 text-emerald-400 mb-6">
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest">
                  {trip.region}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-white">{trip.rating}</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter uppercase italic">
                {trip.name}
              </h1>
              <div className="flex flex-wrap gap-8 text-white/80 uppercase text-[10px] font-bold tracking-[0.2em]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" /> {trip.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" /> {trip.groupSize}
                </div>
                <div className="flex items-center gap-2">
                  <PlaneTakeoff className="w-4 h-4 text-emerald-400" /> Seasonal Expedition
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <section className="container mx-auto px-4 md:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- LEFT: INFORMATION ARCHITECTURE --- */}
          <div className="lg:col-span-8">
            {/* Custom Tab UI */}
            <div className="flex gap-8 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                    activeTab === tab.id ? "text-emerald-600" : "text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "overview" && (
                  <div className="space-y-12">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-3xl font-bold tracking-tight mb-6">About the Expedition</h2>
                      <p className="text-gray-600 leading-relaxed text-xl font-light">
                        {trip.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {trip.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                          <div className="p-3 bg-emerald-50 rounded-2xl">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <span className="font-bold text-gray-800">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "itinerary" && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight">Daily Breakdown</h2>
                    {[1, 2, 3].map((day) => (
                      <div key={day} className="relative pl-12 pb-12 border-l-2 border-emerald-100 last:border-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-emerald-600 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" />
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Day 0{day}</span>
                        <h3 className="text-xl font-bold mb-4 uppercase italic">Savannah Awakening</h3>
                        <p className="text-gray-500 font-light leading-relaxed">
                          The sun rises over the Mole Reserve. Early morning game drives offer the best chance to witness elephants at the watering holes. Afternoon tea followed by a sunset bush walk.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- RIGHT: THE FLOATING CONCIERGE CARD --- */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sticky top-32 p-8 bg-white rounded-[2rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">All-Inclusive From</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black tracking-tighter">${trip.price.toLocaleString()}</span>
                  <span className="text-gray-400 font-medium italic text-sm">/ guest</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm font-medium p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-500">Security Deposit</span>
                  <span className="font-bold">${trip.deposit}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                  <Info className="w-3 h-3" /> Only {trip.availability} Spots Remaining
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-5 bg-gray-900 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-emerald-600 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-gray-200">
                  Secure Your Seat
                </button>
                <button className="w-full py-5 bg-white text-gray-900 border border-gray-200 font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:border-gray-900 transition-all">
                  Request Private Itinerary
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Travel Protection Included
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}