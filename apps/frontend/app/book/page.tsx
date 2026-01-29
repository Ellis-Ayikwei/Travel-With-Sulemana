"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Sparkles
} from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function BookPage() {
  const router = useRouter();

  const trips = [
    {
      id: 1,
      name: "Northern Ghana Safari Explorer",
      region: "Northern Ghana",
      startDate: "March 15, 2026",
      duration: "7 Days",
      groupSize: "8-12 Guests",
      price: 4499,
      deposit: 250,
      availability: 4,
      tag: "Wildlife & Safari",
      highlights: ["Mole National Park", "Larabanga Mosque", "Wildlife Safaris", "Local Guides"],
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200",
    },
    {
      id: 2,
      name: "Cape Coast Historical Journey",
      region: "Central Region",
      startDate: "April 5, 2026",
      duration: "5 Days",
      groupSize: "10-15 Guests",
      price: 3499,
      deposit: 200,
      availability: 6,
      tag: "Heritage & History",
      highlights: ["Cape Coast Castle", "Historical Tours", "Beach Relaxation", "Cultural Experience"],
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=1200",
    },
    {
      id: 3,
      name: "Kakum & Waterfall Adventure",
      region: "Eastern Region",
      startDate: "May 10, 2026",
      duration: "4 Days",
      groupSize: "6-10 Guests",
      price: 2999,
      deposit: 150,
      availability: 2,
      tag: "Adventure & Nature",
      highlights: ["Canopy Walkway", "Wli Waterfalls", "Nature Hikes", "Swimming"],
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200",
    },
    {
      id: 4,
      name: "West Coast Cultural Experience",
      region: "Western Region",
      startDate: "June 1, 2026",
      duration: "6 Days",
      groupSize: "12-18 Guests",
      price: 3999,
      deposit: 220,
      availability: 7,
      tag: "Artisan & Culture",
      highlights: ["Local Villages", "Artisan Workshops", "Traditional Food", "Photography Tours"],
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-emerald-500/30">
      <Navigation />

      {/* --- HERO: Cinematic Depth --- */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-emerald-500 mb-12 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-5xl"
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]">
              EXPEDITIONS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-600">
                2026 SEASON.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
              Skip the tourist traps. Join our small-group, high-impact journeys 
              led by experts who live and breathe Ghana's diverse landscapes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- TRIP GRID --- */}
      <section className="py-24 px-6 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group flex flex-col"
            >
              {/* Cinematic Image Container */}
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 shadow-2xl">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="px-4 py-1.5 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {trip.tag}
                  </span>
                  {trip.availability <= 4 && (
                    <span className="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 animate-pulse">
                      <TrendingUp className="w-3 h-3" /> {trip.availability} Slots Left
                    </span>
                  )}
                </div>

                {/* Bottom Image Overlay Content */}
                <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <MapPin className="w-4 h-4" /> {trip.region}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight uppercase italic">
                        {trip.name}
                    </h3>
                </div>
              </div>

              {/* Specs & Booking Section */}
              <div className="px-4 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="flex flex-wrap gap-6 text-gray-400">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-black text-gray-600">Departs</span>
                        <span className="text-sm font-bold text-white">{trip.startDate}</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-6">
                        <span className="text-[10px] uppercase tracking-widest font-black text-gray-600">Duration</span>
                        <span className="text-sm font-bold text-white">{trip.duration}</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-6">
                        <span className="text-[10px] uppercase tracking-widest font-black text-gray-600">Size</span>
                        <span className="text-sm font-bold text-white">{trip.groupSize}</span>
                    </div>
                </div>

                <div className="flex flex-col items-end w-full md:w-auto">
                    <div className="text-[10px] uppercase tracking-widest font-black text-gray-600 mb-1">Total Investment</div>
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-black italic text-white">${trip.price.toLocaleString()}</span>
                        <button
                            onClick={() => router.push(`/book/${trip.id}`)}
                            className="p-4 bg-white text-black rounded-full hover:bg-emerald-500 transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
              </div>
              
              {/* Highlights Chips */}
              <div className="mt-8 flex flex-wrap gap-2 px-4 opacity-60 group-hover:opacity-100 transition-opacity">
                 {trip.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10 rounded-md">
                        {h}
                    </span>
                 ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TRUST & FAQ: Clean Minimalist --- */}
      <section className="py-32 bg-white text-black rounded-[3rem] mx-4 md:mx-6 mb-12">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-3xl mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">THE DETAILS <br/> MATTER.</h2>
            <p className="text-xl text-gray-600 leading-relaxed">Everything you need to know about joining a Sulemana expedition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { q: "Inclusions", a: "Price includes 5-star lodging (where available), all ground transport, private chef prepared meals, and security personnel." },
              { q: "Payment Schedule", a: "20% non-refundable deposit to secure dates. Remaining balance due 60 days before the journey starts." },
              { q: "Refund Policy", a: "Full credit transfer allowed for future trips if cancelled within 90 days. No cash refunds within 45 days." },
              { q: "Waitlisting", a: "If a journey is marked 'Full,' contact us. Private itineraries can be drafted for the same routes." }
            ].map((faq, i) => (
                <div key={i} className="border-t border-black/10 pt-8">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-emerald-600 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> {faq.q}
                    </h4>
                    <p className="text-lg font-medium leading-relaxed">{faq.a}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CALL: Black/White Contrast --- */}
      <section className="py-32 text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter italic uppercase underline decoration-emerald-500 underline-offset-8">Still have questions?</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="mailto:info@travelwithsulemana.com" className="px-10 py-5 bg-emerald-500 text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-white transition-colors">
                    Consult an Expert
                </a>
                <span className="text-gray-600 font-bold uppercase tracking-widest text-xs">Or Call +233 XXX XXX XXX</span>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}